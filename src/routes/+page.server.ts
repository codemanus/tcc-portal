import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Simply redirect to login, let the portal layout handle auth checks
	throw redirect(303, '/login');
};

export const actions = {
	logout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();

		if (error) {
			console.error('Error logging out:', error);
		}

		throw redirect(303, '/?logged_out=true');
	}
} satisfies Actions;
