<script>
	import PatientsNavbar from '../../components/nav/patientsNavbar.svelte';
	import Pagination from '../../components/pagination/Pagination.svelte';
	import PatientsTable from '../../components/tables/patientsTable.svelte';
	import { patients as patientsData } from '$lib/patientsData/patients';

	let patients = patientsData;
	let searchTerm = '';
	let selectedDoctor = '';
	let selectedTreatment = '';
	let selectedDate = '';
	let currentPage = 1;
	const itemsPerPage = 6;

	//  Filtering Logic
	$: filteredPatients = patients.filter((p) => {
		const q = searchTerm.toLowerCase();

		const matchesSearch =
			(p.name?.toLowerCase() ?? '').includes(q) ||
			(p.treatment?.toLowerCase() ?? '').includes(q) ||
			(p.doctor?.toLowerCase() ?? '').includes(q) ||
			(p.status?.toLowerCase() ?? '').includes(q);

		const matchesDoctor = selectedDoctor
			? p.doctor?.toLowerCase() === selectedDoctor.toLowerCase()
			: true;
		const matchesTreatment = selectedTreatment
			? p.treatment?.toLowerCase() === selectedTreatment.toLowerCase()
			: true;
		const matchesDate = selectedDate ? (p.date?.split('T')[0] ?? '') === selectedDate : true;

		return matchesSearch && matchesDoctor && matchesTreatment && matchesDate;
	});

	// Pagination Logic
	$: totalItems = filteredPatients.length;
	$: totalPages = Math.ceil(totalItems / itemsPerPage);
	$: if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

	$: paginatedPatients = filteredPatients.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	//  Event Handlers
	function handlePageChange(event) {
		currentPage = event.detail;
	}
	function handleSearch(event) {
		searchTerm = event.detail;
		currentPage = 1;
	}
	function handleDoctorFilter(event) {
		selectedDoctor = event.detail;
		currentPage = 1;
	}
	function handleTreatmentFilter(event) {
		selectedTreatment = event.detail;
		currentPage = 1;
	}
	function handleDateFilter(event) {
		selectedDate = event.detail;
		currentPage = 1;
	}
</script>

<div class="bg-[#f9f5f4] p-4">
	<PatientsNavbar
		on:search={handleSearch}
		on:filterDoctor={handleDoctorFilter}
		on:filterTreatment={handleTreatmentFilter}
		on:filterDate={handleDateFilter}
	/>

	{#if totalItems > 0}
		<PatientsTable patients={paginatedPatients} />
		{#if totalPages > 1}
			<Pagination {totalItems} {itemsPerPage} {currentPage} on:pageChange={handlePageChange} />
		{/if}
	{:else}
		<p class="py-4 text-center text-gray-500">No patients found for the applied filters.</p>
	{/if}
</div>
