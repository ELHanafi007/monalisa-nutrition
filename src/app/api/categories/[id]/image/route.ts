import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { resolveImageResponse } from '@/lib/inline-image-response';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const [rows]: any = await pool.query('SELECT image FROM categories WHERE id = ?', [id]);
    if (!rows?.length) {
      return new NextResponse('Not found', { status: 404 });
    }

    const src: string | null = rows[0].image;
    if (!src) {
      return new NextResponse('Not found', { status: 404 });
    }

    return resolveImageResponse(src);
  } catch (error) {
    console.error('API /api/categories/[id]/image GET error:', error);
    return new NextResponse('Database error', { status: 500 });
  }
}
