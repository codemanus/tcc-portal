<script lang="ts">
	// Libraries and modules
	import { applyAction } from '$app/forms';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	// Components
	import Google from '$lib/components/svgs/Google.svelte';

	// Types
	import type { ActionResult } from '@sveltejs/kit';

	let email = '';
	let password = '';
	let error = '';

	/**
	 * Custom submit action
	 *
	 * The currentTarget is the form being submited. It called the action on the server
	 * side then checks the result. If the result is a redirect
	 *
	 * @param event
	 */
	const handleSubmit = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const formData = new FormData(event.currentTarget);
		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'redirect') {
			await invalidateAll();
			await applyAction(result);
		} else if (result.type == 'failure') {
			error = 'Invalid username or password';
		} else {
			error = 'An unknown error occurred';
		}
	};

	/**
	 * Simply removes the error in case user tries to retype password or
	 * username after an error has occurred.
	 *
	 * @param event
	 */
	const handleKeyboardInput = (event: KeyboardEvent) => {
		error = '';
	};
</script>

<div class="flex min-h-screen flex-col items-center md:mt-20 lg:mt-20">
	<div class="bg-base-200 w-full max-w-md rounded-xl px-8 py-6">
		<h2 class="text-center text-3xl font-bold text-primary">Two Cities Portal</h2>
		<h3 class="mb-4 mt-4 text-center text-3xl font-bold">Login</h3>

		<form action="?/email" class="form-control gap-2 rounded p-4" on:submit={handleSubmit}>
			<div>
				<Label for="email">Email</Label>
				<Input
					type="email"
					placeholder="Email"
					name="email"
					class="std-input-field"
					on:keydown={handleKeyboardInput}
					bind:value={email}
				/>
			</div>

			<div class="mt-4">
				<Label for="password">Password</Label>
				<Input
					type="password"
					placeholder="Password"
					name="password"
					class="std-input-field"
					on:keydown={handleKeyboardInput}
					bind:value={password}
				/>
			</div>

			<div class="mt-2 flex justify-center">
				<p class="std-input-error">{error}</p>
			</div>

			<div class="mt-1 flex justify-center">
				<Button type="submit" class="w-full">Login</Button>
			</div>
		</form>

		<div class="pt-4">
			<hr />
		</div>

		<form
			action="?/google"
			class="form-control gap-2 rounded p-4"
			method="POST"
			on:submit|preventDefault={handleSubmit}
		>
			<Google buttonText={'Login with Google'}></Google>
		</form>
		<div class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="/register" class="underline"> Sign up </a>
		</div>
	</div>
</div>
