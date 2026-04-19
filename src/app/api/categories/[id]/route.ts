import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, image } = body;

    await pool.query(
      `UPDATE categories SET name=?, slug=?, description=?, image=? WHERE id=?`,
      [name, slug, description, image, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/categories/[id] PUT error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/categories/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
