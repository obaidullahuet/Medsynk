<script lang="ts">
	import { treatments } from '$lib/treatmentsData/treatments';
	import TreatmentNavbar from '../../components/nav/treatmentNavbar.svelte';
	import Treatements from '../../components/cards/treatements.svelte';
	import { goto } from '$app/navigation';

	let searchTerm = $state('');
	let selectedTreatment = $state('All Treatments');
	let selectedDoctor = $state('All Doctor');
	let selectedSort = $state('All Treatments');

	// Dropdown options
	const treatmentTypes = $derived(['All Treatments', ...new Set(treatments.map((t) => t.type))]);
	const doctorOptions = $derived(['All Doctor', ...new Set(treatments.map((t) => t.doctors))]);
	const sortOptions = $derived(['All Treatments', ...new Set(treatments.map((t) => t.title))]);

	// Filtering Logic
	const filteredTreatments = $derived(() => {
		const filtered = treatments.filter((t) => {
			const searchMatch =
				!searchTerm ||
				t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				t.doctors.toLowerCase().includes(searchTerm.toLowerCase()) ||
				t.description.toLowerCase().includes(searchTerm.toLowerCase());

			const typeMatch = selectedTreatment === 'All Treatments' || t.type === selectedTreatment;
			const doctorMatch = selectedDoctor === 'All Doctor' || t.doctors === selectedDoctor;
			const titleMatch = selectedSort === 'All Treatments' || t.title === selectedSort;

			return searchMatch && typeMatch && doctorMatch && titleMatch;
		});

		// Sorting alphabetically by title for better UX
		return filtered.sort((a, b) => a.title.localeCompare(b.title));
	});

	function handleFilterChange(event: CustomEvent) {
		const {
			searchTerm: s,
			selectedTreatment: t,
			selectedDoctor: d,
			selectedSort: so
		} = event.detail;
		searchTerm = s;
		selectedTreatment = t;
		selectedDoctor = d;
		selectedSort = so;
	}

	function goToTreatmentDetails(event: { detail: { id: string } }) {
		goto(`/treatments/${event.detail.id}`);
	}
</script>

<div class="min-h-screen bg-[#faf6f5]">
	<div class="p-4">
		<TreatmentNavbar
			{treatmentTypes}
			{doctorOptions}
			{sortOptions}
			{searchTerm}
			{selectedTreatment}
			{selectedDoctor}
			{selectedSort}
			on:filterChange={handleFilterChange}
		/>
	</div>

	<div
		class="grid grid-cols-1 gap-6 bg-[#faf6f5] p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#if filteredTreatments().length > 0}
			{#each filteredTreatments() as treatment (treatment.id)}
				<Treatements {...treatment} on:select={goToTreatmentDetails} />
			{/each}
		{:else}
			<div class="col-span-full py-12 text-center">
				<div class="text-lg text-gray-500">No treatments found matching your criteria</div>
				<p class="mt-2 text-gray-400">Try adjusting your filters or search term</p>
			</div>
		{/if}
	</div>
</div>
