import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.local.example to .env.local and fill in your project's values."
  );
}

// Read-only, anon-key client. This site only ever reads publicly-selectable
// tables (shop_items, profiles) straight from Server Components — same
// project as the FocusSim game client, just no auth/session handling here
// since this site never signs anyone in.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
