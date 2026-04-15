"use server";

import { supabase } from '@/lib/supabase';

export async function createOrder(orderData: {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: any[];
  total_amount: number;
}) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: orderData.customer_name,
          customer_phone: orderData.customer_phone,
          customer_address: orderData.customer_address,
          items: orderData.items,
          total_amount: orderData.total_amount,
          status: 'en_attente'
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Database Order Error:', error);
    return { success: false, error };
  }
}
