import type { PageServerLoad } from './$types';
import data from './data.js';

export function load() {
	return {
		summaries: data.assignments.map((assignment) => ({
			title: assignment.title,
			dueDate: assignment.dueDate,
			status: assignment.status,
			slug: assignment.slug
		})),
		upcomingAssignments: data.assignments.filter((assignment) => assignment.status === 'pending'),
		pastDueAssignments: data.assignments.filter((assignment) => assignment.status === 'overdue')
	};
}
