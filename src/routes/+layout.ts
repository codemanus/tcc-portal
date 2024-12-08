// Libraries
import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr';

// Types
import type { LayoutLoad } from './$types';

// Variables
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

/**
 *
 * @param param0
 * @returns
 */
export const load: LayoutLoad = async ({ data, depends, fetch }) => {
	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get(key) {
						const cookie = parse(document.cookie);
						return cookie[key];
					},
					set(key, value, options) {
						document.cookie = `${key}=${value}; path=/; max-age=${options?.maxAge ?? 0}`;
					},
					remove(key, options) {
						document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
					}
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get() {
						return JSON.stringify(data.session);
					},
					set() {},
					remove() {}
				}
			});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	const { user } = data;

	// Don't need this?
	// const {
	// 	data: { user }
	// } = await supabase.auth.getUser();

	return { session, supabase, user };
};
