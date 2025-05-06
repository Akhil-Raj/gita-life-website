import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: `"Event Registration" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL, // The email address where you want to receive the registrations
      subject: 'New Event Registration',
      text: message,
      html: message.replace(/\n/g, '<br>')
    });

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
