import type { PageServerLoad } from './$types';
import data from './data.js';
import { db } from '$lib/server/db';
import { assignment } from '$lib/server/db/schema/assignment';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { hasPermission, type Permission, type User as RBACUser } from '../../../../../lib/utils/rbac';

// Load function returns assignment data for the page
export function load() {
	return {
		// Map assignments to simplified summary objects
		summaries: data.assignments.map((assignment) => ({
			title: assignment.title,
			dueDate: assignment.dueDate,
			status: assignment.status,
			slug: assignment.slug
		})),
		// Filter assignments by status
		upcomingAssignments: data.assignments.filter((assignment) => assignment.status === 'pending'),
		pastDueAssignments: data.assignments.filter((assignment) => assignment.status === 'overdue')
	};
}

export const actions = {
	// Handle creation of new assignments
	createAssignment: async ({ request, locals }) => {
		const user = locals.user;
		
		// Create RBAC user object for permission checking
		const rbacUser: RBACUser = {
			id: user?.id ?? '',
			role: (user?.role as RBACUser['role']) ?? 'guest',
				permissions: (user?.app_metadata?.permissions as Permission[]) ?? []
		};

		// Verify user has permission to create assignments
		if (!user || !hasPermission(rbacUser, 'create:assignment')) {
			throw error(403, 'Unauthorized');
		}

		// Process form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		// Insert new assignment into database
		const create_assignment = await db.insert(assignment).values({
			assignment_name: data.title as string,
			assignment_desc: data.description as string,
			assignment_type: data.courseId as string,
			assignment_created_by: rbacUser.id,
			assignment_due_by: new Date(data.dueDate as string)
		}).returning();

		// Return success response with created assignment
		return { success: true, assignment: create_assignment[0] };
	}
} satisfies Actions;
