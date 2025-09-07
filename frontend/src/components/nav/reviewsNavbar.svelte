<script>
	// > Props from parent component
	let {
		searchTerm = '',
		selectedStatus = 'All Reviews',
		selectedSort = 'Latest',
		onSearchChange,
		onStatusChange,
		onSortChange
	} = $props();

	// > Dropdown options
	const statusOptions = ['All Reviews', 'Published', 'Archived'];
	const sortOptions = ['Latest', 'Old Reviews'];

	// > Dropdown visibility states
	let showSortDropdown = $state(false);

	// > Local search input state for immediate UI updates
	let localSearchTerm = $state(searchTerm);

	// > Update local search when prop changes
	$effect(() => {
		localSearchTerm = searchTerm;
	});

	// > Toggle Dropdowns
	function toggleDropdown(dropdown) {
		showSortDropdown = dropdown === 'sort' ? !showSortDropdown : false;
	}

	// > Select Option handlers
	function selectStatus(value) {
		onStatusChange?.(value);
	}

	function selectSort(value) {
		showSortDropdown = false;
		onSortChange?.(value);
	}

	function handleSearchInput(event) {
		localSearchTerm = event.target.value;
		onSearchChange?.(localSearchTerm);
	}

	function clearSearch() {
		localSearchTerm = '';
		onSearchChange?.('');
	}

	// > Close dropdowns when clicking outside
	function handleClickOutside(event) {
		if (!event.target.closest('.dropdown-container')) {
			showSortDropdown = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div class="w-full py-3 md:py-2">
	<div
		class="flex flex-col-reverse gap-3 md:flex-row md:items-center md:gap-2 md:text-xs lg:justify-between lg:text-sm xl:flex-row xl:items-center"
	>
		<!-- > Status Filter Buttons -->
		<!-- <div class="btn-dropdown-color1 flex w-fit rounded-full sm:flex-wrap sm:gap-1.5 md:gap-1">
			{#each statusOptions as status}
				<button
					class="rounded-full px-2 py-1 text-[11px] whitespace-nowrap transition-all duration-200 md:px-3 md:py-1 md:text-xs lg:px-4 lg:py-2 lg:text-sm
					{selectedStatus === status
						? 'add-btn-lg-color text-blue-800'
						: 'btn-dropdown-color1 text-gray-600 hover:bg-gray-50'}"
					onclick={() => selectStatus(status)}
				>
					{status}
				</button>
			{/each}
		</div> -->
		<div class="btn-dropdown-color1 flex w-fit rounded-full sm:flex-wrap sm:gap-1.5 md:gap-1">
			{#each statusOptions as status}
				<button
					class="rounded-full px-2 py-1 text-[11px] whitespace-nowrap transition-all duration-200 md:px-3 md:py-1 md:text-xs lg:px-4 lg:py-2 lg:text-sm
					{selectedStatus === status
						? 'add-btn-lg-color text-blue-800'
						: 'btn-dropdown-color1 text-gray-600 hover:bg-gray-50'}"
					onclick={() => selectStatus(status)}
				>
					{status}
				</button>
			{/each}
		</div>
		<div class="flex flex-wrap items-center gap-2 md:gap-1 lg:gap-3">
			<!-- > Search + Sort Dropdown -->
			<div class="flex items-center gap-2">
				<!-- Search Bar -->
				<div class="relative flex w-40 flex-1 sm:w-32 sm:flex-none md:w-40 lg:w-64">
					<div
						class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 md:pl-2 lg:pl-3"
					>
						<svg
							class="h-3 w-3 text-gray-400 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
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
						placeholder="Search reviews..."
						value={localSearchTerm}
						oninput={handleSearchInput}
						class="w-full rounded-full bg-white py-1.5 pr-3 pl-8 text-xs focus:border-transparent focus:ring-2 focus:ring-blue-300 focus:outline-none md:text-xs lg:py-2.5 lg:pl-10 lg:text-sm"
					/>
					{#if localSearchTerm}
						<button class="absolute inset-y-0 right-0 flex items-center pr-3" onclick={clearSearch}>
							<svg
								class="h-3 w-3 text-gray-400 transition-colors hover:text-gray-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					{/if}
				</div>

				<!-- Sort Dropdown -->
				<div class="dropdown-container relative flex">
					<button
						class="btn-dropdown-color1 flex w-full min-w-[90px] items-center justify-between rounded-full px-3 py-1.5 text-xs text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none sm:w-auto lg:min-w-[120px] lg:px-4 lg:py-2 lg:text-sm"
						onclick={() => toggleDropdown('sort')}
					>
						<span>{selectedSort}</span>
						<svg
							class="ml-1 h-3 w-3 text-gray-400 transition-transform duration-200 {showSortDropdown
								? 'rotate-180'
								: ''} md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
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
							class="ring-opacity-5 absolute top-full right-0 z-20 mt-1 w-40 rounded-lg bg-white shadow-lg ring-1 ring-black lg:w-48"
						>
							{#each sortOptions as sortOption}
								<button
									class="block w-full px-3 py-2 text-left text-xs transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 lg:text-sm
									{selectedSort === sortOption ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}"
									onclick={() => selectSort(sortOption)}
								>
									<div class="flex items-center justify-between">
										<span>{sortOption}</span>
										{#if selectedSort === sortOption}
											<svg class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										{/if}
									</div>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
