<script lang="ts">
	import type { PageData } from './$types';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip';

	let { data }: { data: PageData } = $props();
</script>

<main class="unauthorized-page">
	<h1>Unauthorized Access</h1>
	<p>You are logged in, but you do not have the necessary permissions to view this page.</p>
	
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger>
				<button class="contact-admin-button">Contact Admin</button>
			</TooltipTrigger>
			<TooltipContent>
				Contact your administrator for access
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</main>

<style>
	.unauthorized-page {
		text-align: center;
		padding: 2rem;
	}

	.contact-admin-button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.contact-admin-button:hover {
		background-color: #0056b3;
	}
</style>
