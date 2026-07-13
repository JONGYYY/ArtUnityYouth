import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminUser } from '../../../../lib/supabase/server';
import { getServiceClient } from '../../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

function revalidate() {
  revalidatePath('/events/friday-sessions');
}

async function guard() {
  const user = await getAdminUser();
  if (!user) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  const supabase = getServiceClient();
  if (!supabase) return { error: NextResponse.json({ error: 'Server not configured' }, { status: 500 }) };
  return { supabase };
}

function arr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

export async function POST(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json();
  const label = (body?.label || '').trim();
  if (!label) return NextResponse.json({ error: 'A date/label is required' }, { status: 400 });

  const row = {
    label,
    note: body?.note ?? '',
    card_photos: arr(body?.cardPhotos),
    candid_photos: arr(body?.candidPhotos),
    group_photos: arr(body?.groupPhotos),
    sort_order: Number.isFinite(body?.sortOrder) ? body.sortOrder : 0,
  };

  const { data, error: dbError } = await supabase!.from('friday_sessions').insert(row).select().single();
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  revalidate();
  return NextResponse.json({ ok: true, session: data });
}

export async function PATCH(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json();
  const id = body?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (body.label !== undefined) patch.label = String(body.label).trim();
  if (body.note !== undefined) patch.note = body.note;
  if (body.cardPhotos !== undefined) patch.card_photos = arr(body.cardPhotos);
  if (body.candidPhotos !== undefined) patch.candid_photos = arr(body.candidPhotos);
  if (body.groupPhotos !== undefined) patch.group_photos = arr(body.groupPhotos);
  if (body.sortOrder !== undefined) patch.sort_order = body.sortOrder;

  const { data, error: dbError } = await supabase!.from('friday_sessions').update(patch).eq('id', id).select().single();
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  revalidate();
  return NextResponse.json({ ok: true, session: data });
}

export async function DELETE(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = body?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error: dbError } = await supabase!.from('friday_sessions').delete().eq('id', id);
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  revalidate();
  return NextResponse.json({ ok: true });
}
