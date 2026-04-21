"use server";

import pool from '@/lib/db';

export async function createOrder(orderData: {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: any[];
  total_amount: number;
}) {
  try {
    const [result]: any = await pool.query(
      `INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_amount, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        orderData.customer_name,
        orderData.customer_phone,
        orderData.customer_address,
        JSON.stringify(orderData.items),
        orderData.total_amount,
        'en_attente'
      ]
    );

    return { success: true, data: { id: result.insertId } };
  } catch (error: any) {
    console.error('MySQL Order Error:', error);
    return { success: false, error: error.message || 'Database connection failed' };
  }
}
