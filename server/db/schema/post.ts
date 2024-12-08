import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

import { userTable } from "@/db/schema/auth";
import { commentsTable } from "@/db/schema/comment";
import { postUpvotesTable } from "@/db/schema/upvote";

export const postsTable = mysqlTable("posts", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`uuid()`),
  userId: varchar("user_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }),
  content: varchar("content", { length: 1000 }),
  points: int("points").default(0).notNull(),
  commentCount: int("comment_count").default(0).notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .notNull()
    .default(sql`now(3)`),
});

export const postRelations = relations(postsTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postsTable.userId],
    references: [userTable.id],
    relationName: "author",
  }),
  postUpvotesTable: many(postUpvotesTable, { relationName: "postUpvotes" }),
  comments: many(commentsTable),
}));
