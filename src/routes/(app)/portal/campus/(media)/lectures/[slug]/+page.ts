import type { PageLoad } from './$types';
import data from '../media';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const lecture = data.lectures.find((l) => l.slug === params.slug);

	if (!lecture) {
		throw error(404, 'Lecture not found');
	}

	return {
		lecture
	};
};
