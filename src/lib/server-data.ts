// ─── SERVER-ONLY ─────────────────────────────────────────────────────────────
// This file must NEVER be imported by client components.
// Use /api/products or /api/categories routes from client code.

import pool from '@/lib/db';
import type { Product } from '@/data/products';
import type { Category } from '@/data/categories';
import { productImageUrl, categoryImageUrl } from '@/lib/images';

type SanitizeOptions = {
  /** Omit heavy fields used only on product detail / admin */
  listing?: boolean;
  /** Keep raw base64 in image fields (admin only) */
  rawImages?: boolean;
  /** Max rows returned (listing/homepage) */
  limit?: number;
};

/** SQL fragment: short local paths only, skip heavy inline base64 blobs */
const SHORT_IMAGE_SQL = `CASE
  WHEN image IS NULL OR image = '' THEN NULL
  WHEN CHAR_LENGTH(image) > 500 OR image LIKE 'data:%' THEN NULL
  ELSE image
END AS image`;

export function sanitizeProduct(p: Product, options: SanitizeOptions = {}): Product {
  const { listing = false, rawImages = false } = options;

  const image = rawImages ? p.image : productImageUrl(p.id, p.image);
  const images = rawImages
    ? p.images
    : (p.images ?? []).map((src, i) => productImageUrl(p.id, src, i));

  if (listing) {
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand,
      price: p.price,
      oldPrice: p.oldPrice,
      category: p.category,
      image,
      description: '',
      benefits: [],
      specs: [],
      isRupture: p.isRupture,
    };
  }

  return {
    ...p,
    image,
    images,
  };
}

export function sanitizeCategory(c: Category, rawImages = false): Category {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    image: rawImages ? c.image : categoryImageUrl(c.id, c.image),
  };
}

function mapProductRow(p: any, includeHeavyFields: boolean): Product {
  let benefits: Product['benefits'] = [];
  let specs: Product['specs'] = [];
  let images: string[] = [];

  if (includeHeavyFields) {
    try { benefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []); } catch (e) {}
    try { specs = typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []); } catch (e) {}
    try { images = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []); } catch (e) {}
  }

  return {
    id: p.id.toString(),
    name: p.name || 'Sans nom',
    slug: p.slug || 'sans-slug',
    brand: p.brand || 'Monaliza',
    price: Number(p.price) || 0,
    oldPrice: p.old_price ? Number(p.old_price) : undefined,
    image: includeHeavyFields
      ? (p.image || '/images/placeholder.jpg')
      : (p.image || productImageUrl(p.id.toString(), null)),
    category: p.category || 'vitamines',
    description: includeHeavyFields ? (p.description || '') : '',
    isRupture: Boolean(p.is_rupture),
    benefits: Array.isArray(benefits) ? benefits : [],
    specs: Array.isArray(specs) ? specs : [],
    images: Array.isArray(images) ? images : [],
  };
}

export async function getProducts(options: SanitizeOptions = {}): Promise<Product[]> {
  try {
    const { listing = false, rawImages = false, limit } = options;
    const includeHeavyFields = !listing || rawImages;

    const limitClause = limit ? ` LIMIT ${Math.max(1, Math.min(limit, 200))}` : '';

    const query = includeHeavyFields
      ? `SELECT * FROM products ORDER BY id DESC${limitClause}`
      : `SELECT id, name, slug, brand, price, old_price, category, is_rupture, ${SHORT_IMAGE_SQL}
         FROM products ORDER BY id DESC${limitClause}`;

    const [rows]: any = await pool.query(query);

    return rows.map((p: any) => {
      const product = mapProductRow(p, includeHeavyFields);
      return sanitizeProduct(product, options);
    });
  } catch (e) {
    console.error('MySQL: Failed to load products:', e);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
  options: SanitizeOptions = {}
): Promise<Product | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM products WHERE slug = ? LIMIT 1', [slug]);
    if (!rows?.length) return null;

    const p = rows[0];
    let benefits = [];
    let specs = [];
    let images = [];

    try { benefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []); } catch (e) {}
    try { specs = typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []); } catch (e) {}
    try { images = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []); } catch (e) {}

    const product = mapProductRow(p, true);
    product.benefits = Array.isArray(benefits) ? benefits : [];
    product.specs = Array.isArray(specs) ? specs : [];
    product.images = Array.isArray(images) ? images : [];

    return sanitizeProduct(product, options);
  } catch (e) {
    console.error('MySQL: Failed to load product by slug:', e);
    return null;
  }
}

export async function getCategories(rawImages = false): Promise<Category[]> {
  try {
    const query = rawImages
      ? 'SELECT * FROM categories ORDER BY name ASC'
      : `SELECT id, name, slug, description, ${SHORT_IMAGE_SQL}
         FROM categories ORDER BY name ASC`;

    const [rows]: any = await pool.query(query);

    return rows.map((c: any) =>
      sanitizeCategory({
        id: c.id.toString(),
        name: c.name || 'Sans catégorie',
        slug: c.slug || 'sans-slug',
        image: rawImages ? (c.image || '/images/placeholder-cat.jpg') : (c.image || ''),
        description: c.description || '',
      }, rawImages)
    );
  } catch (e) {
    console.error('MySQL: Failed to load categories:', e);
    return [];
  }
}
