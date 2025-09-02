<script lang="ts">
	import { onMount } from 'svelte';
	import PatientsNavbar from '../../components/nav/patientsNavbar.svelte';
	import Pagination from '../../components/pagination/Pagination.svelte';
	import PatientsTable from '../../components/tables/patientsTable.svelte';
	// import { patients as patientsData } from '$lib/patientsData/patients';
	import { getPatientslist } from '$lib/api/patientApi.js';

	type PatientRow = {
		id: number;
		name: string;
		avatar: string;
		date: string;
		time: string;
		doctor: string;
		treatment: string;
		status: string;
	};

	// let patients = getPatientslist;
	let patients: PatientRow[] = [];
	let searchTerm = '';
	let selectedDoctor = '';
	let selectedTreatment = '';
	let selectedDate = '';
	let currentPage = 1;
	const itemsPerPage = 5;

	// Fetch patients (from appointments API) when page loads and map to table shape
	onMount(async () => {
		try {
			const res = await getPatientslist();
			let list = Array.isArray(res) ? res : (res?.data?.data ?? res?.data ?? []);
			patients = list.map((a: any) => {
				const patientName = a?.patientId?.name ?? 'Unknown';
				const patientId = a?.patientId?.id ?? a?.id;
				const timeRaw = String(a?.scheduledTime ?? '');
				const time = timeRaw.slice(0, 5); // HH:MM
				return {
					id: patientId,
					name: patientName,
					avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(patientName)}&background=random`,
					date: a?.scheduledDate ?? '',
					time,
					doctor: a?.doctorId?.name ?? 'Unknown Doctor',
					treatment: a?.treatmentId?.name ?? '',
					status: a?.status ?? ''
				};
			});
		} catch (error) {
			console.error(error);
		}
	});

	let filteredPatients: PatientRow[] = [];
	let paginatedPatients: PatientRow[] = [];
	let totalItems = 0;
	let totalPages = 0;

	//  Filtering Logic
	$: filteredPatients = patients.filter((p: PatientRow) => {
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
	function handlePageChange(event: CustomEvent<number>) {
		currentPage = event.detail;
	}
	function handleSearch(event: CustomEvent<string>) {
		searchTerm = event.detail;
		currentPage = 1;
	}
	function handleDoctorFilter(event: CustomEvent<string>) {
		selectedDoctor = event.detail;
		currentPage = 1;
	}
	function handleTreatmentFilter(event: CustomEvent<string>) {
		selectedTreatment = event.detail;
		currentPage = 1;
	}
	function handleDateFilter(event: CustomEvent<string>) {
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
	<br />

	{#if totalItems > 0}
		<PatientsTable patients={paginatedPatients} />

		<Pagination {totalItems} {itemsPerPage} {currentPage} on:pageChange={handlePageChange} />
	{:else}
		<p class="py-4 text-center text-gray-500">No patients found for the applied filters.</p>
	{/if}
</div>
