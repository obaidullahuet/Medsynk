<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { env } from '$env/dynamic/public';

const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
	let { id, name, treatmentType, about, image, doctors } = $props();

	console.log("dataaaaaaaaaaaaaaaaaaaaaaaa",image)

	function openDetails() {
		dispatch('select', { id });
	}

</script>



<!--(<= 425px) -->
<div class="space-y-4 sm:hidden">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore event_directive_deprecated -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="flex cursor-pointer items-start gap-3 rounded-xl bg-transparent p-3 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md"
		on:click={openDetails}
	>
		<!-- Left: Image -->
		<img src={`${BASE_URL}/${image}`} alt={name} class="h-28 w-24 rounded-lg object-cover" />

		<!-- Right: Content -->
		<div class="flex-1">
			<span
				class="btn-dropdown-color1 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-blue-800"
			>
				{treatmentType}
			</span>
			<h2 class="mt-1 text-base font-bold text-gray-900">{name}</h2>
			<p class="mt-1 line-clamp-2 text-xs text-gray-600">{about}</p>
			<div class="mt-1 flex items-center gap-1 text-xs text-gray-700">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5 text-gray-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 11c0 2.5-2 4-2 4h4s-2-1.5-2-4m0-4a2 2 0 100 4 2 2 0 000-4zm-6 8v-1a4 4 0 014-4h0a4 4 0 014 4v1M6 21h12"
					/>
				</svg>
				<span>{doctors}</span>
			</div>
		</div>
	</div>
</div>

<!--  Tablet & Desktop Layout (>425px) -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<div
	class="hidden cursor-pointer rounded-2xl bg-transparent p-4 transition-transform hover:scale-[1.03] hover:shadow-lg sm:flex sm:flex-col"
	on:click={openDetails}
>
	<!-- Image -->
	<div class="overflow-hidden rounded-2xl">
		<img src={`${BASE_URL}/${image}`} alt={name} class="h-36 w-full object-cover md:h-40" />
	</div>

	<!-- Content -->
	<span
		class="btn-dropdown-color1 mt-3 inline-block w-auto max-w-max rounded-full px-3 py-1 text-sm font-medium text-blue-800"
	>
		{treatmentType}
	</span>

	<h2 class="mt-2 text-base font-semibold text-gray-900 md:text-lg">{name}</h2>
	<p class="mt-1 line-clamp-3 text-xs text-gray-600 md:text-sm">{about}</p>

	<div class="mt-2 flex items-center gap-1 text-xs text-gray-700 md:mt-3 md:text-sm">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-3.5 w-3.5 text-gray-500 md:h-4 md:w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 11c0 2.5-2 4-2 4h4s-2-1.5-2-4m0-4a2 2 0 100 4 2 2 0 000-4zm-6 8v-1a4 4 0 014-4h0a4 4 0 014 4v1M6 21h12"
			/>
		</svg>
		<span>{doctors}</span>
	</div>
</div>

<style></style>
