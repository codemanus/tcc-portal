<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { CardTitle, CardDescription } from '$lib/components/ui/card';
	import type { Grade } from '../types';

	export let grade: Grade;

	function getGradeColor(grade: string | null | undefined) {
		if (!grade) return 'bg-gray-100 text-gray-800';

		const gradeColors: Record<string, string> = {
			A: 'bg-emerald-100 text-emerald-800',
			B: 'bg-blue-100 text-blue-800',
			C: 'bg-yellow-100 text-yellow-800',
			D: 'bg-orange-100 text-orange-800',
			F: 'bg-red-100 text-red-800'
		};

		return gradeColors[grade] || 'bg-gray-100 text-gray-800';
	}
</script>

<div class="flex items-center justify-between">
	<div>
		<CardTitle>{grade.title || 'Untitled Assignment'}</CardTitle>
		<CardDescription>
			{#if grade.feedback?.submittedDate}
				Submitted on {new Date(grade.feedback.submittedDate).toLocaleDateString()}
			{:else}
				Submission date not available
			{/if}
		</CardDescription>
	</div>
	<div class="flex flex-col items-end gap-2">
		<Badge variant="secondary" class={getGradeColor(grade.grade)}>
			{grade.grade || 'N/A'}
		</Badge>
		<span class="text-lg font-semibold">{grade.percentage ?? 0}%</span>
	</div>
</div>
