import { db } from '../index';
import { user_role, permissions, role_permissions } from '../schema/user-roles';

export async function seedRoles() {
  // First, create the roles
  const roles = await db.insert(user_role).values([
    {
      role_name: 'resident',
      role_value: 'RESIDENT',
      role_description: 'Resident with limited access to courses and assignments'
    },
    {
      role_name: 'guest',
      role_value: 'GUEST',
      role_description: 'Guest with read-only access to public content'
    }
  ]).returning();

  // Then, create the permissions
  const perms = await db.insert(permissions).values([
    {
      permission_name: 'create:course',
      permission_description: 'Can create new courses'
    },
    {
      permission_name: 'read:course',
      permission_description: 'Can view course details'
    },
    {
      permission_name: 'update:course',
      permission_description: 'Can modify course details'
    },
    {
      permission_name: 'delete:course',
      permission_description: 'Can remove courses'
    },
    {
      permission_name: 'create:assignment',
      permission_description: 'Can create new assignments'
    },
    {
      permission_name: 'read:assignment',
      permission_description: 'Can view assignment details'
    },
    {
      permission_name: 'update:assignment',
      permission_description: 'Can modify assignments'
    },
    {
      permission_name: 'delete:assignment',
      permission_description: 'Can remove assignments'
    }
  ]).returning();

  // Finally, map roles to permissions
  const rolePermissionMappings = [
    // Admin gets all permissions
    ...perms.map(p => ({
      role_id: roles.find(r => r.role_name === 'admin')!.role_id,
      permission_id: p.permission_id
    })),
    
    // instructor permissions
    ...perms.filter(p => p.permission_name && !p.permission_name.includes('delete:')).map(p => ({
      role_id: roles.find(r => r.role_name === 'instructor')!.role_id,
      permission_id: p.permission_id
    })),
    
    // resident permissions
    ...perms.filter(p => p.permission_name && p.permission_name.startsWith('read:')).map(p => ({
      role_id: roles.find(r => r.role_name === 'resident')!.role_id,
      permission_id: p.permission_id
    })),
    
    // Guest permissions
    {
      role_id: roles.find(r => r.role_name === 'guest')!.role_id,
      permission_id: perms.find(p => p.permission_name === 'read:course')!.permission_id
    }
  ];

  await db.insert(role_permissions).values(rolePermissionMappings);

  return {
    roles,
    permissions: perms,
    rolePermissions: rolePermissionMappings
  };
} 