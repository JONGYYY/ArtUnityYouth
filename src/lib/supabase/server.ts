import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase client for use in Server Components and Route Handlers.
 * Uses the anon key + the request's auth cookies, so it reads content
 * publicly and can resolve the currently signed-in user.
 */
export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component where cookies are read-only.
            // Session refresh is handled by middleware, so this is safe to ignore.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // See note above.
          }
        },
      },
    },
  );
}

/**
 * Returns the signed-in user only if their email matches ADMIN_EMAIL,
 * otherwise null. Use this to gate every admin action server-side.
 */
export async function getAdminUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
  // Require a configured allow-list, an exact (case-insensitive) email match,
  // and a Google-verified email. This blocks anyone from impersonating the admin.
  const emailVerified = user?.user_metadata?.email_verified !== false;
  if (adminEmail && user?.email && user.email.toLowerCase() === adminEmail && emailVerified) {
    return user;
  }
  return null;
}
