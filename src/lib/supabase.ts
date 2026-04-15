import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://evwrcjstgonhrcqlnbpv.supabase.co').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d3JjanN0Z29uaHJjcWxuYnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzU1ODMsImV4cCI6MjA5MTg1MTU4M30.zCk3HTDQEXJ-okxU76eFG3LswQ1avs_mbZTZDb4T1-c').trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Supabase keys are missing or invalid.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
