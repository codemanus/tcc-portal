<script lang="ts">
	import type { PageData } from './$types';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';

	export let data: PageData;
	let searchTerm = '';

	$: filteredGrades = data.summaries.filter(
		(grade) =>
			grade.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			grade.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	function getGradeColor(grade: string) {
		switch (grade) {
			case 'A':
				return 'bg-emerald-100 text-emerald-800';
			case 'B':
				return 'bg-blue-100 text-blue-800';
			case 'C':
				return 'bg-yellow-100 text-yellow-800';
			case 'D':
				return 'bg-orange-100 text-orange-800';
			case 'F':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	// Set breadcrumbs for this page
	setBreadcrumbs([{ label: 'Campus', href: '/portal/campus' }, { label: 'Grades' }]);
</script>

<div class="container mx-auto space-y-4 py-6">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-semibold tracking-tight">Grades</h2>
		<p class="text-sm text-muted-foreground">
			Showing {data.summaries.length} assignments
		</p>
	</div>

	<div class="relative">
		<Search class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
		<Input
			type="search"
			placeholder="Search assignments or instructors..."
			class="w-[300px] bg-muted/50 pl-10 shadow-md"
			bind:value={searchTerm}
		/>
	</div>

	<div class="rounded-md border bg-card bg-muted/50 text-card-foreground shadow-md">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Assignment</TableHead>
					<TableHead class="w-[100px] text-center">Grade</TableHead>
					<TableHead class="w-[120px] text-center">Percentage</TableHead>
					<TableHead>Instructor</TableHead>
					<TableHead class="w-[100px]"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each filteredGrades as { id, title, grade, percentage, instructorName }}
					<TableRow>
						<TableCell class="font-medium">{title}</TableCell>
						<TableCell class="text-center">
							<Badge variant="secondary" class={getGradeColor(grade)}>
								{grade}
							</Badge>
						</TableCell>
						<TableCell class="text-center">
							<span class="font-medium">{percentage}%</span>
						</TableCell>
						<TableCell>{instructorName}</TableCell>
						<TableCell>
							<Button size="sm" href={`/portal/campus/grades/${id}`} class="float-right">
								Details
								<ChevronRight class="ml-2 h-4 w-4" />
							</Button>
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>

	{#if filteredGrades.length === 0}
		<div class="py-6 text-center text-muted-foreground">No grades found matching your search.</div>
	{/if}

	<div class="pt-2 text-center text-sm text-muted-foreground">
		Click on "Details" to view full feedback and comments
	</div>
</div>
