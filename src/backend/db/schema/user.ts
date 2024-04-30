import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-valibot";
export const userTable = sqliteTable("users", {
  userId: text("id").primaryKey(),
  email: text("email").unique(),
  picture: text("picture"),
  name: text("name")
});

export const insertUserTable = createInsertSchema(userTable);
