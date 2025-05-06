import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phoneNumber = searchParams.get('phone');

    if (!phoneNumber) {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

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
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all headers and data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'MYF attendees',
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];

    // Find indices for both Name and Contact columns
    const nameIndex = headers.findIndex(header => header === 'Name');
    const contactIndex = headers.findIndex(header => header === 'Contact');

    if (nameIndex === -1) throw new Error('"Name" column not found');
    if (contactIndex === -1) throw new Error('"Contact" column not found');

    // Search for the phone number in the contact column
    const foundEntry = rows.slice(1).find(row => {
      const contact = row[contactIndex];
      if (!contact) return false;

      // Process contact numbers (split by ',' or '/')
      const contactNumbers = contact.split(/[,/]/).map((num: string) => num.trim());

      return contactNumbers.some((contact: string) =>
        contact.slice(-5).includes(phoneNumber.slice(-4)),
      ); // Check if last 4 digits are a substring of any contact number
    });

    if (!foundEntry) {
      return NextResponse.json(
        { message: 'No entry found for the provided phone number' },
        { status: 404 },
      );
    }

    const name = foundEntry[nameIndex];
    return NextResponse.json({ name }, { status: 200 });
  } catch (error) {
    console.error('Error fetching name:', error);
    return NextResponse.json({ message: 'Failed to fetch name' }, { status: 500 });
  }
}
