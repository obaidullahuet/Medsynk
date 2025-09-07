<script lang="ts">
    export let params;
    import DoctorProfile from '../../../components/dashboards/doctorProfile.svelte';
    import { fetchDoctorById } from '$lib/api/doctorsApi';
    import { onMount } from 'svelte';
  
    let doctorId = params.id;
    let doctor = null;
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            const res = await fetchDoctorById(doctorId);
            doctor = res.data; // Assuming your API returns { message, data: {...} }
        } catch (err) {
            error = 'Failed to load doctor details.';
            console.error(err);
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <p class="p-4 text-center text-gray-500">Loading doctor details...</p>
{:else if error}
    <p class="p-4 text-center text-red-500">{error}</p>
{:else if doctor}
    <DoctorProfile {doctor} />
{:else}
    <p class="p-4 text-center text-gray-500">Doctor not found.</p>
{/if}
