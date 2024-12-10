<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/side-bar/app-sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { breadcrumbs } from '$lib/stores/breadcrumb';
	import { page } from '$app/stores';

	let { children } = $props();

	// Handle logout success using $effect
	$effect(() => {
		if ($page.url.searchParams.get('logged_out') === 'true') {
			window.location.href = '/';
		}
	});
</script>

<Sidebar.Provider>
	<AppSidebar session={$page.data} />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					{#each $breadcrumbs as crumb, i}
						<Breadcrumb.Item class="hidden md:block">
							{#if crumb.href}
								<Breadcrumb.Link href={crumb.href}>{crumb.label}</Breadcrumb.Link>
							{:else}
								<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
							{/if}
						</Breadcrumb.Item>
						{#if i < $breadcrumbs.length - 1}
							<Breadcrumb.Separator class="hidden md:block" />
						{/if}
					{/each}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
