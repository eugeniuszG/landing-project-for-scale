import { NextResponse } from 'next/server';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';

// Simple math captcha questions
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const answer = num1 + num2;
  
  return {
    question: `Ile to ${num1} + ${num2}?`,
    answer: answer.toString(),
  };
}

function createToken(answer: string): string {
  const payload = {
    answer,
    exp: Date.now() + 5 * 60 * 1000, // 5 minutes
  };
  const data = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', JWT_SECRET);
  hmac.update(data);
  const signature = hmac.digest('hex');
  return Buffer.from(data).toString('base64') + '.' + signature;
}

export async function GET() {
  const captcha = generateCaptcha();
  const token = createToken(captcha.answer);
  
  return NextResponse.json({
    question: captcha.question,
    token,
  });
}
