import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.safeGetSession();

	if (session.user) {
		throw redirect(303, '/portal');
	}
	else {
		throw redirect(303, '/login');
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		// Your existing login logic
	},

	logout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();

		if (error) {
			console.error('Error logging out:', error);
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
