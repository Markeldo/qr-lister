import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://lszaxryshqebeptmxrla.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzemF4cnlzaHFlYmVwdG14cmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwNDA5MDIsImV4cCI6MjAyMTYxNjkwMn0.j8Ev-dQ1vFIaGVtBX_pZARyCBAeAQ3mFKocoQLAIVLU'
);
