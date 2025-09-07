<script>
	import { signUp } from '$lib/api/auth/signupApi';
	import { createEventDispatcher } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	const dispatch = createEventDispatcher();

	let firstName = '';
	let lastName = '';
	let hospitalName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let termsAccepted = false;
	let errors = {};
	let successMessage = '';

	function validate() {
		errors = {};

		if (!firstName.trim()) errors.firstName = 'First name is required';
		if (!lastName.trim()) errors.lastName = 'Last name is required';
		// if (!hospitalName.trim()) errors.hospitalName = 'Hospital name is required';

		if (!email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';

		if (!password) errors.password = 'Password is required';
		else if (password.length < 8) errors.password = 'Password must be at least 8 characters';

		if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match';

		if (!termsAccepted) errors.terms = 'You must accept the Terms & Conditions';

		return Object.keys(errors).length === 0;
	}

	async function handleSignup(e) {
		console.log('Button click');
		e.preventDefault();

		// if (!validate()) {
		// 	// toast.error('Please fix the validation errors and try again');
		// 	return; // Exit early if validation fails
		// }

		try {
			console.log(1);
			const createdAt = new Date().toISOString();
			if (!validate()) {
				// return
				console.log('a-----');
			} else {
				console.log('In elsse');
				const result = await signUp({
					firstName,
					lastName,
					email,
					password,
					createdAt
				});
				console.log(2);
				console.log(result);

				if (result?.data) {
					// Clear form fields
					firstName = '';
					lastName = '';
					email = '';
					password = '';
					confirmPassword = '';
					termsAccepted = false;

					toast.success('Account Created Successfully');
				} else {
					const errorMessage = result?.error || 'Failed to create account';
					toast.error(errorMessage);
				}
			}
		} catch (error) {
			console.error('Signup error:', error);
			toast.error('Network error. Please try again.');
		}
	}
</script>

<section class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
	<div
		class="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white md:h-[650px] md:flex-row"
		style="box-shadow: 0 0 30px rgba(64, 192, 229, 0.6);"
	>
		<!-- LEFT SIDE IMAGE -->
		<div
			class="hidden w-full bg-cover bg-center md:block md:w-1/2"
			style="background-image: url('/signupImage.jpg');"
		></div>

		<!-- RIGHT SIDE SIGNUP FORM -->
		<div class="flex w-full flex-col items-center justify-center px-6 py-16 md:w-1/2 md:py-20">
			<div class="w-full max-w-sm">
				<!-- Logo -->
				<a
					href="#"
					class="mb-6 flex items-center justify-center text-2xl font-semibold text-gray-900"
				>
					<img class="mr-2 h-8 w-8" src="/medSynk-logo.png" alt="logo" /> MedSynk
				</a>

				<h1 class="mb-6 text-center text-3xl font-bold text-gray-900">Create an account</h1>

				{#if successMessage}
					<p class="mb-4 rounded bg-green-100 p-2 text-green-700">{successMessage}</p>
				{/if}

				<form class="space-y-4" on:submit={handleSignup}>
					<!-- First Name + Last Name -->
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-900">First Name</label>
							<input
								type="text"
								bind:value={firstName}
								placeholder="John"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
							{#if errors.firstName}
								<p class="text-xs text-red-500">{errors.firstName}</p>
							{/if}
						</div>

						<div>
							<label class="mb-1 block text-sm font-medium text-gray-900">Last Name</label>
							<input
								type="text"
								bind:value={lastName}
								placeholder="Doe"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
							{#if errors.lastName}
								<p class="text-xs text-red-500">{errors.lastName}</p>
							{/if}
						</div>
					</div>

					<!-- Hospital Name -->
					<!-- <div>
						<label class="mb-1 block text-sm font-medium text-gray-900">Hospital Name</label>
						<input
							type="text"
							bind:value={hospitalName}
							placeholder="ABC Hospital"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						/>
						{#if errors.hospitalName}
							<p class="text-xs text-red-500">{errors.hospitalName}</p>
						{/if}
					</div> -->

					<!-- Email -->
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-900">Your Email</label>
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

					<!-- Confirm Password -->
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-900">Confirm Password</label>
						<input
							type="password"
							bind:value={confirmPassword}
							placeholder="••••••••"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						{#if errors.confirmPassword}
							<p class="text-xs text-red-500">{errors.confirmPassword}</p>
						{/if}
					</div>

					<!-- Terms -->
					<div class="flex items-start">
						<input
							id="terms"
							type="checkbox"
							bind:checked={termsAccepted}
							class="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
						/>
						<label for="terms" class="ml-2 text-sm text-gray-700">
							I accept the <a href="#" class="font-medium text-blue-600 hover:underline"
								>Terms & Conditions</a
							>
						</label>
					</div>
					{#if errors.terms}
						<p class="text-xs text-red-500">{errors.terms}</p>
					{/if}

					<!-- Submit -->
					<button
						type="submit"
						class="btn-dropdown-color w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
					>
						Create an account
					</button>

					<p class="text-center text-sm text-gray-600">
						Already have an account?
						<a href="/login" class="font-medium text-blue-600 hover:underline">Login here</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
