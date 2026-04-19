import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    ) as any[];

    const orders = (rows as any[]).map((o) => ({
      ...o,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : (o.items ?? []),
    }));

    return NextResponse.json(orders);
  } catch (error) {
    console.error('API /api/orders GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_name, customer_phone, customer_address, items, total_amount } = body;

    const [result] = await pool.query(
      `INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_amount, status)
       VALUES (?, ?, ?, ?, ?, 'en_attente')`,
      [
        customer_name,
        customer_phone,
        customer_address,
        JSON.stringify(items),
        total_amount,
      ]
    ) as any[];

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('API /api/orders POST error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
