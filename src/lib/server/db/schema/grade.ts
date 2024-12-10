import { integer, pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core"
import { staff } from "./staff";
import { resident } from "./student";
import { sql } from "drizzle-orm";

export const grade = pgTable('grade', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    grade_assignment_id: uuid('grade_assignment_id'),
    grade_result_total: integer('grade_result_total'),
    grade_result_value: integer('grade_result_value'),
    grade_feedback: uuid('grade_feedback').references(() => grade_feedback.sys_id),
    grade_student_id: uuid('grade_student_id').references(() => resident.sys_id),
    grade_by_instructor_id: uuid('grade_by_instructor_id').references(() => staff.sys_id)
  });

export const grade_feedback = pgTable('grade_feedback', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    grade_feedback_strengths: varchar('grade_feedback_strengths'),
    grade_feedback_improvements: varchar('grade_feedback_improvements'),
    grade_feedback_comments: varchar('grade_feedback_comments'),
    grade_feedback_created_at: timestamp('grade_feedback_created_at').defaultNow(),
    grade_feedback_updated_at: timestamp('grade_feedback_updated_at').defaultNow(),
    grade_feedback_submitted_by: uuid('grade_feedback_submitted_by').references(() => staff.sys_id),
    grade_feedback_submitted_at: timestamp('grade_feedback_submitted_at').defaultNow(),
    grade_feedback_created_by: uuid('grade_feedback_created_by'),
    grade_feedback_updated_by: uuid('grade_feedback_updated_by').references(() => staff.sys_id)
  });

