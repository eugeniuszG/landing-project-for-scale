import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

function verifyToken(token: string, userAnswer: string): boolean {
  try {
    const [dataBase64, signature] = token.split('.');
    const data = Buffer.from(dataBase64, 'base64').toString('utf-8');
    
    // Verify signature
    const hmac = crypto.createHmac('sha256', JWT_SECRET);
    hmac.update(data);
    const expectedSignature = hmac.digest('hex');
    
    if (signature !== expectedSignature) {
      return false;
    }
    
    const payload = JSON.parse(data);
    
    // Check expiration
    if (Date.now() > payload.exp) {
      return false;
    }
    
    // Check answer
    return payload.answer === userAnswer.trim();
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, message, userAnswer, captchaToken } = body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      return NextResponse.json(
        { success: false, message: 'Wszystkie pola są wymagane.' },
        { status: 400 }
      );
    }
    
    // Verify captcha
    if (!verifyToken(captchaToken, userAnswer)) {
      return NextResponse.json(
        { success: false, message: 'Nieprawidłowa odpowiedź na pytanie.', error: 'Invalid captcha' },
        { status: 400 }
      );
    }
    
    // Check if email credentials are configured
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.warn('[contact] Email not configured - logging form submission instead');
      console.log('[contact] Form submission:', { firstName, lastName, email, phoneNumber, message });
      
      return NextResponse.json({
        success: true,
        message: 'Dziękujemy za wiadomość! Skontaktujemy się wkrótce.',
      });
    }
    
    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      replyTo: email,
      subject: `Nowa wiadomość od ${firstName} ${lastName}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię:</strong> ${firstName}</p>
        <p><strong>Nazwisko:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phoneNumber}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    return NextResponse.json({
      success: true,
      message: 'Dziękujemy za wiadomość! Skontaktujemy się wkrótce.',
    });
  } catch (error) {
    console.error('[contact] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Wystąpił błąd. Proszę spróbować ponownie później.', error: { code: 'SERVER_ERROR' } },
      { status: 500 }
    );
  }
}
