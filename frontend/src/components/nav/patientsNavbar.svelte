<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.min.css';
	import { patients as patientsData } from '$lib/patientsData/patients';
	let { searchValue = '' } = $props();
	let showCustomerDropdown = $state(false);
	let showStatusDropdown = $state(false);

	const dispatch = createEventDispatcher();

	//  Dispatch search event whenever input changes
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchValue = target.value;
		dispatch('search', searchValue);
	}

	function toggleCustomerDropdown() {
		showCustomerDropdown = !showCustomerDropdown;
		showStatusDropdown = false;
	}
	function toggleStatusDropdown() {
		showStatusDropdown = !showStatusDropdown;
		showCustomerDropdown = false;
	}
	function openAddPatientPage() {
		goto('/patients/add');
	}
	function selectDoctor(name: string) {
		dispatch('filterDoctor', name);
		showStatusDropdown = false;
	}
	function selectTreatment(treatment: string) {
		dispatch('filterTreatment', treatment);
		showCustomerDropdown = false;
	}

	// Flatpickr integration
	onMount(() => {
		const datepickerElement = document.getElementById("datepicker");
		if (datepickerElement) {
			flatpickr(datepickerElement, {
				dateFormat: "Y-m-d",
				altInput: true,
				altFormat: "F j, Y",
				defaultDate: "today",
				onChange: (_, dateStr) => {
					dispatch('filterDate', dateStr);
				}
			});
		}
	});
</script>

<!--  ORIGINAL NAVBAR -->
<nav
	class="flex w-full flex-wrap gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2"
>
	<div class="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-start">
		<div class="flex w-full items-center gap-2 md:hidden">
			<input
				type="text"
				placeholder="Search..."
				class="flex-1 rounded-md border px-3 py-1.5 text-sm"
				value={searchValue}
				oninput={handleInput}
			/>
			<div class="flex gap-2">
				<button class="btn-dropdown-color1 h-7 w-6 rounded-full text-base font-bold">+</button>
				<button class="btn-dropdown-color1 h-7 w-6 rounded-full text-base font-bold">−</button>
			</div>
		</div>

		<input
			type="text"
			placeholder="Search patients,treatments.."
			class="hidden w-56 rounded-full bg-white px-3 py-2 text-sm lg:block"
			value={searchValue}
			oninput={handleInput}
		/>

		<div class="relative hidden md:block">
			<button
				onclick={toggleCustomerDropdown}
				class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-2 text-sm font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"
			>
				<span>Treatment</span>
				<svg
					class="ml-1 h-3.5 w-4 md:h-4 md:w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 2 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{#if showCustomerDropdown}
				<div
					class="absolute left-0 z-10 mt-1 max-h-48 w-40 overflow-y-auto rounded-lg border bg-white shadow-lg"
				>
					<!-- Reset Option -->
					<button
						class="block w-full px-3 py-1.5 text-left text-xs font-semibold hover:bg-gray-100"
						onclick={() => selectTreatment('')}
					>
						All Treatments
					</button>

					<!-- Show All Treatments From Patients -->
					{#each patientsData as p}
						<button
							class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
							onclick={() => selectTreatment(p.treatment)}
						>
							{p.treatment}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<div class="relative hidden md:block">
			<button
				onclick={toggleStatusDropdown}
				class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"
			>
				<span>Doctor</span>
				<svg
					class="ml-1 h-3.5 w-3.5 md:h-4 md:w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{#if showStatusDropdown}
				<div
					class="absolute left-0 z-10 mt-1 max-h-48 w-40 overflow-y-auto rounded-lg border bg-white shadow-lg"
				>
					<button
						class="block w-full px-3 py-1.5 text-left text-xs font-semibold hover:bg-gray-100"
						onclick={() => selectDoctor('')}
					>
						All Doctors
					</button>
					{#each patientsData as doc}
						<button
							class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
							onclick={() => selectDoctor(doc.doctor)}
						>
							{doc.doctor}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<div class="flex flex-wrap items-center gap-2">
	<div class="relative hidden md:block">
	<input
		id="datepicker"
		type="text"
		placeholder="Select Date"
		class="btn-dropdown-color1 rounded-full w-32 pr-8 pl-3 py-1.5 text-xs lg:w-40 lg:pr-10 lg:pl-4 lg:py-2 lg:text-sm"
	/>
	<svg
		class="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		viewBox="0 0 24 24"
	>
		<path stroke-linecap="round" stroke-linejoin="round"
			d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v2H9V3a1 1 0 00-1-1H6a1 1 0 00-1 1v2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
	</svg>
</div>


		<button
			class="hidden h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 md:flex lg:hidden"
		>
			<svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
			</svg>
		</button>

		<!-- Add Patient Button -->
		<button
			onclick={openAddPatientPage}
			class="add-btn-lg-color hidden rounded-full px-3 py-1.5 text-xs md:block lg:px-4 lg:py-2 lg:text-sm"
		>
			+ Add Patient
		</button>
	</div>
</nav>
