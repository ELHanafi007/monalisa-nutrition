"use server";

import { createOrderAction } from '@/app/actions/db';

export async function createOrder(orderData: {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: any[];
  total_amount: number;
}) {
  return await createOrderAction(orderData);
}
