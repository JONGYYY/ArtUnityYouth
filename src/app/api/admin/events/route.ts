import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminUser } from '../../../../lib/supabase/server';
import { getServiceClient } from '../../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function revalidate() {
  revalidatePath('/events');
  revalidatePath('/');
}

async function guard() {
  const user = await getAdminUser();
  if (!user) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  const supabase = getServiceClient();
  if (!supabase) return { error: NextResponse.json({ error: 'Server not configured' }, { status: 500 }) };
  return { supabase };
}

export async function POST(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json();
  const title = (body?.title || '').trim();
  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  const slug = (body?.slug ? slugify(body.slug) : slugify(title)) || `event-${Date.now()}`;

  const row = {
    slug,
    title,
    date: body?.date ?? '',
    location: body?.location ?? '',
    description: body?.description ?? '',
    category: body?.category === 'ongoing' ? 'ongoing' : 'key',
    cover_image: body?.coverImage ?? '',
    images: Array.isArray(body?.images) ? body.images : [],
    href: body?.href || null,
    sort_order: Number.isFinite(body?.sortOrder) ? body.sortOrder : 0,
  };

  const { data, error: dbError } = await supabase!.from('events').insert(row).select().single();
  if (dbError) {
    const msg = dbError.code === '23505' ? 'That slug is already used.' : dbError.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  revalidate();
  return NextResponse.json({ ok: true, event: data });
}

export async function PATCH(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json();
  const id = body?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (body.title !== undefined) patch.title = String(body.title).trim();
  if (body.slug !== undefined) patch.slug = slugify(body.slug);
  if (body.date !== undefined) patch.date = body.date;
  if (body.location !== undefined) patch.location = body.location;
  if (body.description !== undefined) patch.description = body.description;
  if (body.category !== undefined) patch.category = body.category === 'ongoing' ? 'ongoing' : 'key';
  if (body.coverImage !== undefined) patch.cover_image = body.coverImage;
  if (body.images !== undefined) patch.images = Array.isArray(body.images) ? body.images : [];
  if (body.href !== undefined) patch.href = body.href || null;
  if (body.sortOrder !== undefined) patch.sort_order = body.sortOrder;

  const { data, error: dbError } = await supabase!.from('events').update(patch).eq('id', id).select().single();
  if (dbError) {
    const msg = dbError.code === '23505' ? 'That slug is already used.' : dbError.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  revalidate();
  return NextResponse.json({ ok: true, event: data });
}

export async function DELETE(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = body?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error: dbError } = await supabase!.from('events').delete().eq('id', id);
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  revalidate();
  return NextResponse.json({ ok: true });
}
