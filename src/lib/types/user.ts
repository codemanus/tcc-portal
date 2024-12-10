import type { user_role } from '$lib/server/db/schema/user-roles';

// Base role type from database schema
type DbRole = typeof user_role.role_name.enumValues[number];

export type Permission = 
  | 'create:course'
  | 'read:course'
  | 'update:course'
  | 'delete:course'
  | 'create:assignment'
  | 'read:assignment'
  | 'update:assignment'
  | 'delete:assignment'
  | 'grade:assignment'
  | 'read:submissions';

export interface RolePermissions {
  [role: string]: Permission[];
}

// Database user type
export interface DbUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  user_roles: {
    role_name: DbRole;
  },
  permissions: Permission[];
}

// Application user type with permissions
export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: DbRole;
  permissions: Permission[];
}

// Export commonly used types
export type { DbRole as Role }; 
