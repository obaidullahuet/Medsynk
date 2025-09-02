<script>
	import { createEventDispatcher } from 'svelte';
	import { env } from '$env/dynamic/public';

    const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
	let { name, id, specialty, contact,  profilePhoto } = $props();
	const dispatch = createEventDispatcher();

	function openDetails() {
		dispatch('select', { id });
	}
</script>

<div
	class="block h-full w-full rounded-xl bg-white p-4 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg sm:hidden"
	onclick={openDetails}
>
	<div class="flex gap-4 text-left">
		<img src={`${BASE_URL}/${profilePhoto}`} alt={name} class="h-28 w-24 flex-shrink-0 rounded-xl object-cover" />

		<div class="flex-1 overflow-hidden">
			<h2 class="truncate text-lg font-semibold">{name}</h2>
			<p class="mt-1 truncate text-sm text-gray-500">
				{id} • <span class="text-black">{specialty}</span>
			</p>
			<p class="mt-1 truncate text-sm text-gray-600">📞 {contact}</p>

			<!-- Rating -->
			<!-- <div class="mt-3 border-t border-gray-200 pt-2">
				<div class="flex flex-wrap items-center gap-x-1 text-sm text-gray-700">
					<div class="flex items-center gap-[1px]">
						{#each Array(5) as _, i}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill={i < Math.round(rating) ? '#fcd34d' : 'none'}
								viewBox="0 0 24 24"
								stroke="#fcd34d"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z"
								/>
							</svg>
						{/each}
					</div>
					<span>{rating}</span>
					<span class="text-xs text-gray-500">({reviews.toLocaleString()} reviews)</span>
				</div>
			</div> -->
		
		<div class="mt-3 border-t border-gray-200 pt-2">
	<div class="flex flex-wrap items-center gap-x-1 text-sm text-gray-700">
		<div class="flex items-center gap-[1px]">
			<!-- Filled stars -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-4 w-4">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-4 w-4">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-4 w-4">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-4 w-4">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
			</svg>
			<!-- Empty star -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fcd34d" class="h-4 w-4">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
			</svg>
		</div>
		<span>4.5</span>
		<span class="text-xs text-gray-500">(1,230 reviews)</span>
	</div>
</div>

		</div>
	</div>
</div>

<!-- Card layout for larger screens with hover -->
<div
	class="hidden h-full w-full cursor-pointer rounded-xl bg-white px-6 py-10 text-center shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_4px_20px_#D5F4FE] sm:block"
	onclick={openDetails}
>
	<img src={`${BASE_URL}/${profilePhoto}`} alt={name} class="mx-auto h-24 w-24 rounded-xl object-cover" />
	<h2 class="mt-4 text-xl font-semibold">{name}</h2>

	<p class="text-sm text-gray-500">
		{id} • <span class="text-black">{specialty}</span>
	</p>

	<p class="mt-1 text-sm text-gray-600">📞 {contact}</p>

	<!-- <div class="mt-4 border-t-2 border-solid border-gray-100 pt-4">
		<div class="flex items-center justify-center gap-1">
			{#each Array(5) as _, i}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill={i < Math.round(rating) ? '#fcd34d' : 'none'}
					viewBox="0 0 24 24"
					stroke="#fcd34d"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z"
					/>
				</svg>
			{/each}
			<span class="ml-2 font-medium text-gray-700">{rating}</span>
		</div>
		<p class="text-sm text-gray-500">({reviews.toLocaleString()} reviews)</p>
	</div> -->

	<div class="mt-4 border-t-2 border-solid border-gray-100 pt-4">
	<div class="flex items-center justify-center gap-1">
		<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-5 w-5">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-5 w-5">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-5 w-5">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" fill="#fcd34d" viewBox="0 0 24 24" stroke="#fcd34d" class="h-5 w-5">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fcd34d" class="h-5 w-5">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
		</svg>
		<span class="ml-2 font-medium text-gray-700">4.5</span>
	</div>
	<p class="text-sm text-gray-500">(1,230 reviews)</p>
</div>

</div>
