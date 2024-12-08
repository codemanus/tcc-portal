<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';

	export let title: string;
	export let items: string[] = [];
</script>

{#if items.length > 0}
	<Separator />
	<div class="space-y-4">
		<h3 class="text-sm font-medium text-muted-foreground">{title}</h3>
		{#each items as item}
			<Card>
				<CardContent class="pt-4">
					<p class="whitespace-pre-wrap text-sm">{item}</p>
				</CardContent>
			</Card>
		{/each}
	</div>
{/if}
