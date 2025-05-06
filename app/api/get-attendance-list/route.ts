import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    // Parse credentials and handle private key
    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!);
      // Replace escaped newlines with actual newlines
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    } catch (error) {
      console.error('Error parsing Google Sheets credentials:', error);
      throw new Error('Invalid GOOGLE_SHEETS_CREDENTIALS format');
    }

    // Initialize auth with properly formatted credentials
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all headers and data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID, // Ensure this is set in your environment
      range: 'MYF attendees' // Get all data
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];

    // Find indices for both Name and Contact columns
    const nameIndex = headers.findIndex(header => header === 'Name');
    const contactIndex = headers.findIndex(header => header === 'Contact');

    if (nameIndex === -1) throw new Error('"Name" column not found');
    if (contactIndex === -1) throw new Error('"Contact" column not found');

    // Extract names and contact numbers, process them together
    const namesWithContacts = rows
      .slice(1)
      .map(row => {
        const name = row[nameIndex];
        const contact = row[contactIndex];

        if (!name) return null;

        // Process contact numbers (split by ',' or '/')
        const contactNumbers = contact
          ? contact
              .split(/[,/]/)
              .map((num: string) => num.trim())
              .map((num: string) => num.slice(-4))
              .filter((num: string) => num)
          : [];

        return {
          name,
          contactNumbers
        };
      })
      .filter(entry => entry !== null);

    return NextResponse.json({ entries: namesWithContacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching names:', error);
    return NextResponse.json({ message: 'Failed to fetch names' }, { status: 500 });
  }
}
