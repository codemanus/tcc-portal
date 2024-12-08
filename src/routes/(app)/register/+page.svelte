<script lang="ts">
	// Modules
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	// Compoents
	import Google from '$lib/components/svgs/Google.svelte';

	// Types and constants
	import type { ActionResult } from '@sveltejs/kit';
	import type { ErrorRegisterUser } from '$lib/types/account';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errors: ErrorRegisterUser;

	/**
	 * Custom handler for submission
	 *
	 * @param event
	 */
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		try {
			const formData = new FormData(event.currentTarget);
			const response = await fetch(event.currentTarget.action, {
				method: 'POST',
				body: formData
			});

			const result: ActionResult = deserialize(await response.text());

			if (result.type == 'redirect') {
				await invalidateAll();
				await applyAction(result);
			} else if (result.type == 'failure') {
				if (result.data && result.data.errors) {
					errors = result.data.errors;
				}
			} else {
				errors = { other: 'Unknown error occurred' };
			}
		} catch (error: any) {
			errors = { other: 'Unknown error occurred' };
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center md:mt-20 lg:mt-20">
	<div class="test bg-base-200 w-full max-w-md rounded-xl px-8 py-6 text-center">
		<h3 class="mb-4 mt-4 text-center text-3xl font-bold">Register</h3>

		<form
			action="?/email"
			class="form-control gap-2 rounded p-4"
			method="POST"
			on:submit|preventDefault={handleSubmit}
		>
			<div>
				<label for="username" class="std-input-label mb-1">Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					class="std-input-field"
					bind:value={username}
				/>
				<p class="std-input-error mt-1">{errors?.username || ''}</p>
			</div>

			<div>
				<label for="email" class="std-input-label mb-1">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="std-input-field"
					bind:value={email}
				/>
				<p class="std-input-error mt-1">{errors?.email || ''}</p>
			</div>

			<div>
				<label for="password" class="std-input-label mb-1">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="std-input-field"
					bind:value={password}
				/>
				<p class="std-input-error mt-1">{''}</p>
			</div>

			<div>
				<label for="passwordConfirm" class="std-input-label mb-1">Password confirmation</label>
				<input
					type="password"
					placeholder="Confirm Password"
					name="passwordConfirm"
					class="std-input-field"
					bind:value={confirmPassword}
				/>
				<p class="std-input-error mt-1">{errors?.password || ''}</p>
			</div>

			<div>
				<p class="std-input-error mt-1 text-center">{errors?.other || ''}</p>
			</div>

			<div class="mt-4 flex justify-center">
				<button class="std-input-button px-6 py-2 leading-5">Register</button>
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
			<Google buttonText={'Register with Google'} />
		</form>
	</div>
</div>
