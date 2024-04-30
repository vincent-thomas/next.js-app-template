import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable('users', {
  userId: text("id").primaryKey(),
  email: text("email").unique(),
  picture: text("picture"),
  name: text("name")
});