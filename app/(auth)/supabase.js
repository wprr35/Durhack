import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lmrzjfraiwgueeaunnxc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnpqZnJhaXdndWVlYXVubnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTk4NDEsImV4cCI6MjA3NzU5NTg0MX0.JXIxDtmqbev_n8QshYtJV9U6cA3Mr8xFbM8JxWOhb7M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
