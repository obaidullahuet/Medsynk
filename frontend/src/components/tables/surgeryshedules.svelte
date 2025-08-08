<script>
	// Surgery schedules data
	const schedules = [
		{
			id: 1,
			doctor: 'Dr. Olivia Grant',
			patient: 'Sarah Miller',
			room: 'OR 1',
			time: '9:00 AM - 11:30 AM',
			completed: true
		},
		{
			id: 2,
			doctor: 'Dr. David Carter',
			patient: 'Michael Brown',
			room: 'OR 2',
			time: '12:00 PM - 2:00 PM',
			completed: true
		},
		{
			id: 3,
			doctor: 'Dr. Emily Ross',
			patient: 'Julia Watson',
			room: 'OR 3',
			time: '2:30 PM - 4:00 PM',
			completed: false
		},
		{
			id: 4,
			doctor: 'Dr. Emily Ross',
			patient: 'Julia Watson',
			room: 'OR 3',
			time: '2:30 PM - 4:00 PM',
			completed: false
		},
		{
			id: 5,
			doctor: 'Dr. Emily Ross',
			patient: 'Julia Watson',
			room: 'OR 3',
			time: '2:30 PM - 4:00 PM',
			completed: false
		}
	];

	const currentDate = 'Tuesday, 5 Sep 2028';
</script>

<div class="rounded-2xl py-2 bg-white">
	<!-- Header -->
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h2 class="mb-1 text-lg font-semibold text-gray-900">Surgery Schedules</h2>
			<p class="text-sm text-gray-500">{currentDate}</p>
		</div>
		<button
			class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
		>
			<svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
		</button>
	</div>

	<!-- Schedule List -->
	<div class="space-y-2">
		{#each schedules as schedule}
			<div
				class="flex items-start gap-2 rounded-xl  p-2 transition-colors "
			>
				<!-- Checkmark -->
				<div class="mt-1 flex-shrink-0">
					{#if schedule.completed}
						<div class="flex h-5 w-5 items-center justify-center rounded-md  add-btn-lg-color">
							<svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
					{:else}
						<div class="h-5 w-5 rounded-md border-2 border-gray-300"></div>
					{/if}
				</div>

				<!-- Content -->
				<div class="min-w-0 flex-1">
					<div class="flex items-start justify-between gap-2">
						<div class="min-w-0 flex-1">
							<p class="text-sm font-semibold text-gray-900 sm:text-base lg:text-xs whitespace-nowrap xl:text-base ">{schedule.doctor}</p>
							<p class="mt-1  text-xs text-gray-600">{schedule.patient}</p>
						</div>
						<div class="flex-shrink-0 text-right">
							<span
								class="mb-1 inline-block rounded-full btn-dropdown-color1 px-1 py-1 text-xs lg:text-xs font-medium "
							>
								Room {schedule.room}
							</span>
							<p class="text-xs  text-gray-600 sm:text-sm lg:text-xs">{schedule.time}</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
		<button class="rounded-full btn-dropdown-color1 p-3 w-full">View all schedules</button>
	</div>
</div>
