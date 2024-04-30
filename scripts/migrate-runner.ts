import { db } from "@/backend/db";
import { migrate } from "drizzle-orm/libsql/migrator";

await migrate(db, { migrationsFolder: './migrations' });