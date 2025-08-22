<script lang="ts">
    import { goto } from '$app/navigation';
    import { createDoctor } from '$lib/api/doctorsApi';
    import { addDoctorAvailabilityBulk, type DoctorAvailabilityPayload } from '$lib/api/availabilityApi';

    let name = $state('');
    let specialty = $state('');
    let contact = $state('');
    let email = $state('');
    let address = $state('');
    type ExperienceItem = { role: string; place: string; years: string };
    let experienceList = $state<ExperienceItem[]>([
        { role: '', place: '', years: '' }
    ]);
    let about = $state('');
    let available = $state(true);
    let slotDuration = $state('');
    let profileFile: File | null = $state(null);
    let profilePreview = $state('');
    let isSubmitting = $state(false);

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

    // function addSlot(day: string) {
    //     availability[day] = [...(availability[day] || []), { start: '', end: '' }];
    // }
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
            alert('Please fill all required fields.');
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

            const created = await createDoctor(formData);
            const doctorId: number = created?.data?.id ?? created?.id;
            if (!doctorId) {
                throw new Error('Doctor created but no id returned by API');
            }

            const availabilityEntries = buildAvailabilityPayload(doctorId);
            if (availabilityEntries.length > 0) {
                await addDoctorAvailabilityBulk(availabilityEntries);
            }

            alert('Doctor and availability saved successfully');
            goto('/doctors');
        } catch (err) {
            console.error(err);
            alert('Failed to create doctor');
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
    <div class="mx-auto max-w-2xl px-6">
        <div class="text-center mb-10">
            <h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">✨ Add New Doctor</h1>
            <p class="text-gray-600 mt-2">Fill in the details to add a new doctor</p>
        </div>

        <div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 space-y-7 border border-gray-200">
            
            <!-- Profile Image Upload -->
            <div class="flex justify-center">
                <label class="relative group cursor-pointer">
                    <img
                        src={profilePreview || '/placeholder-avatar.png'}
                        alt="Profile Preview"
                        class="h-32 w-32 rounded-full object-cover border-4 border-[#40C0E5] shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <input type="file" accept="image/*" class="hidden" onchange={handleFileChange} />
                    <div class="absolute bottom-2 right-2 bg-[#40C0E5] text-white rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
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
                <input id="contact" bind:value={contact} type="text" placeholder="Phone number" class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" />
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
                    {isSubmitting ? 'Saving...' : 'Save Doctor'}
                </button>
            </div>
        </div>
    </div>
</div>


