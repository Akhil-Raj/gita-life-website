import { NextResponse } from 'next/server';
import { google } from 'googleapis';

if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
  throw new Error('GOOGLE_SHEETS_CREDENTIALS environment variable is not set');
}

if (!process.env.GOOGLE_SHEET_ID) {
  throw new Error('GOOGLE_SHEET_ID environment variable is not set');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body; // Assuming you send the name of the person

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
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all headers and data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'MYF attendees',
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];
    
    // Find index for the "Name" and "[Month] MYF" columns
    const nameIndex = headers.findIndex(header => header === 'Name');
    const statusIndex = headers.findIndex(header => header === 'Feb MYF');

    if (nameIndex === -1 || statusIndex === -1) {
      throw new Error('"Name" or "Feb MYF" column not found');
    }

    // Find the row for the given name
    const rowIndex = rows.findIndex(row => row[nameIndex] === name);
    if (rowIndex === -1) {
      throw new Error('Name not found in the attendance sheet');
    }

    // Update the status to 'Present'
    const targetColumn = getColumnLetter(statusIndex);
    const rowNumber = rowIndex + 1; // Convert to 1-based index

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `MYF attendees!${targetColumn}${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['Present']],
      },
    });

    return NextResponse.json({ message: 'Attendance marked as Present' }, { status: 200 });
  } catch (error) {
    console.error('Error marking attendance:', error);
    return NextResponse.json({ message: 'Failed to mark attendance' }, { status: 500 });
  }
}

// Helper function to get column letter
const getColumnLetter = (index: number) => {
  let letter = '';
  while (index >= 0) {
    letter = String.fromCharCode(65 + (index % 26)) + letter;
    index = Math.floor(index / 26) - 1;
  }
  return letter;
}; 