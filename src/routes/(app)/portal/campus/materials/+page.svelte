<script lang="ts">
	import type { PageData } from './$types';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Book, Headphones, Monitor, Video, Wrench, BookOpen } from 'lucide-svelte';

	let { data } = $props<{ data: PageData }>();

	// Set breadcrumbs
	setBreadcrumbs([{ label: 'Campus', href: '/portal/campus' }, { label: 'Materials' }]);

	// Group resources by type
	const resourceTypes = {
		'physical-book': { label: 'Books', icon: Book },
		ebook: { label: 'eBooks', icon: BookOpen },
		audiobook: { label: 'Audiobooks', icon: Headphones },
		software: { label: 'Software', icon: Monitor },
		video: { label: 'Videos', icon: Video },
		tool: { label: 'Tools', icon: Wrench }
	};

	// Create tabs data
	const tabs = Object.entries(resourceTypes).map(([value, { label }]) => ({ value, label }));
</script>

<div class="container mx-auto flex flex-col items-center space-y-8 py-6">
	<h1 class="text-3xl font-bold">Course Materials & Resources</h1>

	<Tabs.Root value="physical-book" class="flex flex-col items-center space-y-6">
		<Tabs.List class="justify-center">
			{#each tabs as tab}
				<Tabs.Trigger value={tab.value}>{tab.label}</Tabs.Trigger>
			{/each}
		</Tabs.List>

		{#each Object.entries(resourceTypes) as [type, { label, icon: Icon }]}
			<Tabs.Content value={type}>
				<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each data.data.filter((resource: any) => resource.type === type) as resource}
						<Card.Root class="flex flex-col">
							<Card.Header>
								<img
									src={resource.thumbnail}
									alt={resource.title}
									class="h-48 w-full rounded-t-lg object-cover"
								/>
							</Card.Header>
							<Card.Content class="flex flex-1 flex-col gap-4">
								<div class="flex items-start justify-between">
									<Card.Title>{resource.title}</Card.Title>
									<Badge
										variant={resource.requirement === 'required' ? 'destructive' : 'secondary'}
									>
										{resource.requirement}
									</Badge>
								</div>

								{#if resource.author}
									<p class="text-sm text-muted-foreground">by {resource.author}</p>
								{/if}

								<p class="text-sm text-muted-foreground">{resource.description}</p>

								<div class="mt-auto space-y-4">
									{#if resource.price}
										<p class="font-semibold">{resource.price}</p>
									{/if}

									{#if resource.duration}
										<p class="text-sm">Duration: {resource.duration}</p>
									{/if}

									{#if resource.courseDependencies}
										<div class="flex flex-wrap gap-2">
											{#each resource.courseDependencies as course}
												<Badge variant="outline">{course}</Badge>
											{/each}
										</div>
									{/if}

									{#if resource.tags}
										<div class="flex flex-wrap gap-2">
											{#each resource.tags as tag}
												<a href={tag.href} class="text-xs text-muted-foreground hover:text-primary">
													#{tag.label}
												</a>
											{/each}
										</div>
									{/if}
								</div>
							</Card.Content>
							{#if resource.url}
								<Card.Footer>
									<a
										href={resource.url}
										class="w-full rounded-md bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90"
										target="_blank"
										rel="noopener noreferrer"
									>
										View Resource
									</a>
								</Card.Footer>
							{/if}
						</Card.Root>
					{/each}
				</div>
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</div>

<style>
	/* Add any custom styles here */
</style>
