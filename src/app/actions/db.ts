"use server";

import pool, { query } from '@/lib/mysql';
import { Product } from '@/data/products';
import { Category } from '@/data/categories';

// PRODUCTS
export async function getProductsAction(): Promise<Product[]> {
  try {
    const rows = await query<any[]>('SELECT * FROM products ORDER BY created_at DESC');
    return rows.map(p => ({
      ...p,
      id: p.id.toString(),
      oldPrice: p.old_price,
      isRupture: Boolean(p.is_rupture),
      isSynced: true,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
      benefits: typeof p.benefits === 'string' ? JSON.parse(p.benefits) : p.benefits,
      specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function upsertProductAction(product: any) {
  try {
    const { id, name, slug, brand, price, category, image, images, description, benefits, specs, old_price, is_rupture } = product;
    
    const sql = `
      INSERT INTO products (id, name, slug, brand, price, category, image, images, description, benefits, specs, old_price, is_rupture)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name), slug = VALUES(slug), brand = VALUES(brand), price = VALUES(price), 
      category = VALUES(category), image = VALUES(image), images = VALUES(images), 
      description = VALUES(description), benefits = VALUES(benefits), specs = VALUES(specs), 
      old_price = VALUES(old_price), is_rupture = VALUES(is_rupture)
    `;

    await query(sql, [
      id, name, slug, brand, price, category, image, 
      JSON.stringify(images || []), description, 
      JSON.stringify(benefits || []), JSON.stringify(specs || []), 
      old_price, is_rupture ? 1 : 0
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error upserting product:', error);
    return { success: false, error };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await query('DELETE FROM products WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
}

export async function toggleProductStockAction(id: string, isRupture: boolean) {
  try {
    await query('UPDATE products SET is_rupture = ? WHERE id = ?', [isRupture ? 1 : 0, id]);
    return { success: true };
  } catch (error) {
    console.error('Error toggling product stock:', error);
    return { success: false, error };
  }
}

// CATEGORIES
export async function getCategoriesAction(): Promise<Category[]> {
  try {
    const rows = await query<any[]>('SELECT * FROM categories ORDER BY created_at ASC');
    return rows.map(c => ({
      ...c,
      id: c.id.toString()
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function upsertCategoryAction(category: any) {
  try {
    const { id, name, slug, description, image } = category;
    const sql = `
      INSERT INTO categories (id, name, slug, description, image)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name), slug = VALUES(slug), description = VALUES(description), image = VALUES(image)
    `;
    await query(sql, [id, name, slug, description, image]);
    return { success: true };
  } catch (error) {
    console.error('Error upserting category:', error);
    return { success: false, error };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await query('DELETE FROM categories WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error };
  }
}

// ORDERS
export async function getOrdersAction() {
  try {
    const rows = await query<any[]>('SELECT * FROM orders ORDER BY created_at DESC');
    return rows.map(o => ({
      ...o,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function createOrderAction(orderData: any) {
  try {
    const { customer_name, customer_phone, customer_address, items, total_amount } = orderData;
    const sql = `
      INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.execute(sql, [
      customer_name, customer_phone, customer_address, 
      JSON.stringify(items), total_amount, 'en_attente'
    ]);
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error };
  }
}

export async function updateOrderStatusAction(id: number, status: string) {
  try {
    await query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error };
  }
}

export async function deleteOrderAction(id: number) {
  try {
    await query('DELETE FROM orders WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, error };
  }
}

export async function initializeDatabaseAction(products: any[], categories: any[]) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    for (const p of products) {
      const sql = `
        INSERT INTO products (id, name, slug, brand, price, category, image, images, description, benefits, specs, old_price, is_rupture)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        name = VALUES(name), slug = VALUES(slug), brand = VALUES(brand), price = VALUES(price), 
        category = VALUES(category), image = VALUES(image), images = VALUES(images), 
        description = VALUES(description), benefits = VALUES(benefits), specs = VALUES(specs), 
        old_price = VALUES(old_price), is_rupture = VALUES(is_rupture)
      `;
      await connection.execute(sql, [
        p.id, p.name, p.slug, p.brand, p.price, p.category, p.image, 
        JSON.stringify(p.images || []), p.description, 
        JSON.stringify(p.benefits || []), JSON.stringify(p.specs || []), 
        p.oldPrice || null, p.isRupture ? 1 : 0
      ]);
    }

    for (const c of categories) {
      const sql = `
        INSERT INTO categories (id, name, slug, description, image)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        name = VALUES(name), slug = VALUES(slug), description = VALUES(description), image = VALUES(image)
      `;
      await connection.execute(sql, [c.id, c.name, c.slug, c.description, c.image]);
    }

    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error('Error initializing database:', error);
    return { success: false, error };
  } finally {
    connection.release();
  }
}
