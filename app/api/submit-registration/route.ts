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
    const {
      name,
      gender,
      whatsappExtension,
      whatsappNumber,
      schoolOrganization,
      contactExtension,
      contactNumber,
      isWhatsappSameAsContact,
      isAttendancePage
    } = body;

    // Format phone numbers with country code and wrap in single quotes to force text format
    const formattedWhatsApp = `'${whatsappExtension}${whatsappNumber}'`;
    const formattedContact = isWhatsappSameAsContact 
      ? formattedWhatsApp 
      : `'${contactExtension}${contactNumber}'`;

    // Combine numbers if they're different
    const contactNumbers = isWhatsappSameAsContact
      ? formattedWhatsApp
      : `${formattedWhatsApp}, ${formattedContact}`;

    // Format name with gender in brackets
    const formattedName = `${name} (${gender})`;

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
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all headers and data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'MYF attendees', // Get all data
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];
    
    // Find indices for all required columns
    const nameIndex = headers.findIndex(header => header === 'Name');
    const contactIndex = headers.findIndex(header => header === 'Contact');
    const locationIndex = headers.findIndex(header => header === 'Location');
    const novMYFIndex = headers.findIndex(header => header === 'Nov MYF');

    // Verify all required columns exist
    if (nameIndex === -1) throw new Error('"Name" column not found');
    if (contactIndex === -1) throw new Error('"Contact" column not found');
    if (locationIndex === -1) throw new Error('"Location" column not found');
    if (novMYFIndex === -1) throw new Error('"Nov MYF" column not found');

    // Get column letters (keep existing getColumnLetter function)
    const getColumnLetter = (index: number) => {
      let letter = '';
      while (index >= 0) {
        letter = String.fromCharCode(65 + (index % 26)) + letter;
        index = Math.floor(index / 26) - 1;
      }
      return letter;
    };

    // Extract phone numbers without extensions for comparison
    const whatsappNumberOnly = whatsappNumber;
    const contactNumberOnly = isWhatsappSameAsContact ? whatsappNumber : contactNumber;

    // Check if either phone number exists in the Contact column
    let existingRowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      const contactCell = rows[i][contactIndex] || '';
      // Remove all non-digit characters for comparison
      const cellDigits = contactCell.replace(/\D/g, '');
      if (cellDigits.includes(whatsappNumberOnly) || 
          (!isWhatsappSameAsContact && cellDigits.includes(contactNumberOnly))) {
        existingRowIndex = i;
        break;
      }
    }

    // Use 'Present' instead of 'Registered' when coming from attendance page
    const status = isAttendancePage ? 'Present' : 'Registered';

    if (existingRowIndex !== -1) {
      // Case 1: Number exists, update the "Nov MYF" column
      const targetColumn = getColumnLetter(novMYFIndex);
      const rowNumber = existingRowIndex + 1;

      // Copy data validation and set "Registered" value
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: {
          requests: [
            {
              copyPaste: {
                source: {
                  sheetId: 0,
                  startRowIndex: 1,
                  endRowIndex: 2,
                  startColumnIndex: novMYFIndex - 2,
                  endColumnIndex: novMYFIndex - 1,
                },
                destination: {
                  sheetId: 0,
                  startRowIndex: rowNumber - 1,
                  endRowIndex: rowNumber,
                  startColumnIndex: novMYFIndex,
                  endColumnIndex: novMYFIndex + 1,
                },
                pasteType: 'PASTE_DATA_VALIDATION',
              },
            },
          ],
        },
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `MYF attendees!${targetColumn}${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[status]],
        },
      });

    } else {
      // Case 2: Number doesn't exist, append new row
      const nameColumn = getColumnLetter(nameIndex);
      const contactColumn = getColumnLetter(contactIndex);
      const locationColumn = getColumnLetter(locationIndex);

      // Append the new registration data to specific columns
      const appendResponse = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: {
          valueInputOption: 'USER_ENTERED',
          data: [
            {
              range: `MYF attendees!${nameColumn}${rows.length + 1}`,
              values: [[formattedName]]
            },
            {
              range: `MYF attendees!${contactColumn}${rows.length + 1}`,
              values: [[contactNumbers]]
            },
            {
              range: `MYF attendees!${locationColumn}${rows.length + 1}`,
              values: [[schoolOrganization]]
            }
          ]
        }
      });

      // Copy data validation and set "Registered" for the new row
      const rowNumber = rows.length + 1;
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: {
          requests: [
            {
              copyPaste: {
                source: {
                  sheetId: 0,
                  startRowIndex: 1,
                  endRowIndex: 2,
                  startColumnIndex: novMYFIndex - 2,
                  endColumnIndex: novMYFIndex - 1,
                },
                destination: {
                  sheetId: 0,
                  startRowIndex: rowNumber - 1,
                  endRowIndex: rowNumber,
                  startColumnIndex: novMYFIndex,
                  endColumnIndex: novMYFIndex + 1,
                },
                pasteType: 'PASTE_DATA_VALIDATION',
              },
            },
          ],
        },
      });

      const targetColumn = getColumnLetter(novMYFIndex);
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `MYF attendees!${targetColumn}${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[status]],
        },
      });
    }

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting registration:', error);
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
