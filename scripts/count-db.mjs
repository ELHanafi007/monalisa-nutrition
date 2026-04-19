import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evwrcjstgonhrcqlnbpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d3JjanN0Z29uaHJjcWxuYnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzU1ODMsImV4cCI6MjA5MTg1MTU4M30.zCk3HTDQEXJ-okxU76eFG3LswQ1avs_mbZTZDb4T1-c';

const supabase = createClient(supabaseUrl, supabaseKey);

async function count() {
  const { count: scrapedCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .like('id', 'scraped-%');

  const { count: dpCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .like('id', 'dp-%');

  const { count: totalCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  console.log(`Total: ${totalCount}`);
  console.log(`Scraped (scraped-*): ${scrapedCount}`);
  console.log(`DP (dp-*): ${dpCount}`);
}

count();
