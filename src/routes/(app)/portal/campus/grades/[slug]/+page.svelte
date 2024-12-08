<script lang="ts">
	import type { PageData } from './$types';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';

	import LoadingState from './components/loading-state.svelte';
	import ErrorState from './components/error-state.svelte';
	import GradeHeader from './components/grade-header.svelte';
	import FeedbackSection from './components/feedback-section.svelte';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';
	export let data: PageData;

	$: isLoading = !data || !data.grade;
	$: hasError = data?.grade === undefined;

	$: console.log('Page Data:', data);

	// Set breadcrumbs for this page
	setBreadcrumbs([
		{ label: 'Campus', href: '/portal/campus' },
		{ label: 'Grades', href: '/portal/campus/grades' },
		{ label: data.grade?.title ?? 'Untitled Assignment' }
	]);
</script>

{#if isLoading}
	<LoadingState />
{:else if hasError}
	<ErrorState />
{:else}
	<div class="container mx-auto space-y-6 py-6">
		<div class="flex items-center gap-4">
			<Button variant="ghost" class="bg-muted/50 shadow-md" href="/portal/campus/grades">
				<ArrowLeft class="mr-2 h-4 w-4" />
				Back to Grades
			</Button>
		</div>

		<Card>
			<CardHeader>
				<GradeHeader grade={data.grade} />
			</CardHeader>
			<CardContent class="space-y-6 bg-muted/50 shadow-md">
				<div class="space-y-4">
					<div>
						<h3 class="text-sm font-medium text-muted-foreground">Instructor</h3>
						<p class="text-sm">{data.grade?.feedback.instructorName}</p>
					</div>

					<Separator />

					<div>
						<h3 class="text-sm font-medium text-muted-foreground">Assignment Details</h3>
						<p class="whitespace-pre-wrap text-sm">{data.grade?.feedback.comments}</p>
					</div>

					<FeedbackSection title="Strengths" items={data.grade?.feedback.strengths || []} />

					<FeedbackSection title="Improvements" items={data.grade?.feedback.improvements || []} />

					{#if data.grade?.feedback.comments}
						<Separator />
						<div>
							<h3 class="text-sm font-medium text-muted-foreground">Additional Comments</h3>
							<p class="whitespace-pre-wrap text-sm">{data.grade.feedback.comments}</p>
						</div>
					{/if}
				</div>
			</CardContent>
		</Card>
	</div>
{/if}
