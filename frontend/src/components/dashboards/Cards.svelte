<script>
	import Icon from '@iconify/svelte';
</script>

<div class="grid grid-cols-2 gap-2">
	<!-- Earnings -->
	<div class="btn-dropdown-color1 flex rounded-2xl p-3">
		<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
			<Icon icon="mdi:currency-usd" class="h-5 w-5" />
		</div>
		<div class="flex flex-col gap-1">
			<span class="add-text-lg-color text-sm">Earnings</span>
			<div class="text-lg font-bold text-gray-900">$125,000</div>
		</div>
	</div>

	<!-- Total Patients -->
	<div class="add-btn-lg-color flex rounded-2xl p-3">
		<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
			<Icon icon="mdi:account-group" class="h-5 w-5" />
		</div>
		<div class="flex flex-col gap-1">
			<span class="add-text-lg-color1 text-sm">Total Patients</span>
			<div class="text-lg font-bold text-gray-900">315</div>
		</div>
	</div>

	<!-- Appointments -->
	<div class="add-btn-lg-color flex rounded-2xl p-3">
		<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
			<Icon icon="mdi:calendar-check" class="h-5 w-5" />
		</div>
		<div class="flex flex-col gap-1">
			<span class="add-text-lg-color1 text-sm">Appointments</span>
			<div class="text-lg font-bold text-gray-900">250</div>
		</div>
	</div>

	<!-- Surgeries -->
	<div class="btn-dropdown-color1 flex rounded-2xl p-3">
		<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
			<Icon icon="mdi:stethoscope" class="h-5 w-5" />
		</div>
		<div class="flex flex-col gap-1">
			<span class="add-text-lg-color text-sm">Surgeries</span>
			<div class="text-lg font-bold text-gray-900">65</div>
		</div>
	</div>
</div>
