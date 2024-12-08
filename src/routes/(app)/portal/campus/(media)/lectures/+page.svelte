<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink } from 'lucide-svelte';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';
	import LectureCard from './LectureCard.svelte';

	export let data: PageData;

	setBreadcrumbs([{ label: 'Campus', href: '/portal/campus' }, { label: 'Lectures' }]);
</script>

<div class="lectures-grid">
	{#each data?.lectures as lecture}
		<LectureCard {lecture} />
	{/each}
</div>

<style>
	.lectures-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 1.5rem;
	}
</style>
