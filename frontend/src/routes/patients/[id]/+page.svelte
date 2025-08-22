<script lang="ts">
	import { selectedPatient } from '$lib/store/patientStore';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { appointment } from '$lib/appointmentsData/appointment';
	import { deletePatient, fetchPatientById } from '$lib/api/patientApi';
	import { page } from '$app/stores';
	let patientData: any = null;
	let upcomingEvents: any[] = [];
	let historyEvents: any[] = [];
	let patientNotes: string = 'No notes available for this patient.';

	function computeAgeFromDob(dobStr?: string) {
		if (!dobStr) return 'N/A';
		const dob = new Date(dobStr);
		if (isNaN(dob.getTime())) return 'N/A';
		const diffMs = Date.now() - dob.getTime();
		const ageDate = new Date(diffMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
	}

	function buildPatientDataFromApi(p: any) {
		const name = p?.name ?? 'Unknown Patient';
		return {
			id: p?.id ?? 'N/A',
			name,
			image: p?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
			about: p?.about ?? 'No about information provided.',
			gender: p?.gender ?? 'N/A',
			dob: p?.dob ?? 'N/A',
			age: computeAgeFromDob(p?.dob),
			email: p?.email ?? 'N/A',
			phone: p?.phone ?? 'N/A',
			address: p?.address ?? 'N/A',
			emergencyContact: p?.emergency_contact ?? p?.emergencyContact ?? 'N/A',
			// UI-specific extras and fallbacks
			hpi: p?.medicalRecordNo ?? 'N/A',
			expiryDate: p?.expiryDate ?? 'N/A',
			status: p?.status ?? 'Active',
			bodyTemperature: p?.bodyTemperature ?? 37,
			heartRate: p?.heartRate ?? 72,
			bloodPressure: p?.bloodPressure ?? '120/80',
			respiratory: p?.respiratory ?? 16,
			allergies: Array.isArray(p?.allergies) ? p.allergies : [],
			medications: Array.isArray(p?.medications) ? p.medications : [],
			doctor: p?.doctor?.name ?? (p?.doctor_id ? `Assigned Doctor #${p.doctor_id}` : 'Not Assigned'),
			doctorimage: p?.doctor?.image ?? '/medSynk-logo.png'
		};
	}

	//  Get patient data on mount; prefer API by route param, fallback to store
	onMount(async () => {
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

		try {
			const idFromUrl = $page.params.id;
			if (idFromUrl) {
				const res = await fetchPatientById(idFromUrl);
				const apiPatient = res?.data ?? res;
				if (apiPatient) {
					patientData = buildPatientDataFromApi(apiPatient);
				}
			}
		} catch (e) {
			console.error('Failed to load patient by id', e);
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

	let vitals = {
		bodyTemp: { value: 37, unit: '°C' },
		heartRate: { value: 72, unit: 'BPM' },
		bloodPressure: { value: 120, unit: '/80 mmHg' },
		respiratory: { value: 16, unit: 'breaths/min' }
	};

	let currentDate = new Date().toLocaleDateString();

	// async function handleDelete() {
	// 	if (confirm(`Are you sure you want to delete ${patientData.name}?`)) {
	// 		try {
	// 			await deletePatient(patientData.id);
	// 			alert('Pateint deleted successfully!');
	// 			// Redirect back to the doctor list page
	// 			goto('/pateints');
	// 		} catch (error) {
	// 			console.error(error);
	// 			alert('Failed to delete patient.');
	// 		}
	// 	}
	// }
	async function handleDelete() {
	if (confirm(`Are you sure you want to delete ${patientData.name}?`)) {
		try {
			const result = await deletePatient(patientData.id);
			if (result.success) {
				alert('Patient deleted successfully!');
				goto('/patients'); // fix typo: was '/pateints'
			}
		} catch (error) {
			alert('Failed to delete patient.');
		}
	}
}

</script>

<div class=" rounded-2xl bg-[#f9f5f4] px-2 py-2">
	
		<div class="grid grid-cols-1 gap-2 lg:grid-cols-12">
			<!-- Left Sidebar - Patient Info -->
			<!-- Patient Profile Card -->

			<div
				class="flex flex-col space-y-2 rounded-2xl bg-white p-2 md:flex-row lg:col-span-3 lg:flex-col"
			>
				<div class="flex flex-col items-center gap-5 text-center">
					<!-- <div class="flex h-full flex-col justify-end">
						<div class="flex justify-end">
							<MoreHorizontal class="h-5 w-5 text-gray-400" />
						</div>
					</div> -->
					<img
						src={patientData.image}
						alt="Patient"
						class=" h-20 w-20 rounded-full object-cover"
					/>
					<h2 class=" text-xl font-semibold text-gray-900">{patientData.name}</h2>

					<!-- Action Buttons -->
					<div class=" flex space-x-3">
						<button
							class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200"
						>
							<Icon icon="mdi:calendar" class="h-5 w-5 text-gray-600" />
						</button>
						<button
							class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200"
						>
							<Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-600" />
						</button>
						<button
							class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200"
						>
							<Icon icon="mdi:phone-outline" class="h-5 w-5 text-gray-600" />
						</button>
						<button
							class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200"
						>
							<Icon icon="lucide:file-text" class="h-5 w-5 text-gray-600" />
						</button>
					</div>

					<!-- Insurance Info -->
					<div class="btn-dropdown-color1 flex w-full flex-col gap-4 rounded-xl p-4">
						<div class=" flex items-center">
							<div class="mr-2 flex h-8 w-8 items-center justify-center rounded">
								<!-- <span class="text-xs font-bold text-white">+</span> -->
								<img src="/medSynk-logo.png" alt="" />
							</div>
							<span class="add-text-lg-color text-sm font-medium whitespace-nowrap"
								>HealthPlus Insurance</span
							>
						</div>

						<div class="flex flex-col items-start">
							<p class="text-sm font-semibold text-gray-900">{patientData.name}</p>
							<p class="text-xs text-gray-600">{patientData.hpi}</p>
						</div>

						<div class=" flex items-center justify-between">
							<div class="flex flex-col">
								<span class="text-xs text-gray-500">Expiry Date</span>
								<span class="text-xs"> {patientData.expiryDate}</span>
							</div>
							<span class="add-btn-lg-color add-text-lg-color1 rounded-full px-2 py-1 text-xs"
								>{patientData.status}</span
							>
						</div>
					</div>
				</div>

				<div class="rounded-2xl bg-white px-2 py-2 md:px-6 lg:px-2">
					<div class=" mb-2 flex items-center justify-between md:mb-6 lg:mb-2">
						<h3 class="text-md font-semibold text-gray-900">General Info</h3>
						<Icon icon="lucide:more-horizontal" class="h-5 w-5 text-gray-400" />
					</div>
					<div class=" flex items-center justify-between">
						<h3 class="text-xs font-semibold text-gray-500">About patient</h3>
					</div>

					<div class="space-y-2 text-xs sm:text-sm lg:text-xs">
						<p class="leading-5 text-gray-700">
							{patientData.about}
						</p>
						<hr class=" text-gray-400" />

						<div class=" space-y-4 md:space-y-2 lg:space-y-1.5">
							<div class="flex justify-between">
								<span class="text-gray-500">ID Patient</span>
								<span class="font-medium text-gray-700">{patientData.id}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-500">Gender</span>
								<span class="font-medium text-gray-700">{patientData.gender}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-500">Birthday</span>
								<span class="font-medium text-gray-700">{patientData.dob}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-500">Age</span>
								<span class="font-medium text-gray-700">{patientData.age}</span>
							</div>
						</div>

						<button
							class="btn-dropdown-color1 flex w-full items-center justify-center rounded-full px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 lg:mt-8 xl:mt-5"
							onclick={() => goto(`/patients/${patientData.id}/edit`)}
						>
							Edit Patient Data
						</button>
						<button
							class="btn-dropdown-color1 flex w-full items-center justify-center rounded-full px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 lg:mt-8 xl:mt-5"
							onclick={handleDelete}
						>
							Delete Patient Data
						</button>
					</div>
				</div>
			</div>

			<!-- General Info Card -->

			<!-- Main Content Area -->

			<div class="space-y-2 rounded-xl bg-white p-2 lg:col-span-6">
				<!-- Medical Info Header -->
				<div class="flex items-center justify-between px-2 py-1">
					<h3 class="text-md font-semibold text-gray-900">Medical Info</h3>
					<Icon icon="lucide:more-horizontal" class="h-6 w-6 text-gray-400" />
				</div>

				<!-- Vital Signs Grid -->
				<div class=" flex flex-col gap-2 md:flex-row lg:flex-col">
					<div class="grid grid-cols-2 gap-2">
						<!-- Body Temperature -->
						<div class="btn-dropdown-color1 rounded-2xl p-3 lg:p-6">
							<div class="mb-2 flex items-center">
								<div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
									<span class="text-md text-white">🌡️</span>
								</div>
								<span class="add-text-lg-color text-xs font-medium lg:text-lg"
									>Body Temperature</span
								>
							</div>
							<div class=" text-xl font-bold text-gray-900 lg:text-xl">
								{patientData.bodyTemperature}<span class="text-sm font-normal text-gray-600"
									>{vitals.bodyTemp.unit}</span
								>
							</div>
						</div>

						<!-- Heart Rate -->
						<div class="add-btn-lg-color rounded-2xl p-3 lg:p-6">
							<div class="mb-2 flex items-center">
								<div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
									<span class="text-sm text-white">💗</span>
								</div>
								<span class="add-text-lg-color1 text-sm font-medium lg:text-lg">Heart Rate</span>
							</div>
							<div class=" text-xl font-bold text-gray-900 lg:text-xl">
								{patientData.heartRate}<span class="text-sm font-normal text-gray-600"
									>{vitals.heartRate.unit}</span
								>
							</div>
						</div>

						<!-- Blood Pressure -->
						<div class="add-btn-lg-color rounded-2xl p-3 lg:p-6">
							<div class="mb-2 flex items-center">
								<div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
									<span class="text-sm text-white">💧</span>
								</div>
								<span class="add-text-lg-color1 text-sm font-medium lg:text-lg">Blood Pressure</span
								>
							</div>
							<div class=" text-xl leading-2 font-bold text-gray-900 lg:text-xl">
								{patientData.bloodPressure}<span class="text-sm font-normal text-gray-600"
									>{vitals.bloodPressure.unit}</span
								>
							</div>
						</div>

						<!-- Respiratory -->
						<div class="btn-dropdown-color1 rounded-2xl p-3 lg:p-6">
							<div class="mb-2 flex items-center">
								<div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
									<span class="text-sm text-white">🫁</span>
								</div>
								<span class="font-xs add-text-lg-color text-sm lg:text-lg">Respiratory</span>
							</div>
							<div class=" text-xl leading-2 font-bold text-gray-900 lg:text-xl">
								{patientData.respiratory}<span class="text-sm font-normal text-gray-600"
									>{vitals.respiratory.unit}</span
								>
							</div>
						</div>
					</div>

					<!-- <hr class="mt-4 text-gray-300"> -->
					<!-- Allergies and Medications -->
					<div class="flex gap-2 sm:grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
						<!-- Allergies -->
						<div class="rounded-2xl bg-white p-3">
							<h3 class="mb-4 text-sm font-semibold text-gray-500">Allergies</h3>
							<ul class="space-y-1 text-xs">
								{#each patientData.allergies as allergy}
									<li class="flex items-center">
										<div class="mr-3 h-1 w-1 rounded-full bg-black"></div>
										<span class="text-gray-700">{allergy}</span>
									</li>
								{/each}
							</ul>
						</div>

						<!-- Medications -->
						<div class="rounded-2xl bg-white p-2">
							<h3 class="mb-4 text-sm font-semibold text-gray-500">Medications</h3>
							<ul class="space-y-2 text-xs">
								{#each patientData.medications as med}
									<li class="flex items-center">
										<div class="mr-3 h-1 w-1 rounded-full bg-black"></div>
										<span class="leading-3 text-gray-700">{med}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>

				<!-- Contact Person and Health Report -->
				<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
					<!-- Contact Person -->
					<div class="rounded-2xl bg-white p-3">
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-md font-semibold text-gray-900">Contact Person</h3>
							<Icon icon="lucide:more-horizontal" class="h-5 w-5 text-gray-400" />
						</div>

						<div class="space-y-4 text-xs">
							<div class="flex items-center">
								<Icon icon="lucide:phone" class="mr-3 h-5 w-5 text-gray-400" />
								<div>
									<p class="text-sm text-gray-500">Phone</p>
									<p class="font-medium text-gray-800">{patientData.phone}</p>
								</div>
							</div>

							<div class="flex items-center">
								<Icon icon="lucide:map-pin" class="mr-3 h-5 w-5 text-gray-400" />
								<div>
									<p class="text-sm text-gray-500">Address</p>
									<p class="font-medium text-gray-800">
										{patientData.address}
									</p>
								</div>
							</div>

							<div class="flex items-center">
								<Icon icon="lucide:mail" class="mr-3 h-5 w-5 text-gray-400" />
								<div>
									<p class="text-sm text-gray-500">Email</p>
									<p class="font-medium text-gray-800">{patientData.email}</p>
								</div>
							</div>

							<div class="flex items-center">
								<Icon icon="lucide:alert-triangle" class="mr-3 h-5 w-5 text-gray-400" />
								<div>
									<p class="text-sm text-gray-500">Emergency Contact</p>
									<p class="font-medium text-gray-800">{patientData.emergencyContact}</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Health Report -->
					<div class="rounded-2xl bg-white p-3">
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-md font-semibold text-gray-900">Health Report</h3>
							<Icon icon="lucide:more-horizontal" class="h-5 w-5 text-gray-400" />
						</div>

						<div class="space-y-4 text-xs lg:space-y-6">
							<div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2">
								<div class="flex items-center">
									<Icon icon="lucide:file-text" class="mr-3 h-5 w-5 text-red-500" />
									<div>
										<p class="text-xs font-medium text-gray-800">Skin Test Report</p>
										<p class="text-xs text-gray-500">PDF • 1 MB</p>
									</div>
								</div>
							</div>

							<div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2">
								<div class="flex items-center">
									<Icon icon="lucide:file-text" class="mr-3 h-5 w-5 text-red-500" />
									<div>
										<p class="text-xs font-medium text-gray-800">
											Laser Hair Removal Pre-treatm...
										</p>
										<p class="text-xs text-gray-500">PDF • 500 KB</p>
									</div>
								</div>
							</div>

							<div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2">
								<div class="flex items-center">
									<Icon icon="lucide:file-text" class="mr-3 h-5 w-5 text-red-500" />
									<div>
										<p class="text-xs font-medium text-gray-800">
											Laser Hair Removal Pre-treatm...
										</p>
										<p class="text-xs text-gray-500">PDF • 500 KB</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Sidebar - Treatment & Schedule -->
			<div class="space-y-1 rounded-2xl bg-white p-2 lg:col-span-3">
				<!-- Treatment Header -->
				<div class="flex items-center justify-between rounded-2xl px-2 py-1">
					<h3 class="text-md font-semibold text-gray-900">Treatment</h3>
					<Icon icon="lucide:more-horizontal" class="h-6 w-6 text-gray-400" />
				</div>

				<div class="grid gap-2 md:grid md:grid-cols-3 lg:grid-cols-1">
					<div class="rounded-2xl bg-white lg:text-center">
						<div class="rounded-2xl bg-[#f9f5f4] p-2">
							<img
								src={patientData.doctorimage}
								alt="Doctor"
								class="mb-3 h-16 w-16 rounded-full object-cover lg:mx-auto"
							/>
							<h3 class="font-semibold text-gray-900">{patientData.doctor}</h3>
						</div>

						<div class="rounded-2xl bg-white py-2 text-start">
							<h3 class="text-md mb-2 font-semibold text-gray-900">Upcoming</h3>
							{#if upcomingEvents.length > 0}
								{#each upcomingEvents as event}
									<div class="space-y-2 rounded-2xl bg-[#f9f5f4] p-2">
										<div class="flex items-center">
											<div class="mr-3 h-3 w-3 rounded-full bg-red-400"></div>
											<span class="text-xs font-medium text-red-600">{event.status}</span>
										</div>

										<div class="px-6">
											<h4 class="text-xs font-semibold text-gray-900">{event.title}</h4>
											<div class="mt-1 flex items-center text-xs text-gray-500">
												<Icon icon="lucide:calendar" class="mr-1 h-4 w-4" />
												<span>{event.date} - {event.start}</span>
											</div>
										</div>
									</div>
								{/each}
							{:else}
								<p class="text-xs text-gray-500">No upcoming scheduled appointments.</p>
							{/if}
						</div>
					</div>

					<div class="rounded-2xl bg-white">
						<h3 class="text-md mb-2 font-semibold text-gray-900">History</h3>

						{#if historyEvents.length > 0}
							<div class="space-y-3">
								{#each historyEvents as event}
									<div class="rounded-2xl bg-[#f9f5f4] p-3">
										<div class="flex items-center p-1">
											<div
												class="mr-3 h-3 w-3 rounded-full
							{event.status === 'Completed' ? 'bg-green-400' : 'bg-gray-400'}"
											></div>
											<span
												class="text-xs font-medium
							{event.status === 'Completed' ? 'text-green-600' : 'text-gray-600'}"
											>
												{event.status}
											</span>
										</div>
										<div class="px-6">
											<h4 class="text-xs font-semibold text-gray-900">{event.title}</h4>
											<div class="mt-1 flex items-center text-sm text-gray-500">
												<Icon icon="lucide:calendar" class="mr-1 h-4 w-4" />
												<span class="text-xs">{event.date} - {event.start}</span>
											</div>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<p class="p-2 text-xs text-gray-500">No past events found for this patient.</p>
						{/if}
					</div>

					<div class="rounded-2xl">
						<h3 class="text-md mb-1 font-medium text-gray-900">Notes</h3>

						<div class="rounded-2xl bg-[#f9f5f4] p-3 lg:space-y-1 lg:p-3.5 xl:space-y-1 xl:p-3">
							<div class="text-sm text-gray-500">2028/09/12 - 12:00 PM</div>
							<p class="text-sm leading-relaxed text-gray-700">
								{patientNotes}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	
</div>

<style>
</style>
