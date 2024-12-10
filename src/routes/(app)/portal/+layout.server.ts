import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
	const parentData = await parent();
	const session = parentData.session;

	// If no session, redirect to login
	if (!session?.user) {
		throw redirect(303, '/login');
	}

	// If session exists but no permissions, throw error
	if (!session.user.permissions) {
		throw error(403, 'No permissions found');
	}

	return {
		user: session.user,
		permissions: session.user.permissions
	};
};