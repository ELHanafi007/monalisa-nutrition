// ─── SERVER-ONLY ─────────────────────────────────────────────────────────────
// This file must NEVER be imported by client components.
// Use /api/products or /api/categories routes from client code.

import { supabase } from '@/lib/supabase';
import type { Product } from '@/data/products';
import type { Category } from '@/data/categories';

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((p: any) => ({
      ...p,
      id: p.id.toString(),
      oldPrice: p.old_price ?? undefined,
      isRupture: Boolean(p.is_rupture),
      benefits: typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []),
      specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []),
      images: typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []),
    }));
  } catch (e) {
    console.error('Supabase: Failed to load products:', e);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []).map((c: any) => ({
      ...c,
      id: c.id.toString(),
    }));
  } catch (e) {
    console.error('Supabase: Failed to load categories:', e);
    return [];
  }
}
