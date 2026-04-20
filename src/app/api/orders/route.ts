import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query('SELECT * FROM orders ORDER BY id DESC');

    const orders = (rows || []).map((o: any) => ({
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

    const [result]: any = await pool.query(
      `INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_amount, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customer_name,
        customer_phone,
        customer_address,
        JSON.stringify(items ?? []),
        total_amount,
        'en_attente'
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    console.error('API /api/orders POST error:', error);
    return NextResponse.json({ error: 'Database error', message: error.message }, { status: 500 });
  }
}
