import { error } from '@sveltejs/kit';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({ parent }: PageServerLoadEvent) => {
	const parentData = await parent();
	const session = parentData.session;

	if (!session?.user) {
		throw error(401, 'Unauthorized');
	}

	return {
		user: session.user,
		permissions: session.user.permissions
	};
};