import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE id = ?', [id]
    ) as any[];

    if (!(rows as any[]).length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const p = (rows as any[])[0];
    return NextResponse.json({
      ...p,
      id: p.id.toString(),
      oldPrice: p.old_price ?? undefined,
      isRupture: Boolean(p.is_rupture),
      benefits: typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []),
      specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []),
      images: typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []),
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
