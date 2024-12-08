import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core"
import { student } from "./student";
import { grade } from "./grade";
import { staff } from "./staff";
import { seed } from "drizzle-seed";
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from "drizzle-orm";

export const assignment = pgTable('assignment', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    assignment_name: varchar('assignment_name', { length: 255 }).notNull(),
    assignment_desc: varchar('assignment_desc', { length: 255 }).notNull(),
    assignment_type: uuid('assignment_type').references(() => assignment_type.sys_id),
    assignment_due_by: timestamp('assignment_due_by'),
    assignment_grade_id: uuid('assignment_grade_id').references(() => grade.sys_id),
    assignment_created_at: timestamp('assignment_created_at').defaultNow(),
    assignment_updated_at: timestamp('assignment_updated_at').defaultNow(),
    assignment_submitted_by: uuid('assignment_submitted_by').references(() => student.sys_id),
    assignment_submitted_at: timestamp('assignment_submitted_at').defaultNow(),
    assignment_created_by: uuid('assignment_created_by'),
    assignment_updated_by: uuid('assignment_updated_by').references(() => staff.sys_id)
  });

  export const assignment_type = pgTable('assignment_type', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    assignment_type_name: varchar('assignment_type_name', { length: 255 }).notNull(),
    assignment_type_desc: varchar('assignment_type_desc').notNull(),
    assignment_type_created_at: timestamp('assignment_type_created_at').defaultNow(),
    assignment_type_updated_at: timestamp('assignment_type_updated_at').defaultNow(),
    assignment_type_created_by: uuid('assignment_type_created_by'),
    assignment_type_updated_by: uuid('assignment_type_updated_by').references(() => staff.sys_id)
  });

// async function main() {
//   const db = drizzle(process.env.DATABASE_URL!);
//   await seed(db, { assignment_type, assignment });
// }
// main();