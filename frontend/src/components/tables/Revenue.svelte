<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);

	let chartCanvas;
	let chartInstance;

	const revenueData = [
		{ month: 'Jan', income: 6000, expenses: 2000 },
		{ month: 'Feb', income: 6200, expenses: 2100 },
		{ month: 'Mar', income: 6100, expenses: 2200 },
		{ month: 'Apr', income: 6300, expenses: 2400 },
		{ month: 'May', income: 6700, expenses: 2500 },
		{ month: 'Jun', income: 7150, expenses: 2700 },
		{ month: 'Jul', income: 7125, expenses: 3100 },
		{ month: 'Aug', income: 6900, expenses: 2950 },
		{ month: 'Sep', income: 6400, expenses: 2800 },
		{ month: 'Oct', income: 6100, expenses: 2750 },
		{ month: 'Nov', income: 5800, expenses: 2700 },
		{ month: 'Dec', income: 6000, expenses: 2650 }
	];

	const netProfit = revenueData.map(d => d.income - d.expenses);

	onMount(() => {
		const config = {
			type: 'line',
			data: {
				labels: revenueData.map(d => d.month),
				datasets: [
					{
						label: 'Income',
						data: revenueData.map(d => d.income),
						borderColor: '#40C0E5',
						backgroundColor: '#40C0E5',
						tension: 0.4,
						fill: false,
						pointRadius: 4,
						pointHoverRadius: 6,
						pointBackgroundColor: '#40C0E5',
						borderWidth: 2
					},
					{
						label: 'Expenses',
						data: revenueData.map(d => d.expenses),
						borderColor: '#D5F4FE',
						backgroundColor: '#D5F4FE',
						tension: 0.4,
						fill: false,
						pointRadius: 4,
						pointHoverRadius: 6,
						pointBackgroundColor: '#D5F4FE',
						borderWidth: 2
					},
					{
						label: 'Net Profit',
						data: netProfit,
						borderColor: 'rgb(156, 163, 175)', // Tailwind gray-400
						borderDash: [6, 6],
						borderWidth: 2,
						fill: false,
						pointRadius: 0,
						tension: 0.4
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'top',
						labels: {
							usePointStyle: true,
							color: '#4B5563'
						}
					},
					tooltip: {
						mode: 'index',
						intersect: false,
						callbacks: {
							label: ctx => {
								const val = ctx.formattedValue.replace(',', '');
								return `${ctx.dataset.label}: $${parseInt(val).toLocaleString()}`;
							}
						}
					}
				},
				scales: {
					x: {
						grid: { display: false },
						ticks: {
							color: '#6B7280'
						}
					},
					y: {
						beginAtZero: true,
						max: 8000,
						ticks: {
							color: '#6B72234',
							callback: value => `$${value / 1000}K`
						},
						grid: {
							color: 'rgba(0, 0, 0, 0.05)'
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
<div class="rounded-2xl bg-white px-4 py-14 sm:py-16 md:py-18 w-full h-80">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-sm font-semibold text-gray-700">Revenue</h2>
		<button class="rounded-xl btn-dropdown-color1 px-3 py-1 text-sm ">2027</button>
	</div>
	<canvas  bind:this={chartCanvas}></canvas>
</div>
