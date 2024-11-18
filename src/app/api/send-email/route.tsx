import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: 'jozo20020410@gmail.com',
      subject: `Message from ${email}`,
      text: message,
      html: `
        <div style="font-family: sans-serif; font-size: 16px;">
          <h1>New message from your portfolio</h1>
          <p>From: ${email}</p>
          <p>Message:</p>
          <p>${message}</p>
        </div>
      `,
    };

    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (err: any) {
    console.error('Detailed error:', err);
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: err?.message || 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}