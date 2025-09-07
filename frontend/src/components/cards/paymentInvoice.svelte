<script>
	let stats = [
		{
			title: 'Total Invoice',
			value: 815,
			change: '+2.45%',
			up: true,
			bg: 'btn-dropdown-color',
			line: 'bg-white'
		},
		{
			title: 'Paid Invoice',
			value: 430,
			change: '+3.68%',
			up: true,
			bg: 'btn-dropdown-color1',
			line: 'bg-white'
		},
		{
			title: 'Pending',
			value: 205,
			change: '-1.20%',
			up: false,
			bg: 'btn-dropdown-color',
			line: 'bg-white'
		},
		{
			title: 'Overdue',
			value: 180,
			change: '+0.84%',
			up: true,
			bg: 'btn-dropdown-color1',
			line: 'bg-white'
		}
	];
</script>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
	{#each stats as s}
		<div class={`rounded-2xl p-3 sm:p-2 md:p-4 ${s.bg}`}>
			<div class="hidden h-full w-full md:flex lg:hidden">
				<div class={`hidden h-8 w-1 rounded md:block md:h-14 ${s.line}`}></div>
				<div class="flex w-full flex-col items-end pl-3">
					<h3 class="text-[10px] font-medium text-gray-700">{s.title}</h3>
					<p class="text-sm font-bold text-gray-900 md:text-base">{s.value}</p>
					<span
						class="mt-1 flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-medium shadow"
					>
						{#if s.up}
							<svg
								class="h-2.5 w-2.5 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 10l7-7 7 7"
								/>
							</svg>
						{:else}
							<svg
								class="h-2.5 w-2.5 text-red-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 14l-7 7-7-7"
								/>
							</svg>
						{/if}
						{s.change}
					</span>
					<span class="mt-0.5 text-[7px] text-gray-500">vs last month</span>
				</div>
			</div>

			<div class="flex w-full items-center justify-between md:hidden lg:flex">
				<div class="flex items-center gap-2 sm:justify-start sm:gap-1">
					<div class={`hidden h-8 w-1 rounded md:block ${s.line}`}></div>
					<div class="sm:flex sm:flex-col sm:items-start">
						<h3 class="text-[11px] font-medium text-gray-700 sm:text-[10px] lg:text-sm">
							{s.title}
						</h3>
						<p class="text-lg font-bold text-gray-900 sm:text-base lg:text-xl">{s.value}</p>
					</div>
				</div>

				<div class="flex flex-col items-end sm:items-end">
					<span
						class="flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-medium shadow sm:text-[8px] lg:text-[10px]"
					>
						{#if s.up}
							<svg
								class="h-2.5 w-2.5 text-green-600 lg:h-3 lg:w-3"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 10l7-7 7 7"
								/>
							</svg>
						{:else}
							<svg
								class="h-2.5 w-2.5 text-red-600 lg:h-3 lg:w-3"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 14l-7 7-7-7"
								/>
							</svg>
						{/if}
						{s.change}
					</span>
					<span class="mt-0.5 text-[8px] text-gray-500 sm:text-[7px] lg:text-[10px]"
						>vs last month</span
					>
				</div>
			</div>
		</div>
	{/each}
</div>

<hr class="mt-5 border-t-2 border-gray-200" />
