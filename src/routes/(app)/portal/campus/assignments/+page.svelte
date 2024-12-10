<script lang="ts">
	import type { PageData } from './$types';
	import { StatCard, AssignmentsCalendar } from '$lib/components';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight } from 'lucide-svelte';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';
	import { type DateValue, CalendarDate } from '@internationalized/date';
	import AssignmentForm from '$lib/components/AssignmentForm.svelte';
	import { usePermissions } from '$lib/hooks/use-permissions';

	let { data }: { data: PageData } = $props();
	const { can } = usePermissions(data.user);

	// Set breadcrumbs for this page
	setBreadcrumbs([{ label: 'Campus', href: '/portal/campus' }, { label: 'Assignments' }]);

	// Add status color mapping
	const statusColors = {
		completed: 'text-green-500',
		'in-progress': 'text-blue-500',
		pending: 'text-yellow-500',
		overdue: 'text-red-500',
		default: 'text-muted-foreground'
	} as const;

	// Helper function to get status color
	function getStatusColor(status: string) {
		return statusColors[status.toLowerCase() as keyof typeof statusColors] || statusColors.default;
	}

	let selectedDate: CalendarDate | undefined;
	let placeholder: DateValue | undefined;
</script>

<div class="flex flex-1 flex-col gap-4 p-4">
	<section class="grid auto-rows-min gap-4 md:grid-cols-3">
		<StatCard title="Upcoming Assignments">
			<div class="flex h-full flex-col justify-between p-4">
				<h3 class="text-lg font-semibold">Upcoming</h3>
				<div class="mt-2 space-y-2">
					{#if data?.upcomingAssignments?.length}
						{#each data.upcomingAssignments as assignment}
							<div class="text-sm text-muted-foreground">
								{assignment.title}
							</div>
						{/each}
					{:else}
						<p class="text-sm text-muted-foreground">No upcoming assignments</p>
					{/if}
				</div>
			</div>
		</StatCard>

		<StatCard title="Past Due Assignments">
			<div class="flex h-full flex-col justify-between p-4">
				<h3 class="text-lg font-semibold">Past Due</h3>
				<div class="mt-2 space-y-2">
					{#if data?.pastDueAssignments?.length}
						{#each data.pastDueAssignments as assignment}
							<div class="text-sm text-muted-foreground">
								{assignment.title}
							</div>
						{/each}
					{:else}
						<p class="text-sm text-muted-foreground">No past due assignments</p>
					{/if}
				</div>
			</div>
		</StatCard>

		<div class="aspect-video rounded-xl bg-muted/50 shadow-md">
			<AssignmentsCalendar
				type="single"
				value={selectedDate}
				placeholder={placeholder}
				weekdayFormat="narrow"
			/>
		</div>
	</section>

	<section class="admin-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 shadow-md md:min-h-min">
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">All Assignments</h2>
			{#if data?.summaries?.length}
				{#each data.summaries as assignment}
					<div
						class="flex items-center justify-between rounded-lg bg-background p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
					>
						<div class="flex-grow">
							<h3 class="font-medium">{assignment.title}</h3>
							<p class="text-sm text-muted-foreground">{assignment.dueDate}</p>
						</div>
						<div class="flex items-center gap-4">
							<span class="text-sm font-medium {getStatusColor(assignment.status)}">
								{assignment.status}
							</span>
							<Button href={`/portal/campus/assignments/${assignment.slug}`}>
								View
								<ChevronRight class="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>
				{/each}
			{:else}
				<p class="text-muted-foreground">No assignments found</p>
			{/if}
		</div>
	</section>
</div>
