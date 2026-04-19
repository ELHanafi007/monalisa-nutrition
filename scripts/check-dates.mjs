import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evwrcjstgonhrcqlnbpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d3JjanN0Z29uaHJjcWxuYnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzU1ODMsImV4cCI6MjA5MTg1MTU4M30.zCk3HTDQEXJ-okxU76eFG3LswQ1avs_mbZTZDb4T1-c';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDates() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Check failed:', error.message);
  } else {
    console.log('Latest products:', data);
  }
}

checkDates();
