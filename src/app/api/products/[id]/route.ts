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
    const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const p = rows[0];
    let benefits = [];
    let specs = [];
    let images = [];
    
    try { benefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []); } catch (e) {}
    try { specs = typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []); } catch (e) {}
    try { images = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []); } catch (e) {}

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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      name, slug, brand, price, old_price, category,
      image, images, description, benefits, specs, is_rupture
    } = body;

    await pool.query(
      `UPDATE products SET 
       name = ?, slug = ?, brand = ?, price = ?, old_price = ?, category = ?, 
       image = ?, images = ?, description = ?, benefits = ?, specs = ?, is_rupture = ?
       WHERE id = ?`,
      [
        name, slug, brand, price, old_price ?? null, category,
        image, JSON.stringify(images ?? []), description,
        JSON.stringify(benefits ?? []), JSON.stringify(specs ?? []),
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/products/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Dynamically build the update query
    const fields = Object.keys(body);
    if (fields.length === 0) return NextResponse.json({ success: true });

    const sets = fields.map(f => `\`${f}\` = ?`).join(', ');
    const values = fields.map(f => {
      const val = body[f];
      if (Array.isArray(val) || (val !== null && typeof val === 'object')) {
        return JSON.stringify(val);
      }
      return val;
    });
    values.push(id);

    await pool.query(`UPDATE products SET ${sets} WHERE id = ?`, values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/products/[id] PATCH error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
