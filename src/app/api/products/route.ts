import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    ) as any[];

    const products = (rows as any[]).map((p) => {
      let benefits = [];
      let specs = [];
      let images = [];
      
      try { benefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []); } catch (e) {}
      try { specs = typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []); } catch (e) {}
      try { images = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []); } catch (e) {}

      // Handle double stringified JSON from MySQL
      if (typeof benefits === 'string') { try { benefits = JSON.parse(benefits); } catch (e) { benefits = []; } }
      if (typeof specs === 'string') { try { specs = JSON.parse(specs); } catch (e) { specs = []; } }
      if (typeof images === 'string') { try { images = JSON.parse(images); } catch (e) { images = []; } }

      return {
        ...p,
        id: p.id.toString(),
        oldPrice: p.old_price ?? undefined,
        isRupture: Boolean(p.is_rupture),
        benefits: Array.isArray(benefits) ? benefits : [],
        specs: Array.isArray(specs) ? specs : [],
        images: Array.isArray(images) ? images : [],
      };
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('API /api/products GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id, name, slug, brand, price, old_price, category,
      image, images, description, benefits, specs, is_rupture
    } = body;

    await pool.query(
      `INSERT INTO products 
        (id, name, slug, brand, price, old_price, category, image, images, description, benefits, specs, is_rupture)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        name=VALUES(name), slug=VALUES(slug), brand=VALUES(brand),
        price=VALUES(price), old_price=VALUES(old_price), category=VALUES(category),
        image=VALUES(image), images=VALUES(images), description=VALUES(description),
        benefits=VALUES(benefits), specs=VALUES(specs), is_rupture=VALUES(is_rupture)`,
      [
        id, name, slug, brand, price, old_price ?? null,
        category, image,
        JSON.stringify(images ?? []),
        description,
        JSON.stringify(benefits ?? []),
        JSON.stringify(specs ?? []),
        is_rupture ? 1 : 0
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/products POST error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
