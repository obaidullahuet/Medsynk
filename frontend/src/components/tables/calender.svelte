<script>
	const currentMonth = 'September 2028';
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const dates = [
		[null, null, null, null, null, 1, 2],
		[3, 4, 5, 6, 7, 8, 9],
		[10, 11, 12, 13, 14, 15, 16],
		[17, 18, 19, 20, 21, 22, 23],
		[24, 25, 26, 27, 28, 29, 30]
	];

	const highlightedDates = [4, 25, 26];
</script>

<div class="rounded-xl  bg-white   ">
	<div class="mb-4 flex items-center justify-between">
		<h3 class="text-lg font-semibold text-gray-900">{currentMonth}</h3>
		<div class="flex space-x-2">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button class="rounded p-1 hover:bg-gray-100">
				<iconify-icon icon="mdi:chevron-left" class="text-gray-400"></iconify-icon>
			</button>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button class="rounded p-1 hover:bg-gray-100">
				<iconify-icon icon="mdi:chevron-right" class="text-gray-400"></iconify-icon>
			</button>
		</div>
	</div>

	<div class="mb-2 grid grid-cols-7 gap-1">
		{#each days as day}
			<div class="py-2 text-center text-xs font-medium text-gray-500">{day}</div>
		{/each}
	</div>

	<div class="grid grid-cols-7 gap-1">
		{#each dates as week}
			{#each week as date}
				<div class="flex aspect-square items-center justify-center text-sm">
					{#if date}
						<button
							class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100
                     {highlightedDates.includes(date) ? 'add-btn-lg-color text-white' : 'text-gray-700'}"
						>
							{date}
						</button>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>
