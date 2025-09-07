<script lang="ts">
	import { fetchPatientById, updatePatient } from '$lib/api/patientApi';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let { params } = $props<{ params: { id: string } }>();
	let id = params.id;

	let name = $state('');
	let age = $state('');
	let dob = $state('');
	let gender = $state('');
	let emergencyContact = $state('');
	let email = $state('');
	let phone = $state('');
	let about = $state('');
	let address = $state('');
	let profileFile: File | null = $state(null);
	let profilePreview = $state('');
	let isLoading = $state(true);
	let isSubmitting = $state(false);

	onMount(async () => {
		if (!id) {
			goto('/patients');
			return;
		}
		try {
			const res = await fetchPatientById(id);
			const patient = res.data ?? res;

			name = patient.name ?? '';
			age = String(patient.age ?? '');
			dob = patient.dob ?? '';
			gender = patient.gender ?? '';
			emergencyContact = patient.emergency_contact ?? patient.emergencyContact ?? '';
			email = patient.email ?? '';
			phone = patient.phone ?? '';
			about = patient.about ?? '';
			address = patient.address ?? '';
			profilePreview = patient.image ?? '';
		} catch (e) {
			console.error(e);
			// alert('Failed to load patient');
			toast.error('Failed to load patient');
			goto(`/patients/${id}`);
		} finally {
			isLoading = false;
		}
	});

	function handleFileChange(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0] || null;
		profileFile = file;
		profilePreview = file ? URL.createObjectURL(file) : profilePreview;
	}

	function handleCancel() {
		goto(`/patients/${id}`);
	}

	function calculateAge() {
		if (dob) {
			const today = new Date();
			const birthDate = new Date(dob);
			const calculatedAge = today.getFullYear() - birthDate.getFullYear();
			const monthDiff = today.getMonth() - birthDate.getMonth();
			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
				age = String(calculatedAge - 1);
			} else {
				age = String(calculatedAge);
			}
		}
	}

	async function handleSubmit() {
		if (!name || !dob || !gender || !email || !phone) {
			// alert('Please fill all required fields.');
			toast.error('Please fill all required fields.');
			return;
		}
		isSubmitting = true;
		try {
			const formData = new FormData();

			formData.append('name', name);
			formData.append('dob', dob);
			formData.append('gender', gender);
			formData.append('email', email);
			formData.append('phone', phone);

			if (about.trim()) formData.append('about', about);
			if (address.trim()) formData.append('address', address);
			if (emergencyContact.trim()) formData.append('emergency_contact', emergencyContact);
			if (profileFile) formData.append('image', profileFile);

			const response = await updatePatient(id, formData); // <-- make sure updatePatient accepts FormData
			// alert('Patient updated successfully');
			toast.success(`${response.message}`);
			goto(`/patients/`);
		} catch (err) {
			console.error(err);
			// alert('Failed to update patient');
			toast.error('Failed to update patient');
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#if isLoading}
	<div
		class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff]"
	>
		<div class="text-center">
			<div
				class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#40C0E5]"
			></div>
			<p class="font-medium text-gray-600">Loading patient...</p>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
		<div class="mx-auto max-w-2xl px-6">
			<div class="mb-10 text-center">
				<h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">✏️ Edit Patient</h1>
				<p class="mt-2 text-gray-600">Update the patient's information</p>
			</div>

			<div
				class="space-y-7 rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-md"
			>
				<!-- Profile Image Upload -->
				<div class="flex justify-center">
					<label class="group relative cursor-pointer">
						<img
							src={profilePreview || '/placeholder-avatar.png'}
							alt="Profile Preview"
							class="h-32 w-32 rounded-full border-4 border-[#40C0E5] object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
						/>
						<input type="file" accept="image/*" class="hidden" onchange={handleFileChange} />
						<div
							class="absolute bottom-2 right-2 rounded-full bg-[#40C0E5] p-2 text-white shadow-lg transition-transform group-hover:scale-110"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
								></path>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
								></path>
							</svg>
						</div>
					</label>
				</div>

				<!-- Patient Name -->
				<div>
					<label class="mb-2 block text-sm font-bold text-gray-700">Full Name *</label>
					<input
						bind:value={name}
						type="text"
						placeholder="Enter patient's full name"
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
						required
					/>
				</div>

				<!-- Date of Birth and Age -->
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-sm font-bold text-gray-700">Date of Birth *</label>
						<input
							bind:value={dob}
							type="date"
							onchange={calculateAge}
							class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
							required
						/>
					</div>
					<div>
						<label class="mb-2 block text-sm font-bold text-gray-700">Age</label>
						<input
							bind:value={age}
							type="number"
							placeholder="Auto-calculated"
							readonly
							class="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-500 shadow-sm"
						/>
					</div>
				</div>

				<!-- Gender -->
				<div>
					<label class="mb-2 block text-sm font-bold text-gray-700">Gender *</label>
					<select
						bind:value={gender}
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
						required
					>
						<option value="">Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
						<option value="prefer-not-to-say">Prefer not to say</option>
					</select>
				</div>

				<!-- Email and Phone -->
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-sm font-bold text-gray-700">Email *</label>
						<input
							bind:value={email}
							type="email"
							placeholder="Enter email address"
							class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
							required
						/>
					</div>
					<div>
						<label class="mb-2 block text-sm font-bold text-gray-700">Phone *</label>
						<input
							bind:value={phone}
							type="tel"
							placeholder="Enter phone number"
							class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
							required
						/>
					</div>
				</div>

				<!-- Emergency Contact -->
				<div>
					<label class="mb-2 block text-sm font-bold text-gray-700">Emergency Contact</label>
					<input
						bind:value={emergencyContact}
						type="text"
						placeholder="Enter emergency contact number"
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
					/>
				</div>

				<!-- Address -->
				<div>
					<label class="mb-2 block text-sm font-bold text-gray-700">Address</label>
					<input
						bind:value={address}
						type="text"
						placeholder="Enter full address"
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
					/>
				</div>

				<!-- About -->
				<div>
					<label class="mb-2 block text-sm font-bold text-gray-700">About</label>
					<textarea
						bind:value={about}
						placeholder="Additional information about the patient (medical history, notes, etc.)"
						rows="3"
						class="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
					></textarea>
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-4 pt-6">
					<button
						type="button"
						onclick={handleCancel}
						class="flex-1 rounded-2xl border border-gray-400 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-500 hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						type="button"
						disabled={isSubmitting}
						onclick={handleSubmit}
						class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
					>
						{isSubmitting ? 'Updating...' : 'Update Patient'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
