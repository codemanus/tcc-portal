import { pgTable, varchar, uuid, serial, timestamp, date } from "drizzle-orm/pg-core";
import { seed } from "drizzle-seed";
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from "drizzle-orm";
import { users } from "./users";

export const student = pgTable('student', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`).references(() => users.id),    
    student_number: serial('student_number').notNull(),
    student_email: varchar('student_email').unique().notNull(),
    student_password: varchar('student_password').unique().notNull(),
    student_first_name: varchar('student_first_name').notNull(),
    student_last_name: varchar('student_last_name').notNull(),
    student_dateOfBirth: date('student_dateOfBirth').notNull(),
    student_sex: varchar('student_sex').notNull(),
    student_address_1: varchar('student_address_1').notNull(),
    student_address_2: varchar('student_address_2'),
    student_address_city: varchar('student_address_city').notNull(),
    student_address_zip: varchar('student_address_zip').notNull(),
    student_primary_phone: varchar('student_primary_phone').notNull(),
    student_created_at: timestamp('student_created_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    student_updated_at: timestamp('student_updated_at', { precision: 6, withTimezone: true }).defaultNow().notNull(), 
    student_created_by: uuid('student_created_by'),
    student_updated_by: uuid('student_updated_by'),
});

// async function main() {
//   const db = drizzle(process.env.DATABASE_URL!);
//   await seed(db, { student });
// }
// main();