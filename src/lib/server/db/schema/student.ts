import { pgTable, varchar, uuid, serial, timestamp, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

export const resident = pgTable('resident', {
    sys_id: uuid('sys_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`).references(() => users.id),    
    resident_number: serial('resident_number').notNull(),
    resident_email: varchar('resident_email').unique().notNull(),
    resident_password: varchar('resident_password').unique().notNull(),
    resident_first_name: varchar('resident_first_name').notNull(),
    resident_last_name: varchar('resident_last_name').notNull(),
    resident_dateOfBirth: date('resident_dateOfBirth').notNull(),
    resident_sex: varchar('resident_sex').notNull(),
    resident_address_1: varchar('resident_address_1').notNull(),
    resident_address_2: varchar('resident_address_2'),
    resident_address_city: varchar('resident_address_city').notNull(),
    resident_address_zip: varchar('resident_address_zip').notNull(),
    resident_primary_phone: varchar('resident_primary_phone').notNull(),
    resident_created_at: timestamp('resident_created_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    resident_updated_at: timestamp('resident_updated_at', { precision: 6, withTimezone: true }).defaultNow().notNull(), 
    resident_created_by: uuid('resident_created_by'),
    resident_updated_by: uuid('resident_updated_by'),
});
