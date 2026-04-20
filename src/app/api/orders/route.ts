import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: rows, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const orders = (rows || []).map((o) => ({
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

    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name,
        customer_phone,
        customer_address,
        items: items ?? [],
        total_amount,
        status: 'en_attente'
      })
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API /api/orders POST error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
