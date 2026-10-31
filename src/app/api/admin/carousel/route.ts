import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminUser } from '../../../../lib/supabase/server';
import { getServiceClient } from '../../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

function revalidate() {
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/admin/carousel');
}

async function guard() {
  const user = await getAdminUser();
  if (!user) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  const supabase = getServiceClient();
  if (!supabase) return { error: NextResponse.json({ error: 'Server not configured' }, { status: 500 }) };
  return { supabase };
}

// Add one or more slides (already uploaded via /api/admin/upload) to the end of the carousel.
export async function POST(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json();
  const items: { imageUrl?: unknown; caption?: unknown }[] = Array.isArray(body?.slides) ? body.slides : [];
  const valid = items.filter((s) => typeof s?.imageUrl === 'string' && s.imageUrl.trim());
  if (valid.length === 0) return NextResponse.json({ error: 'No photos provided' }, { status: 400 });

  const { data: last } = await supabase!
    .from('carousel_slides')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle();
  const start = (last?.sort_order ?? -1) + 1;

  const rows = valid.map((s, i) => ({
    image_url: String(s.imageUrl).trim(),
    caption: typeof s.caption === 'string' ? s.caption.trim() : '',
    sort_order: start + i,
  }));

  const { data, error: dbError } = await supabase!.from('carousel_slides').insert(rows).select();
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  revalidate();
  return NextResponse.json({ ok: true, slides: data });
}

// Update a caption, or reorder all slides when `order` (array of ids) is sent.
export async function PATCH(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json();

  if (Array.isArray(body?.order)) {
    const ids = body.order.filter((id: unknown): id is string => typeof id === 'string');
    const results = await Promise.all(
      ids.map((id: string, i: number) =>
        supabase!.from('carousel_slides').update({ sort_order: i }).eq('id', id),
      ),
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) return NextResponse.json({ error: failed.error.message }, { status: 400 });
    revalidate();
    return NextResponse.json({ ok: true });
  }

  const id = body?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (body.caption !== undefined) patch.caption = String(body.caption).trim();
  if (Object.keys(patch).length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

  const { data, error: dbError } = await supabase!
    .from('carousel_slides')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  revalidate();
  return NextResponse.json({ ok: true, slide: data });
}

export async function DELETE(request: Request) {
  const { supabase, error } = await guard();
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const id = body?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error: dbError } = await supabase!.from('carousel_slides').delete().eq('id', id);
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  revalidate();
  return NextResponse.json({ ok: true });
}
