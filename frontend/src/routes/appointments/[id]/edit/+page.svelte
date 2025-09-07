<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fetchAppointmentById, updateAppointment } from '$lib/api/appointmentsApi';
    import { fetchDoctors } from '$lib/api/doctorsApi';
    import { getPatients } from '$lib/api/patientApi';
    import { getTreatments } from '$lib/api/treatmentsApi';

    let { params } = $props<{ params: { id: string } }>();
    let id = params.id;

    let isLoading = $state(true);
    let isSubmitting = $state(false);

    let doctors: any[] = $state([]);
    let patients: any[] = $state([]);
    let treatments: any[] = $state([]);

    // Store IDs as numbers (or null until selected)
    let doctorId: number | null = $state(null);
    let patientId: number | null = $state(null);
    let treatmentId: number | null = $state(null);

    let date = $state('');
    let time = $state('');

    onMount(async () => {
        if (!id) {
            goto('/appointments');
            return;
        }

        try {
            const [docRes, patRes, trtRes, apptRes] = await Promise.all([
                fetchDoctors(1, 100),
                getPatients(1, 100),
                getTreatments(1, 100),
                fetchAppointmentById(id)
            ]);

            doctors = docRes?.data || docRes || [];
            patients = patRes?.data || patRes || [];
            treatments = trtRes?.data || trtRes || [];

            const appt = apptRes?.data ?? apptRes;
            if (appt) {
                doctorId = appt?.doctorId?.id ?? appt?.doctorId ?? null;
                patientId = appt?.patientId?.id ?? appt?.patientId ?? null;
                treatmentId = appt?.treatmentId?.id ?? appt?.treatmentId ?? null;
                date = appt?.scheduledDate ?? '';
                const rawTime = String(appt?.scheduledTime ?? '');
                time = rawTime.slice(0, 5);
            }
        } catch (e) {
            console.error(e);
            alert('Failed to load appointment');
            goto('/appointments');
        } finally {
            isLoading = false;
        }
    });

    function handleCancel() {
        goto('/appointments');
    }

    async function handleSubmit() {
        if (!doctorId || !patientId || !treatmentId || !date || !time) {
            alert('Please fill all fields');
            return;
        }
        isSubmitting = true;
        try {
            await updateAppointment(id, {
                doctorId,
                patientId,
                treatmentId,
                scheduledDate: date,
                scheduledTime: time.length === 5 ? `${time}:00` : time,
                status: 'scheduled'
            });
            alert('Appointment updated');
            goto('/appointments');
        } catch (e) {
            console.error(e);
            alert('Failed to update appointment');
        } finally {
            isSubmitting = false;
        }
    }
</script>

{#if isLoading}
    <div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#40C0E5] mx-auto mb-4"></div>
            <p class="text-gray-600 font-medium">Loading appointment...</p>
        </div>
    </div>
{:else}
    <div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
        <div class="mx-auto max-w-2xl px-6">
            <div class="text-center mb-10">
                <h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">✏️ Edit Appointment</h1>
                <p class="text-gray-600 mt-2">Update the appointment details</p>
            </div>

            <div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 space-y-7 border border-gray-200">
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2" for="doctor-select">Select Doctor *</label>
                        <select
                            id="doctor-select"
                            bind:value={doctorId}
                            class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                        >
                            <option value={null}>Select a doctor</option>
                            {#each doctors as d}
                                <option value={d.id}>{d.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2" for="patient-select">Select Patient *</label>
                        <select
                            id="patient-select"
                            bind:value={patientId}
                            class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                        >
                            <option value={null}>Select a patient</option>
                            {#each patients as p}
                                <option value={p.id}>{p.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2" for="treatment-select">Select Treatment *</label>
                        <select
                            id="treatment-select"
                            bind:value={treatmentId}
                            class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                        >
                            <option value={null}>Select a treatment</option>
                            {#each treatments as t}
                                <option value={t.id}>{t.name || t.title || t.treatmentName}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2" for="date-input">Date *</label>
                            <input
                                id="date-input"
                                type="date"
                                bind:value={date}
                                class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2" for="time-input">Time *</label>
                            <input
                                id="time-input"
                                type="time"
                                bind:value={time}
                                class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                            />
                        </div>
                    </div>
                </div>

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
                        class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Appointment'}
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
