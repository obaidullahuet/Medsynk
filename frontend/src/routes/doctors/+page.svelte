<script lang="ts">
	import DoctorDetails from '../../components/cards/doctorDetails.svelte';
	import DoctorNavbar from '../../components/nav/doctorNavbar.svelte';
	import Pagination from '../../components/pagination/Pagination.svelte';
	import { goto } from '$app/navigation';
	// import { doctors } from '$lib/doctorsData/doctors.js';
	import { onMount } from 'svelte';
	 import { fetchDoctors } from '$lib/api/doctorsApi';

	 type Doctor = {
		 id: number;
		 name: string;
		 specialty: string;
		 contact: string;
		 profilePhoto?: string | null;
		 about?: string | null;
		 experience?: Record<string, unknown> | null;
		 email: string;
		 address: string;
		 available?: boolean;
	 };

    let doctors = $state<Doctor[]>([]);
	let currentPage = $state(1);
	let itemsPerPage = $state(8);
	// Fetch doctors from backend
	// Fetch treatments when page loads
	onMount(async () => {
		try {
			const res = await fetchDoctors();
			doctors = res.data;
		} catch (error) {
			console.error(error);
		} 
		// finally {
		// 	loading = false; 
		// }
	});

	// const specializations = [...new Set(doctors.map((d) => d.specialty))];
const specializations = $derived([
  'All',
  ...new Set(
    doctors.map((d) => d.specialty?.trim()).filter(Boolean)
  )
]);

	const statuses = ['All', 'Available', 'Unavailable'];

	let selectedSpecialization = $state('All');
	let selectedStatus = $state('All');
	let searchQuery = $state('');

	// const filteredDoctors = $derived(
	// 	doctors.filter((d) => {
	// 		const specMatch =
	// 			!selectedSpecialization ||
	// 			selectedSpecialization === 'All' ||
	// 			d.specialty === selectedSpecialization;
	// 		const statusMatch =
	// 			selectedStatus === 'All' ||
	// 			(selectedStatus === 'Available' && !!d.available) ||
	// 			(selectedStatus === 'Unavailable' && !d.available);
	// 		const searchMatch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase());
	// 		return specMatch && statusMatch && searchMatch;
	// 	})
	// );
// Fixed filtering logic
// const filteredDoctors = $derived(
//   doctors.filter((d) => {
//     // Specialty matching with proper trimming and null handling
//     const doctorSpecialty = d.specialty?.trim().toLowerCase() || '';
//     const selectedSpec = selectedSpecialization.toLowerCase();
//     const specMatch =
//       selectedSpecialization === 'All' || 
//       doctorSpecialty === selectedSpec;

//     // Status matching with explicit boolean conversion
//     const isAvailable = d.available === true || d.available === 'true' || d.available === 1;
//     const statusMatch =
//       selectedStatus === 'All' ||
//       (selectedStatus === 'Available' && isAvailable) ||
//       (selectedStatus === 'Unavailable' && !isAvailable);

//     // Search matching with null safety
//     const doctorName = (d.name || '').toLowerCase();
//     const query = (searchQuery || '').toLowerCase().trim();
//     const searchMatch = !query || doctorName.includes(query);

//     console.log('Filter Debug:', {
//       doctor: d.name,
//       specialty: doctorSpecialty,
//       selectedSpec,
//       specMatch,
//       available: d.available,
//       isAvailable,
//       statusMatch,
//       searchMatch,
//       finalMatch: specMatch && statusMatch && searchMatch
//     });

//     return specMatch && statusMatch && searchMatch;
//   })
// );

const filteredDoctors = $derived(
  (doctors || []).filter((d) => {
    // Specialty
    const doctorSpecialty = d.specialty?.trim().toLowerCase() || '';
    const selectedSpec = selectedSpecialization?.trim().toLowerCase() || 'all';
    const specMatch = selectedSpec === 'all' || doctorSpecialty === selectedSpec;

    // Status
    const isAvailable = d?.available === true || d?.available === 'true' || d?.available === 1;
    const selectedStat = selectedStatus?.trim().toLowerCase() || 'all';
    const statusMatch =
      selectedStat === 'all' ||
      (selectedStat === 'available' && isAvailable) ||
      (selectedStat === 'unavailable' && !isAvailable);

    // Search
    const doctorName = (d.name ?? '').toLowerCase();
    const query = (searchQuery ?? '').toLowerCase().trim();
    const searchMatch = !query || doctorName.includes(query);

    return specMatch && statusMatch && searchMatch;
  })
);


	const totalItems = $derived(filteredDoctors.length);
	const paginatedDoctors = $derived(
		filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	function handlePageChange(event: CustomEvent<number>) {
		currentPage = event.detail;
	}

	function handleItemsPerPageChange(event: CustomEvent<number>) {
		itemsPerPage = event.detail;
		currentPage = 1;
	}

	function handleFilter(event: CustomEvent<{ specialization: string; status: string; search: string }>) {
		const { specialization, status, search } = event.detail;
		selectedSpecialization = specialization;
		selectedStatus = status;
		searchQuery = search;
		currentPage = 1;
	}

	function goToDoctorDetails(event: { detail: { id: Number } }) {
		goto(`/doctors/${event.detail.id}`);
	}
</script>

<div class="min-h-screen bg-[#f9f5f4] p-4">
	<DoctorNavbar
		{specializations}
		{statuses}
		on:filter={handleFilter}
		
	/>
	<div class="px-4 py-4">

		{#if totalItems > 0}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each paginatedDoctors as doc}
				<DoctorDetails name={doc.name} id={doc.id} specialty={doc.specialty} contact={doc.contact} profilePhoto={doc.profilePhoto}
					on:select={goToDoctorDetails} />
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
