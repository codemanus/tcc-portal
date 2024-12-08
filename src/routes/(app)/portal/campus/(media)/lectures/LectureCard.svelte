<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink } from 'lucide-svelte';
	import type { Lecture } from './types'; // You'll need to create this

	let { lecture } = $props<{ lecture: Lecture }>();
</script>

<Card.Root class="h-full overflow-hidden transition-shadow hover:shadow-lg">
	<a href="/portal/campus/lectures/{lecture.slug}" class="block h-full">
		<Card.Header class="p-0">
			<img class="thumbnail" src={lecture.thumbnailUrl} alt={`Thumbnail for ${lecture.title}`} />
		</Card.Header>
		<Card.Content class="p-6">
			<Card.Title class="mb-3 text-xl font-semibold">
				{lecture.title}
			</Card.Title>
			<Card.Description class="mb-3 text-base text-muted-foreground">
				Duration: {lecture.duration}
			</Card.Description>
			<p class="description mb-6 text-base text-muted-foreground">
				{lecture.description}
			</p>
			<div class="flex gap-3">
				<Button variant="outline" size="lg">Watch Lecture</Button>
				{#if lecture.notesUrl}
					<Button
						variant="secondary"
						size="lg"
						href={lecture.notesUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						View Notes
						<ExternalLink class="ml-2 h-4 w-4 text-primary" />
					</Button>
				{/if}
			</div>
		</Card.Content>
	</a>
</Card.Root>

<style>
	.thumbnail {
		width: 100%;
		aspect-ratio: 16/9;
		object-fit: cover;
	}

	.description {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		min-height: 4.5rem;
	}
</style>
