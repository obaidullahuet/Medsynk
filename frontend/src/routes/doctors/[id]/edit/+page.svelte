<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fetchDoctorById, updateDoctor } from '$lib/api/doctorsApi';
	import { addDoctorAvailabilityBulk, type DoctorAvailabilityPayload } from '$lib/api/availabilityApi';
	import { fetchDoctorAvailability } from '$lib/api/availabilityApi';
	import { env } from '$env/dynamic/public';
	import { getTreatments } from '$lib/api/treatmentsApi';
	import { toast } from 'svelte-french-toast';
	import api from '$lib/api';
	const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

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

	let { params } = $props<{ params: { id: string } }>();
	let id = params.id;

	let isLoading = $state(true);
	let isSubmitting = $state(false);

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
	function computeProfileImgSrc(preview: string): string {
		if (!preview) return '/placeholder-avatar.png';
		const lower = preview.toLowerCase();
		if (lower.startsWith('blob:') || lower.startsWith('data:') || lower.startsWith('http://') || lower.startsWith('https://')) {
			return preview;
		}
		const base = BASE_URL || '';
		const path = preview.replace(/^\//, '');
		return base ? `${base}/${path}` : `/${path}`;
	}
	let profileImgSrc = $derived(computeProfileImgSrc(profilePreview));

	// Treatments selection (mirror add doctor)
	type Treatment = { id: number | string; name: string };
	let treatmentList = $state<Treatment[]>([]);
	let treatmentId = $state('');
	let selectedTreatmentIds = $state<number[]>([]);

	function addSelectedTreatment() {
		if (!treatmentId) return;
		const idNum = Number(treatmentId);
		if (!Number.isNaN(idNum) && !selectedTreatmentIds.includes(idNum)) {
			selectedTreatmentIds = [...selectedTreatmentIds, idNum];
		}
		treatmentId = '';
	}

	function removeSelectedTreatment(id: number) {
		selectedTreatmentIds = selectedTreatmentIds.filter((tid) => tid !== id);
	}

	type TimeSlot = { start: string; end: string };
	type Availability = Record<string, TimeSlot[]>;
	const dayKeys = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
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

	function normalizeAvailability(raw: unknown): Availability {
		const empty: Availability = { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] };
		if (!raw) return empty;
		let value: any = raw;
		if (typeof value === 'string') {
			try { value = JSON.parse(value); } catch { return empty; }
		}
		// Case 1: object keyed by day (any case)
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			const out: Availability = { ...empty };
			// Build a lower-cased key map from payload
			const lowerKeyed: Record<string, any[]> = {};
			for (const key of Object.keys(value)) {
				const v = value[key];
				if (Array.isArray(v)) lowerKeyed[key.toLowerCase()] = v;
				else if (v && typeof v === 'object') lowerKeyed[key.toLowerCase()] = [v];
				else lowerKeyed[key.toLowerCase()] = [];
			}
			for (const day of dayKeys) {
				const slots = lowerKeyed[day] ?? [];
				out[day] = slots.map((s: any) => parseSlotToTimeSlot(s));
			}
			return out;
		}
		// Case 2: array of entries with day field
		if (Array.isArray(value)) {
			const out: Availability = { ...empty };
			for (const entry of value) {
				const dayRaw = entry.day ?? entry.Day ?? entry.DAY ?? '';
				const day = String(dayRaw).toLowerCase();
				if (!dayKeys.includes(day)) continue;
				out[day].push(parseSlotToTimeSlot(entry));
			}
			return out;
		}
		return empty;
	}

	onMount(async () => {
		if (!id) {
			goto('/doctors');
			return;
		}
		try {
			const [doctorRes, treatmentRes] = await Promise.all([
				fetchDoctorById(id),
				getTreatments(1, 100)
			]);
			const res = doctorRes?.data ?? doctorRes;
			const doctor = res.data ?? res;
			// set treatments list
			treatmentList = (treatmentRes?.data ?? treatmentRes ?? []) as Treatment[];
			name = doctor.name || '';
			specialty = doctor.specialty || '';
			contact = doctor.contact || '';
			email = doctor.email || '';
			address = doctor.address || '';
			about = doctor.about || '';
			available = !!doctor.available;
			profilePreview = doctor.profilePhoto || '';
			experienceList = Array.isArray(doctor.experience) && doctor.experience.length > 0 ? doctor.experience : [{ role: '', place: '', years: '' }];
			if (doctor.slotDuration) slotDuration = String(doctor.slotDuration);
			availability = normalizeAvailability((doctor as any).availability);
			// init selected treatments from doctor.treatments array
			if (Array.isArray(doctor.treatments) && doctor.treatments.length > 0) {
				selectedTreatmentIds = doctor.treatments
					.map((treatment: any) => Number(treatment.id))
					.filter((n: number) => !Number.isNaN(n));
			}
			// Fallback: fetch availability from dedicated endpoint if not present or empty
			const isEmpty = dayKeys.every((d) => (availability[d] ?? []).length === 0);
			if (isEmpty) {
				try {
					const availRes = await fetchDoctorAvailability(id);
					// accept either wrapped {data: ...} or plain array/object
					const payload = (availRes?.data ?? availRes) as unknown;
					availability = normalizeAvailability(payload);
				} catch (e) {
					// ignore if endpoint not available
					console.warn('No dedicated availability found', e);
				}
			}
		} catch (e) {
			console.error(e);
			alert('Failed to load doctor');
			goto(`/doctors/${id}`);
		} finally {
			isLoading = false;
		}
	});

	function addSlot(day: string) {
		if ((availability[day] || []).length > 0) {
			alert(`${dayLabels[day]} already has a slot.`);
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
		profilePreview = file ? URL.createObjectURL(file) : profilePreview;
	}

	function handleCancel() {
		goto(`/doctors/${id}`);
	}

	function toIsoTimeWithZ(hhmm: string) {
		if (!hhmm) return '';
		const [h, m] = hhmm.split(':');
		const hh = (h ?? '00').padStart(2, '0');
		const mm = (m ?? '00').padStart(2, '0');
		return `${hh}:${mm}:00.000Z`;
	}

	function fromApiTimeToHHMM(value: string) {
		if (!value) return '';
		// Accept 'HH:MM', 'HH:MM:SS', 'HH:MM:SSZ', 'HH:MM:SS.mmmZ'
		const match = value.trim().match(/^(\d{2}):(\d{2})/);
		return match ? `${match[1]}:${match[2]}` : '';
	}

	function parseSlotToTimeSlot(raw: any): TimeSlot {
		const startRaw = raw?.startTime ?? raw?.start_time ?? raw?.start ?? '';
		const endRaw = raw?.endTime ?? raw?.end_time ?? raw?.end ?? '';
		return {
			start: fromApiTimeToHHMM(String(startRaw)),
			end: fromApiTimeToHHMM(String(endRaw))
		};
	}

	function buildAvailabilityObject(): Availability {
		const out: Availability = { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] };
		for (const day of dayKeys) {
			const slots = availability[day] || [];
			out[day] = slots
				.filter((s) => s.start && s.end)
				.map((s) => ({ start: s.start, end: s.end }));
		}
		return out;
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
		if (!name || !specialty || !contact || !email || !address || selectedTreatmentIds.length === 0) {
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
			formData.append('experience', JSON.stringify(experienceList));
			formData.append('about', about || '');
			formData.append('available', String(available));
			if (slotDuration) formData.append('slotDuration', String(slotDuration));
			// send treatment ids as comma-separated string, e.g. "1,2,4"
			formData.append('treatmentIds', selectedTreatmentIds.join(','));

			const updated = await updateDoctor(Number(id), formData);
			const doctorId: number = updated?.data?.id ?? updated?.id ?? Number(id);

			const availabilityEntries = buildAvailabilityPayload(doctorId);
			if (availabilityEntries.length > 0) {
				await addDoctorAvailabilityBulk(availabilityEntries);
			}

			// alert('Doctor updated successfully!');
			toast.success('Doctor updated successfully!');
			goto('/doctors');
		} catch (e) {
			console.error(e);
			// alert('Failed to update doctor');
			toast.error('Failed to update doctor');
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#if isLoading}
	<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#40C0E5] mx-auto mb-4"></div>
			<p class="text-gray-600 font-medium">Loading doctor details...</p>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
		<div class="mx-auto max-w-3xl px-6">
			<div class="text-center mb-10">
				<h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">✏️ Edit Doctor</h1>
				<p class="text-gray-600 mt-2">Update the doctor's information</p>
			</div>

			<div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 space-y-7 border border-gray-200">
				<!-- Profile Image Upload -->
				<div class="flex justify-center">
					<label class="relative group cursor-pointer">
						<img
							src={profileImgSrc}
							alt="Profile Preview"
							class="h-32 w-32 rounded-full object-cover border-4 border-[#40C0E5] shadow-xl group-hover:scale-105 transition-transform duration-300"
						/>
						<input class="hidden" type="file" accept="image/*" onchange={handleFileChange} />
						<div class="absolute bottom-2 right-2 bg-[#40C0E5] text-white rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
						</div>
					</label>
				</div>

				<!-- Name -->
				<div>
					<label for="name" class="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
					<input id="name" bind:value={name} type="text" placeholder="Enter doctor's full name" class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" />
				</div>

				<!-- Specialty -->
				<div>
					<label for="specialty" class="block text-sm font-bold text-gray-700 mb-2">Specialty *</label>
					<input id="specialty" bind:value={specialty} type="text" placeholder="e.g. Cardiologist" class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" />
				</div>

				<!-- Contact -->
				<div>
					<label for="contact" class="block text-sm font-bold text-gray-700 mb-2">Contact *</label>
					<input 
						id="contact" 
						bind:value={contact} 
						type="tel" 
						placeholder="Phone number (e.g., +1 234 567 8900)" 
						class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" 
						onblur={() => {
							if (contact && !validatePhoneNumber(contact)) {
								toast.error('Please enter a valid phone number (7-15 digits)');
							}
						}}
					/>
				</div>

				<!-- Email -->
				<div>
					<label for="email" class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
					<input id="email" bind:value={email} type="email" placeholder="Email" class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" />
				</div>

				<!-- Address -->
				<div>
					<label for="address" class="block text-sm font-bold text-gray-700 mb-2">Address *</label>
					<input id="address" bind:value={address} type="text" placeholder="Address" class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" />
				</div>

				<!-- Experiences (repeatable) -->
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<div class="block text-sm font-bold text-gray-700">Experiences</div>
						<button type="button" class="rounded-2xl border border-gray-400 px-3 py-2 text-sm hover:bg-gray-100 hover:border-gray-500 transition" onclick={() => experienceList = [...experienceList, { role: '', place: '', years: '' }]}>Add Row</button>
					</div>
					{#each experienceList as exp, i}
						<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
							<input
								placeholder="Role"
								class="rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
								bind:value={exp.role}
								oninput={(e) => (experienceList[i].role = (e.target as HTMLInputElement).value)}
							/>
							<input
								placeholder="Place"
								class="rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
								bind:value={exp.place}
								oninput={(e) => (experienceList[i].place = (e.target as HTMLInputElement).value)}
							/>
							<div class="flex gap-2">
								<input
									placeholder="Years (e.g. 2010 - Present)"
									class="flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
									bind:value={exp.years}
									oninput={(e) => (experienceList[i].years = (e.target as HTMLInputElement).value)}
								/>
								{#if experienceList.length > 1}
									<button type="button" class="rounded-2xl border border-gray-400 px-3 py-2 text-sm hover:bg-gray-100 hover:border-gray-500 transition" onclick={() => (experienceList = experienceList.filter((_, idx) => idx !== i))}>Remove</button>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<!-- Treatments -->
				<div class="space-y-3">
					<div>
						<label class="block text-sm font-bold text-gray-700 mb-2" for="treatment-select">Select Treatments *</label>
						<div class="flex gap-2">
							<select
								id="treatment-select"
								bind:value={treatmentId}
								class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
							>
								<option value="">Select a treatment</option>
								{#each treatmentList as d}
									<option value={d.id}>{d.name}</option>
								{/each}
							</select>
							<button
								type="button"
								onclick={addSelectedTreatment}
								class="rounded-2xl border border-gray-400 px-4 py-3 text-sm font-semibold hover:bg-gray-100 hover:border-gray-500 transition"
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
					<label for="about" class="block text-sm font-bold text-gray-700 mb-2">About</label>
					<textarea id="about" bind:value={about} rows="3" class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm resize-none transition-all"></textarea>
				</div>

				<!-- Available -->
				<div class="flex items-center gap-2">
					<input id="available" type="checkbox" bind:checked={available} class="h-4 w-4" />
					<label for="available" class="text-sm font-semibold">Available</label>
				</div>

				<!-- Weekly Availability (days & time slots) -->
				<div>
					<div class="block text-sm font-bold text-gray-700 mb-2">Weekly Availability (days & time slots)</div>
					<div class="space-y-4">
						{#each dayKeys as day}
							<div class="rounded-2xl border border-gray-300 p-4 bg-white/60">
								<div class="flex items-center justify-between">
									<span class="font-medium">{dayLabels[day]}</span>
									<button type="button" class="rounded-2xl border border-gray-400 px-3 py-2 text-sm hover:bg-gray-100 hover:border-gray-500 transition" onclick={() => addSlot(day)}>
										Add Slot
									</button>
								</div>
								{#if (availability[day] || []).length === 0}
									<p class="mt-2 text-xs text-gray-500">No slots. Click "Add Slot" to add a time range.</p>
								{/if}
								<div class="mt-3 space-y-2">
									{#each availability[day] as slot, i}
										<div class="grid grid-cols-1 gap-2 md:grid-cols-6">
											<div class="md:col-span-2">
												<label class="block text-xs text-gray-600 mb-1" for={`start-${day}-${i}`}>Start</label>
												<input id={`start-${day}-${i}`} type="time" class="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
													bind:value={slot.start}
													oninput={(e) => updateSlot(day, i, 'start', (e.target as HTMLInputElement).value)} />
											</div>
											<div class="md:col-span-2">
												<label class="block text-xs text-gray-600 mb-1" for={`end-${day}-${i}`}>End</label>
												<input id={`end-${day}-${i}`} type="time" class="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
													bind:value={slot.end}
													oninput={(e) => updateSlot(day, i, 'end', (e.target as HTMLInputElement).value)} />
											</div>
											<div class="md:col-span-2 flex items-end">
												<button type="button" class="rounded-2xl border border-gray-400 px-3 py-2 text-sm w-full md:w-auto hover:bg-gray-100 hover:border-gray-500 transition" onclick={() => removeSlot(day, i)}>
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
					<label for="slotDuration" class="block text-sm font-bold text-gray-700 mb-2">Slot Duration (minutes)</label>
					<input id="slotDuration" bind:value={slotDuration} type="number" min="0" class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" placeholder="Optional" />
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-4 pt-6">
					<button type="button" onclick={handleCancel} class="flex-1 rounded-2xl border border-gray-400 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-500 transition-all">Cancel</button>
					<button type="button" disabled={isSubmitting} onclick={handleSubmit} class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50">
						{isSubmitting ? 'Saving...' : 'Update Doctor'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
