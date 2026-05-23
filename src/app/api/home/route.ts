import { NextResponse } from 'next/server';
import { getProducts, getCategories } from '@/lib/server-data';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const [products, categories] = await Promise.all([
      getProducts({ listing: true }),
      getCategories(),
    ]);
    return NextResponse.json(
      { products, categories },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('API /api/home GET error:', error);
    return NextResponse.json({ products: [], categories: [] }, { status: 200 });
  }
}
