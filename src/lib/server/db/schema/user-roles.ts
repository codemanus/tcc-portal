import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";


export const user_role = pgTable('user_role', {
    role_id: uuid('role_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    role_name: varchar('role_name').unique(),
    role_value: varchar('role_value').unique(),
    role_description: varchar('role_description'),
    role_created_at: timestamp('role_created_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    role_updated_at: timestamp('role_updated_at', { precision: 6, withTimezone: true }).defaultNow().notNull(),
    role_updated_by: uuid('role_updated_by'),
    role_created_by: uuid('role_created_by'),
});

export const role_permissions = pgTable('role_permissions', {
    role_id: uuid('role_id').references(() => user_role.role_id),
    permission_id: uuid('permission_id').references(() => permissions.permission_id),
});

export const permissions = pgTable('permissions', {
    permission_id: uuid('permission_id').primaryKey().unique().notNull().default(sql`uuid_generate_v4()`),
    permission_name: varchar('permission_name').unique(),
    permission_description: varchar('permission_description'),
});
