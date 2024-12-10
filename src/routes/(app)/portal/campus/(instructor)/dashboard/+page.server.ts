import type { PageServerLoad, PageServerLoadEvent } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { staff, resident, assignment, grade } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ parent }: PageServerLoadEvent) => {
    const parentData = await parent();
    const user = parentData.user;
    console.log('User:', user);
    
    if (!user) {
        throw error(401, 'Unauthorized');
    }

    try {
        // Get instructor details
        const instructorDetails = await db.query.staff.findFirst({
            where: eq(staff.sys_id, user.id),
            with: {
                user_role: true
            }
        });

        if (!instructorDetails) {
            throw error(403, 'Not an instructor');
        }

        // Get residents
        const residents = await db.query.resident.findMany({
            with: {
                assignments: true,
                grades: true
            }
        });

        // Get assignments created by this instructor
        const assignments = await db.query.assignment.findMany({
            where: eq(assignment.assignment_created_by, user.id),
            with: {
                assignment_type: true,
                grade: true
            }
        });

        return {
            instructor: instructorDetails,
            residents,
            assignments,
            user
        };
    } catch (err) {
        console.error('Error loading instructor dashboard:', err);
        throw error(500, 'Failed to load dashboard data');
    }
}) satisfies PageServerLoad;