import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE id = ?', [id]
    ) as any[];

    if (!(rows as any[]).length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const p = (rows as any[])[0];
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

    return NextResponse.json({
      ...p,
      id: p.id.toString(),
      oldPrice: p.old_price ?? undefined,
      isRupture: Boolean(p.is_rupture),
      benefits: Array.isArray(benefits) ? benefits : [],
      specs: Array.isArray(specs) ? specs : [],
      images: Array.isArray(images) ? images : [],
    });
  } catch (error) {
    console.error('API /api/products/[id] GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name, slug, brand, price, old_price, category,
      image, images, description, benefits, specs, is_rupture
    } = body;

    await pool.query(
      `UPDATE products SET
        name=?, slug=?, brand=?, price=?, old_price=?, category=?,
        image=?, images=?, description=?, benefits=?, specs=?, is_rupture=?
       WHERE id=?`,
      [
        name, slug, brand, price, old_price ?? null, category,
        image,
        JSON.stringify(images ?? []),
        description,
        JSON.stringify(benefits ?? []),
        JSON.stringify(specs ?? []),
        is_rupture ? 1 : 0,
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/products/[id] PUT error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/products/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const fields = Object.keys(body);
    const values = Object.values(body);

    if (fields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const setClause = fields.map(f => `${f}=?`).join(', ');
    await pool.query(`UPDATE products SET ${setClause} WHERE id=?`, [...values, id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/products/[id] PATCH error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
