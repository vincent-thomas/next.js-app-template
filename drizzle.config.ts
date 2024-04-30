import type { Config } from "drizzle-kit";
import { env } from "@/env";
export default {
  schema: "./src/backend/db/schema/index.ts",
  out: "./migrations",
  driver: "libsql",
  dbCredentials: {
    url: env.databaseUrl
  }
} satisfies Config;
