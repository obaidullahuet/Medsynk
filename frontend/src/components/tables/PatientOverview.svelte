<script lang="ts">
	let totalPatients = 3245;

	const segments = [
		{ label: 'New Patient', percent: 45, color: '#40C0E5', count: 1460, radius: 16 },
		{ label: 'In Treatment', percent: 30, color: '#D5F4FE', count: 974, radius: 12 },
		{ label: 'Recovered', percent: 25, color: 'rgb(229, 231, 235)', count: 811, radius: 8 }
	];

	const fullCircle = 2 * Math.PI;
</script>

<div class="w-full rounded-2xl bg-white p-6">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-semibold text-gray-700">Patient Overview</h2>
		<button class="rounded-xl btn-dropdown-color1 px-3 py-1 text-sm "> Monthly </button>
	</div>

	<!-- Concentric Circle Chart -->
	<div class="relative mx-auto my-6 flex h-40 w-40 items-center justify-center">
		<svg viewBox="0 0 120 120" class="h-full w-full rotate-[-90deg]">
			<!-- Background and foreground circles -->
			{#each segments as seg}
				<!-- Background -->
				<circle
					cx="60"
					cy="60"
					r={seg.radius * 3}
					stroke={seg.color}
					stroke-opacity="0.2"
					stroke-width="8"
					fill="none"
				/>

				<!-- Progress -->
				<circle
					cx="60"
					cy="60"
					r={seg.radius * 3}
					stroke={seg.color}
					stroke-width="8"
					fill="none"
					stroke-linecap="round"
					stroke-dasharray={fullCircle * seg.radius * 3}
					stroke-dashoffset={(1 - seg.percent / 100) * fullCircle * seg.radius * 3}
				/>
			{/each}
		</svg>
	</div>

	<!-- Total -->
	<p class="text-xs text-gray-400">Total Patient</p>
	<p class="text-lg font-semibold text-gray-800">{totalPatients.toLocaleString()}</p>
	<hr class="my-2 border-t border-gray-200" />

	<!-- Stats -->
	<div class="mt-2 space-y-6">
		{#each segments as seg}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<span
						class="rounded px-1.5 py-0.5 text-xs font-semibold text-white"
						style="background-color: {seg.color}"
					>
						{seg.percent}%
					</span>
					<span class="text-sm text-gray-700">{seg.label}</span>
				</div>
                <div class="flex items-center justify-between gap-3">
				<span class="text-sm text-gray-500">👤 </span>
				<span class="text-sm text-gray-500"> {seg.count}</span>
                </div>
			</div>
		{/each}
	</div>
</div>
