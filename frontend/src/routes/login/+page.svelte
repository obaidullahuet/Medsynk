<script>
	import { goto } from '$app/navigation';
	import { Login } from '$lib/api/auth/loginApi';
	import { createEventDispatcher } from 'svelte';
	import toast from 'svelte-french-toast';

	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';
	let errors = {};
	let successMessage = '';

	function validate() {
		errors = {};

		if (!email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';

		if (!password) errors.password = 'Password is required';

		return Object.keys(errors).length === 0;
	}

	async function handleLogin(e) {
		e.preventDefault();
		if (validate()) {
			// successMessage = 'Login successful!';
			// dispatch('login', { email });
			const response = await Login({ email, password });
			if (response && response.data) {
				email = password = '';
				toast.success(`${response.message}`);
				goto('/');
			} else {
				toast.error('Password or email is incorrect');
			}
		}
	}
</script>

<section class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
	<div
		class="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white md:h-[600px] md:flex-row"
		style="box-shadow: 0 0 30px rgba(64, 192, 229, 0.6);"
	>
		<!-- LEFT IMAGE -->
		<div
			class="hidden w-full bg-cover bg-center md:block md:w-1/2"
			style="background-image: url('/loginImage.jpeg');"
		></div>

		<!-- RIGHT LOGIN FORM -->
		<div class="flex w-full flex-col items-center justify-center px-6 py-10 md:w-1/2">
			<div class="w-full max-w-sm">
				<!-- Logo -->
				<a
					href="#"
					class="mb-6 flex items-center justify-center text-2xl font-semibold text-gray-900"
				>
					<img class="mr-2 h-8 w-8" src="/medSynk-logo.png" alt="logo" /> MedSynk
				</a>

				<h1 class="mb-6 text-center text-3xl font-bold text-gray-900">Welcome Back</h1>

				{#if successMessage}
					<p class="mb-4 rounded bg-green-100 p-2 text-green-700">{successMessage}</p>
				{/if}

				<form class="space-y-4" on:submit={handleLogin}>
					<!-- Email -->
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-900">Email</label>
						<input
							type="email"
							bind:value={email}
							placeholder="name@company.com"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						{#if errors.email}
							<p class="text-xs text-red-500">{errors.email}</p>
						{/if}
					</div>

					<!-- Password -->
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-900">Password</label>
						<input
							type="password"
							bind:value={password}
							placeholder="••••••••"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						{#if errors.password}
							<p class="text-xs text-red-500">{errors.password}</p>
						{/if}
					</div>

					<!-- Submit -->
					<button
						type="submit"
						class="btn-dropdown-color w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
					>
						Login
					</button>

					<p class="text-center text-sm text-gray-600">
						Don’t have an account?
						<a href="/signup" class="font-medium text-blue-600 hover:underline">Sign up here</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
