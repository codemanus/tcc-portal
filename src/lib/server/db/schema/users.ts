import { pgTable, uuid, varchar, timestamp, pgSchema, text, foreignKey, pgPolicy } from "drizzle-orm/pg-core"
import { authenticatedRole, authUsers } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";
import { seed } from "drizzle-seed";
import { drizzle } from 'drizzle-orm/postgres-js';
import { user_role } from "./user-roles";



export const users = pgTable('users', {
    id: uuid('id').primaryKey().unique().references(() => authUsers.id),
    email: varchar('email'),
    username: varchar('username').notNull(),
    profile_image: varchar('profile_image'),
    role: text('role'),
    user_role: uuid('user_role').references(() => user_role.role_id),
    created_at: timestamp('created_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { precision: 6, withTimezone: true }),

  },
  (table) =>  [
       foreignKey({
    columns: [table.id],
    // reference to the auth table from Supabase
    foreignColumns: [authUsers.id],
    name: "users_id_fkey",
  }).onDelete("cascade"),
  pgPolicy("authenticated can view all users", {
    for: "select",
    // using predefined role from Supabase
    to: authenticatedRole,
    using: sql`true`,
  }),
]
);

// async function main() {
//   const db = drizzle(process.env.DATABASE_URL!);
//   await seed(db, { users });
// }
// main();