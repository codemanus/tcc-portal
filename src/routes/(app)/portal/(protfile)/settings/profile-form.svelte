<script lang="ts" context="module">
	import { z } from 'zod';
	export const profileFormSchema = z.object({
		username: z
			.string()
			.min(2, 'Username must be at least 2 characters')
			.max(30, 'Username must not exceed 30 characters')
			.regex(
				/^[a-zA-Z0-9_-]+$/,
				'Username can only contain letters, numbers, underscores, and hyphens'
			),
		email: z
			.string({ required_error: 'Email is required' })
			.email('Please enter a valid email address'),
		bio: z
			.string()
			.min(4, 'Bio must be at least 4 characters')
			.max(160, 'Bio cannot exceed 160 characters')
			.default(''),
		urls: z.array(z.string().url('Please enter a valid URL')).default([])
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { tick } from 'svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { cn } from '$lib/utils.js';
	import { browser } from '$app/environment';

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(profileFormSchema)
	});

	const { form: formData, enhance, submitting } = form;

	function addUrl() {
		if ($formData.urls.length >= 5) return;

		const lastUrl = $formData.urls[$formData.urls.length - 1];
		if (!lastUrl || lastUrl.trim()) {
			$formData.urls = [...$formData.urls, ''];

			tick().then(() => {
				const urlInputs = document.querySelectorAll<HTMLElement>(
					'#profile-form input[name="urls"]'
				);
				const lastInput = urlInputs[urlInputs.length - 1];
				lastInput?.focus();
			});
		}
	}

	$: selectedEmail = {
		label: $formData.email,
		value: $formData.email
	};

	interface EmailOption {
		label: string;
		value: string;
	}

	const EMAIL_OPTIONS: EmailOption[] = [
		{ label: 'Primary Email', value: $formData.email }
		// Add more verified emails here if needed
	];
</script>

<form
	method="POST"
	class="space-y-8"
	use:enhance
	id="profile-form"
	aria-label="Profile Settings Form"
>
	<Form.Field {form} name="username">
		<Form.Control>
			<Form.Label>Username</Form.Label>
			<div class="relative">
				<span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
				<Input
					placeholder="username"
					bind:value={$formData.username}
					aria-label="Enter username"
					aria-describedby="username-description"
					class="pl-8"
					disabled={$submitting}
					{...form.getFieldProps('username')}
				/>
			</div>
		</Form.Control>
		<Form.Description id="username-description">
			This is your public display name. It can be your real name or a pseudonym. You can only change
			this once every 30 days.
		</Form.Description>
		<Form.FieldErrors class="text-sm text-destructive" />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Select.Root
				selected={selectedEmail}
				onSelectedChange={(s) => {
					s && ($formData.email = s.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value
						placeholder="Select a verified email to display"
						value={selectedEmail.value}
					/>
				</Select.Trigger>
				<Select.Content>
					{#each EMAIL_OPTIONS as option}
						<Select.Item value={option.value} label={option.label} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden name={attrs.name} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>
			You can manage verified email addresses in your <a href="/examples/forms">email settings</a>.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="bio">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea {...attrs} bind:value={$formData.bio} />
		</Form.Control>
		<Form.Description>
			You can <span>@mention</span> other users and organizations to link to them.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div>
		<Form.Fieldset {form} name="urls">
			<Form.Legend>URLs</Form.Legend>
			{#each $formData.urls as _, i}
				<Form.ElementField {form} name="urls[{i}]">
					<Form.Description class={cn(i !== 0 && 'sr-only')}>
						Add links to your website, blog, or social media profiles.
					</Form.Description>
					<Form.Control let:attrs>
						<Input {...attrs} bind:value={$formData.urls[i]} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
			{/each}
		</Form.Fieldset>
		<Button
			type="button"
			variant="outline"
			size="sm"
			class="mt-2"
			on:click={addUrl}
			aria-label="Add URL field"
		>
			Add URL
		</Button>
	</div>

	<Form.Button disabled={$submitting}>
		{#if $submitting}
			<span class="mr-2 inline-block animate-spin">⟳</span>
		{/if}
		Update profile
	</Form.Button>
</form>

{#if browser && import.meta.env.DEV}
	<SuperDebug data={$formData} />
{/if}
