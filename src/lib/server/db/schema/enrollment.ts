import { pgTable, uuid, varchar, boolean, timestamp } from "drizzle-orm/pg-core"
import { course } from "./course";
import { resident } from "./student";
import { sql } from "drizzle-orm";

export const enrollment = pgTable('enrollment', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    enrollment_schoolyear: varchar('enrollment_schoolyear', { length: 255 }).notNull(),
    enrollment_courses: varchar('enrollment_courses', { length: 255 }).notNull(),
    enrollment_is_active: boolean('enrollment_is_active').default(true),
    enrollment_created_at: timestamp('enrollment_created_at').defaultNow(),
    enrollment_updated_at: timestamp('enrollment_updated_at').defaultNow(),
    enrollment_created_by: uuid('enrollment_created_by'),
    enrollment_update_by: uuid('enrollment_update_by').references(() => resident.sys_id)
  });

export const enrollment_course = pgTable('enrollment_course', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    course_id: uuid('course_id').notNull().references(() => course.sys_id),
    enrollment_id: uuid('enrollment_id').notNull().references(() => enrollment.sys_id)
  });
