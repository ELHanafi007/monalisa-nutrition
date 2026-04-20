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
      .insert({
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        items: orderData.items,
        total_amount: orderData.total_amount,
        status: 'en_attente'
      })
      .select('id')
      .single();

    if (error) throw error;

    return { success: true, data: { id: data?.id } };
  } catch (error) {
    console.error('Supabase Order Error:', error);
    return { success: false, error };
  }
}
