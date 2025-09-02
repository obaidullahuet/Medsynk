<script lang="ts">
	import Treatements from './../../../components/cards/treatements.svelte';
	import { goto } from '$app/navigation';
	import { createDoctor } from '$lib/api/doctorsApi';
	import {
		addDoctorAvailabilityBulk,
		type DoctorAvailabilityPayload
	} from '$lib/api/availabilityApi';
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { getTreatments } from '$lib/api/treatmentsApi';

	// Phone number validation function
	function validatePhoneNumber(phone: string): boolean {
		// Remove all non-digit characters
		const cleaned = phone.replace(/\D/g, '');
		
		// Check if it's a valid phone number (7-15 digits)
		if (cleaned.length < 7 || cleaned.length > 15) {
			return false;
		}
		
		// Check if it contains only digits
		if (!/^\d+$/.test(cleaned)) {
			return false;
		}
		
		return true;
	}

	// let treatmentId = $state('');
	let treatmentName = $state('');

	let name = $state('');
	let specialty = $state('');
	let contact = $state('');
	let email = $state('');
	let address = $state('');
	type ExperienceItem = { role: string; place: string; years: string };
	let experienceList = $state<ExperienceItem[]>([{ role: '', place: '', years: '' }]);
	let about = $state('');
	let available = $state(true);
	let slotDuration = $state('');
	let profileFile: File | null = $state(null);
	let profilePreview = $state('');
	let isSubmitting = $state(false);
	type Treatment = { id: number | string; name: string };
	let treatmentList = $state<Treatment[]>([]);

	// Treatments selection state
	let treatmentId = $state('');
	let selectedTreatmentIds = $state<number[]>([]);

	function addSelectedTreatment() {
		if (!treatmentId) return;
		const idNum = Number(treatmentId);
		if (!Number.isNaN(idNum) && !selectedTreatmentIds.includes(idNum)) {
			selectedTreatmentIds = [...selectedTreatmentIds, idNum];
			
		}
		// reset selection
		treatmentId = '';
	}

	function removeSelectedTreatment(id: number) {
		selectedTreatmentIds = selectedTreatmentIds.filter((tid) => tid !== id);
	}

	type TimeSlot = { start: string; end: string };
	type Availability = Record<string, TimeSlot[]>;
	const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	const dayLabels: Record<string, string> = {
		monday: 'Monday',
		tuesday: 'Tuesday',
		wednesday: 'Wednesday',
		thursday: 'Thursday',
		friday: 'Friday',
		saturday: 'Saturday',
		sunday: 'Sunday'
	};
	let availability: Availability = $state({
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],
		sunday: []
	});

	onMount(async () => {
		let treatmentResponse = await getTreatments(1,100,null);
		console.log(treatmentResponse);
		treatmentList = treatmentResponse?.data || treatmentResponse || [];
	});

	function addSlot(day: string) {
		if ((availability[day] || []).length > 0) {
			// alert(`${dayLabels[day]} already has a slot.`);
			toast(`⚠️ ${dayLabels[day]} already has a slot.`);
			return;
		}
		availability[day] = [{ start: '', end: '' }];
	}

	function removeSlot(day: string, index: number) {
		availability[day] = (availability[day] || []).filter((_, i) => i !== index);
	}

	function updateSlot(day: string, index: number, field: 'start' | 'end', value: string) {
		const slots = availability[day] || [];
		const updated = [...slots];
		updated[index] = { ...updated[index], [field]: value } as TimeSlot;
		availability[day] = updated;
	}

	function handleFileChange(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0] || null;
		profileFile = file;
		profilePreview = file ? URL.createObjectURL(file) : '';
	}

	function handleCancel() {
		goto('/doctors');
	}

	function toIsoTimeWithZ(hhmm: string) {
		// Converts 'HH:MM' -> 'HH:MM:00.000Z'
		if (!hhmm) return '';
		const [h, m] = hhmm.split(':');
		const hh = (h ?? '00').padStart(2, '0');
		const mm = (m ?? '00').padStart(2, '0');
		return `${hh}:${mm}:00.000Z`;
	}

	function buildAvailabilityPayload(doctorId: number): DoctorAvailabilityPayload[] {
		const nowIso = new Date().toISOString();
		const entries: DoctorAvailabilityPayload[] = [];
		for (const day of dayKeys) {
			const slots = availability[day] || [];
			for (const slot of slots) {
				if (!slot.start || !slot.end) continue;
				entries.push({
					doctorId,
					day,
					startTime: toIsoTimeWithZ(slot.start),
					endTime: toIsoTimeWithZ(slot.end),
					createdAt: nowIso
				});
			}
		}
		return entries;
	}

	async function handleSubmit() {
		if (!name || !specialty || !contact || !email || !address) {
			toast.error('Please fill all required fields.');
			return;
		}

		// Validate phone number
		if (!validatePhoneNumber(contact)) {
			toast.error('Please enter a valid phone number (7-15 digits)');
			return;
		}

		isSubmitting = true;
		try {
			const formData = new FormData();
			if (profileFile) formData.append('profilePhoto', profileFile);
			formData.append('name', name);
			formData.append('specialty', specialty);
			formData.append('contact', contact);
			formData.append('email', email);
			formData.append('address', address);
			// Backend expects JSON for experience
			formData.append('experience', JSON.stringify(experienceList));
			formData.append('about', about || '');
			formData.append('available', String(available));
			// slotDuration not supported server-side; include if later added
			if (slotDuration) formData.append('slotDuration', String(slotDuration));
			// send treatment ids as comma-separated string (e.g., "1,2,4")
			formData.append('treatmentIds', selectedTreatmentIds.join(','));

			const created = await createDoctor(formData);
			const doctorId: number = created?.data?.id ?? created?.id;
			if (!doctorId) {
				throw new Error('Doctor created but no id returned by API');
			}

			const availabilityEntries = buildAvailabilityPayload(doctorId);
			if (availabilityEntries.length > 0) {
				await addDoctorAvailabilityBulk(availabilityEntries);
			}

			// alert('Doctor and availability saved successfully');
			toast.success('Doctor saved successfully');
			goto('/doctors');
		} catch (err) {
			console.error(err);
			// alert('Failed to create doctor');
			toast.error('Failed to create doctor');
			// toast.error(`${createDoctor.message}`);
		} finally {
			isSubmitting = false;
		}
	}


  
  
  
</script>

<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
	<div class="mx-auto max-w-2xl px-6">
		<div class="mb-10 text-center">
			<h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">✨ Add New Doctor</h1>
			<p class="mt-2 text-gray-600">Fill in the details to add a new doctor</p>
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

			<!-- Name -->
			<div>
				<label for="name" class="mb-2 block text-sm font-bold text-gray-700">Full Name *</label>
				<input
					id="name"
					bind:value={name}
					type="text"
					placeholder="Enter doctor's full name"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
				/>
			</div>

			<!-- Specialty -->
			<div>
				<label for="specialty" class="mb-2 block text-sm font-bold text-gray-700">Specialty *</label
				>
				<input
					id="specialty"
					bind:value={specialty}
					type="text"
					placeholder="e.g. Cardiologist"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
				/>
			</div>

			<!-- Contact -->
			<div>
				<label for="contact" class="mb-2 block text-sm font-bold text-gray-700">Contact *</label>
				<input
					id="contact"
					bind:value={contact}
					type="tel"
					placeholder="Phone number (e.g., +1 234 567 8900)"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
					onblur={() => {
						if (contact && !validatePhoneNumber(contact)) {
							toast.error('Please enter a valid phone number (7-15 digits)');
						}
					}}
				/>
			</div>

			<!-- Email -->
			<div>
				<label for="email" class="mb-2 block text-sm font-bold text-gray-700">Email *</label>
				<input
					id="email"
					bind:value={email}
					type="email"
					placeholder="Email"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
				/>
			</div>

			<!-- Address -->
			<div>
				<label for="address" class="mb-2 block text-sm font-bold text-gray-700">Address *</label>
				<input
					id="address"
					bind:value={address}
					type="text"
					placeholder="Address"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
				/>
			</div>

			<!-- Experiences (repeatable) -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<div class="block text-sm font-bold text-gray-700">Experiences</div>
					<button
						type="button"
						class="rounded-2xl border border-gray-400 px-3 py-2 text-sm transition hover:border-gray-500 hover:bg-gray-100"
						onclick={() =>
							(experienceList = [...experienceList, { role: '', place: '', years: '' }])}
						>Add Row</button
					>
				</div>
				{#each experienceList as exp, i}
					<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
						<input
							placeholder="Role"
							class="rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
							bind:value={exp.role}
							oninput={(e) => (experienceList[i].role = (e.target as HTMLInputElement).value)}
						/>
						<input
							placeholder="Place"
							class="rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
							bind:value={exp.place}
							oninput={(e) => (experienceList[i].place = (e.target as HTMLInputElement).value)}
						/>
						<div class="flex gap-2">
							<input
								placeholder="Years (e.g. 2010 - Present)"
								class="flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
								bind:value={exp.years}
								oninput={(e) => (experienceList[i].years = (e.target as HTMLInputElement).value)}
							/>
							{#if experienceList.length > 1}
								<button
									type="button"
									class="rounded-2xl border border-gray-400 px-3 py-2 text-sm transition hover:border-gray-500 hover:bg-gray-100"
									onclick={() => (experienceList = experienceList.filter((_, idx) => idx !== i))}
									>Remove</button
								>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			<!-- Treatments -->
			<div class="space-y-3">
				<div>
					<label class="mb-2 block text-sm font-bold text-gray-700" for="treatment-select"
						>Select Treatments *</label
					>
					<div class="flex gap-2">
						<select
							id="treatment-select"
							bind:value={treatmentId}
							class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
						>
							<option value="">Select a treatment</option>
							{#each treatmentList as d}
								<option value={d.id}>{d.name}</option>
							{/each}
						</select>
						<button
							type="button"
							onclick={addSelectedTreatment}
							class="rounded-2xl border border-gray-400 px-4 py-3 text-sm font-semibold transition hover:border-gray-500 hover:bg-gray-100"
						>
							Add
						</button>
					</div>
				</div>
				{#if selectedTreatmentIds.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each selectedTreatmentIds as id}
							<span class="inline-flex items-center gap-2 rounded-full bg-[#e6f8fd] px-3 py-1 text-sm text-gray-700">
								{treatmentList.find((t) => Number(t.id) === id)?.name || id}
								<button type="button" class="text-gray-500 hover:text-gray-700" onclick={() => removeSelectedTreatment(id)}>
									✕
								</button>
							</span>
						{/each}
					</div>
				{/if}
			</div>
			<!-- About -->
			<div>
				<label for="about" class="mb-2 block text-sm font-bold text-gray-700">About</label>
				<textarea
					id="about"
					bind:value={about}
					rows="3"
					class="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
				></textarea>
			</div>

			<!-- Available -->
			<div class="flex items-center gap-2">
				<input id="available" type="checkbox" bind:checked={available} class="h-4 w-4" />
				<label for="available" class="text-sm font-semibold">Available</label>
			</div>

			<!-- Weekly Availability (days & time slots) -->
			<div>
				<div class="mb-2 block text-sm font-bold text-gray-700">
					Weekly Availability (days & time slots)
				</div>
				<div class="space-y-4">
					{#each dayKeys as day}
						<div class="rounded-2xl border border-gray-300 bg-white/60 p-4">
							<div class="flex items-center justify-between">
								<span class="font-medium">{dayLabels[day]}</span>
								<button
									type="button"
									class="rounded-2xl border border-gray-400 px-3 py-2 text-sm transition hover:border-gray-500 hover:bg-gray-100"
									onclick={() => addSlot(day)}
								>
									Add Slot
								</button>
							</div>
							{#if (availability[day] || []).length === 0}
								<p class="mt-2 text-xs text-gray-500">
									No slots. Click "Add Slot" to add a time range.
								</p>
							{/if}
							<div class="mt-3 space-y-2">
								{#each availability[day] as slot, i}
									<div class="grid grid-cols-1 gap-2 md:grid-cols-6">
										<div class="md:col-span-2">
											<label class="mb-1 block text-xs text-gray-600" for={`start-${day}-${i}`}
												>Start</label
											>
											<input
												id={`start-${day}-${i}`}
												type="time"
												class="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
												bind:value={slot.start}
												oninput={(e) =>
													updateSlot(day, i, 'start', (e.target as HTMLInputElement).value)}
											/>
										</div>
										<div class="md:col-span-2">
											<label class="mb-1 block text-xs text-gray-600" for={`end-${day}-${i}`}
												>End</label
											>
											<input
												id={`end-${day}-${i}`}
												type="time"
												class="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
												bind:value={slot.end}
												oninput={(e) =>
													updateSlot(day, i, 'end', (e.target as HTMLInputElement).value)}
											/>
										</div>
										<div class="flex items-end md:col-span-2">
											<button
												type="button"
												class="w-full rounded-2xl border border-gray-400 px-3 py-2 text-sm transition hover:border-gray-500 hover:bg-gray-100 md:w-auto"
												onclick={() => removeSlot(day, i)}
											>
												Remove
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Slot Duration -->
			<div>
				<label for="slotDuration" class="mb-2 block text-sm font-bold text-gray-700"
					>Slot Duration (minutes)</label
				>
				<input
					id="slotDuration"
					bind:value={slotDuration}
					type="number"
					min="0"
					class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8]"
					placeholder="Optional"
				/>
			</div>

			<!-- Action Buttons -->
			<div class="flex gap-4 pt-6">
				<button
					type="button"
					onclick={handleCancel}
					class="flex-1 rounded-2xl border border-gray-400 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-500 hover:bg-gray-100"
					>Cancel</button
				>
				<button
					type="button"
					disabled={isSubmitting}
					onclick={handleSubmit}
					class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
				>
					{isSubmitting ? 'Saving...' : 'Save Doctor'}
				</button>
			</div>
		</div>
	</div>
</div>
