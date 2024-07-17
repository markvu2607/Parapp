import { z } from "zod";

const envVarsSchema = z.object({
  DATABASE_URL: z.string(),
  SUPABASE_REF_ID: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().nullable(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().nullable(),
  WEBHOOK_SECRET: z.string(),
});

const validatedEnvVars = envVarsSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SUPABASE_REF_ID: process.env.SUPABASE_REF_ID,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
});

if (validatedEnvVars.success === false) {
  throw new Error(`
    Config validation error: ${JSON.stringify(
      validatedEnvVars.error.flatten().fieldErrors
    )}
    `);
}

export default validatedEnvVars.data;
