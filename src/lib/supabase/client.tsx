"use client";

import { createBrowserClient } from "@supabase/ssr";

import envVars from "@/configs/env/client";
import { Database } from "@/types";

export function createClient() {
  return createBrowserClient<Database>(
    envVars.NEXT_PUBLIC_SUPABASE_URL,
    envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
