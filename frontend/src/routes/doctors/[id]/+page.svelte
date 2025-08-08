<script>
	export let params;
	import { doctors } from '$lib/doctorsData/doctors.js';
	import DoctorProfile from '../../../components/dashboards/doctorProfile.svelte';

	let doctorId = params.id;
	let doctor = doctors.find((d) => d.id === doctorId);
</script>

<DoctorProfile {doctor} />
