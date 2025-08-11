<script>
	import DoctorDetails from '../../components/cards/doctorDetails.svelte';
	import DoctorNavbar from '../../components/nav/doctorNavbar.svelte';
	import Pagination from '../../components/pagination/Pagination.svelte';
	import { goto } from '$app/navigation';
	import { doctors } from '$lib/doctorsData/doctors.js';
	import { onMount } from 'svelte';
// let doctors = $state([]);
	let currentPage = $state(1);
	let itemsPerPage = $state(12);
	// Fetch doctors from backend
	// onMount(async () => {
	// 	try {
	// 		const res = await fetch('http://localhost:8000/doctors'); // change to your API endpoint
	// 		if (!res.ok) throw new Error('Failed to fetch doctors');
	// 		const data = await res.json();
	// 		doctors = data;
	// 	} catch (error) {
	// 		console.error('Error fetching doctors:', error);
	// 	}
	// });

	const specializations = [...new Set(doctors.map((d) => d.specialty))];
	const statuses = [...new Set(doctors.map((d) => d.status))];

	let selectedSpecialization = $state('All');
	let selectedStatus = $state('All');
	let searchQuery = $state('');

	const filteredDoctors = $derived(
		doctors.filter((d) => {
			const specMatch =
				!selectedSpecialization ||
				selectedSpecialization === 'All' ||
				d.specialty === selectedSpecialization;
			const statusMatch =
				!selectedStatus || selectedStatus === 'All' || d.status === selectedStatus;
			const searchMatch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase());
			return specMatch && statusMatch && searchMatch;
		})
	);

	const totalItems = $derived(filteredDoctors.length);
	const paginatedDoctors = $derived(
		filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	function handlePageChange(event) {
		currentPage = event.detail;
	}

	function handleItemsPerPageChange(event) {
		itemsPerPage = event.detail;
		currentPage = 1;
	}

	function handleFilter(event) {
		const { specialization, status, search } = event.detail;
		selectedSpecialization = specialization;
		selectedStatus = status;
		searchQuery = search;
		currentPage = 1;
	}

	function goToDoctorDetails(event) {
		goto(`/doctors/${event.detail.id}`);
	}

	function handleAddDoctor(event) {
		const newDoctor = event.detail;

		console.log('New doctor added:', newDoctor);
	}
</script>

<div class="min-h-screen bg-[#f9f5f4] p-4">
	<DoctorNavbar
		{specializations}
		{statuses}
		on:filter={handleFilter}
		on:addDoctor={handleAddDoctor}
	/>
	<div class="px-4 py-4">

		{#if totalItems > 0}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each paginatedDoctors as doc}
				<DoctorDetails {...doc} on:select={goToDoctorDetails} />
			{/each}
		</div>

		<Pagination
			{currentPage}
			{itemsPerPage}
			{totalItems}
			on:pageChange={handlePageChange}
			on:itemsPerPageChange={handleItemsPerPageChange}
		/>
		{:else}
		<p class="py-4 text-center text-gray-500">No Doctors found for the applied filters.</p>
	{/if}
	</div>
</div>
