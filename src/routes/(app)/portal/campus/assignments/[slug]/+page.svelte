<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { setBreadcrumbs } from '$lib/stores/breadcrumb';

	let { data }: { data: PageData } = $props();
	let selectedFile = $state<File | null>(null);

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files?.length) {
			selectedFile = input.files[0];
		}
	}

	// Set breadcrumbs including the assignment title
	setBreadcrumbs([
		{ label: 'Campus', href: '/portal/campus' },
		{ label: 'Assignments', href: '/portal/campus/assignments' },
		{ label: data.assignment?.title ?? 'Untitled Assignment' }
	]);
</script>

<div class="container mx-auto max-w-3xl p-6">
	<Card class="shadow-lg">
		<CardHeader>
			<h1 class="text-2xl font-bold tracking-tight">{data.assignment?.title}</h1>
			<div class="mt-2 flex items-center gap-2">
				<span class="text-sm text-muted-foreground">Due: {data.assignment?.dueDate}</span>
				<span
					class="rounded-full px-2 py-1 text-xs font-medium
                    {data.assignment?.status === 'pending'
						? 'bg-yellow-100 text-yellow-800'
						: data.assignment?.status === 'completed'
							? 'bg-green-100 text-green-800'
							: 'bg-gray-100 text-gray-800'}"
				>
					{data.assignment?.status}
				</span>
			</div>
		</CardHeader>

		<CardContent class="space-y-6">
			<div>
				<p class="mb-6 leading-relaxed text-gray-700">{data.assignment?.content}</p>
			</div>

			{#if data.assignment?.status === 'pending'}
				<div class="space-y-4">
					<Label for="assignment-upload">Upload Assignment</Label>
					<div
						class="rounded-lg border-2 border-dashed border-gray-200 p-6 text-center transition-colors hover:border-primary"
					>
						<Input
							id="assignment-upload"
							type="file"
							class="hidden"
							on:change={handleFileChange}
							accept=".pdf,.doc,.docx"
						/>
						<label
							for="assignment-upload"
							class="flex cursor-pointer flex-col items-center space-y-2"
						>
							<div class="text-muted-foreground">
								{#if selectedFile}
									<p class="font-medium text-primary">{selectedFile.name}</p>
									<p class="text-sm">Click to change file</p>
								{:else}
									<p>Drag and drop your file here or click to browse</p>
									<p class="text-sm">PDF, DOC, DOCX (Max 10MB)</p>
								{/if}
							</div>
						</label>
					</div>
				</div>
			{/if}
		</CardContent>

		<CardFooter class="flex justify-between">
			<Button variant="outline" href="/portal/campus/assignments">Back</Button>
			{#if data.assignment?.status === 'pending'}
				<Button disabled={!selectedFile}>Submit Assignment</Button>
			{/if}
		</CardFooter>
	</Card>
</div>
