ALTER TABLE "assignment" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "assignment_type" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "course" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "course_schedule" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "enrollment" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "enrollment_course" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "grade" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "grade_feedback" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "student" ALTER COLUMN "sys_id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "student" ALTER COLUMN "student_created_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "student" ALTER COLUMN "student_updated_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_role" ALTER COLUMN "role_id" SET DEFAULT uuid_generate_v4();