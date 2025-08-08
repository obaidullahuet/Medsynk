<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let showSpecializationDropdown = $state(false);
	let showStatusDropdown = $state(false);

	let selectedSpecialization = $state('');
	let selectedStatus = $state('');
	let searchQuery = $state('');

	// Props using the new syntax with proper typing
	let { specializations = [], statuses = [] } = $props();

	// Modal state & doctor form
	let showModal = $state(false);
	let doctor = $state({ name: '', specialty: '', phone: '', about: '', image: null });
	let imagePreview = $state('');

	function toggleDropdown(type) {
		if (type === 'specialization') {
			showSpecializationDropdown = !showSpecializationDropdown;
			showStatusDropdown = false;
		} else {
			showStatusDropdown = !showStatusDropdown;
			showSpecializationDropdown = false;
		}
	}

	function applyFilter() {
		dispatch('filter', {
			specialization: selectedSpecialization,
			status: selectedStatus,
			search: searchQuery
		});
	}

	function selectSpecialization(spec) {
		selectedSpecialization = spec;
		showSpecializationDropdown = false;
		applyFilter();
	}

	function selectStatus(status) {
		selectedStatus = status;
		showStatusDropdown = false;
		applyFilter();
	}

	function handleSearch(e) {
		searchQuery = e.target.value;
		applyFilter();
	}

	// Modal Handlers
	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		doctor = { name: '', specialty: '', phone: '', about: '', image: null };
		imagePreview = '';
	}

	function handleImageUpload(e) {
		const file = e.target.files[0];
		if (file) {
			doctor.image = file;
			const reader = new FileReader();
			reader.onload = (ev) => (imagePreview = ev.target.result);
			reader.readAsDataURL(file);
		}
	}

	function saveDoctor() {
		dispatch('addDoctor', doctor);
		closeModal();
	}
</script>

<div class="bg-navbar px-4 py-5">
	<div
		class="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-2 md:text-[11px] lg:flex-wrap lg:gap-4 lg:text-sm"
	>
		<!-- Mobile Search -->
		<div class="block flex w-full items-center justify-between sm:hidden md:w-auto">
			<div class="relative w-full max-w-[65%] md:max-w-[55%]">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
					<svg
						class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
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
					placeholder="Search"
					oninput={handleSearch}
					class="search-input-color block w-full rounded-full border py-1 pr-2 pl-7 text-xs focus:outline-none md:py-1 md:pl-7 md:text-[11px] lg:text-sm"
				/>
			</div>

			<div class="flex gap-1 md:gap-1.5">
				<button
					onclick={() => toggleDropdown('specialization')}
					class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full shadow-md md:h-7 md:w-7"
				>
					<svg
						class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-4 lg:w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2l-7 7v5l-2 2v-7L3 6V4z"
						/>
					</svg>
				</button>

				<button
					onclick={openModal}
					class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full shadow-md md:h-7 md:w-7"
				>
					<svg
						class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-4 lg:w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Dropdown Filters -->
		<div
			class="hidden w-full sm:flex sm:flex-row sm:items-center md:w-auto md:flex-wrap md:gap-1.5 md:text-[11px] lg:gap-3 lg:text-sm"
		>
			<div class="relative w-full sm:w-auto">
				<!-- Specialization Dropdown Button -->
				<button
					onclick={() => toggleDropdown('specialization')}
					class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-2.5 py-1 text-[11px] sm:w-32 md:text-[11px] lg:w-36 lg:text-sm"
				>
					<span>specialization</span>

					<svg
						class="ml-1 h-3 w-3 md:h-2.5 md:w-2.5 lg:h-4 lg:w-4"
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

				{#if showSpecializationDropdown}
					<div
						class="dropdown-menu-color absolute left-0 z-10 mt-1 w-40 rounded-md border shadow-lg"
					>
						{#each ['All', ...specializations] as spec}
							<button
								onclick={() => selectSpecialization(spec)}
								class="dropdown-item-color block w-full px-3 py-1 text-[11px] lg:text-sm"
							>
								{spec}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="relative w-full sm:w-auto">
				<!-- Status Dropdown Button -->
				<button
					onclick={() => toggleDropdown('status')}
					class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-2.5 py-1 text-[11px] sm:w-24 md:text-[11px] lg:w-28 lg:text-sm"
				>
					<span>status</span>
					<svg
						class="ml-1 h-3 w-3 md:h-2.5 md:w-2.5 lg:h-4 lg:w-4"
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
						class="dropdown-menu-color absolute left-0 z-10 mt-1 w-32 rounded-md border shadow-lg"
					>
						{#each ['All', ...statuses] as status}
							<button
								onclick={() => selectStatus(status)}
								class="dropdown-item-color block w-full px-3 py-1 text-[11px] lg:text-sm"
							>
								{status}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Desktop Search -->
		<div
			class="hidden w-full sm:flex sm:flex-row sm:items-center md:w-auto md:flex-wrap md:gap-1.5 md:text-[11px] lg:gap-3 lg:text-sm"
		>
			<div class="relative w-full sm:w-48 md:w-44">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
					<svg
						class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
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
					placeholder="Search doctor"
					oninput={handleSearch}
					class="search-input-color block w-full rounded-full border py-1 pr-2 pl-7 text-[11px] focus:outline-none md:py-1 md:text-[11px] lg:text-sm"
				/>
			</div>

			<button
				class="add-btn-lg-color inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] font-medium whitespace-nowrap focus:outline-none md:min-w-[80px] md:text-[11px] lg:min-w-[90px] lg:text-sm"
				onclick={openModal}
			>
				<svg
					class="mr-1 h-3 w-3 md:h-2.5 md:w-2.5 lg:h-4 lg:w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				Add Doctors
			</button>
		</div>
	</div>
</div>

<!-- Modal Implementation -->
{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div
			class="relative w-[90%] max-w-md scale-95 transform rounded-2xl border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 ease-out"
		>
			<!-- Close Button -->
			<button
				onclick={closeModal}
				class="absolute top-3 right-4 text-2xl font-bold text-gray-500 transition hover:text-red-500"
			>
				✕
			</button>

			<!-- Title -->
			<h2 class="mb-6 text-center text-xl font-bold text-gray-800">➕ Add New Doctor</h2>

			<!-- Circular Image Upload -->
			<div class="mb-5 flex justify-center">
				<label
					class="relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 shadow-md transition-all duration-300 hover:border-blue-400 hover:shadow-blue-100"
				>
					{#if imagePreview}
						<img
							src={imagePreview}
							alt="Preview"
							class="h-28 w-28 rounded-full border-2 border-white object-cover shadow-md"
						/>
					{:else}
						<span class="text-xs text-gray-500">Upload Photo</span>
					{/if}
					<input type="file" accept="image/*" class="hidden" onchange={handleImageUpload} />
				</label>
			</div>

			<!-- Inputs -->
			<div class="space-y-3">
				<input
					type="text"
					placeholder="Doctor Name"
					bind:value={doctor.name}
					class="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-2 text-sm shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				/>

				<input
					type="text"
					placeholder="Specialty"
					bind:value={doctor.specialty}
					class="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-2 text-sm shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				/>

				<input
					type="tel"
					placeholder="Phone"
					bind:value={doctor.phone}
					class="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-2 text-sm shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				/>

				<textarea
					placeholder="About Doctor"
					bind:value={doctor.about}
					rows="3"
					class="w-full resize-none rounded-lg border border-gray-300 bg-white/70 px-4 py-2 text-sm shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				></textarea>
			</div>

			<!-- Action Buttons -->
			<div class="mt-6 flex justify-end gap-3">
				<button
					onclick={closeModal}
					class="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 shadow-md transition hover:bg-gray-300 hover:shadow-lg"
				>
					Cancel
				</button>
				<button
					onclick={saveDoctor}
					class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
				>
					Save Doctor
				</button>
			</div>
		</div>
	</div>
{/if}
