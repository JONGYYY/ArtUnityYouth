import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminUser } from '../../../../lib/supabase/server';
import { getServiceClient } from '../../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });

  const body = await request.json();
  const patch: Record<string, unknown> = { id: 1 };
  if (body.day !== undefined) patch.day = body.day;
  if (body.time !== undefined) patch.time = body.time;
  if (body.location !== undefined) patch.location = body.location;
  if (body.address !== undefined) patch.address = body.address;
  if (body.mapUrl !== undefined) patch.map_url = body.mapUrl;

  const { data, error } = await supabase.from('session_info').upsert(patch).eq('id', 1).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  revalidatePath('/events/friday-sessions');
  return NextResponse.json({ ok: true, info: data });
}
