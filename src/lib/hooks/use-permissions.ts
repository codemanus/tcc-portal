import { hasPermission } from '../utils/rbac';
import type { Permission, User } from '../utils/rbac';

export function usePermissions(user: User) {
  return {
    can: (permission: Permission) => hasPermission(user, permission),
    cannot: (permission: Permission) => !hasPermission(user, permission)
  };
} 