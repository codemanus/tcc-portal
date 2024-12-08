import type { PageServerLoad } from './$types';
import grades from './data.js';

export function load() {
	return {
		summaries: grades.map((grade) => ({
			id: grade.id,
			title: grade.title,
			grade: grade.grade,
			percentage: grade.percentage,
			instructorName: grade.feedback.instructorName,
			submittedDate: grade.feedback.submittedDate,
			comments: grade.feedback.comments,
			strengths: grade.feedback.strengths,
			improvements: grade.feedback.improvements
		}))
	};
}
