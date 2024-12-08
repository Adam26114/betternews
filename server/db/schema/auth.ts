import { sql } from "drizzle-orm";
import {
  datetime,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .notNull()
    .default(sql`now(3)`),
});

export const sessionTable = mysqlTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .notNull()
    .default(sql`now(3)`),
});
