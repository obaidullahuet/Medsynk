<script lang="ts">
	import { selectedPatient } from '$lib/store/patientStore';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { appointment } from '$lib/appointmentsData/appointment';
	import Chart from '../components/tables/RevineueGraph.svelte';
	import Revenue from '../components/tables/Revenue.svelte';
	import PatientOverview from '../components/tables/PatientOverview.svelte';
	import Patienttreatment from '../components/tables/patienttreatment.svelte';
	import Patientstatus from '../components/tables/patientstatus.svelte';
	import Populartreatment from '../components/tables/populartreatment.svelte';
	import Cards from '../components/dashboards/Cards.svelte';
	import Calender from '../components/tables/calender.svelte';
	import Surgeryshedules from '../components/tables/surgeryshedules.svelte';
	import Recentactivity from '../components/tables/recentactivity.svelte';

	let patientData: any = null;
	let upcomingEvents: any[] = [];
	let historyEvents: any[] = [];
	let patientNotes: string = 'No notes available for this patient.';

	//  Get patient data from store when page mounts
	onMount(() => {
		const patient = get(selectedPatient);
		if (patient) {
			patientData = patient;

			// Filter scheduled events for this patient
			upcomingEvents = appointment.filter(
				(ev) => ev.patientId === patient.id && ev.status === 'Scheduled'
			);

			// Completed & Cancelled events for History
			historyEvents = appointment.filter(
				(ev) =>
					ev.patientId === patient.id && (ev.status === 'Completed' || ev.status === 'Cancelled')
			);

			//  Extract latest note dynamically (from latest appointment)
			const patientAppointments = appointment.filter((ev) => ev.patientId === patient.id);
			if (patientAppointments.length > 0) {
				// Get last appointment (latest in dataset order)
				const latestAppointment = patientAppointments[patientAppointments.length - 1];
				patientNotes = latestAppointment.notes || 'No notes available for this appointment.';
			}
		}
	});

	//  Fallback if user refreshes and store is empty
	if (!patientData) {
		patientData = {
			name: 'Unknown Patient',
			profileImage: 'https://via.placeholder.com/150?text=No+Image',
			hpi: 'N/A',
			expiryDate: 'N/A',
			status: 'N/A',
			age: 'N/A',
			gender: 'N/A',
			birthday: 'N/A',
			idPatient: 'N/A'
		};
	}

	let currentDate = new Date().toLocaleDateString();
</script>

<div class="rounded-2xl bg-[#f9f5f4] px-2 py-2">
	<div class="grid grid-cols-1 gap-1 lg:grid-cols-12">
		<!-- Main Content Area -->
		<div class="rounded-xl bg-[#f9f5f4] p-2 lg:col-span-9">
			<div class="grid grid-cols-1 gap-2 lg:grid-cols-6">
				<!-- Left Column - Stats and Tables -->

				<div class="space-y-2 lg:col-span-4">
					<!-- Stats Cards in 2x2 Grid -->
					<Cards />

					<!-- Revenue Table -->
					<div>
						<Revenue />
					</div>

					<!-- Chart -->
					<div>
						<Chart />
					</div>

					<div>
						<Patientstatus />
					</div>
				</div>

				<!-- Right Column - Patient Overview and Treatment -->
				<div class="space-y-2 lg:col-span-2">
					<PatientOverview />
					<Patienttreatment />
					<Populartreatment />
				</div>
			</div>
		</div>

		<!-- Right Sidebar - Treatment & Schedule -->
		<div class="space-y-5 rounded-2xl bg-white p-2 lg:col-span-3">
			<!-- Treatment Header -->
			<Calender />
			<Surgeryshedules />
            <Recentactivity/>
		</div>
	</div>
</div>

<style>
</style>
