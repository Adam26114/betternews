import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { commentsTable } from "./comment";
import { postsTable } from "./post";
import { commentUpvotesTable, postUpvotesTable } from "./upvote";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  posts: many(postsTable, { relationName: "author" }),
  comments: many(commentsTable, { relationName: "author" }),
  postUpvotes: many(postUpvotesTable, {
    relationName: "postUpvotes",
  }),
  commentUpvotes: many(commentUpvotesTable, {
    relationName: "commentUpvotes",
  }),
}));

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});