import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
});

const processenv = EnvSchema.parse(process.env);

// Create the connection
const connection = await mysql.createConnection({
  uri: processenv.DATABASE_URL
});

// Create the db instance
export const db = drizzle(connection);
const result = await db.execute("select 1");
console.log(result);
