import { z } from "zod";

const envVarsSchema = z.object({
  DATABASE_URL: z.string(),
  WEBHOOK_SECRET: z.string(),
});

const validatedEnvVars = envVarsSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
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
