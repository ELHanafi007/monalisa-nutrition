import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCategories } from '@/lib/server-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const full = searchParams.get('full') === '1';
    const categories = await getCategories(full);
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('API /api/categories GET error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, slug, description, image } = body;

    const [result] = await pool.query(
      `INSERT INTO categories (id, name, slug, description, image)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       name=VALUES(name), slug=VALUES(slug), description=VALUES(description), image=VALUES(image)`,
      [id, name, slug, description, image]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API /api/categories POST error:', error);
    return NextResponse.json({ error: 'Database error', message: error.message }, { status: 500 });
  }
}
