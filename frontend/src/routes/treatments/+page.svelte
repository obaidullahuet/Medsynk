<script lang="ts">
	import TreatmentNavbar from '../../components/nav/treatmentNavbar.svelte';
	import Treatements from '../../components/cards/treatements.svelte';
	import LoadingSpinner from "../../components/loader/LoadingSpinner.svelte"
	import { goto } from '$app/navigation';
    import { getTreatments } from '$lib/api/treatmentsApi';
    import { onMount } from 'svelte';
    
    let treatments = $state([]);
    let loading = $state(true);

	let searchTerm = $state('');
	let selectedTreatment = $state('All Treatments');
	let selectedDoctor = $state('All Doctor');
	let selectedSort = $state('All Treatments');

	// Fetch treatments when page loads
	onMount(async () => {
		try {
			const res = await getTreatments();
			treatments = res.data;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false; 
		}
	});

	// Dropdown options
	function formatTreatmentType(type: string) {
	return type
		.replace(/_/g, ' ')        // replace underscores with spaces
		.replace(/\b\w/g, c => c.toUpperCase()); // capitalize each word
}

const treatmentTypes = $derived([
	'All Treatments',
	...new Set(treatments.map(t => formatTreatmentType(t.treatmentType)))
]);

	const doctorOptions = $derived(['All Doctor']); // no doctors in API yet
	const sortOptions = $derived(['All Treatments', ...new Set(treatments.map((t) => t.name))]);

	// Filtering Logic
	// const filteredTreatments = $derived(() => {
	// 	const filtered = treatments.filter((t) => {
	// 		const searchMatch =
	// 			!searchTerm ||
	// 			t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 			t.about.toLowerCase().includes(searchTerm.toLowerCase());

	// 		const typeMatch = selectedTreatment === 'All Treatments' || t.treatmentType === selectedTreatment;
	// 		// doctorMatch skipped since no doctors data in API
	// 		const titleMatch = selectedSort === 'All Treatments' || t.name === selectedSort;

	// 		return searchMatch && typeMatch && titleMatch;
	// 	});

	// 	// Sorting alphabetically by name
	// 	return filtered.sort((a, b) => a.name.localeCompare(b.name));
	// });
// Fixed filtering logic
const filteredTreatments = $derived(() => {
    const filtered = treatments.filter((t) => {
        const searchMatch =
            !searchTerm ||
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (t.about && t.about.toLowerCase().includes(searchTerm.toLowerCase()));

        // Fix: Compare formatted treatment types properly
        const typeMatch = 
            selectedTreatment === 'All Treatments' || 
            formatTreatmentType(t.treatmentType) === selectedTreatment;

        const titleMatch = selectedSort === 'All Treatments' || t.name === selectedSort;

        // Add debug logging
        console.log('Filter Debug:', {
            treatment: t.name,
            originalType: t.treatmentType,
            formattedType: formatTreatmentType(t.treatmentType),
            selectedTreatment,
            typeMatch,
            searchMatch,
            titleMatch
        });

        return searchMatch && typeMatch && titleMatch;
    });

    // Sorting alphabetically by name
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
});

// Alternative approach: Create a reverse mapping function
function unformatTreatmentType(formattedType: string) {
    return formattedType
        .toLowerCase()
        .replace(/\s+/g, '_'); // replace spaces with underscores
}

// Alternative filtering logic using reverse mapping
const alternativeFilteredTreatments = $derived(() => {
    const filtered = treatments.filter((t) => {
        const searchMatch =
            !searchTerm ||
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (t.about && t.about.toLowerCase().includes(searchTerm.toLowerCase()));

        // Convert selected treatment back to original format for comparison
        const typeMatch = 
            selectedTreatment === 'All Treatments' || 
            t.treatmentType === unformatTreatmentType(selectedTreatment);

        const titleMatch = selectedSort === 'All Treatments' || t.name === selectedSort;

        return searchMatch && typeMatch && titleMatch;
    });

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
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

	function goToTreatmentDetails(event: { detail: { id: Number } }) {
		goto(`/treatments/${event.detail.id}`);
	}

	// Handle navigation to Add Treatment page
	function handleAddTreatment() {
		goto('/treatments/add');
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
			on:addTreatment={handleAddTreatment}
		/>
	</div>

	{#if loading}
		<LoadingSpinner text="Fetching treatments..." />
	{:else}
		<div class="grid grid-cols-1 gap-6 bg-[#faf6f5] p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
	{/if}
</div>