// supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import "dotenv/config"; // Muat variabel dari .env

// Ambil kredensial dari environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validasi kredensial
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Anon Key must be provided.");
}

// Ekspor klien Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
