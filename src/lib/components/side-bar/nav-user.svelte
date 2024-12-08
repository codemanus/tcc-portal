<script lang="ts">
	import BadgeCheck from 'lucide-svelte/icons/badge-check';
	import Bell from 'lucide-svelte/icons/bell';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import LogOut from 'lucide-svelte/icons/log-out';
	import Sparkles from 'lucide-svelte/icons/sparkles';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';

	let {
		session
	}: {
		session: {
			user: {
				name?: string;
				email: string;
				picture?: string;
			};
		};
	} = $props();

	// Get user info from session
	const userInfo = {
		name: session.user.name || 'User',
		email: session.user.email,
		avatar: session.user.picture || '' // This now matches what we set in +layout.server.ts
	};

	const sidebar = useSidebar();

	const handleLogout = () => {
		console.log('Logout button clicked');

		return async ({ result }: { result: ActionResult }) => {
			console.log('Form submission completed', result);
			if (result.type === 'success') {
				await invalidateAll();
			}
		};
	};
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={userInfo.avatar} alt={userInfo.name} />
							<Avatar.Fallback class="rounded-lg">
								{userInfo.name.slice(0, 2).toUpperCase()}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{userInfo.name}</span>
							<span class="truncate text-xs">{userInfo.email}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={userInfo.avatar} alt={userInfo.name} />
							<Avatar.Fallback class="rounded-lg">
								{userInfo.name.slice(0, 2).toUpperCase()}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{userInfo.name}</span>
							<span class="truncate text-xs">{userInfo.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<Sparkles class="text-primary" />
						Messages
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<BadgeCheck class="text-primary" />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CreditCard class="text-primary" />
						<a href="/portal/settings">Settings</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Bell class="text-primary" />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<ThemeToggle />
				<DropdownMenu.Item>
					<form action="/portal?/logout" method="POST" use:enhance={handleLogout} class="w-full">
						<button type="submit" class="flex w-full items-center gap-2">
							<LogOut class="text-primary" />
							<span>Log out</span>
						</button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
