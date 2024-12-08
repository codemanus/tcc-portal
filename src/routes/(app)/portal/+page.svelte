<script lang="ts">
	import type { PageData } from './$types';
	import { Book, Video, Wrench, BookOpen } from 'lucide-svelte';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';

	let { data } = $props<{ data: PageData }>();

	// Set breadcrumbs for home page
	setBreadcrumbs([{ label: 'Portal' }]);

	// Define portal sections
	const portalSections = {
		courses: { label: 'My Courses', icon: Book },
		resources: { label: 'Learning Resources', icon: BookOpen },
		tools: { label: 'Study Tools', icon: Wrench },
		media: { label: 'Media Library', icon: Video }
	};

	// Create tabs data
	const tabs = Object.entries(portalSections).map(([value, { label }]) => ({ value, label }));
</script>

<div class="container mx-auto space-y-8 py-6">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-primary">Welcome to Two Cities Portal</h1>
		<p class="text-muted-foreground">
			Your gateway to biblical education, resources, and ministry coordination
		</p>
	</div>
	<div class="relative h-lvh overflow-hidden rounded-lg bg-muted p-4">
		<div
			class="absolute inset-0 bg-cover bg-center"
			style="background-image: url(https://cdn-sonevi.b-cdn.net/wp-content/uploads/2023/12/ResidencyLeft.jpg)"
		></div>
	</div>
</div>

<style>
	/* Add any custom styles here */
</style>
