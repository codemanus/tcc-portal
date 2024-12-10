import { pgTable, uuid, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core"
import { staff } from "./staff";
import { assignment } from "./assignment";
import { sql } from "drizzle-orm";

export const course = pgTable('course', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    course_name: varchar('course_name', { length: 255 }).notNull(),
    course_code: varchar('course_code', { length: 255 }).notNull(),
    course_credit: integer('course_credit').notNull(),
    course_desc: varchar('course_desc').notNull(),
    course_schedule: uuid('course_schedule').references(() => course_schedule.sys_id),
    course_schoolyear: integer('course_schoolyear').notNull(),
    course_instructor_id: uuid('course_instructor_id').references(() => staff.sys_id),
    course_assignments_id: uuid('course_assignments_id').references(() => assignment.sys_id),
    course_created_at: timestamp('course_created_at').defaultNow(),
    course_updated_at: timestamp('course_updated_at').defaultNow(),
    course_created_by: uuid('course_created_by'),
    course_updated_by: uuid('course_updated_by').references(() => staff.sys_id)
  });


export const course_schedule = pgTable('course_schedule', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    course_code: varchar('course_code', { length: 255 }),
    course_offered_fall: boolean('course_offered_fall').default(false),
    course_offered_spring: boolean('course_offered_spring').default(false),
    course_offered_summer: boolean('course_offered_summer').default(false),
    course_offered_winter: boolean('course_offered_winter').default(false),
    course_created_at: timestamp('course_created_at').defaultNow(),
    course_updated_at: timestamp('course_updated_at').defaultNow(),
    course_created_by: uuid('course_created_by'),
    course_updated_by: uuid('course_updated_by').references(() => staff.sys_id)
  });
