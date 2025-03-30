
import { createClient } from '@supabase/supabase-js';

// These should be environment variables in a production app
const supabaseUrl = 'https://ipvlgmduyvvqucizpgpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdmxnbWR1eXZ2cXVjaXpwZ3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMzQzNTMsImV4cCI6MjA1ODkxMDM1M30.ZnJ00flmZOU6OT7o1QObUuRlj1EFLcDgxlIhsFjBOs4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
