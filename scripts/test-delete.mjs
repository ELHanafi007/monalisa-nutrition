import { createClient } from '@supabase/supabase-js';

const cleanURL = 'https://evwrcjstgonhrcqlnbpv.supabase.co';
const cleanKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d3JjanN0Z29uaHJjcWxuYnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzU1ODMsImV4cCI6MjA5MTg1MTU4M30.zCk3HTDQEXJ-okxU76eFG3LswQ1avs_mbZTZDb4T1-c';

const supabase = createClient(cleanURL, cleanKey);

async function testDelete() {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', 'non-existent-id');

  if (error) {
    console.error('Delete failed:', error);
  } else {
    console.log('Delete "succeeded" (or did nothing):', data);
  }
}

testDelete();
