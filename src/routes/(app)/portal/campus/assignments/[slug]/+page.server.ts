import data from '../data';
import type { PageServerLoad } from './$types';

export function load({ params }: { params: { slug: string } }) {
	const assignment = data.assignments.find((assignment) => assignment.slug === params.slug);
	return { assignment };
}
