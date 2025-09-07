<script>
	// Treatment data
	const treatments = [
		{
			id: 1,
			name: 'Facial Rejuvenation',
			rating: '4.2',
			reviews: '12500'
		},
		{
			id: 2,
			name: 'Laser Hair Removal',
			rating: '4.2',
			reviews: '12500'
		},
		{
			id: 3,
			name: 'Body Contouring',
			rating: '4.2',
			reviews: '12500'
		},
		{
			id: 4,
			name: 'Body Contouring',
			rating: '4.2',
			reviews: '12500'
		},
		{
			id: 5,
			name: 'Body Contouring',
			rating: '4.2',
			reviews: '12500'
		},
		{
			id: 6,
			name: 'Body Contouring',
			rating: '4.2',
			reviews: '12500'
		}
	];
</script>

<div class="rounded-2xl border border-gray-100 bg-white py-4 px-2">
	<!-- Header -->
	<div class="mb-6">
		<h2 class="mb-1 text-lg font-semibold text-gray-900">Most Popular Treatments</h2>
	</div>

	<!-- Treatment List -->
	<div class="space-y-2">
		{#each treatments as treatment}
			<div
				class="flex cursor-pointer items-center gap-4 rounded-xl p-2 "
			>
				<!-- Icon -->
				<div class="flex-shrink-0">
					<div
						class="btn-dropdown-color1 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
					>
						{treatment.id.toString().padStart(2, '0')}
					</div>
				</div>

				<!-- Content -->
				<div class="min-w-0 flex-1">
					<h3 class="mt-1 text-sm font-medium text-gray-900">{treatment.name}</h3>
					<div class="flex items-center justify-between space-x-2">
						<!-- Rating with star icon -->
						<p class="mt-1 flex items-center text-xs text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								class="mr-1 h-3 w-3 text-yellow-400"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.73z"
								/>
							</svg>
							{treatment.rating}
						</p>

						<!-- Reviews with small circle -->
						<p class="mt-1 flex items-center text-xs text-gray-600">
							<span class="mr-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							{treatment.reviews} reviews
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
