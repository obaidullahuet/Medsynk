<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import { createTreatment } from '$lib/api/treatmentsApi'; // make sure path is correct

	let imageFile = $state<File | null>(null);
	let imagePreview = $state("/placeholder-avatar.png");
	let name = $state("");
	let treatmentType = $state("surgical");
	let about = $state("");
	let description = $state("");
	let price = $state("");
	let isSubmitting = $state(false);

	// Doctor list will eventually come from API
	// let doctorList = $state<{ id: number; name: string }[]>([
	// 	{ id: 1, name: "Dr. Smith" },
	// 	{ id: 2, name: "Dr. Johnson" },
	// 	{ id: 3, name: "Dr. Brown" }
	// ]);

	// Selected doctor IDs
	// let selectedDoctors = $state<number[]>([]);

	function handleImageUpload(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0] || null;
		if (file) {
			imageFile = file;
			imagePreview = URL.createObjectURL(file);
		}
	}

	let editorDiv: HTMLDivElement;
	onMount(() => {
		const quill = new Quill(editorDiv, {
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
		quill.on('text-change', () => {
			description = quill.root.innerHTML;
		});
	});

	// function addDoctor(e: Event) {
	// 	const value = parseInt((e.target as HTMLSelectElement).value);
	// 	if (!value) return;
	// 	if (!selectedDoctors.includes(value)) {
	// 		selectedDoctors = [...selectedDoctors, value];
	// 	}
	// 	(e.target as HTMLSelectElement).value = '';
	// }

	// function removeDoctor(id: number) {
	// 	selectedDoctors = selectedDoctors.filter(d => d !== id);
	// }

	function handleCancel() {
		goto('/treatments');
	}

	async function handleSubmit() {
    // Validate first before setting submitting state
    if (!name || !treatmentType || !about || !description || !price) {
        alert("Please fill all required fields.");
        return;
    }

    isSubmitting = true;
    try {
        const formData = new FormData();
        if (imageFile) formData.append("image", imageFile);
        formData.append("name", name);
        formData.append("treatmentType", treatmentType);
        formData.append("about", about);
       formData.append("description", JSON.stringify(description));
        formData.append("price", price);
        // formData.append("doctorIds", JSON.stringify(selectedDoctors));

        await createTreatment(formData);
        alert("Treatment created successfully!");
        goto("/treatments");
    } catch (err) {
        console.error(err);
        alert("Failed to create treatment.");
    } finally {
        isSubmitting = false;
    }
}

</script>

<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
	<div class="mx-auto max-w-2xl px-6">
		<div class="text-center mb-10">
			<h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">✨ Add New Treatment</h1>
			<p class="text-gray-600 mt-2">Fill in the details to add a new treatment</p>
		</div>

		<div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 space-y-7 border border-gray-200">
			
			<!-- 1. Image Upload -->
			<div class="flex justify-center">
				<label class="relative group cursor-pointer">
					<img
						src={imagePreview}
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
			</div>

			<!-- 2. Treatment Name -->
			<div>
				<label class="block text-sm font-bold text-gray-700 mb-2">Treatment Name *</label>
				<input
					bind:value={name}
					type="text"
					placeholder="Enter treatment name"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
					required
				/>
			</div>

			<!-- 3. Treatment Type Dropdown -->
			<div>
				<label class="block text-sm font-bold text-gray-700 mb-2">Treatment Type *</label>
				<select
					bind:value={treatmentType}
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
				>
					<option value="surgical">Surgical</option>
					<option value="non_surgical">Non-Surgical</option>
				</select>
			</div>

			<!-- 4. About -->
			<div>
				<label class="block text-sm font-bold text-gray-700 mb-2">About *</label>
				<textarea
					bind:value={about}
					placeholder="Detailed information about the treatment"
					rows="3"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm resize-none transition-all"
					required
				></textarea>
			</div>

			<!-- 5. Description (Rich Text) -->
			<div>
				<label class="block text-sm font-bold text-gray-700 mb-2">Description *</label>
				<div bind:this={editorDiv} class="bg-white rounded-2xl border border-gray-300 shadow-sm p-2"></div>
			</div>

			<!-- 6. Available Doctors (Multi-select with chips) -->
			

			<!-- 7. Price -->
			<div>
				<label class="block text-sm font-bold text-gray-700 mb-2">Price *</label>
				<input
					bind:value={price}
					type="number"
					min="0"
					placeholder="Enter price in USD"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
					required
				/>
			</div>

			<!-- Action Buttons -->
			<div class="flex gap-4 pt-6">
	<button
		type="button"
		onclick={handleCancel}
		class="flex-1 rounded-2xl border border-gray-400 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-500 transition-all"
	>
		Cancel
	</button>
	<button
		type="button"
		disabled={isSubmitting}
		onclick={handleSubmit}
		class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
	>
		{isSubmitting ? "Saving..." : "Save Treatment"}
	</button>
</div>
		</div>
	</div>
</div>
