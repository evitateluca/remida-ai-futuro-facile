// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://raiqlhgmzawmfthuaqyc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaXFsaGdtemF3bWZ0aHVhcXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTEyNTQsImV4cCI6MjA1OTk4NzI1NH0.vYMlVKFWLVjC9EKU5TGCKGFvuJhTSHV29ujvNoF8jOY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);