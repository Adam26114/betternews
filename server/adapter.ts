import { drizzle } from "drizzle-orm/mysql2";

import { sessionTable, userTable } from "@/db/schema/auth";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import mysql from "mysql2/promise";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const processEnv = EnvSchema.parse(process.env);

const pool = mysql.createPool(processEnv.DATABASE_URL);

export const db = drizzle(pool, {
  mode: "default",
  schema: {
    user: userTable,
    session: sessionTable,
  },
});

export const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);
