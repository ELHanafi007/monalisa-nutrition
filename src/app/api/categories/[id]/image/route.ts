import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { inlineImageResponse } from '@/lib/inline-image-response';
import { isInlineImage } from '@/lib/images';

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

    if (isInlineImage(src)) {
      return inlineImageResponse(src);
    }

    return NextResponse.redirect(src, 302);
  } catch (error) {
    console.error('API /api/categories/[id]/image GET error:', error);
    return new NextResponse('Database error', { status: 500 });
  }
}
