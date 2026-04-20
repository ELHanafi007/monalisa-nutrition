import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getProducts } from '@/lib/server-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('API /api/products GET error:', error);
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
    const {
      id, name, slug, brand, price, old_price, category,
      image, images, description, benefits, specs, is_rupture
    } = body;

    const [result] = await pool.query(
      `INSERT INTO products (id, name, slug, brand, price, old_price, category, image, images, description, benefits, specs, is_rupture)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       name=VALUES(name), slug=VALUES(slug), brand=VALUES(brand), price=VALUES(price), 
       old_price=VALUES(old_price), category=VALUES(category), image=VALUES(image), 
       images=VALUES(images), description=VALUES(description), benefits=VALUES(benefits), 
       specs=VALUES(specs), is_rupture=VALUES(is_rupture)`,
      [
        id, name, slug, brand, price, old_price ?? null, category, image,
        JSON.stringify(images ?? []),
        description,
        JSON.stringify(benefits ?? []),
        JSON.stringify(specs ?? []),
        is_rupture ? 1 : 0
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API /api/products POST error:', error);
    return NextResponse.json({ 
      error: 'Database error', 
      message: error.message,
      code: error.code 
    }, { status: 500 });
  }
}
