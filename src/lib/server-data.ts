// ─── SERVER-ONLY ─────────────────────────────────────────────────────────────
// This file must NEVER be imported by client components.
// Use /api/products or /api/categories routes from client code.

import pool from '@/lib/db';
import type { Product } from '@/data/products';
import type { Category } from '@/data/categories';

export async function getProducts(): Promise<Product[]> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM products ORDER BY id DESC');

    return rows.map((p: any) => {
      let benefits = [];
      let specs = [];
      let images = [];
      
      try { benefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []); } catch (e) {}
      try { specs = typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []); } catch (e) {}
      try { images = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []); } catch (e) {}

      return {
        ...p,
        id: p.id.toString(),
        oldPrice: p.old_price ?? undefined,
        isRupture: Boolean(p.is_rupture),
        benefits: Array.isArray(benefits) ? benefits : [],
        specs: Array.isArray(specs) ? specs : [],
        images: Array.isArray(images) ? images : [],
      };
    });
  } catch (e) {
    console.error('MySQL: Failed to load products:', e);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM categories ORDER BY name ASC');

    return rows.map((c: any) => ({
      ...c,
      id: c.id.toString(),
    }));
  } catch (e) {
    console.error('MySQL: Failed to load categories:', e);
    return [];
  }
}
