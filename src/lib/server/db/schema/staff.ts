import { timestamp, uuid, pgTable, serial, varchar, date, boolean } from "drizzle-orm/pg-core";
import { user_role } from "./user-roles";
import { sql } from "drizzle-orm";
import { users } from "./users";


export const staff = pgTable('staff', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`).references(() => users.id),
    stff_number: serial('stff_number').notNull(),
    staff_email: varchar('staff_email').unique().notNull(),
    staff_password: varchar('staff_password').notNull(),
    staff_first_name: varchar('staff_first_name').notNull(),
    staff_last_name: varchar('staff_last_name').notNull(),
    staff_dateOfBirth: date('staff_dateOfBirth').notNull(),
    staff_sex: varchar('staff_sex').notNull(),
    staff_address_1: varchar('staff_address_1').notNull(),
    staff_address_2: varchar('staff_address_2'),
    staff_address_city: varchar('staff_address_city').notNull(),
    staff_address_zip: varchar('staff_address_zip').notNull(),
    staff_primary_phone: varchar('staff_primary_phone').notNull(),
    staff_role_id: uuid('staff_role_id').notNull().references(() => user_role.role_id),
    staff_is_active: boolean('staff_is_active').default(true),
    staff_created_at: timestamp('staff_created_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    staff_updated_at: timestamp('staff_updated_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    staff_created_by: uuid('staff_created_by').notNull(),
    staff_updated_by: uuid('staff_updated_by').notNull(),
});

