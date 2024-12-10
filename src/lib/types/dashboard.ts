import type { staff, resident, assignment, grade } from '$lib/server/db/schema';

export interface DashboardData {
    instructor: typeof staff.$inferSelect & {
        user_role: {
            role_name: string;
        };
    };
    residents: Array<typeof resident.$inferSelect & {
        assignments: typeof assignment.$inferSelect[];
        grades: typeof grade.$inferSelect[];
    }>;
    assignments: Array<typeof assignment.$inferSelect & {
        assignment_type: {
            assignment_type_name: string;
        };
        grade: typeof grade.$inferSelect | null;
    }>;
} 