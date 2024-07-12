import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import envVars from "@/configs/envVars";

const client = postgres(envVars.DATABASE_URL);

export const db = drizzle(client);
