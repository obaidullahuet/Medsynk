<script>
	let { name, date, review, treatment, rating, avatar, status, isSelected = false } = $props();

	let showConfirmModal = $state(false);
	let checkboxTempValue = false;

	function handleCheckboxChange(event) {
		const checked = event.target.checked;

		if (checked) {
			checkboxTempValue = true;
			showConfirmModal = true;
		} else {
			isSelected = false;
		}
	}

	function confirmSelection() {
		isSelected = checkboxTempValue;
		showConfirmModal = false;
	}

	function cancelSelection() {
		isSelected = false;
		showConfirmModal = false;
	}
</script>



<!-- Delete Confirmation Modal -->
{#if showConfirmModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
		<div class="w-[90%] max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">
			<h2 class="mb-2 text-lg font-bold text-gray-800">Confirm Deletion</h2>
			<p class="mb-4 text-sm text-gray-600">
				Are you sure you want to delete this review? This action cannot be undone.
			</p>
			<div class="flex justify-center gap-4">
				<button
					class="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
					onclick={cancelSelection}
				>
					Cancel
				</button>
				<button
					class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
					onclick={confirmSelection}
				>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- > Review Card -->
<div
	class="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-[0_0_30px_#D5F4FE] lg:flex-row"
>
	<div class="flex flex-col gap-2 max-[425px]:block lg:hidden">
		<!-- Row 1: Checkbox + Date + Archive -->
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<input
					type="checkbox"
					checked={isSelected}
					onchange={handleCheckboxChange}
					class="btn-dropdown-color h-4 w-4 shrink-0 accent-[#40C0E5]"
				/>
				<span class="text-xs text-gray-500">{date}</span>
			</div>
			<button
				class="btn-dropdown-color rounded-full px-3 py-1 text-xs font-semibold text-gray-700 transition hover:opacity-90"
			>
				{status}
			</button>
		</div>
		<br />

		<!-- Row 2: Avatar + Name + Stars + Treatment -->
		<div class="flex items-start gap-3">
			<img src={avatar} alt={name} class="h-12 w-12 shrink-0 rounded-lg object-cover" />
			<div class="flex flex-col">
				<p class="text-base font-bold text-gray-800">{name}</p>
				<div class="flex items-center gap-1">
					<div class="flex gap-0.5">
						{#each Array(5) as _, i}
							<svg
								class="h-3.5 w-3.5"
								fill={i < rating ? '#fbbf24' : 'none'}
								stroke="#fbbf24"
								stroke-width="1"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
								/>
							</svg>
						{/each}
					</div>
					<p class="ml-2 text-xs text-gray-600">{treatment}</p>
				</div>
			</div>
		</div>

		<p class="my-2 text-sm text-gray-700">{review}</p>
	</div>

	
	<div class="hidden min-w-0 flex-1 items-start gap-3 lg:flex">
		<div class="flex items-center gap-3">
			<input
				type="checkbox"
				checked={isSelected}
				onchange={handleCheckboxChange}
				class="btn-dropdown-color h-5 w-5 shrink-0 accent-[#40C0E5]"
			/>
			<img src={avatar} alt={name} class="h-16 w-16 shrink-0 rounded-xl object-cover" />
		</div>

		<div class="flex min-w-0 flex-col justify-center">
			<div class="flex flex-wrap items-center gap-2">
				<span class="truncate text-base font-bold text-gray-800">{name}</span>
				<span class="truncate text-xs text-gray-500">{date}</span>
			</div>
			<p class="mt-1 line-clamp-2 text-sm text-gray-700">{review}</p>
		</div>
	</div>

	<!-- > Right Section -->
	<div
		class="hidden flex-col flex-wrap gap-2 text-right text-sm text-gray-800 lg:flex lg:flex-row lg:items-center lg:justify-end lg:gap-4 lg:text-left"
	>
		<div class="flex flex-col items-end lg:items-start">
			<p class="text-xs text-gray-500">Treatment</p>
			<p class="max-w-[100px] truncate text-right font-medium lg:text-left">{treatment}</p>
		</div>

		<div class="flex items-center justify-end gap-0.5 lg:justify-center">
			{#each Array(5) as _, i}
				<svg
					class="h-4 w-4"
					fill={i < rating ? '#fbbf24' : 'none'}
					stroke="#fbbf24"
					stroke-width="1"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
					/>
				</svg>
			{/each}
		</div>

		<button
			class="btn-dropdown-color self-end rounded-full px-4 py-1 text-xs font-semibold text-gray-700 transition hover:opacity-90 lg:self-auto"
		>
			{status}
		</button>
	</div>
</div>

