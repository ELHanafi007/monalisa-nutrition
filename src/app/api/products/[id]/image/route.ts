import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { inlineImageResponse } from '@/lib/inline-image-response';
import { isInlineImage } from '@/lib/images';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const iParam = new URL(request.url).searchParams.get('i');

    const [rows]: any = await pool.query(
      iParam !== null
        ? 'SELECT images FROM products WHERE id = ?'
        : 'SELECT image FROM products WHERE id = ?',
      [id]
    );
    if (!rows?.length) {
      return new NextResponse('Not found', { status: 404 });
    }

    const row = rows[0];
    let src: string | null = null;

    if (iParam !== null) {
      const index = Number(iParam);
      let gallery: string[] = [];
      try {
        gallery =
          typeof row.images === 'string'
            ? JSON.parse(row.images)
            : (row.images ?? []);
      } catch {
        gallery = [];
      }
      src = gallery[index] ?? null;
    } else {
      src = row.image ?? null;
    }

    if (!src) {
      return new NextResponse('Not found', { status: 404 });
    }

    if (isInlineImage(src)) {
      return inlineImageResponse(src);
    }

    return NextResponse.redirect(src, 302);
  } catch (error) {
    console.error('API /api/products/[id]/image GET error:', error);
    return new NextResponse('Database error', { status: 500 });
  }
}
