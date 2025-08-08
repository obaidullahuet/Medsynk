<script>
	import ReviewCard from '../../components/cards/reviewCard.svelte';
	import ReviewsNavbar from '../../components/nav/reviewsNavbar.svelte';
	import Pagination from '../../components/pagination/Pagination.svelte';

	// > Reviews list as $state (reactive)
	let reviews = $state([
		{
			id: 1,
			name: 'Daniel Evans',
			date: 'Monday, 20 Sep 2028, 11:45 AM',
			review: 'The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)',
			treatment: 'Microderma',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 2,
			name: 'Emma Wilson',
			date: 'Tuesday, 19 Sep 2028, 2:15 PM',
			review: 'The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)',
			treatment: 'Chemical Peels',
			rating: 4,
			avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
			isSelected: false,
			status: 'Archived'
		},
		{
			id: 3,
			name: 'Grace Parker',
			date: 'Monday, 18 Sep 2028, 10:30 AM',
			review: 'The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)',
			treatment: 'Scar Removal Surgery',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
			isSelected: true,
			status: 'Published'
		},
		{
			id: 4,
			name: 'Hannah Lee',
			date: 'Saturday, 16 Sep 2028, 1:00 PM',
			review:
				"Effective acne treatment, though a bit of discomfort after. Overall, I'm happy with the results.",
			treatment: 'Acne Treatment',
			rating: 4,
			avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 5,
			name: 'Ethan Hughes',
			date: 'Friday, 15 Sep 2028, 5:00 PM',
			review: 'The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)',
			treatment: 'Tattoo Removal',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
			isSelected: false,
			status: 'Archived'
		},
		{
			id: 6,
			name: 'Sophia Martinez',
			date: 'Thursday, 14 Sep 2028, 9:30 AM',
			review: 'The Botox treatment exceeded my expectations. The results look natural.',
			treatment: 'Botox Treatment',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 7,
			name: 'Michael Chen',
			date: 'Wednesday, 13 Sep 2028, 3:45 PM',
			review:
				'Great experience with the laser hair removal. The staff was professional and the clinic was very clean.',
			treatment: 'Laser Hair Removal',
			rating: 4,
			avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 8,
			name: 'Lily Thompson',
			date: 'Tuesday, 12 Sep 2028, 11:00 AM',
			review: 'Very satisfied with the facial rejuvenation. The atmosphere was relaxing.',
			treatment: 'Facial Rejuvenation',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 9,
			name: 'James Walker',
			date: 'Monday, 11 Sep 2028, 4:20 PM',
			review: 'The service was good but the results took a while to show.',
			treatment: 'Hair Transplant',
			rating: 3,
			avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
			isSelected: false,
			status: 'Archived'
		},
		{
			id: 10,
			name: 'Chloe Bennett',
			date: 'Sunday, 10 Sep 2028, 10:45 AM',
			review: 'Loved the lip filler results! Definitely coming back.',
			treatment: 'Lip Fillers',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 11,
			name: 'Benjamin Scott',
			date: 'Saturday, 9 Sep 2028, 12:15 PM',
			review: 'Good consultation and friendly staff. Procedure was smooth.',
			treatment: 'Skin Tightening',
			rating: 4,
			avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 12,
			name: 'Natalie Brooks',
			date: 'Friday, 8 Sep 2028, 3:30 PM',
			review: 'Pleased with the laser treatment. Great hygiene and safety protocols.',
			treatment: 'Laser Skin Resurfacing',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
			isSelected: false,
			status: 'Archived'
		},
		{
			id: 13,
			name: 'Oliver White',
			date: 'Thursday, 7 Sep 2028, 5:00 PM',
			review: 'Botox session went well. Doctor was informative and precise.',
			treatment: 'Botox Treatment',
			rating: 4,
			avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
			isSelected: false,
			status: 'Published'
		},
		{
			id: 14,
			name: 'Isabella Moore',
			date: 'Wednesday, 6 Sep 2028, 9:00 AM',
			review: 'Excellent experience. My acne scars are visibly reduced!',
			treatment: 'Acne Scar Reduction',
			rating: 5,
			avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
			isSelected: false,
			status: 'Published'
		}
	]);

	// > Filter states
	let searchTerm = $state('');
	let selectedStatus = $state('All Reviews');
	let selectedSort = $state('Latest');

	// > Pagination state
	let currentPage = $state(1);
	let itemsPerPage = $state(7);

	// > Parse date function for sorting
	function parseDate(dateString) {
		const parts = dateString.split(', ');
		const datePart = parts[1];
		const timePart = parts[2];
		return new Date(`${datePart} ${timePart}`);
	}

	// > Derived filtered and sorted reviews
	let filteredReviews = $derived(() => {
		let filtered = [...reviews];

		// Filter by search term
		if (searchTerm && searchTerm.trim()) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(review) =>
					review.name.toLowerCase().includes(term) ||
					review.review.toLowerCase().includes(term) ||
					review.treatment.toLowerCase().includes(term)
			);
		}

		// Filter by status
		if (selectedStatus && selectedStatus !== 'All Reviews') {
			filtered = filtered.filter((review) => review.status === selectedStatus);
		}

		// Sort reviews
		if (selectedSort === 'Latest') {
			filtered.sort((a, b) => parseDate(b.date) - parseDate(a.date));
		} else if (selectedSort === 'Old Reviews') {
			filtered.sort((a, b) => parseDate(a.date) - parseDate(b.date));
		}

		return filtered;
	});

	// > Derived values for pagination
	let totalItems = $derived(filteredReviews().length);
	let paginatedReviews = $derived(
		filteredReviews().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	// > Event handlers
	function handlePageChange(event) {
		currentPage = event.detail;
	}

	function handleItemsPerPageChange(event) {
		itemsPerPage = event.detail;
		currentPage = 1;
	}

	// > Handle filter changes
	function handleSearchChange(newSearchTerm) {
		searchTerm = newSearchTerm;
		currentPage = 1;
	}

	function handleStatusChange(newStatus) {
		selectedStatus = newStatus;
		currentPage = 1;
	}

	function handleSortChange(newSort) {
		selectedSort = newSort;
		currentPage = 1;
	}

	function clearAllFilters() {
		searchTerm = '';
		selectedStatus = 'All Reviews';
		selectedSort = 'Latest';
		currentPage = 1;
	}
</script>

<div class="min-h-screen bg-[#f9f5f4]">
	<div class="px-4 py-8">
		<!-- Header -->
		<div class="mb-8">
			<ReviewsNavbar
				{searchTerm}
				{selectedStatus}
				{selectedSort}
				onSearchChange={handleSearchChange}
				onStatusChange={handleStatusChange}
				onSortChange={handleSortChange}
			/>
		</div>

		<!-- Review Cards List -->
		<div class="mx-auto max-w-6xl space-y-4">
			{#each paginatedReviews as review (review.id)}
				<ReviewCard {...review} />
			{/each}
		</div>

		<!-- Pagination -->
		{#if filteredReviews().length > 0}
			<Pagination
				{currentPage}
				{itemsPerPage}
				{totalItems}
				on:pageChange={handlePageChange}
				on:itemsPerPageChange={handleItemsPerPageChange}
			/>
		{/if}

		<!-- Empty State -->
		{#if filteredReviews().length === 0}
			<div class="py-12 text-center">
				<div class="text-lg text-gray-500">
					{searchTerm || selectedStatus !== 'All Reviews'
						? 'No reviews match your filters'
						: 'No reviews found'}
				</div>
				<p class="mt-2 text-sm text-gray-400">
					{searchTerm || selectedStatus !== 'All Reviews'
						? 'Try adjusting your search or filters'
						: 'Patient reviews will appear here'}
				</p>
				{#if searchTerm || selectedStatus !== 'All Reviews'}
					<button
						class="mt-4 rounded-full bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
						onclick={clearAllFilters}
					>
						Clear Filters
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
