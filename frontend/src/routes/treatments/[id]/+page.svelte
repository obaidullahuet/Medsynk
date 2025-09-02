<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SpecialDoctor from '../../../components/cards/specialDoctor.svelte';
	import DeleteModal from '../../../components/modals/DeleteModal.svelte';
	import { deleteTreatment } from '../../../lib/api/treatmentsApi.js';
    import { env } from '$env/dynamic/public';
    const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
	
	export let data;

	const { treatment, error } = data;
	const currentPath = $page.url.pathname;
	
	// Delete modal state
	let showDeleteModal = false;
	let isDeleting = false;
	let treatmentToDelete: number | null = null;
	
	async function handleDelete(treatmentId: number) {
		treatmentToDelete = treatmentId;
		showDeleteModal = true;
	}
	
	async function confirmDelete() {
		if (!treatmentToDelete) return;
		
		isDeleting = true;
		try {
			await deleteTreatment(treatmentToDelete);
			// Redirect to treatments list after successful deletion
			goto('/treatments');
		} catch (error) {
			console.error('Error deleting treatment:', error);
			// You could show a toast notification here
		} finally {
			isDeleting = false;
			showDeleteModal = false;
			treatmentToDelete = null;
		}
	}
	
	function cancelDelete() {
		showDeleteModal = false;
		treatmentToDelete = null;
	}
</script>

<div class="flex items-center justify-between border-b border-gray-200 bg-[#FFFEFC] px-2 py-4">
	<!-- Treatment Type Tag -->
	<div class="flex items-center space-x-4">
		{#if treatment}
			<span
				class="btn-dropdown-color1 add-text-lg-color inline-block rounded-full px-4 py-2 text-sm font-medium"
			>
				{treatment.treatmentType === 'surgical' ? 'Surgical' : treatment.treatmentType === 'non_surgical' ? 'Non-Surgical' : 'Other'}
			</span>
		{/if}
	</div>

	<!-- Navigation Buttons -->
	<div class="flex items-center space-x-2">
		<button
			class="btn-dropdown-color1 flex items-center justify-center rounded-full px-3 py-2 transition-colors"
			onclick={() => goto('/treatments')}
		>
			<svg class="add-text-lg-color h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Treatments
		</button>
	</div>
</div>

<div class="bg-[#FFFEFC] px-5 py-3">
	<div class="w-full lg:px-10">
		{#if treatment}
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
			<h1 class="text-xl font-medium text-gray-900 md:text-4xl">{treatment.name}</h1>
            <div class="flex items-center gap-2 sm:gap-3">
                <button
                    class="btn-dropdown-color1 add-text-lg-color flex items-center justify-center rounded-full px-3 py-2 text-xs sm:text-sm font-medium transition-colors hover:bg-blue-600 hover:text-white shadow-sm"
                    onclick={() => goto(`/treatments/${treatment.id}/edit`)}
                >
                    <svg class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span class="hidden sm:inline">Edit</span>
                    <span class="sm:hidden">Edit</span>
                </button>
                <button
                    class="flex items-center justify-center rounded-full px-3 py-2 text-xs sm:text-sm font-medium transition-colors bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 shadow-sm"
                    onclick={() => handleDelete(treatment.id)}
                >
                    <svg class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span class="hidden sm:inline">Delete</span>
                    <span class="sm:hidden">Delete</span>
                </button>
            </div>
        </div>
			{#if treatment.image}
				<div class="mb-8 overflow-hidden rounded-2xl">
					<img
						src={`${BASE_URL}/${treatment.image}`}
						alt={treatment.name}
						class="h-80 w-full object-cover"
					/>
				</div>
			{/if}

			<div>
				<h2 class="mb-6 font-semibold text-gray-900 md:text-2xl">About the Treatment</h2>
				<p class="text-base leading-relaxed font-medium text-gray-600">
					{treatment.about || 'No description available.'}
				</p>
			</div>

			{#if treatment.description}
				<div class="mt-10">
					<h2 class="mb-6 text-2xl font-semibold text-gray-900">Description</h2>
					<p class="text-base leading-relaxed font-medium text-gray-600">
						{treatment.description}
					</p>
				</div>
			{/if}

			{#if treatment.price}
				<div class="mt-10">
					<h2 class="mb-6 text-2xl font-semibold text-gray-900">Price</h2>
					<p class="text-2xl font-bold text-blue-600">
						${treatment.price}
					</p>
				</div>
			{/if}
			
		{:else if error}
			<h1 class="mb-8 text-4xl font-bold text-gray-900">Error Loading Treatment</h1>
			<div class="rounded-2xl p-8 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
				>
					<svg class="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-800">Failed to Load Treatment</h3>
				<p class="text-gray-600">{error}</p>
			</div>
		{:else}
			<h1 class="mb-8 text-4xl font-bold text-gray-900">Treatment Not Found</h1>
			<div class="rounded-2xl p-8 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300"
				>
					<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-800">Treatment Not Found</h3>
				<p class="text-gray-600">The treatment you're looking for doesn't exist.</p>
			</div>
		{/if}
		<SpecialDoctor doctors={treatment.doctors}/>
	</div>
</div>

<!-- Delete Confirmation Modal -->
<DeleteModal
	isOpen={showDeleteModal}
	title="Delete Treatment"
	message="Are you sure you want to delete this treatment? This action cannot be undone."
	itemName={treatment?.name || ''}
	itemType="treatment"
	isLoading={isDeleting}
	buttonText="Delete Treatment"
	on:confirm={confirmDelete}
	on:cancel={cancelDelete}
/>

<style>
</style>
