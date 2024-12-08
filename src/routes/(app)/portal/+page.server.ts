import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	logout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();

		if (error) {
			console.error('Server: Error during logout:', error);
			return { success: false, error };
		}

		throw redirect(303, '/?logged_out=true');
	}
} satisfies Actions;
