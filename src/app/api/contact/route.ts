import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Email provider not configured' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);
    const toEmail = process.env.NOTIFY_TO_EMAIL || 'artunityyouth@gmail.com';
    const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';

    const subject = 'New Contact Message — ArtUnity Youth';
    const textContent = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Message: ${message}`,
    ].join('\n');

    const htmlContent = `
      <div style="font-family: Poppins, Arial, sans-serif; color: #2C3E50; line-height: 1.6;">
        <h2 style="margin: 0 0 12px; color: #4ECDC4;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}


