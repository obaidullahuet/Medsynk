<script lang="ts">
	// Sample data - replace with your actual data source
	let patients = [
		{
			id: 1,
			patient: "Patient 2",
			treatment: "Treatment 2",
			dateTime: "2024-06-13 12:30 PM",
			status: "Completed"
		},
		{
			id: 2,
			patient: "Sarah Miller",
			treatment: "Facial Rejuvenation Session",
			dateTime: "2024-06-13 11:45 AM",
			status: "Completed"
		},
		{
			id: 3,
			patient: "Maurice Bailey",
			treatment: "Laser Scar Removal",
			dateTime: "2024-06-13 08:15 AM",
			status: "In Progress"
		},
		{
			id: 4,
			patient: "Julia Watson",
			treatment: "Botox Injections 12 units face",
			dateTime: "2024-06-13 02:30 PM",
			status: "Scheduled"
		},
		{
			id: 5,
			patient: "Stephen Hawk",
			treatment: "Microdermabrasion Session",
			dateTime: "2024-06-13 01:15 PM",
			status: "Completed"
		},
		{
			id: 6,
			patient: "Emma Wilson",
			treatment: "Chemical Peel Treatment",
			dateTime: "2024-06-13 03:45 PM",
			status: "In Progress"
		}
	];

	// Function to get status styling
	function getStatusClass(status: string) {
		switch (status) {
			case 'Completed':
				return 'add-btn-lg-color';
			case 'In Progress':
				return 'btn-dropdown-color1';
			case 'Scheduled':
				return 'bg-gray-100 text-gray-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	}
</script>

<div class="rounded-2xl bg-white p-4 sm:p-6 ">
	<!-- Header -->
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-base sm:text-lg font-semibold text-gray-900">Patient Status</h2>
		<button class="text-sm text-gray-900 hover:text-blue-700 font-medium">
			View All
		</button>
	</div>

	<!-- Table Container (Scrollable) -->
	<div class="overflow-x-auto">
		<table class="min-w-full text-sm">
			<!-- Table Header -->
			<thead>
				<tr class="border-b border-gray-100 whitespace-nowrap">
					<th class="text-left pb-3 font-medium text-gray-500 pr-6">
						<div class="flex items-center gap-1">
							Patient
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</th>
					<th class="text-left pb-3 font-medium text-gray-500 pr-6">
						<div class="flex items-center gap-1">
							Treatment
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</th>
					<th class="text-left pb-3 font-medium text-gray-500 pr-6">
						<div class="flex items-center gap-1">
							Date & Time
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</th>
					<th class="text-left pb-3 font-medium text-gray-500">
						<div class="flex items-center gap-1">
							Status
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</th>
				</tr>
			</thead>

			<!-- Table Body -->
			<tbody>
				{#each patients as patient}
					<tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors whitespace-nowrap">
						<td class="py-3 pr-6 text-gray-900 font-medium">{patient.patient}</td>
						<td class="py-3 pr-6 text-gray-600 max-w-xs">
							<div class="truncate" title={patient.treatment}>
								{patient.treatment}
							</div>
						</td>
						<td class="py-3 pr-6 text-gray-600">{patient.dateTime}</td>
						<td class="py-3">
							<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium {getStatusClass(patient.status)}">
								{patient.status}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>


<style>
	
</style>