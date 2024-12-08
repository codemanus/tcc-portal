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

	const data = {
		user: {
			name: 'Cody Chambers',
			email: 'corkycodeman@proton.me',
			avatar: '/avatar/profile-pic.jpg'
		},
		navMain: [
			{
				title: 'Care',
				url: '#',
				icon: HeartHandshake,
				isActive: true,
				items: [
					{
						title: 'Things to do',
						url: '#'
					},
					{
						title: 'Prayer',
						url: '#'
					},
					{
						title: 'Settings',
						url: '#'
					}
				]
			},
			{
				title: 'Kids',
				url: '#',
				icon: Baby,
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
		],
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
		projects: [
			{
				name: 'Campus Board',
				url: '/portal/campus/board',
				icon: School
			},
			{
				name: 'Assignments',
				url: '/portal/campus/assignments',
				icon: Paperclip
			},
			{
				name: 'Grades',
				url: '/portal/campus/grades',
				icon: FileCheck
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from '$lib/components/side-bar/nav-main.svelte';
	import NavProjects from '$lib/components/side-bar/nav-projects.svelte';
	import NavSecondary from '$lib/components/side-bar/nav-secondary.svelte';
	import NavUser from '$lib/components/side-bar/nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		session,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		session: {
			user: {
				name?: string;
				email: string;
				picture?: string;
			};
		};
	} = $props();
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
		<NavMain items={data.navMain} />
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
		<NavProjects projects={data.projects} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {session} />
	</Sidebar.Footer>
</Sidebar.Root>

<style>
	.logo-container {
		background-color: hsl(var(--primary));
		-webkit-mask: url('/images/tcc-arrows.svg') center/contain no-repeat;
		mask: url('/images/tcc-arrows.svg') center/contain no-repeat;
	}
</style>
