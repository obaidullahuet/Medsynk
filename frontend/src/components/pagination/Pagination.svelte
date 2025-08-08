<script>
	export let totalItems = 48;
	export let itemsPerPage = 12;
	export let currentPage = 1;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	$: totalPages = Math.ceil(totalItems / itemsPerPage);
	$: startItem = (currentPage - 1) * itemsPerPage + 1;
	$: endItem = Math.min(currentPage * itemsPerPage, totalItems);

	// Build dropdown options like "1–12", "13–24", etc.
	$: rangeOptions = Array.from({ length: totalPages }, (_, i) => {
		const start = i * itemsPerPage + 1;
		const end = Math.min((i + 1) * itemsPerPage, totalItems);
		return { label: `${start}–${end}`, value: i + 1 };
	});

	function handleRangeChange(e) {
		const selectedPage = parseInt(e.target.value);
		if (selectedPage !== currentPage) {
			dispatch('pageChange', selectedPage);
		}
	}
</script>

<div class="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
	<!-- Left: Range Dropdown (Hidden on screens smaller than sm) -->
	<div class="hidden items-center gap-2 text-sm text-gray-700 sm:flex">
		<span>Showing</span>

		<select
			onchange={handleRangeChange}
			class="btn-dropdown-color1 rounded-full px-3 py-1 text-sm outline-none"
			bind:value={currentPage}
		>
			{#each rangeOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>

		<span>out of {totalItems}</span>
	</div>

	<!-- Right: Pagination Buttons (Always visible) -->
	<div class="flex items-center gap-2">
		<!-- Prev -->
		<button
			class="btn-dropdown-color1 flex h-8 w-8 items-center justify-center rounded-full text-gray-700 disabled:opacity-40"
			onclick={() => dispatch('pageChange', currentPage - 1)}
			disabled={currentPage === 1}
		>
			&lt;
		</button>

		<!-- Page Numbers -->
		{#each Array(totalPages)
			.fill(0)
			.map((_, i) => i + 1) as page}
			<button
				class={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
					page === currentPage
						? 'add-btn-lg-color font-semibold text-white'
						: 'btn-dropdown-color1 text-gray-700'
				}`}
				onclick={() => dispatch('pageChange', page)}
			>
				{page}
			</button>
		{/each}

		<!-- Next -->
		<button
			class="btn-dropdown-color1 flex h-8 w-8 items-center justify-center rounded-full text-gray-700 disabled:opacity-40"
			onclick={() => dispatch('pageChange', currentPage + 1)}
			disabled={currentPage === totalPages}
		>
			&gt;
		</button>
	</div>
</div>
