<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fetchAppointmentById } from '$lib/api/appointmentsApi';
	import { createMedicalInfo } from '$lib/api/medicalInfo';
	import toast from 'svelte-french-toast';
	import { sendVoiceNotes } from '$lib/api/chatApi';
	
	// Get the appointment object from navigation state
	// $: apptObj = $page.state?.apptObj;
	$: id = $page.url.searchParams.get('id');

	// Loading state
	let isLoading = false;


	onMount(async() => {
		console.log(id)
		if (id) {
			const response=await fetchAppointmentById(id);
			console.log(response.data.patient.name)
			formData.patientName=response.data.patient.name;
			formData.patientId=response.data.patient.id;
			formData.appointmentId=response.data.id;

		}
		});

	// Form data
	let formData = {
		patientId: '',
		patientName: '',
		bloodGroup: '',
		bodyTemperature : '',
		heartRate : '',
		respirationRate : '',
		bloodPressure : '',
		// notes: '',
		appointmentId: ''
	};

	// Audio recording state
	let isRecording = false;
	let mediaRecorder: MediaRecorder | null = null;
	let audioChunks: Blob[] = [];
	let audioBlob: Blob | null = null;
	let audioUrl: string | null = null;
	let audioFile: File | null = null;
 
 	// Processing state for voice notes
 	let isProcessing = false;

	// Validation helpers and computed validity for the Save button
	function isFilled(value: unknown): boolean {
		return typeof value === 'string' ? value.trim().length > 0 : value !== null && value !== undefined;
	}

	$: isFormValid = (() => {
		// Only require that an audio file has been recorded
		return !!audioFile;
	})();
 
 	// Parsed medical summary for human-readable display
 	let medicalSummary:
 		| {
 					history: string[];
 					patient_condition: string;
 					symptoms: string[];
 					diagnosis: { disease: string; icd_code: string };
 					prescription: { medicine: string; dose: string; generic_name: string }[];
 					lab_tests: { test: string; cpt_code: string }[];
 					additional_advice: string[];
 			  }
 		| null = null;

	// Helpers to edit array fields in the summary
	function addListItem(key: 'history' | 'symptoms' | 'prescription' | 'lab_tests' | 'additional_advice') {
		if (!medicalSummary) return;
		if (key === 'lab_tests') {
			// @ts-ignore
			medicalSummary[key] = [...(medicalSummary[key] || []), { test: '', cpt_code: '' }];
		} else if (key === 'prescription') {
			// @ts-ignore
			medicalSummary[key] = [
				...(medicalSummary[key] || []),
				{ medicine: '', dose: '', generic_name: '' }
			];
		} else {
			// @ts-ignore
			medicalSummary[key] = [...(medicalSummary[key] || []), ''];
		}
	}

	function updateListItem(
		key: 'history' | 'symptoms' | 'prescription' | 'lab_tests' | 'additional_advice',
		index: number,
		value: string
	) {
		if (!medicalSummary) return;
		// Only for string arrays
		if (key === 'lab_tests' || key === 'prescription') return;
		// @ts-ignore
		const list: string[] = [...(medicalSummary[key] || [])];
		list[index] = value;
		// @ts-ignore
		medicalSummary[key] = list;
	}

	function removeListItem(key: 'history' | 'symptoms' | 'prescription' | 'lab_tests' | 'additional_advice', index: number) {
		if (!medicalSummary) return;
		// @ts-ignore
		medicalSummary[key] = (medicalSummary[key] || []).filter((_: any, i: number) => i !== index);
	}

	function updateLabTestField(index: number, field: 'test' | 'cpt_code', value: string) {
		if (!medicalSummary) return;
		const list = [...(medicalSummary.lab_tests || [])];
		const item = { ...(list[index] || { test: '', cpt_code: '' }) };
		item[field] = value;
		list[index] = item;
		medicalSummary.lab_tests = list;
	}

	function updatePrescriptionField(
		index: number,
		field: 'medicine' | 'dose' | 'generic_name',
		value: string
	) {
		if (!medicalSummary) return;
		const list = [...(medicalSummary.prescription || [])];
		const item = { ...(list[index] || { medicine: '', dose: '', generic_name: '' }) };
		item[field] = value;
		list[index] = item;
		medicalSummary.prescription = list;
	}

	// Blood group options
	const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

	// Handle form submission
	async function handleSubmit() {
		if (!isFormValid) {
			toast.error('Please record and process audio notes before saving.');
			return;
		}
		isLoading = true;
		try {
			const fd = new FormData();
			fd.append('patientId', String(formData.patientId ));
			fd.append('bloodGroup', String(formData.bloodGroup));
			fd.append('bodyTemperature', String(formData.bodyTemperature));
			fd.append('heartRate', String(formData.heartRate));
			fd.append('respirationRate', String(formData.respirationRate));
			fd.append('bloodPressure', String(formData.bloodPressure));
			fd.append('appointmentId', String(formData.appointmentId));
			fd.append('createdAt', new Date().toISOString());

			// Include notes JSON from the processed voice result
			try {
				const notesPayload = medicalSummary ? JSON.stringify(medicalSummary) : '{}';
				fd.append('notes', notesPayload);
			} catch {
				fd.append('notes', '{}');
			}

			// if (audioFile) {
			// 	fd.append('audioFile', audioFile);
			// } 
			// else {
			// 	toast.error('Please record audio notes before submitting.');
			// 	return;
			// }

			const response=await createMedicalInfo(fd);
			console.log(response);
			if(response.error){
				toast.error(response.error);
			}else{
				toast.success('Medical info submitted successfully');
				// goto('/medical-info');
			}

		} catch (error) {
			console.error('Failed to submit medical info:', error);
			let message = 'Failed to submit medical info. Please try again.';
			try {
				// @ts-ignore
				message = error?.response?.data?.message || error?.message || message;
			} catch {}
			toast.error(message);
		} finally {
			isLoading = false;
		}
	}
	
	// Function to handle process button click
	async function handleProcessClick() {
		console.log('hello');
		if(!audioFile){
			toast.error('Please record audio notes before submitting.');
			return;
		}
		isProcessing = true;
		try {
			// fd.append('audioFile', audioFile);
			const response=await sendVoiceNotes(audioFile);
			console.log(response);
			let parsed: any = response;
			if (typeof response === 'string') {
				try {
					parsed = JSON.parse(response);
				} catch {}
			}
			const summary = parsed?.medical_summary ?? parsed;
			// Normalize lab_tests to objects if needed
			if (summary?.lab_tests && Array.isArray(summary.lab_tests)) {
				const normalized = summary.lab_tests.map((t: any) =>
					t && typeof t === 'object' ? { test: t.test ?? String(t.test ?? ''), cpt_code: t.cpt_code ?? '' } : { test: String(t ?? ''), cpt_code: '' }
				);
				summary.lab_tests = normalized;
			}
			// Normalize prescription to objects if needed
			if (summary?.prescription && Array.isArray(summary.prescription)) {
				const normalizedRx = summary.prescription.map((p: any) =>
					p && typeof p === 'object'
						? {
							medicine: p.medicine ?? String(p.medicine ?? ''),
							dose: p.dose ?? '',
							generic_name: p.generic_name ?? ''
						}
						: { medicine: String(p ?? ''), dose: '', generic_name: '' }
				);
				summary.prescription = normalizedRx;
			}
			medicalSummary = summary ?? null;
		} finally {
			isProcessing = false;
		}
	}
	
	// Audio recording functions
	async function startRecording() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
			audioChunks = [];

			mediaRecorder.ondataavailable = (event) => {
				audioChunks.push(event.data);
			};

			mediaRecorder.onstop = () => {
				audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
				audioUrl = URL.createObjectURL(audioBlob);
				audioFile = new File([audioBlob], `notes_${Date.now()}.webm`, { type: 'audio/webm' });
			};

			mediaRecorder.start();
			isRecording = true;
		} catch (error) {
			console.error('Error accessing microphone:', error);
			alert('Unable to access microphone. Please check permissions.');
		}
	}

	function stopRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
			mediaRecorder.stream.getTracks().forEach(track => track.stop());
			isRecording = false;
		}
	}

	function clearRecording() {
		if (audioUrl) {
			URL.revokeObjectURL(audioUrl);
		}
		audioUrl = null;
		audioBlob = null;
		audioFile = null;
	}

	// Cleanup on component destroy
	onMount(() => {
		return () => {
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}
		};
	});

</script>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Medical Information Form</h1>
			<p class="mt-2 text-gray-600">Enter patient's medical information and vital signs</p>
		</div>

		<!-- Form -->
		<form on:submit|preventDefault={handleSubmit} class="space-y-8">
			<!-- Patient Name Field -->
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<label for="patientName" class="block text-sm font-medium text-gray-700 mb-2">
					Patient Name *
				</label>
				<input
					type="text"
					id="patientName"
					bind:value={formData.patientName}
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
					placeholder="Enter patient's full name"
				/>
			</div>

			<!-- Vital Signs Row -->
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h3 class="text-lg font-medium text-gray-900 mb-4">Vital Signs</h3>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
					<!-- Blood Group -->
					<div>
						<label for="bloodGroup" class="block text-sm font-medium text-gray-700 mb-2">
							Blood Group
						</label>
						<select
							id="bloodGroup"
							bind:value={formData.bloodGroup}
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
						>
							<option value="">Select Blood Group</option>
							{#each bloodGroups as group}
								<option value={group}>{group}</option>
							{/each}
						</select>
					</div>

					<!-- Temperature -->
					<div>
						<label for="temperature" class="block text-sm font-medium text-gray-700 mb-2">
							Temperature (°C)
						</label>
						<input
							type="number"
							id="temperature"
							bind:value={formData.bodyTemperature}
							step="0.1"
							min="30"
							max="45"
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
							placeholder="36.5"
						/>
					</div>

					<!-- Heart Rate -->
					<div>
						<label for="heartRate" class="block text-sm font-medium text-gray-700 mb-2">
							Heart Rate (bpm)
						</label>
						<input
							type="number"
							id="heartRate"
							bind:value={formData.heartRate}
							min="40"
							max="200"
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
							placeholder="72"
						/>
					</div>

					<!-- Respiration -->
					<div>
						<label for="respiration" class="block text-sm font-medium text-gray-700 mb-2">
							Respiration (breaths/min)
						</label>
						<input
							type="number"
							id="respiration"
							bind:value={formData.respirationRate}
							min="8"
							max="40"
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
							placeholder="16"
						/>
					</div>

					<!-- Blood Pressure -->
					<div>
						<label for="bloodPressure" class="block text-sm font-medium text-gray-700 mb-2">
							Blood Pressure (mmHg)
						</label>
						<input
							type="text"
							id="bloodPressure"
							bind:value={formData.bloodPressure}
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
							placeholder="120/80"
						/>
					</div>
				</div>
			</div>

			<!-- Audio Notes Field -->
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<p class="block text-sm font-medium text-gray-700 mb-4">
					Notes (Audio Recording)
				</p>
				
				<div class="space-y-4">
					<!-- Recording Controls -->
					<div class="flex items-center space-x-4">
						{#if !isRecording && !audioUrl}
							<button
								type="button"
								on:click={startRecording}
								class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#40C0E5] hover:bg-[#00abdb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40C0E5]"
							>
								<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd" />
								</svg>
								Start Recording
							</button>
						{:else if isRecording}
							<button
								type="button"
								on:click={stopRecording}
								class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
								</svg>
								Stop Recording
							</button>
							<div class="flex items-center text-red-600">
								<div class="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></div>
								Recording...
							</div>
						{/if}

						{#if audioUrl}
							<button
								type="button"
								on:click={clearRecording}
								class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40C0E5]"
							>
								<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
								Clear
							</button>
						{/if}
					</div>

					<!-- Audio Player -->
					{#if audioUrl}
						<div class="bg-gray-50 rounded-lg p-4">
							<p class="text-sm text-gray-600 mb-2">Recorded Notes:</p>
							<audio controls class="w-full">
								<source src={audioUrl} type="audio/wav" />
								Your browser does not support the audio element.
							</audio>
							
							<!-- Process Button -->
							<div class="mt-3">
								<button
									type="button"
									on:click={handleProcessClick}
									disabled={isProcessing}
									class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
								>
									{#if isProcessing}
										<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									{/if}
									{isProcessing ? 'Processing...' : 'Process'}
								</button>
							</div>

							{#if medicalSummary}
					<div class="mt-6 space-y-4">
						<h4 class="text-md font-semibold text-gray-900">Medical Summary</h4>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div class="bg-white border border-gray-200 rounded-md p-3">
								<label for="patientCondition" class="text-sm text-gray-500">Patient Condition</label>
								<input
									id="patientCondition"
									type="text"
									class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
									bind:value={medicalSummary.patient_condition}
									placeholder="Not specified"
								/>
							</div>

							<div class="bg-white border border-gray-200 rounded-md p-3 space-y-2">
								<p class="text-sm text-gray-500">Diagnosis</p>
								<input
									type="text"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
									bind:value={medicalSummary.diagnosis.disease}
									placeholder="Disease"
								/>
								<input
									type="text"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
									bind:value={medicalSummary.diagnosis.icd_code}
									placeholder="ICD Code"
								/>
							</div>
						</div>

						<div class="bg-white border border-gray-200 rounded-md p-3">
							<p class="text-sm font-medium text-gray-700 mb-2">History</p>
							{#each (medicalSummary.history || []) as item, i}
								<div class="flex items-center gap-2 mb-2">
									<input
										type="text"
										class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={item}
										on:input={(e: any) => updateListItem('history', i, e.target.value)}
									/>
									<button type="button" class="px-2 py-1 text-sm text-white bg-red-600 rounded" on:click={() => removeListItem('history', i)}>Remove</button>
								</div>
							{/each}
							<button type="button" class="mt-1 px-3 py-2 text-sm text-white bg-[#40C0E5] hover:bg-[#00abdb] rounded" on:click={() => addListItem('history')}>Add</button>
						</div>

						<div class="bg-white border border-gray-200 rounded-md p-3">
							<p class="text-sm font-medium text-gray-700 mb-2">Symptoms</p>
							{#each (medicalSummary.symptoms || []) as s, i}
								<div class="flex items-center gap-2 mb-2">
									<input
										type="text"
										class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={s}
										on:input={(e: any) => updateListItem('symptoms', i, e.target.value)}
									/>
									<button type="button" class="px-2 py-1 text-sm text-white bg-red-600 rounded" on:click={() => removeListItem('symptoms', i)}>Remove</button>
								</div>
							{/each}
							<button type="button" class="mt-1 px-3 py-2 text-sm text-white bg-[#40C0E5] hover:bg-[#00abdb] rounded" on:click={() => addListItem('symptoms')}>Add</button>
						</div>

						<div class="bg-white border border-gray-200 rounded-md p-3">
							<p class="text-sm font-medium text-gray-700 mb-2">Prescription</p>
							{#each (medicalSummary.prescription || []) as rx, i}
								<div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
									<input
										type="text"
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={rx.medicine}
										placeholder="Medicine"
										on:input={(e: any) => updatePrescriptionField(i, 'medicine', e.target.value)}
									/>
									<input
										type="text"
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={rx.dose}
										placeholder="Dose"
										on:input={(e: any) => updatePrescriptionField(i, 'dose', e.target.value)}
									/>
									<input
										type="text"
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={rx.generic_name}
										placeholder="Generic name"
										on:input={(e: any) => updatePrescriptionField(i, 'generic_name', e.target.value)}
									/>
									<div class="md:col-span-3 flex justify-end">
										<button type="button" class="px-2 py-1 text-sm text-white bg-red-600 rounded" on:click={() => removeListItem('prescription', i)}>Remove</button>
									</div>
								</div>
							{/each}
							<button type="button" class="mt-1 px-3 py-2 text-sm text-white bg-[#40C0E5] hover:bg-[#00abdb] rounded" on:click={() => addListItem('prescription')}>Add Prescription</button>
						</div>

						<div class="bg-white border border-gray-200 rounded-md p-3">
							<p class="text-sm font-medium text-gray-700 mb-2">Lab Tests</p>
							{#each (medicalSummary.lab_tests || []) as t, i}
								<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
									<input
										type="text"
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={t.test}
										placeholder="Test name (e.g., ECG)"
										on:input={(e: any) => updateLabTestField(i, 'test', e.target.value)}
									/>
									<input
										type="text"
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={t.cpt_code}
										placeholder="CPT code (e.g., 93000)"
										on:input={(e: any) => updateLabTestField(i, 'cpt_code', e.target.value)}
									/>
									<div class="md:col-span-2 flex justify-end">
										<button type="button" class="px-2 py-1 text-sm text-white bg-red-600 rounded" on:click={() => removeListItem('lab_tests', i)}>Remove</button>
									</div>
								</div>
							{/each}
							<button type="button" class="mt-1 px-3 py-2 text-sm text-white bg-[#40C0E5] hover:bg-[#00abdb] rounded" on:click={() => addListItem('lab_tests')}>Add Lab Test</button>
						</div>

						<div class="bg-white border border-gray-200 rounded-md p-3">
							<p class="text-sm font-medium text-gray-700 mb-2">Additional Advice</p>
							{#each (medicalSummary.additional_advice || []) as a, i}
								<div class="flex items-center gap-2 mb-2">
									<input
										type="text"
										class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40C0E5] focus:border-[#40C0E5]"
										value={a}
										on:input={(e: any) => updateListItem('additional_advice', i, e.target.value)}
									/>
									<button type="button" class="px-2 py-1 text-sm text-white bg-red-600 rounded" on:click={() => removeListItem('additional_advice', i)}>Remove</button>
								</div>
							{/each}
							<button type="button" class="mt-1 px-3 py-2 text-sm text-white bg-[#40C0E5] hover:bg-[#00abdb] rounded" on:click={() => addListItem('additional_advice')}>Add</button>
						</div>
					</div>
					{/if}
					</div>
					{/if}
 
 					<!-- Instructions -->
					<div class="text-sm text-gray-500 bg-blue-50 rounded-lg p-3">
						<p class="font-medium text-blue-800 mb-1">Instructions:</p>
						<ul class="list-disc list-inside space-y-1 text-blue-700">
							<li>Click "Start Recording" to begin recording your notes</li>
							<li>Click "Stop Recording" when finished</li>
							<li>You can play back the recording to review it</li>
							<li>Click "Clear" to remove the recording and start over</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Submit Button -->
			<div class="flex justify-end space-x-4">
				<button
					type="button"
					disabled={isLoading}
					class="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40C0E5] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={!isFormValid || isLoading}
					class="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#40C0E5] hover:bg-[#00abdb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40C0E5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
				>
					{#if isLoading}
						<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
					{/if}
					{isLoading ? 'Saving...' : 'Save Medical Information'}
				</button>
			</div>
		</form>
	</div>
</div>
