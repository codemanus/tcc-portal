<script lang="ts">
	import { StatCard } from '$lib/components';
	import { Button } from '$lib/components/ui/button';
	import {
		ChevronRight,
		BookOpen,
		Calendar,
		FileText,
		GraduationCap,
		MessageSquare,
		Newspaper,
		Users
	} from 'lucide-svelte';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';

	setBreadcrumbs([{ label: 'Campus' }]);
</script>

<div class="flex flex-1 flex-col gap-4 p-4">
	<!-- Top Row - Courses and Schedule -->
	<div class="grid gap-4 md:grid-cols-2">
		<StatCard>
			<div class="flex items-start justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<BookOpen class="h-5 w-5 text-primary" />
						<h3 class="text-xl font-semibold">Current Courses</h3>
					</div>
					<div class="space-y-1">
						{#each ['Course 1', 'Course 2'] as course}
							<div class="flex items-center justify-between">
								<span class="text-sm text-muted-foreground">{course}</span>
								<Button variant="ghost" size="sm" href={`/portal/campus/courses/${course}`}>
									View <ChevronRight class="ml-1 h-4 w-4" />
								</Button>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</StatCard>

		<StatCard>
			<div class="flex items-start justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<Calendar class="h-5 w-5 text-primary" />
						<h3 class="text-xl font-semibold">Course Schedule</h3>
					</div>
					<div class="space-y-1">
						{#each ['Monday 9:00 AM - Course 1', 'Wednesday 2:00 PM - Course 2'] as schedule}
							<div class="text-sm text-muted-foreground">{schedule}</div>
						{/each}
					</div>
				</div>
			</div>
		</StatCard>
	</div>

	<!-- Middle Row - Lectures, Grades, Messages, Materials -->
	<div class="grid gap-4 md:grid-cols-4">
		<StatCard>
			<div class="flex h-full flex-col justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<Calendar class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Lectures</h3>
					</div>
					<p class="text-sm text-muted-foreground">Access recorded lectures and notes</p>
				</div>
				<Button class="mt-4" href="/portal/campus/lectures">
					View Lectures <ChevronRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</StatCard>

		<StatCard>
			<div class="flex h-full flex-col justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<GraduationCap class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Grades</h3>
					</div>
					<p class="text-sm text-muted-foreground">View your current grades and progress</p>
				</div>
				<Button class="mt-4" href="/portal/campus/grades">
					View Grades <ChevronRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</StatCard>

		<StatCard>
			<div class="flex h-full flex-col justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<MessageSquare class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Messages</h3>
					</div>
					<p class="text-sm text-muted-foreground">2 unread messages</p>
				</div>
				<Button class="mt-4" href="/portal/campus/messages">
					View Messages <ChevronRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</StatCard>

		<StatCard>
			<div class="flex h-full flex-col justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<FileText class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Materials</h3>
					</div>
					<p class="text-sm text-muted-foreground">Access course materials and resources</p>
				</div>
				<Button class="mt-4" href="/portal/campus/materials">
					View Materials <ChevronRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</StatCard>
	</div>

	<!-- Bottom Row - News and Appointments -->
	<div class="grid gap-4 md:grid-cols-2">
		<StatCard>
			<div class="flex h-full flex-col justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<Newspaper class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Campus News</h3>
					</div>
					<div class="space-y-2">
						{#each ['News 1', 'News 2'] as news}
							<div class="text-sm text-muted-foreground">{news}</div>
						{/each}
					</div>
				</div>
				<Button variant="ghost" class="mt-4" href="/portal/campus/news">
					View All News <ChevronRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</StatCard>

		<StatCard>
			<div class="flex h-full flex-col justify-between p-6">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<Users class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Instructor Appointments</h3>
					</div>
					<div class="space-y-2">
						<p class="text-sm text-muted-foreground">Schedule a meeting with your instructor</p>
					</div>
				</div>
				<Button class="mt-4" href="/portal/campus/appointments">
					Schedule Meeting <ChevronRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</StatCard>
	</div>
</div>
