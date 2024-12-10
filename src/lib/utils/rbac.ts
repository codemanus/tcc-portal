import type { DbUser } from '$lib/types/user';

export type Permission = string;

type UserWithPermissions = DbUser & { permissions: Permission[] };

export function hasPermission(user: UserWithPermissions, requiredPermission: Permission): boolean {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(requiredPermission);
}

export function hasAnyPermission(user: UserWithPermissions, permissions: Permission[]): boolean {
  if (!user || !user.permissions) return false;
  return permissions.some(permission => user.permissions.includes(permission));
}

export function hasAllPermissions(user: UserWithPermissions, permissions: Permission[]): boolean {
  if (!user || !user.permissions) return false;
  return permissions.every(permission => user.permissions.includes(permission));
}

export function canAccessRoute(user: UserWithPermissions, requiredPermissions: Permission[]): boolean {
  return hasAllPermissions(user, requiredPermissions);
}
