import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://evwrcjstgonhrcqlnbpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d3JjanN0Z29uaHJjcWxuYnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzU1ODMsImV4cCI6MjA5MTg1MTU4M30.zCk3HTDQEXJ-okxU76eFG3LswQ1avs_mbZTZDb4T1-c';

const supabase = createClient(supabaseUrl, supabaseKey);

async function rollback() {
  console.log('--- Rolling back scraped products ---');
  
  // 1. Delete all products where ID starts with 'scraped-'
  const { data, error, count } = await supabase
    .from('products')
    .delete({ count: 'exact' })
    .like('id', 'scraped-%');

  if (error) {
    console.error('Rollback failed:', error.message);
  } else {
    console.log(`Successfully deleted ${count} scraped products from Supabase.`);
  }
}

rollback();
