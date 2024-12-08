ALTER TABLE "user_role" ADD COLUMN "role_value" varchar;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_value_unique" UNIQUE("role_value");