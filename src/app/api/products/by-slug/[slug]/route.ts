import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/server-data';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('API /api/products/by-slug/[slug] GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
