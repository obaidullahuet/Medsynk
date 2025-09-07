<script>
	// Recent activity data
	const activities = [
		{
			id: 1,
			time: '10:15 AM',
			type: 'appointment',
			title: 'Appointment confirmation',
			description:
				"Emily Roberts (Receptionist) confirmed Sarah Miller's appointment with Dr. Olivia Grant for Facial Rejuvenation.",
			icon: 'calendar',
		
			iconBg: 'add-btn-lg-color'
		},
		{
			id: 2,
			time: '11:00 AM',
			type: 'payment',
			title: 'Payment processed',
			description:
				"Laura Jenkins (Accountant) processed the payment for Michael Brown's Laser Hair Removal treatment.",
			icon: 'credit-card',
			iconBg: 'btn-dropdown-color1'
		},
		{
			id: 3,
			time: '12:30 PM',
			type: 'checkin',
			title: 'Patient check-in',
			description:
				'Emily Roberts (Receptionist) checked in Julia Watson for Botox Injections with Dr. Emily Ross.',
			icon: 'clipboard-check',
			iconBg: 'add-btn-lg-color'
		},
	
	];

	// Icon components as SVG
	const icons = {
		calendar: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
			<line x1="16" y1="2" x2="16" y2="6"></line>
			<line x1="8" y1="2" x2="8" y2="6"></line>
			<line x1="3" y1="10" x2="21" y2="10"></line>
		</svg>`,
		'credit-card': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
			<line x1="1" y1="10" x2="23" y2="10"></line>
		</svg>`,
		'clipboard-check': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4"></path>
		</svg>`,
		'check-circle': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
		</svg>`,
		'calendar-plus': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
			<line x1="16" y1="2" x2="16" y2="6"></line>
			<line x1="8" y1="2" x2="8" y2="6"></line>
			<line x1="3" y1="10" x2="21" y2="10"></line>
			<line x1="12" y1="14" x2="12" y2="18"></line>
			<line x1="10" y1="16" x2="14" y2="16"></line>
		</svg>`
	};
</script>

<div class="w-full  rounded-2xl">
	<!-- Header -->
	<div class="mb-5 flex items-center justify-between">
		<h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
		<button class="text-gray-400 transition-colors hover:text-gray-600">
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
				<path
					d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
				/>
			</svg>
		</button>
	</div>

	<!-- Activity List -->
	<div class="space-y-0">
		{#each activities as activity, index}
			<div class="flex items-start gap-4 py-3">
				<!-- Time -->

				<!-- Icon -->
				<div class="mt-1 flex-shrink-0">
					<div
						class="h-7 w-7 rounded-lg {activity.iconBg} flex items-center justify-center {activity.iconColor}"
					>
						{@html icons[activity.icon]}
					</div>
				</div>

				<!-- Content -->
				<div class="min-w-0 flex-1 pt-0.5">
					<div class="flex items-center justify-start gap-2">
						<span class="text-xs font-medium whitespace-nowrap text-gray-500">{activity.time}</span>
						<h3 class="mb-0.5 text-xs font-medium text-gray-500">{activity.title}</h3>
					</div>

					<p class="text-sm leading-4 lg:text-xs text-gray-900">{activity.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
