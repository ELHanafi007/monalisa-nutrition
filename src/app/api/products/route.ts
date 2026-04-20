import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const { data: rows, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const products = (rows || []).map((p) => {
      let benefits = [];
      let specs = [];
      let images = [];
      
      try { benefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits ?? []); } catch (e) {}
      try { specs = typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs ?? []); } catch (e) {}
      try { images = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []); } catch (e) {}

      if (typeof benefits === 'string') { try { benefits = JSON.parse(benefits); } catch (e) { benefits = []; } }
      if (typeof specs === 'string') { try { specs = JSON.parse(specs); } catch (e) { specs = []; } }
      if (typeof images === 'string') { try { images = JSON.parse(images); } catch (e) { images = []; } }

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

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('API /api/products GET error:', error);
    return NextResponse.json({ 
      error: 'Database error', 
      message: error.message,
      code: error.code 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id, name, slug, brand, price, old_price, category,
      image, images, description, benefits, specs, is_rupture
    } = body;

    const { error } = await supabase
      .from('products')
      .upsert({
        id, name, slug, brand, price, old_price: old_price ?? null, category, image,
        images: images ?? [],
        description,
        benefits: benefits ?? [],
        specs: specs ?? [],
        is_rupture: is_rupture ? true : false
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API /api/products POST error:', error);
    return NextResponse.json({ 
      error: 'Database error', 
      message: error.message,
      code: error.code 
    }, { status: 500 });
  }
}
