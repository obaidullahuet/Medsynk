<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);

	let chartCanvas;
	let chartInstance;

	const labels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
	const datasets = [
		{
			label: 'Female',
			data: [1500, 1600, 1825, 1700, 1750, 1900, 1850, 1950],
			backgroundColor: '#40C0E5',
			borderRadius: 8,
			barPercentage: 0.6,
		},
		{
			label: 'Male',
			data: [1200, 1150, 1300, 1400, 1500, 1600, 1100, 1150],
			backgroundColor: '#D5F4FE',
			borderRadius: 8,
			barPercentage: 0.6,
		}
	];

	const totalPatients = 27930;

	onMount(() => {
		const config = {
			type: 'bar',
			data: {
				labels,
				datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'top',
						labels: {
							usePointStyle: true,
							pointStyle: 'circle'
						}
					},
					tooltip: {
						mode: 'index',
						intersect: false,
						callbacks: {
							label: function (ctx) {
								return `${ctx.dataset.label}: 👤 ${ctx.formattedValue}`;
							}
						}
					}
				},
				scales: {
					x: {
						stacked: false,
						grid: { display: false }
					},
					y: {
						stacked: false,
						beginAtZero: true,
						max: 2000,
						ticks: {
							callback: function (value) {
								return value >= 1000 ? `${value / 1000}K` : value;
							}
						}
					}
				}
			}
		};

		chartInstance = new Chart(chartCanvas, config);
		return () => chartInstance?.destroy();
	});
</script>

<!-- Chart UI -->
<div class="w-full rounded-2xl bg-white p-4 sm:p-6 md:p-8">
	<div class="flex items-center justify-between mb-4">
		<div>
			<h2 class="text-sm font-semibold text-gray-700">Patients by Gender</h2>
			<p class="text-sm text-gray-500 mt-1">Total Patient</p>
			<p class="text-xl font-semibold text-gray-800">👤 {totalPatients.toLocaleString()}</p>
		</div>
		<button class="rounded-xl btn-dropdown-color1 px-3 py-1 text-sm ">Last 8 Months</button>
	</div>

	<div class="h-72">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
</div>
