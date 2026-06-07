import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // Check if environment variables are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Missing email configuration. Please set GMAIL_USER and GMAIL_PASS environment variables.');
      // Log the message for debugging
      console.log('Contact form submission:', { name, email, subject, message });
      
      // Send a success response but with instructions for direct contact
      return NextResponse.json({ 
        success: true,
        message: 'Thank you for your message! Due to email service configuration, please also send your message directly to hama.guizeni842@gmail.com to ensure I receive it.',
        fallback: true
      });
    }

    // Configure transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration with timeout
    try {
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email verification timeout')), 10000)
        )
      ]);
    } catch (verifyError) {
      console.error('Email verification failed:', verifyError);
      return NextResponse.json({ 
        success: true,
        message: 'Thank you for your message! There was an issue with email delivery, so please also contact me directly at hama.guizeni842@gmail.com',
        fallback: true
      });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send message.';
    
    if (error instanceof Error) {
      if (error.message.includes('authentication') || error.message.includes('Invalid login')) {
        errorMessage = 'Email authentication failed. Please contact directly at hama.guizeni842@gmail.com';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please try again later or contact directly at hama.guizeni842@gmail.com';
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}