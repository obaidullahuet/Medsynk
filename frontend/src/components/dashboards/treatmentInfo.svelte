<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SpecialDoctor from '../cards/specialDoctor.svelte';

	
	export let treatment;
	export let treatmentTitles = [];

	// Group treatments by type
	$: treatmentsByType = treatmentTitles.reduce((acc: any, t: any) => {
		const key =
			t.treatmentType?.toLowerCase() === 'non_surgical'
				? 'Non-Surgical Treatment'
				: 'Surgical Treatment';
		if (!acc[key]) acc[key] = [];
		acc[key].push(t);
		return acc;
	}, {});

	// Subscribe to $page and get ID
	$: selectedTreatment = (() => {
		const id = Number($page.url.pathname.split('/').pop());
		return treatmentTitles.find((t: any) => t.id === id);
	})();

	
	$: $page; 
</script>


<div class="flex items-center justify-between border-b border-gray-200 bg-[#FFFEFC] px-2 py-4">
	<div class="flex items-center space-x-4">
		{#if selectedTreatment}
			<span class="btn-dropdown-color1 add-text-lg-color inline-block rounded-full px-4 py-2 text-sm font-medium">
				{selectedTreatment.treatmentType}
			</span>
		{/if}
	</div>

	<div class="flex items-center space-x-2">
		<!-- Navigation buttons placeholder -->
		<button class="btn-dropdown-color1 flex h-8 w-8 items-center justify-center rounded-full transition-colors">
			<svg class="add-text-lg-color h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<button class="btn-dropdown-color1 transition-color btn-dropdown-hover flex h-8 w-8 items-center justify-center rounded-full">
			<svg class="add-text-lg-color h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>
</div>

<div class="flex flex-col bg-[#FFFEFC] px-5 py-3 xl:flex-row">
	<div class="w-full lg:px-10 xl:w-[80%]">
		{#if selectedTreatment}
			<h1 class="mb-8 text-xl font-medium text-gray-900 md:text-4xl">{selectedTreatment.name}</h1>
			<div class="mb-8 overflow-hidden rounded-2xl">
				<img src={`https://htqfccxh-8000.inc1.devtunnels.ms/${selectedTreatment.image}`}  alt={selectedTreatment.name} class="h-80 w-full object-cover" />
			</div>

			<div>
				<h2 class="mb-6 font-semibold text-gray-900 md:text-2xl">About the Treatment</h2>
				<p class="text-base leading-relaxed font-medium text-gray-600">
					{selectedTreatment.about}
				</p>
			</div>

			{#if selectedTreatment.process?.length}
				<div class="mt-10">
					<h2 class="mb-6 text-2xl font-semibold text-gray-900">Process</h2>
					<ul class="list-disc space-y-6">
						{#each selectedTreatment.process as step}
							<li>
								<p class="font-semibold text-gray-800">
									{step.name} -
									<span class="text-base font-medium text-gray-600">{step.description}</span>
								</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{:else}
			<h1 class="mb-8 text-4xl font-bold text-gray-900">Loading Treatment...</h1>
		{/if}

		<SpecialDoctor />
	</div>

	<div class="bg flex h-fit flex-col gap-6 rounded-2xl bg-[#faf6f5] p-4 sm:flex-row sm:gap-4 xl:w-[20%] xl:flex-col">
		{#each Object.keys(treatmentsByType) as category}
			<div class="w-full sm:w-1/2 xl:w-full">
				<div class="mb-3">
					<h3 class="text-sm font-semibold text-gray-700 capitalize">{category}</h3>
				</div>

				<div class="space-y-1 border-l border-gray-200 pl-3">
					{#each treatmentsByType[category] as t}
						<button
							class="block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50"
							class:border-l-4={$page.url.pathname.endsWith(`/${t.id}`)}
							class:border-blue-400={$page.url.pathname.endsWith(`/${t.id}`)}
							class:bg-blue-50={$page.url.pathname.endsWith(`/${t.id}`)}
							class:text-blue-700={$page.url.pathname.endsWith(`/${t.id}`)}
							class:text-gray-600={!$page.url.pathname.endsWith(`/${t.id}`)}
							onclick={() => goto(`/treatments/${t.id}`)}
						>
							{t.name}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
