import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

import { userTable } from "@/db/schema/auth";
import { postsTable } from "@/db/schema/post";

import { commentsTable } from "./comment";

export const postUpvotesTable = mysqlTable("post_upvotes", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`uuid()`),
  postId: int("post_id").notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
  .notNull()
  .default(sql`now(3)`),
});

export const postUpvotesRelations = relations(postUpvotesTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postUpvotesTable.postId],
    references: [postsTable.id],
    relationName: "postUpvotes",
  }),
  user: one(userTable, {
    fields: [postUpvotesTable.userId],
    references: [userTable.id],
    relationName: "user",
  }),
}));

export const commentUpvotesTable = mysqlTable("comment_upvotes", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`uuid()`),
  commentId: int("comment_id").notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }) // fractional seconds part
    .notNull()
    .default(sql`now()`),
});

export const commentUpvotesRelations = relations(
  commentUpvotesTable,
  ({ one }) => ({
    comment: one(commentsTable, {
      fields: [commentUpvotesTable.commentId],
      references: [commentsTable.id],
      relationName: "commentUpvotes",
    }),
    user: one(userTable, {
      fields: [commentUpvotesTable.userId],
      references: [userTable.id],
      relationName: "user",
    }),
  }),
);
