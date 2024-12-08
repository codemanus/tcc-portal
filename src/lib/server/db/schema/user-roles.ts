import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { seed } from "drizzle-seed";
import { drizzle } from 'drizzle-orm/postgres-js';

export const user_role = pgTable('user_role', {
    role_id: uuid('role_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    role_name: varchar('role_name').unique(),
    role_value: varchar('role_value').unique(),
    role_description: varchar('role_description'),
    role_created_at: timestamp('role_created_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    role_updated_at: timestamp('role_updated_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    role_updated_by: uuid('role_updated_by'),
    role_created_by: uuid('role_created_by'),
});

// async function main() {
//   const db = drizzle(process.env.DATABASE_URL!);
//   await seed(db, { user_role });
// }
// main();