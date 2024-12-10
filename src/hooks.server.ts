// Libraries
import { createServerClient } from '@supabase/ssr';
import { sequence } from '@sveltejs/kit/hooks';

// Types
import type { Database } from '$lib/types/supabase';
import type { Handle } from '@sveltejs/kit';
import type { Session, User } from '@supabase/supabase-js';

// Variables
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
/**
 *
 * @param param0
 * @returns
 */
const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: '/' });
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: '/' });
				}
			}
		}
	);

	try {
		// Get authenticated user data from Supabase Auth server
		const { data: { user }, error: userError } = await event.locals.supabase.auth.getUser();
		
		if (userError) {
			event.locals.session = null;
		} else {
			// Create session object using only the verified user data
			event.locals.session = user ? {
				access_token: user.role ?? '',
				token_type: 'bearer',
				refresh_token: '',
				expires_in: 3600,
				user: user
			} : null;
		}
	} catch (err) {
		console.error('Auth error:', err);
		event.locals.session = null;
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

export const handle: Handle = sequence(supabase);
