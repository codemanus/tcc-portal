<script lang="ts" module>
	import BookOpen from 'lucide-svelte/icons/book-open';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import Send from 'lucide-svelte/icons/send';
	import School from 'lucide-svelte/icons/school';
	import Paperclip from 'lucide-svelte/icons/paperclip';
	import Caravan from 'lucide-svelte/icons/caravan';
	import DNA from 'lucide-svelte/icons/dna';
	import Users from 'lucide-svelte/icons/users';
	import Baby from 'lucide-svelte/icons/baby';
	import FileCheck from 'lucide-svelte/icons/file-check';
	import HeartHandshake from 'lucide-svelte/icons/heart-handshake';

	function getNavigationItems(session: { user?: { permissions?: string[] } } | null) {
		const userPermissions = session?.user?.permissions || [];
		
		const baseNavItems = [
			{
				title: 'Care',
				url: '#',
				icon: HeartHandshake,
				isActive: true,
				requiredPermission: 'VIEW_CARE',
				items: [
					{ title: 'Things to do', url: '#' },
					{ title: 'Prayer', url: '#' },
					{ title: 'Settings', url: '#' }
				]
			},
			{
				title: 'Kids',
				url: '#',
				icon: Baby,
				requiredPermission: 'VIEW_KIDS',
				items: [
					{
						title: 'Things to do',
						url: '#'
					},
					{
						title: 'Resources',
						url: '#'
					},
					{
						title: 'Events',
						url: '#'
					}
				]
			},
			{
				title: 'Students',
				url: '#',
				icon: BookOpen,
				items: [
					{
						title: 'Things to do',
						url: '#'
					},
					{
						title: 'Get Started',
						url: '#'
					},
					{
						title: 'Tutorials',
						url: '#'
					},
					{
						title: 'Events',
						url: '#'
					}
				]
			},
			{
				title: 'Missions',
				url: '#',
				icon: Caravan,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
					{
						title: 'Billing',
						url: '#'
					},
					{
						title: 'Limits',
						url: '#'
					}
				]
			},
			{
				title: 'Community Groups',
				url: '#',
				icon: Users,
				items: [
					{
						title: 'Add Group',
						url: '#'
					},
					{
						title: 'Search',
						url: '#'
					},
					{
						title: 'Statistics',
						url: '#'
					},
					{
						title: 'Settings',
						url: '#'
					}
				]
			},
			{
				title: 'DNA',
				url: '#',
				icon: DNA,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
					{
						title: 'Billing',
						url: '#'
					},
					{
						title: 'Limits',
						url: '#'
					}
				]
			}
		];

		const campusItems = [
			{
				name: 'Instructor Dashboard',
				url: '/portal/campus/dashboard',
				icon: School,
				requiredPermission: 'VIEW_INSTRUCTOR_DASHBOARD'
			},
			{
				name: 'Campus Board',
				url: '/portal/campus/board',
				icon: School,
				requiredPermission: 'VIEW_CAMPUS_BOARD'
			},
			{
				name: 'Assignments',
				url: '/portal/campus/assignments',
				icon: Paperclip,
				requiredPermission: 'VIEW_ASSIGNMENTS'
			},
			{
				name: 'Grades',
				url: '/portal/campus/grades',
				icon: FileCheck,
				requiredPermission: 'VIEW_GRADES'
			}
		];

		const filteredNavItems = baseNavItems.filter(
			item => !item.requiredPermission || userPermissions.includes(item.requiredPermission)
		);

		const filteredProjects = campusItems.filter(
			item => !item.requiredPermission || userPermissions.includes(item.requiredPermission)
		);

		return {
			navMain: filteredNavItems,
			navSecondary: [
				{
					title: 'Support',
					url: '#',
					icon: LifeBuoy
				},
				{
					title: 'Feedback',
					url: '#',
					icon: Send
				}
			],
			projects: filteredProjects
		};
	}
</script>

<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import NavMain from '$lib/components/side-bar/nav-main.svelte';
	import NavProjects from '$lib/components/side-bar/nav-projects.svelte';
	import NavSecondary from '$lib/components/side-bar/nav-secondary.svelte';
	import NavUser from '$lib/components/side-bar/nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let {
		ref = $bindable(null),
		session,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		session: {
			user?: {
				name?: string;
				email: string;
				picture?: string;
				permissions?: string[];
			};
		} | null;
	} = $props();

	const navigationData = $derived(getNavigationItems(session));
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps} class="bg-muted/50 shadow-md">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/portal" {...props}>
							<div
								class="logo-container flex aspect-square size-8 items-center justify-center rounded-lg"
							></div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">Two Cities Church</span>
								<span class="truncate text-xs">Portal</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navigationData.navMain} />
		<Sidebar.Separator />
		<Sidebar.Group>
			<Sidebar.GroupLabel>Knowledge</Sidebar.GroupLabel>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						<BookOpen class="text-primary" />
						Knowledge Base
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>
		<NavProjects projects={navigationData.projects} />
		<NavSecondary items={navigationData.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if session?.user}
			<NavUser session={{ user: session.user }} />
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>

<style>
	.logo-container {
		background-color: hsl(var(--primary));
		-webkit-mask: url('/images/tcc-arrows.svg') center/contain no-repeat;
		mask: url('/images/tcc-arrows.svg') center/contain no-repeat;
	}
</style>
