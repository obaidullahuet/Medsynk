<script>
	import { createEventDispatcher } from 'svelte';
	import { patients as patientsData } from '$lib/patientsData/patients';
	let { searchValue = '' } = $props();
	let showCustomerDropdown = $state(false);
	let showStatusDropdown = $state(false);
	let showAddPatientModal = $state(false);
	let previewImage = $state('');

	const dispatch = createEventDispatcher();

	//  Dispatch search event whenever input changes
	function handleInput(e) {
		searchValue = e.target.value;
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
	function openAddPatientModal() {
		showAddPatientModal = true;
	}
	function closeAddPatientModal() {
		showAddPatientModal = false;
		previewImage = '';
	}
	function handleImageUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => (previewImage = e.target.result);
			reader.readAsDataURL(file);
		}
	}
	function selectDoctor(name) {
		dispatch('filterDoctor', name);
		showStatusDropdown = false;
	}
	function selectTreatment(treatment) {
		dispatch('filterTreatment', treatment);
		showCustomerDropdown = false;
	}
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
				class="flex-1 rounded-full border px-3 py-1.5 text-sm"
				value={searchValue}
				oninput={handleInput}
			/>
			<div class="flex gap-1">
				<button class="btn-dropdown-color1 h-7 w-7 rounded-full text-base font-bold">+</button>
				<button class="btn-dropdown-color1 h-7 w-7 rounded-full text-base font-bold">−</button>
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
				class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"
			>
				<span>Treatment</span>
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
		<input
			type="date"
			class="btn-dropdown-color1 hidden rounded-full px-2 py-1.5 text-xs md:block lg:px-3 lg:py-2 lg:text-sm"
			onchange={(e) => dispatch('filterDate', e.target.value)}
		/>
		<button
			class="hidden h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 md:flex lg:hidden"
		>
			<svg
				class="h-4 w-4 text-gray-600"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
				/>
			</svg>
		</button>

		<!-- Add Patient Button -->
		<button
			onclick={openAddPatientModal}
			class="add-btn-lg-color hidden rounded-full px-3 py-1.5 text-xs md:block lg:px-4 lg:py-2 lg:text-sm"
		>
			+ Add Patient
		</button>
	</div>
</nav>

<!--  MODAL  -->
{#if showAddPatientModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-white/30 px-4 backdrop-blur-sm"
	>
		<div class="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
			<!-- Header -->
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-bold text-gray-700">➕ Add New Patient</h2>
				<button
					onclick={closeAddPatientModal}
					class="text-2xl leading-none text-gray-400 hover:text-gray-600">&times;</button
				>
			</div>

			<!--  Circular DP Upload -->
			<div class="mb-5 flex flex-col items-center">
				<div class="relative">
					<img
						src={previewImage || 'https://via.placeholder.com/100?text=+'}
						class="h-24 w-24 rounded-full border-2 border-gray-300 object-cover shadow-md"
					/>
					<label
						class="absolute right-0 bottom-0 cursor-pointer rounded-full bg-blue-500 p-1.5 text-white shadow hover:bg-blue-600"
					>
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
						</svg>
						<input type="file" accept="image/*" class="hidden" onchange={handleImageUpload} />
					</label>
				</div>
				<p class="mt-1 text-xs text-gray-500">Click + to upload a profile picture</p>
			</div>

			<!-- Form -->
			<div class="space-y-4">
				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Name</label>
					<input
						type="text"
						placeholder="Enter patient's name"
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					/>
				</div>
				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Date & Time</label>
					<input
						type="datetime-local"
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					/>
				</div>
				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Doctor</label>
					<select
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					>
						<option>Select Doctor</option><option>Sarah Miller</option><option>Ethan Hughes</option
						><option>Grace Parker</option>
					</select>
				</div>
				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Treatment</label>
					<select
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					>
						<option>Select Treatment</option><option>Paid</option><option>Pending</option>
					</select>
				</div>
				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Status</label>
					<select
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					>
						<option>Active</option><option>Inactive</option>
					</select>
				</div>
			</div>

			<!-- Footer -->
			<div class="mt-6 flex justify-end gap-3">
				<button
					onclick={closeAddPatientModal}
					class="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
					>Cancel</button
				>
				<button
					class="rounded-full bg-blue-500 px-5 py-2 text-sm text-white shadow transition hover:bg-blue-600"
					>Save</button
				>
			</div>
		</div>
	</div>
{/if}
