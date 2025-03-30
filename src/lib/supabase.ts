
import { createClient } from '@supabase/supabase-js';

// These should be environment variables in a production app
const supabaseUrl = 'https://your.supabase.co';
const supabaseAnonKey = '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
