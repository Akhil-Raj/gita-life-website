import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Define the path to the credentials file
const credentialsPath = path.join('/Users/shabad/Downloads/gita-life-website/credentials/festive-bloom-441900-t2-bcdcc0713c43.json');
console.log("credentialsPath : ", credentialsPath)
// Check if the credentials file exists
if (!fs.existsSync(credentialsPath)) {
  throw new Error('Google Sheets credentials file does not exist at the specified path');
}

export async function GET(req: Request) {
  try {
    // Read and parse the credentials from the JSON file
    let credentials;
    try {
      const credentialsFile = fs.readFileSync(credentialsPath, 'utf8');
      credentials = JSON.parse(credentialsFile);
      // Replace escaped newlines with actual newlines
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    } catch (error) {
      console.error('Error reading or parsing Google Sheets credentials:', error);
      throw new Error('Invalid Google Sheets credentials format');
    }

    // Initialize auth with properly formatted credentials
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all headers and data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID, // Ensure this is set in your environment
      range: 'MYF attendees', // Get all data
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];
    
    // Find index for the "Name" column
    const nameIndex = headers.findIndex(header => header === 'Name');
    if (nameIndex === -1) throw new Error('"Name" column not found');

    // Extract names from the "Name" column
    const names = rows.slice(1).map(row => row[nameIndex]).filter(name => name);

    return NextResponse.json({ names }, { status: 200 });
  } catch (error) {
    console.error('Error fetching names:', error);
    return NextResponse.json({ message: 'Failed to fetch names' }, { status: 500 });
  }
}
