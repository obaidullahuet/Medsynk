<script lang="ts">
    import { goto } from '$app/navigation';
    import { fetchDoctors } from '$lib/api/doctorsApi';
    import { getPatients } from '$lib/api/patientApi';
    import { getTreatments } from '$lib/api/treatmentsApi';
    import { createAppointment } from '$lib/api/appointmentsApi';

    let isSubmitting = $state(false);
    let doctors: any[] = $state([]);
    let patients: any[] = $state([]);
    let treatments: any[] = $state([]);

    let doctorId = $state('');
    let patientId = $state('');
    let treatmentId = $state('');
    let date = $state('');
    let time = $state('');

    // Load dropdown data
    Promise.all([
        fetchDoctors(1, 100),
        getPatients(1, 100),
        getTreatments(1, 100)
    ]).then(([docRes, patRes, trtRes]) => {
        doctors = docRes?.data || docRes || [];
        patients = patRes?.data || patRes || [];
        treatments = trtRes?.data || trtRes || [];
    }).catch(console.error);

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
            const payload = {
                doctorId: Number(doctorId),
                patientId: Number(patientId),
                treatmentId: Number(treatmentId),
                scheduledDate: date, // YYYY-MM-DD
                scheduledTime: time.length === 5 ? `${time}:00` : time, // HH:MM[:SS]
                status: 'scheduled',
                // notes: ''
            };

            await createAppointment(payload);
            alert('Appointment created');
            goto('/appointments');
        } catch (err) {
            console.error(err);
            alert('Failed to create appointment');
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
    <div class="mx-auto max-w-2xl px-6">
        <div class="text-center mb-10">
            <h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">📅 Create Appointment</h1>
            <p class="text-gray-600 mt-2">Fill in the details to schedule an appointment</p>
        </div>

        <div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 space-y-7 border border-gray-200">
            <div class="grid grid-cols-1 gap-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2" for="doctor-select">Select Doctor *</label>
                    <select id="doctor-select" bind:value={doctorId} class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all">
                        <option value="">Select a doctor</option>
                        {#each doctors as d}
                            <option value={d.id}>{d.name}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2" for="patient-select">Select Patient *</label>
                    <select id="patient-select" bind:value={patientId} class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all">
                        <option value="">Select a patient</option>
                        {#each patients as p}
                            <option value={p.id}>{p.name}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2" for="treatment-select">Select Treatment *</label>
                    <select id="treatment-select" bind:value={treatmentId} class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all">
                        <option value="">Select a treatment</option>
                        {#each treatments as t}
                            <option value={t.id}>{t.name || t.title || t.treatmentName}</option>
                        {/each}
                    </select>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2" for="date-input">Date *</label>
                        <input id="date-input" type="date" bind:value={date} class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2" for="time-input">Time *</label>
                        <input id="time-input" type="time" bind:value={time} class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all" />
                    </div>
                </div>
            </div>

            <div class="flex gap-4 pt-6">
                <button type="button" onclick={handleCancel} class="flex-1 rounded-2xl border border-gray-400 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-500 transition-all">Cancel</button>
                <button type="button" disabled={isSubmitting} onclick={handleSubmit} class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50">
                    {isSubmitting ? 'Saving...' : 'Save Appointment'}
                </button>
            </div>
        </div>
    </div>
</div>


