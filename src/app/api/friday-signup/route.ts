import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getServiceClient } from '../../../lib/supabase/admin';
import { getUpcomingFriday, toISODate } from '../../../lib/friday';

export const dynamic = 'force-dynamic';

const TABLE = 'friday_signups';

// In-memory fallback counts (dev only), keyed by session date so they reset weekly.
const devCounts: Record<string, number> = {};

function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

async function sendNotification(name: string, email: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('DEV EMAIL (Friday Signup):', { name, email });
    }
    return;
  }

  const resend = new Resend(resendApiKey);
  const toEmail = process.env.NOTIFY_TO_EMAIL || 'artunityyouth@gmail.com';
  const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #1A1108; line-height: 1.6;">
      <h2 style="margin: 0 0 12px; color: #D94F2B;">New Friday Session RSVP</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    </div>
  `;

  await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: 'New Friday Session RSVP — ArtUnity Youth',
    text: `Name: ${name}\nEmail: ${email}`,
    html: htmlContent,
  });
}

export async function GET() {
  const sessionDate = toISODate(getUpcomingFriday());
  const supabase = getServiceClient();

  if (!supabase) {
    return NextResponse.json({ count: devCounts[sessionDate] ?? 0, sessionDate, dev: true });
  }

  const { count, error } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('session_date', sessionDate);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Supabase count error:', error.message);
    return NextResponse.json({ count: 0, sessionDate });
  }

  return NextResponse.json({ count: count ?? 0, sessionDate });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const sessionDate = toISODate(getUpcomingFriday());
    const supabase = getServiceClient();

    // Dev fallback: no Supabase configured.
    if (!supabase) {
      devCounts[sessionDate] = (devCounts[sessionDate] ?? 0) + 1;
      await sendNotification(name, email);
      return NextResponse.json({ ok: true, dev: true, count: devCounts[sessionDate], sessionDate });
    }

    const { error: insertError } = await supabase
      .from(TABLE)
      .insert({ name, email, session_date: sessionDate });

    // 23505 = unique_violation (already signed up for this Friday). Treat as success.
    const alreadySignedUp = insertError?.code === '23505';
    if (insertError && !alreadySignedUp) {
      // eslint-disable-next-line no-console
      console.error('Supabase insert error:', insertError.message);
      return NextResponse.json({ error: 'Could not save your sign-up' }, { status: 500 });
    }

    if (!alreadySignedUp) {
      try {
        await sendNotification(name, email);
      } catch (mailErr) {
        // eslint-disable-next-line no-console
        console.error('Friday signup email error:', mailErr);
      }
    }

    const { count } = await supabase
      .from(TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('session_date', sessionDate);

    return NextResponse.json({
      ok: true,
      alreadySignedUp,
      count: count ?? 0,
      sessionDate,
    });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to process sign-up' }, { status: 500 });
  }
}
