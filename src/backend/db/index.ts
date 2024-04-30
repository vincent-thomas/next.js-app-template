import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: env.databaseUrl,
  authToken: env.databaseToken
});

export const db = drizzle(client);
