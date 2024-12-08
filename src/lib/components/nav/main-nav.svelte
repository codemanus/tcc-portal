<script lang="ts">
	import ThemeToggle from '../theme-toggle.svelte';
	import { cn } from '$lib/utils.js';
</script>

<header
	class="top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<nav class="flex items-center">
				<ThemeToggle />
			</nav>
		</div>
	</div>
</header>
