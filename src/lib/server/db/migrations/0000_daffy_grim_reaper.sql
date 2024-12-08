CREATE TABLE IF NOT EXISTS "assignment" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"assignment_name" varchar(255) NOT NULL,
	"assignment_desc" varchar(255) NOT NULL,
	"assignment_type" uuid,
	"assignment_due_by" timestamp,
	"assignment_grade_id" uuid,
	"assignment_created_at" timestamp DEFAULT now(),
	"assignment_updated_at" timestamp DEFAULT now(),
	"assignment_submitted_by" uuid,
	"assignment_submitted_at" timestamp DEFAULT now(),
	"assignment_created_by" uuid,
	"assignment_updated_by" uuid,
	CONSTRAINT "assignment_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assignment_type" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"assignment_type_name" varchar(255) NOT NULL,
	"assignment_type_desc" varchar NOT NULL,
	"assignment_type_created_at" timestamp DEFAULT now(),
	"assignment_type_updated_at" timestamp DEFAULT now(),
	"assignment_type_created_by" uuid,
	"assignment_type_updated_by" uuid,
	CONSTRAINT "assignment_type_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"course_name" varchar(255) NOT NULL,
	"course_code" varchar(255) NOT NULL,
	"course_credit" integer NOT NULL,
	"course_desc" varchar NOT NULL,
	"course_schedule" uuid,
	"course_schoolyear" integer NOT NULL,
	"course_instructor_id" uuid,
	"course_assignments_id" uuid,
	"course_created_at" timestamp DEFAULT now(),
	"course_updated_at" timestamp DEFAULT now(),
	"course_created_by" uuid,
	"course_updated_by" uuid,
	CONSTRAINT "course_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_schedule" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"course_code" varchar(255),
	"course_offered_fall" boolean DEFAULT false,
	"course_offered_spring" boolean DEFAULT false,
	"course_offered_summer" boolean DEFAULT false,
	"course_offered_winter" boolean DEFAULT false,
	"course_created_at" timestamp DEFAULT now(),
	"course_updated_at" timestamp DEFAULT now(),
	"course_created_by" uuid,
	"course_updated_by" uuid,
	CONSTRAINT "course_schedule_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrollment" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"enrollment_schoolyear" varchar(255) NOT NULL,
	"enrollment_courses" varchar(255) NOT NULL,
	"enrollment_is_active" boolean DEFAULT true,
	"enrollment_created_at" timestamp DEFAULT now(),
	"enrollment_updated_at" timestamp DEFAULT now(),
	"enrollment_created_by" uuid,
	"enrollment_update_by" uuid,
	CONSTRAINT "enrollment_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrollment_course" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"course_id" uuid NOT NULL,
	"enrollment_id" uuid NOT NULL,
	CONSTRAINT "enrollment_course_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"grade_assignment_id" uuid,
	"grade_result_total" integer,
	"grade_result_value" integer,
	"grade_feedback" uuid,
	"grade_student_id" uuid,
	"grade_by_instructor_id" uuid,
	CONSTRAINT "grade_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_feedback" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"grade_feedback_strengths" varchar,
	"grade_feedback_improvements" varchar,
	"grade_feedback_comments" varchar,
	"grade_feedback_created_at" timestamp DEFAULT now(),
	"grade_feedback_updated_at" timestamp DEFAULT now(),
	"grade_feedback_submitted_by" uuid,
	"grade_feedback_submitted_at" timestamp DEFAULT now(),
	"grade_feedback_created_by" uuid,
	"grade_feedback_updated_by" uuid,
	CONSTRAINT "grade_feedback_sys_id_unique" UNIQUE("sys_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"stff_number" serial NOT NULL,
	"staff_email" varchar NOT NULL,
	"staff_password" varchar NOT NULL,
	"staff_first_name" varchar NOT NULL,
	"staff_last_name" varchar NOT NULL,
	"staff_dateOfBirth" date NOT NULL,
	"staff_sex" varchar NOT NULL,
	"staff_address_1" varchar NOT NULL,
	"staff_address_2" varchar,
	"staff_address_city" varchar NOT NULL,
	"staff_address_zip" varchar NOT NULL,
	"staff_primary_phone" varchar NOT NULL,
	"staff_role_id" uuid NOT NULL,
	"staff_is_active" boolean DEFAULT true,
	"staff_created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"staff_updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"staff_created_by" uuid NOT NULL,
	"staff_updated_by" uuid NOT NULL,
	CONSTRAINT "staff_sys_id_unique" UNIQUE("sys_id"),
	CONSTRAINT "staff_staff_email_unique" UNIQUE("staff_email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"sys_id" uuid PRIMARY KEY NOT NULL,
	"student_number" serial NOT NULL,
	"student_email" varchar NOT NULL,
	"student_password" varchar NOT NULL,
	"student_first_name" varchar NOT NULL,
	"student_last_name" varchar NOT NULL,
	"student_dateOfBirth" date NOT NULL,
	"student_sex" varchar NOT NULL,
	"student_address_1" varchar NOT NULL,
	"student_address_2" varchar,
	"student_address_city" varchar NOT NULL,
	"student_address_zip" varchar NOT NULL,
	"student_primary_phone" varchar NOT NULL,
	"student_created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"student_updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"student_created_by" uuid NOT NULL,
	"student_updated_by" uuid NOT NULL,
	CONSTRAINT "student_sys_id_unique" UNIQUE("sys_id"),
	CONSTRAINT "student_student_email_unique" UNIQUE("student_email"),
	CONSTRAINT "student_student_password_unique" UNIQUE("student_password")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_role" (
	"role_id" uuid PRIMARY KEY NOT NULL,
	"role_name" varchar,
	"role_description" varchar,
	"role_created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"role_updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"role_updated_by" uuid,
	"role_created_by" uuid,
	CONSTRAINT "user_role_role_id_unique" UNIQUE("role_id"),
	CONSTRAINT "user_role_role_name_unique" UNIQUE("role_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar,
	"username" varchar NOT NULL,
	"profile_image" varchar,
	"role" text,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assignment" ADD CONSTRAINT "assignment_assignment_type_assignment_type_sys_id_fk" FOREIGN KEY ("assignment_type") REFERENCES "public"."assignment_type"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assignment" ADD CONSTRAINT "assignment_assignment_grade_id_grade_sys_id_fk" FOREIGN KEY ("assignment_grade_id") REFERENCES "public"."grade"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assignment" ADD CONSTRAINT "assignment_assignment_submitted_by_student_sys_id_fk" FOREIGN KEY ("assignment_submitted_by") REFERENCES "public"."student"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assignment" ADD CONSTRAINT "assignment_assignment_updated_by_staff_sys_id_fk" FOREIGN KEY ("assignment_updated_by") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assignment_type" ADD CONSTRAINT "assignment_type_assignment_type_updated_by_staff_sys_id_fk" FOREIGN KEY ("assignment_type_updated_by") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_course_schedule_course_schedule_sys_id_fk" FOREIGN KEY ("course_schedule") REFERENCES "public"."course_schedule"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_course_instructor_id_staff_sys_id_fk" FOREIGN KEY ("course_instructor_id") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_course_assignments_id_assignment_sys_id_fk" FOREIGN KEY ("course_assignments_id") REFERENCES "public"."assignment"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_course_updated_by_staff_sys_id_fk" FOREIGN KEY ("course_updated_by") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_schedule" ADD CONSTRAINT "course_schedule_course_updated_by_staff_sys_id_fk" FOREIGN KEY ("course_updated_by") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_enrollment_update_by_student_sys_id_fk" FOREIGN KEY ("enrollment_update_by") REFERENCES "public"."student"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollment_course" ADD CONSTRAINT "enrollment_course_course_id_course_sys_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollment_course" ADD CONSTRAINT "enrollment_course_enrollment_id_enrollment_sys_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollment"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grade" ADD CONSTRAINT "grade_grade_feedback_grade_feedback_sys_id_fk" FOREIGN KEY ("grade_feedback") REFERENCES "public"."grade_feedback"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grade" ADD CONSTRAINT "grade_grade_student_id_student_sys_id_fk" FOREIGN KEY ("grade_student_id") REFERENCES "public"."student"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grade" ADD CONSTRAINT "grade_grade_by_instructor_id_staff_sys_id_fk" FOREIGN KEY ("grade_by_instructor_id") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grade_feedback" ADD CONSTRAINT "grade_feedback_grade_feedback_submitted_by_staff_sys_id_fk" FOREIGN KEY ("grade_feedback_submitted_by") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grade_feedback" ADD CONSTRAINT "grade_feedback_grade_feedback_updated_by_staff_sys_id_fk" FOREIGN KEY ("grade_feedback_updated_by") REFERENCES "public"."staff"("sys_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staff" ADD CONSTRAINT "staff_staff_role_id_user_role_role_id_fk" FOREIGN KEY ("staff_role_id") REFERENCES "public"."user_role"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE POLICY "authenticated can view all users" ON "users" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);