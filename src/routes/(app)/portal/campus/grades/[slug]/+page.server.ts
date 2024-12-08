import type { PageServerLoad } from './$types';

import grades from '../data';

export function load({ params }: { params: { slug: string } }) {
	const grade = grades.find((grade) => grade.id === params.slug);
	return { grade };
}
