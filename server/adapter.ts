import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const proessenv = EnvSchema.parse(process.env);

const queryClient = postgres(proessenv.DATABASE_URL);
const db = drizzle(queryClient);

// const result = await db.execute("select 1");
// console.log(result);
