<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedPatient } from '$lib/store/patientStore';

	type PatientRow = {
		id: number;
		name: string;
		avatar: string;
		date: string;
		time: string;
		doctor: string;
		treatment: string;
		status: string;
	};

	export let patients: PatientRow[];

	let showDeleteModal = false;
	let selectAll = false;
	let selected: number[] = [];

	function toggleSelectAll() {
		selectAll = !selectAll;
		if (selectAll) {
			const newSelections = patients.map((i: PatientRow) => i.id);
			selected = Array.from(new Set([...selected, ...newSelections]));
		} else {
			selected = selected.filter((id: number) => !patients.some((i: PatientRow) => i.id === id));
		}
	}

	function toggleSelection(id: number) {
		selected = selected.includes(id) ? selected.filter((x: number) => x !== id) : [...selected, id];
	}

	const getStatusClass = (status: string) => {
		if (status === 'Completed') return 'bg-green-100 text-gray-600';
		if (status === 'In Progress') return 'bg-red-100 text-gray-600';
		return 'bg-gray-100 text-gray-600';
	};

	const goToDetails = (patient: PatientRow) => {
		selectedPatient.set(patient);
		goto(`/patients/${patient.id}`);
	};

	function openDeleteModal() {
		showDeleteModal = true;
	}
	function closeDeleteModal() {
		showDeleteModal = false;
	}
	function confirmDelete() {
		patients = patients.filter((i: PatientRow) => !selected.includes(i.id));
		selected = [];
		showDeleteModal = false;
	}
</script>

<div class="w-full overflow-x-auto rounded-xl bg-white xl:overflow-x-visible">
	<table class="w-full overflow-hidden rounded-xl text-xs sm:text-sm md:text-base">
		<thead class="bg-white">
			<tr class="border-b border-gray-200 text-gray-300">
				<th class="p-2 text-left sm:p-3">
					<label
						class="btn-dropdown-color1 relative flex h-4 w-4 items-center justify-center rounded"
					>
						<input
							type="checkbox"
							class="absolute inset-0 cursor-pointer opacity-0"
							checked={patients.every((p) => selected.includes(p.id))}
							on:change={toggleSelectAll}
						/>
						<span class="absolute text-xs font-bold text-white">−</span>
					</label>
				</th>
				<th class="p-2 text-left whitespace-nowrap sm:p-3">Patient ID</th>
				<th class="p-2 text-left whitespace-nowrap sm:p-3">Name</th>
				<th class="p-2 text-left whitespace-nowrap sm:p-3">Date & Time</th>
				<th class="p-2 text-left whitespace-nowrap sm:p-3">Doctor</th>
				<th class="p-2 text-left whitespace-nowrap sm:p-3">Treatment</th>
				<th class="p-2 text-left whitespace-nowrap sm:p-3">Status</th>
			</tr>
		</thead>

		<tbody>
			{#each patients as patient}
				<tr
					class="cursor-pointer border-b border-gray-200 bg-white transition hover:bg-[#D5F4FE]"
					on:click={() => goToDetails(patient)}
				>
					<td class="w-8 p-2 sm:p-3" on:click|stopPropagation>
						<div class="flex items-center gap-2">
							<input
								type="checkbox"
								class="h-4 w-4 cursor-pointer rounded border border-gray-200 accent-blue-300 transition duration-150 hover:border-blue-300"
								checked={selected.includes(patient.id)}
								on:change={() => toggleSelection(patient.id)}
							/>

							{#if selected.includes(patient.id)}
								<button
									class="text-red-500 hover:text-red-700"
									title="Delete Patient"
									aria-label="Delete Patient"
									on:click={openDeleteModal}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							{/if}
						</div>
					</td>

					<td class="p-2 whitespace-nowrap sm:p-3">{patient.id}</td>
					<td class="flex items-center gap-2 p-2 sm:gap-3 sm:p-3">
						<img
							src={patient.avatar}
							alt={patient.name}
							class="h-6 w-6 rounded-full sm:h-8 sm:w-8"
						/>
						<span class="truncate sm:max-w-[150px]">{patient.name}</span>
					</td>
					<td class="p-2 whitespace-nowrap sm:p-3">{patient.date} - {patient.time}</td>
					<td class="truncate p-2 sm:p-3">{patient.doctor}</td>
					<td class="truncate p-2 sm:p-3">{patient.treatment}</td>
					<td class="p-2 whitespace-nowrap sm:p-3">
						<span
							class={`rounded-full px-2 py-0.5 text-xs font-medium sm:px-3 sm:py-1 sm:text-sm ${getStatusClass(patient.status)}`}
						>
							{patient.status}
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if showDeleteModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
		<div class="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
			<h2 class="text-lg font-semibold text-gray-800">Delete Confirmation</h2>
			<p class="mt-2 text-sm text-gray-600">
				Are you sure you want to delete the selected patients?
			</p>

			<div class="mt-4 flex justify-center gap-4">
				<button
					on:click={closeDeleteModal}
					class="rounded-md border border-gray-300 px-4 py-1.5 text-sm hover:bg-gray-100"
				>
					Cancel
				</button>
				<button
					on:click={confirmDelete}
					class="rounded-md bg-red-500 px-4 py-1.5 text-sm text-white hover:bg-red-600"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}
