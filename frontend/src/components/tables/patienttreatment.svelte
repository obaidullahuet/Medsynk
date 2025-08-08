<script lang="ts">
	let totalPatients = 315;

	const segments = [
		{ label: 'Rhinoplasty', percent: 45, color: '#D5F4FE', count: 142 },
		{ label: 'Rhytidectomy', percent: 35, color: '#D5F4FE', count: 110 },
		{ label: 'Blepharoplasty', percent: 20, color: 'gray-300', count: 63 }
	];
</script>

<div class="w-full rounded-2xl bg-white p-6">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-semibold text-gray-700">Patient by Treatment</h2>
		<button class="rounded-xl  px-3 py-1 text-sm  btn-dropdown-color1">Today</button>
	</div>

	<div class="relative mx-auto my-6 flex h-40 w-40 items-center justify-center">
		<svg viewBox="0 0 36 36" class="h-full w-full rotate-[-90deg]">
			<circle
				class="text-gray-100"
				stroke-width="3"
				stroke="currentColor"
				fill="transparent"
				r="16"
				cx="18"
				cy="18"
			/>
			<circle
				stroke="#D5F4FE"  
				stroke-width="3"
				stroke-dasharray="45, 100"
				stroke-linecap="round"
				fill="transparent"
				r="16"
				cx="18"
				cy="18"
			/>
			<circle
				stroke="#40C0E5"  
				stroke-width="3"
				stroke-dasharray="35, 100"
				stroke-dashoffset="-45"
				stroke-linecap="round"
				fill="transparent"
				r="16"
				cx="18"
				cy="18"
			/>
			<circle
				stroke="rgb(229, 231, 235)"  
				stroke-width="3"
				stroke-dasharray="20, 100"
				stroke-dashoffset="-80"
				stroke-linecap="round"
				fill="transparent"
				r="16"
				cx="18"
				cy="18"
			/>
		</svg>

		<div class="absolute text-center">
			<p class="text-xs text-gray-400">Total Patient</p>
			<p class="text-lg font-semibold text-gray-800">{totalPatients}</p>
		</div>
	</div>


	<div class="mt-2 space-y-6">
		{#each segments as seg}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<span
						class="h-2 w-2 rounded-full"
						class:add-btn-lg-color ={seg.label === 'Rhinoplasty'}
						class:btn-dropdown-color1={seg.label === 'Rhytidectomy'}
						class:bg-gray-400={seg.label === 'Blepharoplasty'}
					></span>
					<span class="text-sm text-gray-700">{seg.label}</span>
				</div>
				<div class="flex items-center justify-between gap-2">
					<span class="text-sm text-gray-500">👤 </span>
					<span class="text-sm text-gray-500"> {seg.count}</span>
					<span class="text-sm font-semibold text-gray-700">{seg.percent}%</span>
				</div>
			</div>
		{/each}
	</div>
</div>
