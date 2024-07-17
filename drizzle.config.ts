import { defineConfig } from "drizzle-kit";

import envVars from "@/configs/env/server";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/db/schema",
  dbCredentials: {
    url: envVars.DATABASE_URL,
  },
  migrations: {
    prefix: "timestamp",
  },
});
