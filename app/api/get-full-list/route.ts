import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { followupOwner } = body;

    // Parse credentials and handle private key
    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!);
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
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'MYF attendees'
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];

    // Find indices for Followup owner column
    const followupOwnerIndex = headers.findIndex(header => header === 'Followup owner');

    if (followupOwnerIndex === -1) throw new Error('"Followup owner" column not found');

    const specificFollowupOwner = 'AADk'; // This could be dynamically set based on your requirements

    // Extract all data, filtering by Followup owner
    const filteredData = rows
      .slice(1)
      .filter(row => {
        const currentFollowupOwner = row[followupOwnerIndex]; // Get the followup owner for the current row
        return currentFollowupOwner && currentFollowupOwner === followupOwner; // Filter by specific Followup owner
      })
      .map(row => {
        const entry: Record<string, string | number> = {};
        headers.forEach((header, index) => {
          entry[header] = row[index]; // Create an object for each row with header as key
        });
        return entry;
      });

    return NextResponse.json({ entries: filteredData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
