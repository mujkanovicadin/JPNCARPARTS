import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Service-role client. Bypasses Row Level Security — never expose to the
 * browser and never use for anything driven by untrusted user input.
 */
export function createAdminClient() {
  return createSupabaseClient(env.supabaseUrl(), env.supabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
