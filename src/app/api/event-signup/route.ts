import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const event = typeof body?.event === 'string' ? body.event.trim() : '';
    const note = typeof body?.note === 'string' ? body.note.trim() : '';

    if (!name || !email || !event) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    // Dev-friendly fallback: allow local testing without an email provider.
    if (!resendApiKey) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log('DEV EMAIL (Event Signup):', { name, email, event, note });
        return NextResponse.json({ ok: true, dev: true });
      }
      return NextResponse.json({ error: 'Email provider not configured' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);
    const toEmail = process.env.NOTIFY_TO_EMAIL || 'artunityyouth@gmail.com';
    const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';

    const subject = `New Event Signup — ${event}`;
    const textContent = [
      `Event: ${event}`,
      `Name: ${name}`,
      `Email: ${email}`,
      note ? `Note: ${note}` : undefined,
    ]
      .filter(Boolean)
      .join('\n');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1A1108; line-height: 1.6;">
        <h2 style="margin: 0 0 12px; color: #D94F2B;">New Event Signup</h2>
        <p><strong>Event:</strong> ${event}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${note ? `<p><strong>Note:</strong><br/>${note.replace(/\n/g, '<br/>')}</p>` : ''}
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Resend event-signup error:', error);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to process sign-up' }, { status: 500 });
  }
}
