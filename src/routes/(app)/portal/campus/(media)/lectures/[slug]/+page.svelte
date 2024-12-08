<script lang="ts">
	import type { PageData } from './$types';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';

	export let data: PageData;
	const { lecture } = data;

	setBreadcrumbs([
		{ label: 'Campus', href: '/portal/campus' },
		{ label: 'Lectures', href: '/portal/campus/lectures' },
		{ label: lecture?.title ?? 'Untitled Lecture' }
	]);

	// Extract video ID from YouTube URL
	const getYouTubeId = (url: string) => {
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[7].length === 11 ? match[7] : null;
	};

	const videoId = lecture?.videoUrl ? getYouTubeId(lecture.videoUrl) : null;
</script>

<Card.Root class="shadow-lg">
	{#if videoId}
		<div class="aspect-video w-full">
			<iframe
				title={lecture?.title}
				class="h-full w-full"
				src="https://www.youtube.com/embed/{videoId}?rel=0"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	{/if}

	<Card.Content class="space-y-4 p-6">
		<div>
			<Card.Title class="text-2xl">{lecture?.title}</Card.Title>
			<Card.Description class="text-lg">
				Week {lecture?.week} - {lecture?.course}
			</Card.Description>
		</div>

		<div class="prose dark:prose-invert">
			<p>{lecture?.description}</p>
			<div class="flex items-center gap-2 text-sm text-muted-foreground">
				<span>Duration: {lecture?.duration}</span>
				<span>•</span>
				<span>Date: {new Date(lecture?.date).toLocaleDateString()}</span>
			</div>
		</div>

		<div class="flex items-center gap-4 pt-4">
			{#if lecture?.notesUrl}
				<Button href={lecture.notesUrl} download>
					<Download class="mr-2 h-4 w-4" />
					Download Lecture Notes
				</Button>
			{/if}
			<Button variant="secondary" href="/portal/campus/lectures">Back to Lectures</Button>
		</div>
	</Card.Content>
</Card.Root>
