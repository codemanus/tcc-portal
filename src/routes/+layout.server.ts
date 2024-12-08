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

	console.log('Session from locals:', session);
	console.log('Auth User Data:', data?.user);
	console.log('Auth User Metadata:', data?.user?.user_metadata);

	if (data && error == null) {
		const result = await locals.supabase.from('users').select('*').eq('id', data.user.id);
		console.log('Users Table Data:', result.data);

		if (result.data && result.data.length > 0) {
			const sessionData = {
				session: {
					...session,
					user: {
						...(session?.user ?? {}),
						email: data.user.email,
						name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
						picture: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture
					}
				},
				user: result.data[0]
			};

			console.log('Final Session Data:', sessionData);
			return sessionData;
		}
	}

	return {
		session
	};
};
