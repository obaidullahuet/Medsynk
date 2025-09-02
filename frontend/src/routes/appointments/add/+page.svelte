<script lang="ts">
	import { goto } from '$app/navigation';
	import { fetchDoctors, getDoctorsForTreatment, getDoctorAvailabilityForDate, getDoctorAppointments } from '$lib/api/doctorsApi';
	import { getPatients } from '$lib/api/patientApi';
	import { getTreatments } from '$lib/api/treatmentsApi';
	import { createAppointment } from '$lib/api/appointmentsApi';
	import toast from 'svelte-french-toast';

	let isSubmitting = $state(false);
	let doctors: any[] = $state([]);
	let patients: any[] = $state([]);
	let treatments: any[] = $state([]);

	let doctorId = $state('');
	let patientId = $state('');
	let treatmentId = $state('');
	let date = $state('');
	let time = $state('');
	let isCheckingAvailability = $state(false);
	let availabilityMessage = $state('');
	let isDoctorAvailable = $state(true);
	let availableTimeSlots = $state<string[]>([]);
	let currentAvailability = $state<any>(null);
	let selectedDoctor = $state<any>(null);
	let bookedTimeSlots = $state<string[]>([]);
	let isFetchingBookedSlots = $state(false);

	// Reset dependent fields when patient changes
	$effect(() => {
		if (patientId) {
			// Reset treatment and doctor when patient changes
			treatmentId = '';
			doctorId = '';
		}
	});

	// Reset doctor and fetch doctors when treatment changes
	$effect(() => {
		if (treatmentId) {
			// Reset doctor when treatment changes
			doctorId = '';
			// Fetch doctors for the selected treatment
			fetchDoctorsForTreatment();
		} else {
			// Clear doctors list when no treatment is selected
			doctors = [];
		}
	});

	// Store selected doctor when doctor changes
	$effect(() => {
		if (doctorId) {
			selectedDoctor = doctors.find(d => d.id == doctorId) || null;
		} else {
			selectedDoctor = null;
		}
	});

	// Check doctor availability when date or doctor changes
	$effect(() => {
		if (doctorId && date) {
			checkDoctorAvailability();
		} else {
			// Clear availability message when doctor or date is not selected
			availabilityMessage = '';
			isDoctorAvailable = true;
			availableTimeSlots = [];
			currentAvailability = null;
			time = '';
		}
	});

	// Load initial dropdown data (patients and treatments only)
	Promise.all([getPatients(1, 100), getTreatments(1, 100)])
		.then(([patRes, trtRes]) => {
			patients = patRes?.data || patRes || [];
			treatments = trtRes?.data || trtRes || [];
		})
		.catch(console.error);

	// Function to fetch doctors when treatment is selected
	async function fetchDoctorsForTreatment() {
		try {
			const docRes = await getDoctorsForTreatment(Number(treatmentId));
			doctors = docRes?.data || docRes || [];
		} catch (error) {
			console.error('Error fetching doctors:', error);
			doctors = [];
		}
	}

	// Function to generate time slots between start and end time
	function generateTimeSlots(startTime: string, endTime: string, slotDuration: number): string[] {
		const slots: string[] = [];
		const start = new Date(`2000-01-01T${startTime}`);
		const end = new Date(`2000-01-01T${endTime}`);
		
		let current = new Date(start);
		while (current < end) {
			slots.push(current.toTimeString().slice(0, 5)); // Format as HH:MM
			current.setMinutes(current.getMinutes() + slotDuration);
		}
		
		return slots;
	}

	// Function to fetch booked appointments for the selected date
	async function fetchBookedAppointments() {
		if (!doctorId || !date) {
			bookedTimeSlots = [];
			return;
		}

		isFetchingBookedSlots = true;
		try {
			const appointments = await getDoctorAppointments(Number(doctorId), date);
			const bookedSlots: string[] = [];
			
			// Handle the nested data structure from the API response
			if (appointments && appointments.data && appointments.data.data && Array.isArray(appointments.data.data)) {
				appointments.data.data.forEach((appointment: any) => {
					if (appointment.scheduledTime) {
						// Convert time to HH:MM format
						const timeStr = String(appointment.scheduledTime);
						const timeSlot = timeStr.slice(0, 5); // Get HH:MM part
						bookedSlots.push(timeSlot);
					}
				});
			}
			
			bookedTimeSlots = bookedSlots;
			console.log('Booked slots for date', date, ':', bookedSlots);
		} catch (error) {
			console.error('Error fetching booked appointments:', error);
			bookedTimeSlots = [];
		} finally {
			isFetchingBookedSlots = false;
		}
	}

	// Function to check if a time slot is booked
	function isTimeSlotBooked(timeSlot: string): boolean {
		return bookedTimeSlots.includes(timeSlot);
	}

	// Function to check doctor availability for selected date
	async function checkDoctorAvailability() {
		if (!doctorId || !date) {
			availabilityMessage = '';
			isDoctorAvailable = true;
			availableTimeSlots = [];
			currentAvailability = null;
			time = ''; // Reset time when availability changes
			return;
		}

		isCheckingAvailability = true;
		try {
			// Get day name from date
			const selectedDate = new Date(date);
			const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
			
			const availability = await getDoctorAvailabilityForDate(Number(doctorId), dayName);
			
			if (availability && availability.data) {
				isDoctorAvailable = true;
				currentAvailability = availability.data;
				availabilityMessage = `Available: ${availability.data.startTime} - ${availability.data.endTime}`;
				
				// Generate time slots based on availability and doctor's slot duration
				const startTime = availability.data.startTime;
				const endTime = availability.data.endTime;
				const slotDuration = selectedDoctor?.slotDuration || 15; // Use doctor's slot duration or default to 15
				availableTimeSlots = generateTimeSlots(startTime, endTime, slotDuration);
				
				// Fetch booked appointments for this date
				await fetchBookedAppointments();
				
				// Reset time selection when availability changes
				time = '';
			} else {
				isDoctorAvailable = false;
				availabilityMessage = 'Doctor is not available on this day';
				availableTimeSlots = [];
				currentAvailability = null;
				time = '';
			}
		} catch (error) {
			console.error('Error checking availability:', error);
			isDoctorAvailable = false;
			availabilityMessage = 'Unable to check availability';
			availableTimeSlots = [];
			currentAvailability = null;
			time = '';
		} finally {
			isCheckingAvailability = false;
		}
	}

	function handleCancel() {
		goto('/appointments');
	}

	async function handleSubmit() {
		if (!doctorId || !patientId || !treatmentId || !date || !time) {
			// alert('Please fill all fields');
			toast.error('Please Fill all fields');
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
				status: 'scheduled'
			};

			const response = await createAppointment(payload);
			if (response && response.data) {
				toast.success('Appointment Booked');
			}
			// alert('Appointment created');

			// Redirect with a refresh parameter to trigger data reload
			goto('/appointments?refresh=true');
		} catch (err) {
			const msg = err.response?.data?.message || err.message;
			console.error(msg);
			toast.error(msg);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<div class="bg-white shadow-sm border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-6">
				<div>
					<h1 class="text-2xl font-bold text-gray-900">Create Appointment</h1>
					<p class="mt-1 text-sm text-gray-500">Schedule a new appointment for a patient</p>
				</div>
				<div class="flex items-center space-x-3">
					<button
						type="button"
						onclick={handleCancel}
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
						</svg>
						Back to Appointments
					</button>
				</div>
			</div>
		</div>
		</div>

	<!-- Main Content -->
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="bg-white shadow rounded-lg">
			<!-- Form Header -->
			<div class="px-6 py-4 border-b border-gray-200">
				<h2 class="text-lg font-medium text-gray-900">Appointment Details</h2>
				<p class="mt-1 text-sm text-gray-500">Fill in the required information to schedule the appointment</p>
				</div>

			<!-- Form Content -->
			<div class="px-6 py-6 space-y-6">
				<!-- Patient Selection -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2" for="patient-select">
						Patient <span class="text-red-500">*</span>
					</label>
					<select
						id="patient-select"
						bind:value={patientId}
						class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					>
						<option value="">Select a patient</option>
						{#each patients as p}
							<option value={p.id}>{p.name}</option>
						{/each}
					</select>
				</div>

				<!-- Treatment Selection -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2" for="treatment-select">
						Treatment <span class="text-red-500">*</span>
					</label>
					<select
						id="treatment-select"
						bind:value={treatmentId}
						disabled={!patientId}
						class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
					>
						<option value="">{patientId ? 'Select a treatment' : 'Please select a patient first'}</option>
						{#each treatments as t}
							<option value={t.id}>{t.name || t.title || t.treatmentName}</option>
						{/each}
					</select>
				</div>

				<!-- Doctor Selection -->
					<div>
					<label class="block text-sm font-medium text-gray-700 mb-2" for="doctor-select">
						Doctor <span class="text-red-500">*</span>
					</label>
					<select
						id="doctor-select"
						bind:value={doctorId}
						disabled={!patientId || !treatmentId}
						class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
					>
						<option value="">{!patientId ? 'Please select a patient first' : !treatmentId ? 'Please select a treatment first' : 'Select a doctor'}</option>
						{#each doctors as d}
							<option value={d.id}>{d.name}</option>
						{/each}
					</select>
				</div>

				<!-- Date and Time Selection -->
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2" for="date-input">
							Date <span class="text-red-500">*</span>
						</label>
						<input
							id="date-input"
							type="date"
							bind:value={date}
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						{#if availabilityMessage}
							<div class="mt-2 text-sm {isDoctorAvailable ? 'text-green-600' : 'text-red-600'} flex items-center">
								{#if isCheckingAvailability}
									<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									<span>Checking availability...</span>
								{:else}
									{#if isDoctorAvailable}
										<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
										</svg>
									{:else}
										<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
										</svg>
									{/if}
									{availabilityMessage}
								{/if}
							</div>
						{/if}
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2" for="time-select">
							Time <span class="text-red-500">*</span>
						</label>
						<select
							id="time-select"
							bind:value={time}
							disabled={!isDoctorAvailable || availableTimeSlots.length === 0}
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
						>
							<option value="">
								{!isDoctorAvailable 
									? 'Doctor not available' 
									: availableTimeSlots.length === 0 
										? 'No available slots' 
										: 'Select a time slot'
								}
							</option>
							{#each availableTimeSlots as slot}
								<option 
									value={slot} 
									disabled={isTimeSlotBooked(slot)}
									class={isTimeSlotBooked(slot) ? 'text-red-600 bg-red-50' : ''}
								>
									{slot}
								</option>
							{/each}
						</select>
						{#if isFetchingBookedSlots}
							<div class="mt-2 text-sm text-gray-500 flex items-center">
								<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span>Checking booked slots...</span>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Form Actions -->
			<div class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
				<div class="flex justify-end space-x-3">
				<button
					type="button"
					onclick={handleCancel}
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
						Cancel
					</button>
				<button
					type="button"
					disabled={isSubmitting}
					onclick={handleSubmit}
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if isSubmitting}
							<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Saving...
						{:else}
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							Save Appointment
						{/if}
				</button>
				</div>
			</div>
		</div>
	</div>
</div>
