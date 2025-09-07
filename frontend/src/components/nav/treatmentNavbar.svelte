<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Props
	let {
		treatmentTypes = [],
		doctorOptions = [],
		sortOptions = [],
		searchTerm = '',
		selectedTreatment = 'All Treatments',
		selectedDoctor = 'All Doctor',
		selectedSort = 'Treatment'
	} = $props();

	let showTreatmentDropdown = $state(false);
	let showDoctorDropdown = $state(false);
	let showSortDropdown = $state(false);

	let internalSearchTerm = $state(searchTerm);
	let internalSelectedTreatment = $state(selectedTreatment);
	let internalSelectedDoctor = $state(selectedDoctor);
	let internalSelectedSort = $state(selectedSort);

	// Sync internal state with props when they change
	$effect(() => {
		internalSearchTerm = searchTerm;
		internalSelectedTreatment = selectedTreatment;
		internalSelectedDoctor = selectedDoctor;
		internalSelectedSort = selectedSort;
	});

	function toggleDropdown(type: string) {
		showTreatmentDropdown = type === 'treatment' ? !showTreatmentDropdown : false;
		showDoctorDropdown = type === 'doctor' ? !showDoctorDropdown : false;
		showSortDropdown = type === 'sort' ? !showSortDropdown : false;
	}

	function selectOption(type: string, value: string) {
		if (type === 'treatment') {
			internalSelectedTreatment = value;
			showTreatmentDropdown = false;
		} else if (type === 'doctor') {
			internalSelectedDoctor = value;
			showDoctorDropdown = false;
		} else if (type === 'sort') {
			internalSelectedSort = value;
			showSortDropdown = false;
		}
		emitFilterChange();
	}

	function emitFilterChange() {
		dispatch('filterChange', {
			searchTerm: internalSearchTerm,
			selectedTreatment: internalSelectedTreatment,
			selectedDoctor: internalSelectedDoctor,
			selectedSort: internalSelectedSort
		});
	}

	function handleSearchInput(event: Event) {
		const target = event.target as HTMLInputElement;
		internalSearchTerm = target.value;
		emitFilterChange();
	}

	function clearFilters() {
		internalSearchTerm = '';
		internalSelectedTreatment = 'All Treatments';
		internalSelectedDoctor = 'All Doctor';
		internalSelectedSort = 'Treatment';
		emitFilterChange();
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.dropdown-container')) {
			showTreatmentDropdown = false;
			showDoctorDropdown = false;
			showSortDropdown = false;
		}
	}

	function handleAddTreatment() {
		dispatch('addTreatment');
	}

	// Check if any filters are active
	const hasActiveFilters = $derived(
		internalSearchTerm ||
			internalSelectedTreatment !== 'All Treatments' ||
			internalSelectedDoctor !== 'All Doctor' ||
			internalSelectedSort !== 'Treatment'
	);
</script>

<svelte:window onclick={handleClickOutside} />

<div class="w-full py-4">
	<div
		class="flex flex-col-reverse gap-4 bg-[#faf6f5] lg:justify-between xl:flex-row xl:items-center"
	>
		<!-- Treatment Type Buttons -->
		<div class="btn-dropdown-color1 flex w-fit rounded-full sm:flex-wrap sm:gap-2">
			{#each treatmentTypes as treatment}
				<button
					class="rounded-full px-2 py-2 whitespace-nowrap transition-all duration-200 sm:font-medium md:px-4
					{internalSelectedTreatment === treatment
						? 'add-btn-lg-color text-blue-800'
						: 'btn-dropdown-color1 text-gray-600 hover:bg-gray-50'}"
					onclick={() => selectOption('treatment', treatment)}
				>
					{treatment}
				</button>
			{/each}
		</div>

		<!-- Search + Dropdowns -->
		<div class="flex flex-wrap items-center gap-3">
			<!-- Search Input -->
			<div class="relative flex w-64 flex-1 sm:flex-none">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						class="h-4 w-4 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<input
					type="text"
					placeholder="Search treatment"
					value={internalSearchTerm}
					oninput={handleSearchInput}
					class="w-full rounded-full bg-white py-2.5 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
				/>
			</div>

			<!-- Doctor Dropdown -->
			<div class="dropdown-container relative hidden md:flex">
				<button
					class="btn-dropdown-color1 flex w-full min-w-[120px] items-center justify-between rounded-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
					onclick={() => toggleDropdown('doctor')}
				>
					<span>{internalSelectedDoctor}</span>
					<svg
						class="ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 {showDoctorDropdown
							? 'rotate-180'
							: ''}"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{#if showDoctorDropdown}
					<div
						class="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
					>
						{#each doctorOptions as doctor}
							<button
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50
								{internalSelectedDoctor === doctor ? 'bg-blue-50 text-blue-800' : ''}"
								onclick={() => selectOption('doctor', doctor)}
							>
								{doctor}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Sort Dropdown -->
			<div class="hidden items-center gap-3 md:flex">
				<span class="text-sm whitespace-nowrap text-gray-600">Sort by:</span>
				<div class="dropdown-container relative">
					<button
						class="btn-dropdown-color1 flex min-w-[100px] items-center justify-between rounded-full border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
						onclick={() => toggleDropdown('sort')}
					>
						<span>{internalSelectedSort}</span>
						<svg
							class="ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 {showSortDropdown
								? 'rotate-180'
								: ''}"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if showSortDropdown}
						<div
							class="absolute right-0 z-20 mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-lg"
						>
							{#each sortOptions as sort}
								<button
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50
									{internalSelectedSort === sort ? 'bg-blue-50 text-blue-800' : ''}"
									onclick={() => selectOption('sort', sort)}
								>
									{sort}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Add Button -->
			<button
				class="add-btn-lg-color rounded-full p-2.5 text-gray-400 text-sm font-normal transition-colors duration-200 hover:text-gray-600"
				onclick={handleAddTreatment}
			>
				Add Treatment
			</button>
		</div>
	</div>

	<!-- Mobile Treatment Type Selector  -->
	<div class="mt-4 block sm:hidden">
		<div class="dropdown-container relative">
			<button
				class="btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-4 py-2.5 text-sm text-gray-700"
				onclick={() => toggleDropdown('treatment')}
			>
				<span>{internalSelectedTreatment}</span>
				<svg
					class="ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 {showTreatmentDropdown
						? 'rotate-180'
						: ''}"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{#if showTreatmentDropdown}
				<div
					class="absolute left-0 z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
				>
					{#each treatmentTypes as treatment}
						<button
							class="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50
							{internalSelectedTreatment === treatment ? 'bg-blue-50 text-blue-800' : ''}"
							onclick={() => selectOption('treatment', treatment)}
						>
							{treatment}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>