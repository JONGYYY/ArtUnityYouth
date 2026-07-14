import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
      const emailVerified = user?.user_metadata?.email_verified !== false;
      const isAdmin =
        Boolean(adminEmail) &&
        Boolean(user?.email) &&
        user!.email!.toLowerCase() === adminEmail &&
        emailVerified;

      if (isAdmin) {
        return NextResponse.redirect(`${origin}/admin`);
      }
      // Signed in with an unauthorized account: sign back out and show a notice.
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/login?denied=1`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=1`);
}
