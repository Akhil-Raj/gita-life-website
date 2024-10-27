import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, gender, contactNumber, whatsappNumber, schoolOrganization } = body;

    // Load the Google Sheets API credentials
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || ''),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Append the data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E', // Adjust this range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, gender, contactNumber, whatsappNumber, schoolOrganization]],
      },
    });

    // Send confirmation email
    const emailResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email: 'registration@example.com', // You can set a default email for registrations
        message: `
          New Event Registration:
          Name: ${name}
          Gender: ${gender}
          Contact Number: ${contactNumber}
          WhatsApp Number: ${whatsappNumber}
          School/Organization: ${schoolOrganization}
        `,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting registration:', error);
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
