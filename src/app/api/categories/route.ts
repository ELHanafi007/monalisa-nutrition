import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM categories ORDER BY created_at ASC'
    ) as any[];

    const categories = (rows as any[]).map((c) => ({
      ...c,
      id: c.id.toString(),
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('API /api/categories GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, slug, description, image } = body;

    await pool.query(
      `INSERT INTO categories (id, name, slug, description, image)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        name=VALUES(name), slug=VALUES(slug),
        description=VALUES(description), image=VALUES(image)`,
      [id, name, slug, description, image]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/categories POST error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
