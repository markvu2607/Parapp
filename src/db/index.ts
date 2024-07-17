import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import envVars from "@/configs/env/server";

const client = postgres(envVars.DATABASE_URL);

export const db = drizzle(client);
