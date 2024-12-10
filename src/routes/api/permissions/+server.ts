import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { user_role, permissions, role_permissions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
  const session = locals.session;

  // console.log('API Session:', session);

  if (!session?.user?.role) {
    console.log('No session or role found:', { session });
    throw error(401, {
      message: 'Unauthorized - No role found',
    });
  }

  try {
    const userPermissions = await db
      .select({
        role: user_role.role_value,
        permission_name: permissions.permission_name,
        permission_description: permissions.permission_description
      })
      .from(user_role)
      .innerJoin(
        role_permissions, 
        eq(role_permissions.role_id, user_role.role_id)
      )
      .innerJoin(
        permissions, 
        eq(permissions.permission_id, role_permissions.permission_id)
      )
      .where(eq(user_role.role_value, session.user.role));

    return json({
      permissions: userPermissions.map(p => p.permission_name),
      permissionDetails: userPermissions
    });
  } catch (err: unknown) {
    console.error('Error fetching permissions:', err);
    throw error(500, 'Failed to load user permissions');
  }
}; 