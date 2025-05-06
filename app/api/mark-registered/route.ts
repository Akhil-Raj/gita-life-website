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
    const { contact } = body; // Assuming you send the contact number of the person

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

    // Find index for the "Contact" and "Jan MYF" columns
    const contactIndex = headers.findIndex(header => header === 'Contact');
    const statusIndex = headers.findIndex(header => header === 'May MYF(2025)');

    if (contactIndex === -1 || statusIndex === -1) {
      throw new Error('"Contact" or "May MYF" column not found');
    }

    // Find the row for the given contact number
    const rowIndex = rows.findIndex(row => {
      const contactNumbers = row[contactIndex].split(/[,/]/);
      return contactNumbers.some((contactNumber: string) =>
        contactNumber.slice(-5).includes(contact.slice(-4)),
      );
      // row[contactIndex].includes(contact.slice(-4))
    });
    // const normalizePhoneNumber = (number: string) => {
    //   return number.replace(/\D/g, ''); // Remove non-numeric characters
    // };

    // const rowIndex = rows.findIndex(row => {
    //   const contactNumbers = row[contactIndex].split(/[,/]/).map(normalizePhoneNumber);
    //   const normalizedInputContact = normalizePhoneNumber(contact);
    //   return contactNumbers.some((contactNumber: string) => contactNumber.includes(normalizedInputContact));
    // });
    if (rowIndex === -1) {
      throw new Error('Contact not found in the attendance sheet');
    }

    // Update the status to 'Registered'
    const targetColumn = getColumnLetter(statusIndex);
    const rowNumber = rowIndex + 1; // Convert to 1-based index

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `MYF attendees!${targetColumn}${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['Registered']],
      },
    });

    return NextResponse.json({ message: 'Registration marked as Registered' }, { status: 200 });
  } catch (error) {
    console.error('Error marking registration:', error);
    return NextResponse.json({ message: 'Failed to mark registration' }, { status: 500 });
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
