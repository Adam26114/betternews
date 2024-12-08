import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

import { userTable } from "@/db/schema/auth";
import { postsTable } from "@/db/schema/post";
import { commentUpvotesTable } from "@/db/schema/upvote";

export const commentsTable = mysqlTable("comments", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`uuid()`),
  userId: varchar("user_id", { length: 255 }).notNull(),
  postId: int("post_id").notNull(),
  parentCommentId: int("parent_comment_id"),
  content: varchar("content", { length: 1000 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .notNull()
    .default(sql`now(3)`),
  depth: int("depth").default(0).notNull(),
  commentCount: int("comment_count").default(0).notNull(),
  points: int("points").default(0).notNull(),
});

export const commentRelations = relations(commentsTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [commentsTable.userId],
    references: [userTable.id],
    relationName: "author",
  }),
  parentComment: one(commentsTable, {
    fields: [commentsTable.parentCommentId],
    references: [commentsTable.id],
    relationName: "childComments",
  }),
  childComments: many(commentsTable, {
    relationName: "childComments",
  }),
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
    relationName: "post",
  }),
  commentUpvotes: many(commentUpvotesTable, {
    relationName: "commentUpvotes",
  }),
}));
