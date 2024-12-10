import { user_role, permissions, role_permissions } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

/**
 * Gets data from our users table.
 *
 * @param param0
 * @returns
 */
export const load: LayoutServerLoad = async ({ locals }) => {
	const session = locals.session;
	const { data, error } = await locals.supabase.auth.getUser();

	if (data && error == null) {
		const result = await locals.supabase
			.from('users')
			.select(`
				*,
				user_roles:user_role (
					role_value
				)
			`)
			.eq('id', data.user.id)
			.single();

		if (result.data) {
			// Fetch permissions for the user's role
			const userPermissions = await db
				.select({
					permission_name: permissions.permission_name,
					permission_description: permissions.permission_description
				})
				.from(user_role)
				.innerJoin(role_permissions, eq(role_permissions.role_id, user_role.role_id))
				.innerJoin(permissions, eq(permissions.permission_id, role_permissions.permission_id))
				.where(eq(user_role.role_value, result.data.user_roles?.role_value));

			const sessionData = {
				session: {
					...session,
					user: {
						...(session?.user ?? {}),
						email: data.user.email,
						name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
						picture: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
						role: result.data.user_roles?.role_value,
						permissions: userPermissions.map(p => p.permission_name)
					}
				},
				user: result.data,
				permissionDetails: userPermissions
			};

			// Log permissions separately
			console.log('Permissions:', userPermissions);

			return sessionData;
		}
	}

	return {
		session: null
	};
};
