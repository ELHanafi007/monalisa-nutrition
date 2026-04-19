import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    await pool.query('UPDATE orders SET status=? WHERE id=?', [status, id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/orders/[id] PATCH error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM orders WHERE id=?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/orders/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
