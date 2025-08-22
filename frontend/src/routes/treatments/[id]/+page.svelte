<script lang="ts">
	const { params } = $props();
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import { getTreatmentById, createTreatment, updateTreatment } from '$lib/api/treatmentsApi';
 	import { deleteTreatment } from '$lib/api/treatmentsApi';
	 import { env } from '$env/dynamic/public';

const BASE_URL = env.PUBLIC_API_BASE_URL || '';
	let treatmentId = params.id;
	let isEditMode = $state(false);
	let isAddMode = $state(false);
	
	// Form state
	let imageFile = $state<File | null>(null);
	let imagePreview = $state("/placeholder-avatar.png");
	let name = $state("");
	let treatmentType = $state("surgical");
	let about = $state("");
	let description = $state("");
	let price = $state("");
	let isSubmitting = $state(false);
	let loading = $state(true);
	let isDeleting = $state(false);

	async function loadTreatment() {
		try {
			const treatment = await getTreatmentById(Number(treatmentId));
			console.log(treatment);
			if (treatment) {
				name = treatment.name || "";
				treatmentType = treatment.treatmentType || "surgical";
				about = treatment.about || "";
				description = treatment.description || "";
				price = treatment.price?.toString() || "";
				if (treatment.image) {
					imagePreview = treatment.image;
				}
			} else {
				// If treatment not found, redirect back to treatments list
				alert("Treatment not found!");
				goto("/treatments");
			}
		} catch (err) {
			console.error(err);
			alert("Failed to load treatment. Please try again.");
			goto("/treatments");
		} finally {
			loading = false;
		}
	}

	function handleImageUpload(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0] || null;
		if (file) {
			imageFile = file;
			imagePreview = URL.createObjectURL(file);
		}
	}

	let editorDiv = $state<HTMLDivElement | null>(null);
	let quill: Quill;
	
	onMount(async () => {
		if (treatmentId === 'add') {
			isAddMode = true;
			loading = false;
		} else {
			isEditMode = true;
			await loadTreatment();
		}

		// Initialize Quill editor after a short delay to ensure DOM is ready
		setTimeout(() => {
			if (editorDiv) {
				quill = new Quill(editorDiv, {
					theme: 'snow',
					placeholder: 'Write treatment description...',
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'],
							[{ header: 1 }, { header: 2 }],
							[{ list: 'ordered' }, { list: 'bullet' }],
							[{ indent: '-1' }, { indent: '+1' }],
							[{ align: [] }],
							['link', 'image'],
							['clean']
						]
					}
				});
				
				// Set initial content if editing
				if (isEditMode && description) {
					quill.root.innerHTML = description;
				}
				
				quill.on('text-change', () => {
					description = quill.root.innerHTML;
				});
			}
		}, 100);
	});

	function handleCancel() {
		// Check if there are unsaved changes
		const hasChanges = name || about || description || price || imageFile;
		
		if (hasChanges && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
			return;
		}
		
		goto('/treatments');
	}

	async function handleDelete() {
		if (!isEditMode) return;
		if (!confirm('Are you sure you want to delete this treatment? This action cannot be undone.')) {
			return;
		}
		isDeleting = true;
		try {
			await deleteTreatment(Number(treatmentId));
			alert('Treatment deleted successfully!');
			goto('/treatments');
		} catch (err) {
			console.error(err);
			alert(`Failed to delete treatment. ${err instanceof Error ? err.message : ''}`);
		} finally {
			isDeleting = false;
		}
	}

	async function handleSubmit() {
		// Validate first before setting submitting state
		if (!name || !treatmentType || !about || !description || !price) {
			alert("Please fill all required fields.");
			return;
		}

		// Validate field lengths
		if (name.trim().length < 3) {
			alert("Treatment name must be at least 3 characters long.");
			return;
		}

		if (about.trim().length < 10) {
			alert("About section must be at least 10 characters long.");
			return;
		}

		if (description.trim().length < 20) {
			alert("Description must be at least 20 characters long.");
			return;
		}

		// Validate price is a valid number
		const priceNum = parseFloat(price);
		if (isNaN(priceNum) || priceNum < 0) {
			alert("Please enter a valid price.");
			return;
		}

		isSubmitting = true;
		try {
			const formData = new FormData();
			
			// Only append image if it's a new file or if we're in add mode
			if (imageFile) {
				formData.append("image", imageFile);
			} else if (isEditMode && imagePreview && imagePreview !== "/placeholder-avatar.png") {
				// If editing and there's an existing image, we might need to handle this
				// For now, we'll skip the image field if no new file is selected
			}
			
			formData.append("name", name);
			formData.append("treatmentType", treatmentType);
			formData.append("about", about);
			formData.append("description", JSON.stringify(description));
			formData.append("price", price);

			if (isAddMode) {
				await createTreatment(formData);
				alert("Treatment created successfully!");
			} else {
				await updateTreatment(Number(treatmentId), formData);
				alert("Treatment updated successfully!");
			}
			
			goto("/treatments");
		} catch (err) {
			console.error(err);
			alert(isAddMode ? "Failed to create treatment." : "Failed to update treatment.");
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
	<div class="mx-auto max-w-2xl px-6">
		<div class="text-center mb-10">
			<div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 {
				isAddMode 
					? 'bg-green-100 text-green-800 border border-green-200' 
					: 'bg-blue-100 text-blue-800 border border-blue-200'
			}">
				{#if isAddMode}
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
					</svg>
					Add Mode
				{:else}
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
					</svg>
					Edit Mode
				{/if}
			</div>
			<h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
				{isAddMode ? '✨ Add New Treatment' : '✏️ Edit Treatment'}
			</h1>
			<p class="text-gray-600 mt-2">
				{isAddMode ? 'Fill in the details to add a new treatment' : 'Update the treatment details'}
			</p>
		</div>

{#if loading}
			<div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 text-center">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#40C0E5] mx-auto"></div>
				<p class="mt-4 text-gray-600">Loading treatment information...</p>
			</div>
		{:else}
			<div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 space-y-7 border border-gray-200">
				
				<!-- 1. Image Upload -->
				<div class="flex justify-center">
					<label class="relative group cursor-pointer">
						<img
							src={`${BASE_URL}/${imagePreview}`}
							alt="Treatment Preview"
							class="h-32 w-32 rounded-full object-cover border-4 border-[#40C0E5] shadow-xl group-hover:scale-105 transition-transform duration-300"
						/>
						<input type="file" accept="image/*" class="hidden" onchange={handleImageUpload} />
						<div class="absolute bottom-2 right-2 bg-[#40C0E5] text-white rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
						</div>
					</label>
					<!-- <p class="text-xs text-gray-500 mt-2 text-center">Click to upload treatment image (optional)</p>
					<p class="text-xs text-gray-400 mt-1 text-center italic">Recommended: Square image, 300x300 pixels or larger</p>
					<p class="text-xs text-gray-400 mt-1 text-center italic">Supported formats: JPG, PNG, GIF</p> -->
				</div>

				<!-- 2. Treatment Name -->
				<div>
					<label class="block text-sm font-bold text-gray-700 mb-2" for="treatment-name">Treatment Name *</label>
					<input
						id="treatment-name"
						bind:value={name}
						type="text"
						placeholder="Enter treatment name"
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
						required
					/>
					<p class="text-xs text-gray-500 mt-1">Minimum 3 characters required</p>
					<!-- <p class="text-xs text-gray-400 mt-1 italic">Use a descriptive name that patients can easily understand</p>
					<p class="text-xs text-gray-400 mt-1 italic">Examples: "Laser Hair Removal", "Dental Implant", "Botox Treatment"</p>
					<p class="text-xs text-gray-400 mt-1 italic">This name will be displayed prominently on the treatment card and details page.</p> -->
				</div>

				<!-- 3. Treatment Type Dropdown -->
				<div>
					<label class="block text-sm font-bold text-gray-700 mb-2" for="treatment-type">Treatment Type *</label>
					<select
						id="treatment-type"
						bind:value={treatmentType}
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
					>
						<option value="surgical">Surgical</option>
						<option value="non_surgical">Non-Surgical</option>
					</select>
					<p class="text-xs text-gray-500 mt-1">Select the type of treatment</p>
					<!-- <p class="text-xs text-gray-400 mt-1 italic">Choose whether this is a surgical or non-surgical procedure</p>
					<p class="text-xs text-gray-400 mt-1 italic">This helps patients understand the level of invasiveness and recovery time</p> -->
				</div>

				<!-- 4. About -->
				<div>
					<label class="block text-sm font-bold text-gray-700 mb-2" for="treatment-about">About *</label>
					<textarea
						id="treatment-about"
						bind:value={about}
						placeholder="Detailed information about the treatment"
						rows="3"
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm resize-none transition-all"
						required
					></textarea>
					<p class="text-xs text-gray-500 mt-1">Minimum 10 characters required</p>
					<!-- <p class="text-xs text-gray-400 mt-1 italic">Provide a brief overview of what the treatment involves</p>
					<p class="text-xs text-gray-400 mt-1 italic">This should be a concise summary that patients can read quickly</p> -->
				</div>

				<!-- 5. Description (Rich Text) -->
				<div>
					<div class="block text-sm font-bold text-gray-700 mb-2">Description *</div>
					<div bind:this={editorDiv} class="bg-white rounded-2xl border border-gray-300 shadow-sm p-2"></div>
					<p class="text-xs text-gray-500 mt-1">Minimum 20 characters required. Use the toolbar above for formatting.</p>
					<!-- <p class="text-xs text-gray-400 mt-1 italic">This field supports rich text formatting including bold, italic, lists, and more.</p>
					<p class="text-xs text-gray-400 mt-1 italic">You can add links, images, and other formatting to make the description more engaging.</p>
					<p class="text-xs text-gray-400 mt-1 italic">This is the main content that patients will read to understand the treatment details.</p> -->
				</div>

				<!-- 6. Price -->
				<div>
					<label class="block text-sm font-bold text-gray-700 mb-2" for="treatment-price">Price *</label>
					<input
						id="treatment-price"
						bind:value={price}
						type="number"
						min="0"
						placeholder="Enter price in USD"
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
						required
					/>
					<p class="text-xs text-gray-500 mt-1">Enter price in USD (e.g., 1500.00)</p>
					<!-- <p class="text-xs text-gray-400 mt-1 italic">Prices are displayed in USD currency</p>
					<p class="text-xs text-gray-400 mt-1 italic">You can enter decimal values for precise pricing (e.g., 1499.99)</p>
					<p class="text-xs text-gray-400 mt-1 italic">This price will be displayed to patients on the treatment details page.</p> -->
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-4 pt-6">
					{#if isEditMode}
						<button
							type="button"
							disabled={isSubmitting || isDeleting}
							onclick={handleDelete}
							class="rounded-2xl border border-red-300 px-6 py-3 text-red-600 font-semibold hover:bg-red-50 transition-all disabled:opacity-50"
						>
							{#if isDeleting}
								<div class="flex items-center">
									<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600 mr-2"></div>
									Deleting...
								</div>
							{:else}
								Delete
							{/if}
						</button>
					{/if}
					<button
						type="button"
						onclick={handleCancel}
						disabled={isSubmitting}
						class="flex-1 rounded-2xl border border-gray-400 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-500 transition-all disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="button"
						disabled={isSubmitting}
						onclick={handleSubmit}
						class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
					>
						{#if isSubmitting}
							<div class="flex items-center justify-center">
								<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
								{isAddMode ? "Creating..." : "Updating..."}
							</div>
{:else}
							{isAddMode ? "Create Treatment" : "Update Treatment"}
						{/if}
					</button>
				</div>
			</div>
{/if}
	</div>
</div>
