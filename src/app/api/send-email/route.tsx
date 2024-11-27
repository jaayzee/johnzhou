import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

interface EmailData {
  email: string;
  message: string;
}

interface EmailError {
  message?: string;
  stack?: string;
  code?: string;
  response?: string;
}

export async function POST(request: Request) {
  try {
    const { email, message }: EmailData = await request.json();

    // Validate environment variables
    const myEmail = process.env.MY_EMAIL;
    const myPassword = process.env.MY_PASSWORD;

    if (!myEmail || !myPassword) {
      throw new Error('Missing email configuration');
    }

    const transport = nodemailer.createTransport({
      service: 'gmail', // Using 'service' instead of 'host'
      auth: {
        user: myEmail,
        pass: myPassword,
      },
    });

    // Verify transport configuration
    await transport.verify();

    const mailOptions: Mail.Options = {
      from: myEmail,
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

    const info = await transport.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (err) {
    const error = err as EmailError;
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response,
    });

    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
