import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: rows, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const categories = (rows || []).map((c) => ({
      ...c,
      id: c.id.toString(),
    }));

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('API /api/categories GET error:', error);
    return NextResponse.json({ 
      error: 'Database error', 
      message: error.message,
      code: error.code 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, slug, description, image } = body;

    const { error } = await supabase
      .from('categories')
      .upsert({ id, name, slug, description, image });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/categories POST error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
