<script>
	// import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { deleteDoctor } from '$lib/api/doctorsApi';
	import { goto } from '$app/navigation';
	let { doctor } = $props();
	import { env } from '$env/dynamic/public';

    const BASE_URL = env.PUBLIC_API_BASE_URL || '';
	import { onMount } from 'svelte';

	async function handleDelete() {
		if (confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
			try {
				await deleteDoctor(doctor.id);
				alert('Doctor deleted successfully!');
				// Redirect back to the doctor list page
				goto('/doctors');
			} catch (error) {
				console.error(error);
				alert('Failed to delete doctor.');
			}
		}
	}

		// Edit handler
		function handleEdit() {
			console.log("doctorrrrrrrrrrr",doctor)
		goto(`/doctors/${doctor.id}/edit`);
		
	}


	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);

	const chartData = [
		{ date: '15 Sep', newPatient: 30, recovered: 70 },
		{ date: '16 Sep', newPatient: 10, recovered: 60 },
		{ date: '17 Sep', newPatient: 80, recovered: 50 },
		{ date: '18 Sep', newPatient: 20, recovered: 40 },
		{ date: '19 Sep', newPatient: 80, recovered: 30 }
	];

	const labels = chartData.map((d) => d.date);
	const datasets = [
		{
			label: 'New Patients',
			data: chartData.map((d) => d.newPatient),
			backgroundColor: 'rgba(54, 162, 235, 0.6)',
			borderRadius: 6,
			stack: 'Stack 0'
		},
		{
			label: 'Recovered',
			data: chartData.map((d) => d.recovered),
			backgroundColor: 'rgba(255, 99, 132, 0.6)',
			borderRadius: 6,
			stack: 'Stack 1'
		}
	];

	let chartCanvas;
	let chartInstance;

	onMount(() => {
		const config = {
			type: 'bar',
			data: { labels, datasets },
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Patients Statistics - Last 7 Days',
						font: { size: 16 }
					},
					legend: { position: 'top' }
				},
				responsive: true,
				maintainAspectRatio: false,
				interaction: { intersect: false },
				scales: {
					x: { stacked: true },
					y: { stacked: true, beginAtZero: true }
				}
			}
		};

		chartInstance = new Chart(chartCanvas, config);

		return () => chartInstance?.destroy();
	});
	// Stats
	const stats = [
		{ title: 'Total Patients', value: 2150, change: 2.45, positive: true },
		{ title: 'Consultations', value: 1780, change: 1.98, positive: false },
		{ title: 'Surgeries', value: 250, change: 3.82, positive: true }
	];

	// Appointments
	const schedule = [
		{
			name: 'Sarah Miller',
			treatment: 'Facial Rejuvenation',
			date: 'Tuesday, 12 Sep',
			// time: '9am',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		},
		{
			name: 'Claire Thompson',
			treatment: 'Lip Fillers',
			date: 'Friday, 14 Sep',
			// time: '10pm',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
		},
		{
			name: 'Hannah Lee',
			treatment: 'Acne Treatment',
			date: 'Friday, 15 Sep',
			// time: '2am',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		},
		{
			name: 'Ethan Hughes',
			treatment: 'Tattoo Removal',
			date: 'Friday, 16 Sep',
			// time: '11pm',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
		},
		{
			name: 'Sarah Miller',
			treatment: 'Facial Rejuvenation',
			date: 'Tuesday, 12 Sep',
			// time: '9am',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		},
		{
			name: 'Claire Thompson',
			treatment: 'Lip Fillers',
			date: 'Friday, 14 Sep',
			// time: '10pm',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
		},
		{
			name: 'Sarah Miller',
			treatment: 'Facial Rejuvenation',
			date: 'Tuesday, 12 Sep',
			// time: '9am',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		},
		{
			name: 'Claire Thompson',
			treatment: 'Lip Fillers',
			date: 'Friday, 14 Sep',
			// time: '10am',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
		},
		{
			name: 'Hannah Lee',
			treatment: 'Acne Treatment',
			date: 'Friday, 15 Sep',
			// time: '2pm',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		}
	];
	let showAll = $state(false);
	const rowsToShow = 5; 

	// Patients Table
	const patients = [
		{
			id: 'PB-001',
			name: 'Sarah Miller',
			datetime: '2028-09-12, 9:00 AM',
			treatment: 'Facial Rejuvenation',
			report: 'Skin improving well',
			status: 'Completed'
		},
		{
			id: 'PB-008',
			name: 'Claire Thompson',
			datetime: '2028-09-14, 10:00 AM',
			treatment: 'Lip Fillers',
			report: 'Slight swelling observed',
			status: 'Scheduled'
		},
		{
			id: 'PB-009',
			name: 'Ethan Hughes',
			datetime: '2028-09-15, 2:00 PM',
			treatment: 'Tattoo Removal',
			report: 'Healing as expected',
			status: 'InProgress'
		},
		{
			id: 'PB-010',
			name: 'Hannah Lee',
			datetime: '2028-09-16, 11:00 AM',
			treatment: 'Acne Treatment',
			report: 'Skin sensitivity noted',
			status: 'Completed'
		},
		{
			id: 'PB-008',
			name: 'Claire Thompson',
			datetime: '2028-09-14, 10:00 AM',
			treatment: 'Lip Fillers',
			report: 'Slight swelling observed',
			status: 'Scheduled'
		},
		{
			id: 'PB-009',
			name: 'Ethan Hughes',
			datetime: '2028-09-15, 2:00 PM',
			treatment: 'Tattoo Removal',
			report: 'Healing as expected',
			status: 'InProgress'
		},
		{
			id: 'PB-010',
			name: 'Hannah Lee',
			datetime: '2028-09-16, 11:00 AM',
			treatment: 'Acne Treatment',
			report: 'Skin sensitivity noted',
			status: 'Completed'
		},
		{
			id: 'PB-008',
			name: 'Claire Thompson',
			datetime: '2028-09-14, 10:00 AM',
			treatment: 'Lip Fillers',
			report: 'Slight swelling observed',
			status: 'Scheduled'
		},
		{
			id: 'PB-009',
			name: 'Ethan Hughes',
			datetime: '2028-09-15, 2:00 PM',
			treatment: 'Tattoo Removal',
			report: 'Healing as expected',
			status: 'InProgress'
		},
		{
			id: 'PB-010',
			name: 'Hannah Lee',
			datetime: '2028-09-16, 11:00 AM',
			treatment: 'Acne Treatment',
			report: 'Skin sensitivity noted',
			status: 'Completed'
		},
		{
			id: 'PB-008',
			name: 'Claire Thompson',
			datetime: '2028-09-14, 10:00 AM',
			treatment: 'Lip Fillers',
			report: 'Slight swelling observed',
			status: 'Scheduled'
		},
		{
			id: 'PB-009',
			name: 'Ethan Hughes',
			datetime: '2028-09-15, 2:00 PM',
			treatment: 'Tattoo Removal',
			report: 'Healing as expected',
			status: 'InProgress'
		},
		{
			id: 'PB-010',
			name: 'Hannah Lee',
			datetime: '2028-09-16, 11:00 AM',
			treatment: 'Acne Treatment',
			report: 'Skin sensitivity noted',
			status: 'Completed'
		}
	];
	let showAllReviews = $state(false);
	const reviewsToShow = 3;
	let currentIndex = $state(0);
	// Reviews
	const reviews = [
		{
			name: 'Sarah Miller',
			rating: 5,
			text: 'Dr. Olivia is amazing! My skin feels rejuvenated and looks better than ever.',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		},
		{
			name: 'Claire Thompson',
			rating: 4,
			text: 'Great experience, though some swelling post-treatment. Dr. Grant was very attentive.',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
		},
		{
			name: 'Ethan Hughes',
			rating: 5,
			text: 'Excellent service! The tattoo removal process was smooth and professional.',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		},
		{
			name: 'Sarah Miller',
			rating: 5,
			text: 'Dr. Olivia is amazing! My skin feels rejuvenated and looks better than ever.',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		},
		{
			name: 'Claire Thompson',
			rating: 4,
			text: 'Great experience, though some swelling post-treatment. Dr. Grant was very attentive.',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
		},
		{
			name: 'Ethan Hughes',
			rating: 5,
			text: 'Excellent service! The tattoo removal process was smooth and professional.',
			avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
		}
	];
	function prevReview() {
		if (!showAllReviews) {
			currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
		}
	}

	function nextReview() {
		if (!showAllReviews) {
			currentIndex = (currentIndex + 1) % reviews.length;
		}
	}
</script>

<div class="flex min-h-screen flex-col gap-4 p-2 text-gray-800 bg-[#f9f5f4] sm:gap-6 sm:p-4">
	<div class="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-12">
		<!-- Doctor Profile Sidebar -->
		<div class="xl:col-span-3">
			<!-- <div
				class="relative bg-gradient-to-b from-white to-gray-50 p-4 transition-shadow
                       duration-300 hover:shadow-2xl sm:p-6
                       lg:rounded-2xl lg:shadow-lg xl:sticky xl:top-4"
			> -->
			<div
				class="relative rounded-lg bg-gradient-to-b from-white to-gray-50 p-4 transition-shadow
         duration-300 hover:shadow-2xl sm:p-6 lg:rounded-2xl lg:shadow-lg xl:sticky xl:top-4"
			>
				<!-- Tablet: Profile Info in 3 Columns on md -->
				<div
	class="flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-gray-300 lg:flex-col lg:divide-x-0"
>
	<!-- Column 1: Image + Name -->
	<div
		class="flex flex-col items-center md:w-1/3 md:items-start md:pr-4 lg:w-full lg:items-center lg:pr-0"
	>
		<div class="relative">
			<img
				class="mx-auto h-20 w-20 rounded-full shadow-md ring-4 ring-white sm:h-24 sm:w-24"
				src={`${BASE_URL}/${doctor.profilePhoto}`}
				alt={doctor.name}
			/>
			<span
				class="absolute right-1 bottom-1 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"
			></span>
		</div>

		<!-- Buttons under profile image -->
		<div class="mt-3 flex flex-wrap justify-center gap-2 md:justify-start lg:justify-center">
			<button
				class="rounded-lg bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-600 sm:px-4 sm:py-1.5 sm:text-sm"
				onclick={handleEdit}
			>
				Edit
			</button>
			<button
				class="rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600 sm:px-4 sm:py-1.5 sm:text-sm"
				onclick={handleDelete}
			>
				Delete
			</button>
		</div>

		<h2
			class="mt-3 text-center text-lg font-extrabold text-gray-800 sm:text-xl md:text-lg lg:text-center lg:text-2xl"
		>
			{doctor.name}
		</h2>
		<p
			class="text-center text-xs font-medium text-gray-500 sm:text-sm md:text-left lg:text-center"
		>
			{doctor.id} •
			<span class="text-xs font-medium text-black sm:text-sm">{doctor.specialty}</span>
		</p>
	</div>

	<!-- Column 2: About -->
	<div class="mt-4 flex flex-col md:mt-0 md:w-1/3 md:px-4 lg:mt-4 lg:w-full lg:px-0">
		<div class="pt-3">
			<h3 class="flex items-center gap-2 text-base font-semibold text-gray-700 sm:text-lg">
				About
			</h3>
			<p class="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">{doctor.about}</p>
		</div>
	</div>

	<!-- Column 3: Contact Info -->
	<div class="mt-4 flex flex-col md:mt-0 md:w-1/3 md:pl-4 lg:mt-4 lg:w-full lg:pl-0">
		<div class="pt-3">
			<h3 class="flex items-center gap-2 text-base font-semibold text-gray-700 sm:text-lg">
				Contact Info
			</h3>
			<div class="mt-2 space-y-2">
				<p class="flex items-center gap-2 text-xs text-gray-700 sm:text-sm">
					📞 <span class="truncate">{doctor.contact}</span>
				</p>
				<p class="flex items-center gap-2 text-xs text-gray-700 sm:text-sm">
					📧 <span class="truncate">{doctor.email}</span>
				</p>
				<p class="flex items-center gap-2 text-xs text-gray-700 sm:text-sm">
					📍 <span class="truncate">{doctor.address}</span>
				</p>
			</div>
		</div>
	</div>
</div>


				<!-- Experiences -->
				<div class="mt-4 py-4 sm:mt-5 md:mt-6 lg:mt-4">
					<div class="border-t border-gray-300 pt-3 sm:pt-4">
						<h3 class="flex items-center gap-2 text-base font-semibold text-gray-700 sm:text-lg">
							<svg
								class="add-text-lg-color h-4 w-4 sm:h-5 sm:w-5"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
							Experiences
						</h3>

						<!-- Card Layout -->
						<ul
							class="mt-2 flex flex-col gap-3 sm:mt-3 md:flex-row md:flex-wrap md:gap-4 lg:flex-col"
						>
							{#each doctor.experience as exp}
								<li
									class="min-w-[200px] flex-1 rounded-lg border border-gray-200 bg-gray-50 p-2 shadow-sm sm:p-3"
								>
									<p class="text-sm font-semibold text-gray-800 sm:text-base">{exp.role}</p>
									<p class="add-text-lg-color text-xs font-medium sm:text-sm">{exp.place}</p>
									<p class="text-xs text-gray-500 sm:text-sm">{exp.years}</p>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="flex flex-col gap-4 sm:gap-6 xl:col-span-9">
			<!-- Stats -->
			<div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-4">
				<div class="flex flex-col gap-4 sm:gap-6 lg:col-span-3">
					<div
						class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:flex md:flex-row md:flex-wrap md:gap-3 lg:grid-cols-3"
					>
						{#each stats as s}
							<div
								class="btn-dropdown-color1 flex min-h-[120px] w-full flex-col justify-between rounded-xl p-3 shadow sm:p-4 md:w-auto md:flex-1 md:p-3"
							>
								<!-- Title + Icon -->
								<div class="flex items-center gap-2">
									<span class="rounded-lg bg-white p-1 shadow-sm">
										<Icon icon="mdi:stethoscope" class="h-5 w-5" />
									</span>
									<h4 class="text-xs font-medium text-gray-500">{s.title}</h4>
								</div>

								<!-- Value + Change -->
								<div class="mt-3 flex w-full items-center justify-between">
									<p class="text-lg font-bold sm:text-xl lg:text-2xl">{s.value}</p>
									<span
										class="text-xs {s.positive
											? 'add-text-lg-color'
											: 'text-red-500'} rounded-xl bg-white p-1 shadow-sm"
									>
										{s.positive ? '▲' : '▼'}
										{s.change}%
									</span>
								</div>
							</div>
						{/each}
					</div>
					<!-- <br /> -->

					<!--  Patient Statistics Card -->
					<div class="w-full rounded-2xl bg-white p-4 shadow-md sm:p-6 md:p-8">
						<canvas bind:this={chartCanvas} class="h-full w-full"></canvas>
					</div>
				</div>

				<!-- Schedule -->
				<!-- <div class="lg:col-span-1">
					<div
						class="flex flex-col bg-white lg:sticky lg:top-4 lg:h-[400px] lg:rounded-xl lg:shadow xl:h-[485px]"
					>
						<div class="flex-shrink-0 border-b border-gray-100 p-3 sm:p-4">
							<h3 class="text-sm font-bold sm:text-base">Schedule</h3>
						</div>

						<div
							class="flex-1 overflow-y-auto p-3 pt-2 sm:p-4 sm:pt-2 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible lg:block lg:max-h-[calc(400px-60px)] lg:overflow-y-auto xl:max-h-[calc(488px-60px)]"
						>
							{#each schedule as s}
								<div class="mb-2 flex items-center gap-2 rounded-md p-2 hover:bg-gray-50 sm:gap-3">
									<img
										class="h-8 w-8 flex-shrink-0 rounded-full sm:h-9 sm:w-9"
										src={s.avatar}
										alt={s.name}
									/>
									<div class="min-w-0 flex-1 leading-tight">
										<p class="truncate text-xs font-semibold sm:text-sm">{s.name}</p>
										<p class="truncate text-xs text-gray-500">{s.treatment}</p>
										<p class="truncate text-xs text-gray-400">{s.date} • {s.time}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div> -->
				<div class="lg:col-span-1">
					<div
						class="flex flex-col rounded-lg bg-white shadow-sm
		       lg:sticky lg:top-4 lg:rounded-lg lg:shadow-md"
					>
						<!-- Header -->
						<div class="flex-shrink-0 border-b border-gray-100 p-2 sm:p-3 lg:p-2">
							<h3 class="text-xs font-bold sm:text-sm lg:text-xs xl:text-sm">Schedule</h3>
						</div>

						<!-- Content -->
						<div
							class="grid grid-cols-1 gap-2 p-2 pt-1
			       sm:grid-cols-2 sm:gap-3 sm:p-3 sm:pt-1
			       md:grid-cols-2 md:gap-3 md:p-3
			       lg:max-h-[420px] lg:grid-cols-1 lg:gap-2 lg:overflow-y-auto lg:px-2
			       xl:max-h-[500px] xl:overflow-y-auto"
						>
							{#each schedule as s}
								<div
									class="flex items-center gap-2 rounded-md bg-gray-50/50 p-2 transition hover:bg-gray-100
					       sm:gap-2 sm:p-2.5 lg:gap-2 lg:p-2.5"
								>
									<img
										class="h-7 w-7 flex-shrink-0 rounded-full
						       sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-9 lg:w-9"
										src={s.avatar}
										alt={s.name}
									/>

									<div class="min-w-0 flex-1 leading-tight">
										<p
											class="inline-block rounded-full bg-green-100 px-1.5 py-0.5 text-[7px] font-medium text-green-700 sm:text-[7.5px] md:text-[8px] lg:text-[8px] xl:text-[8.5px]"
										>
											{s.date}
										</p>

										<!-- Padding Between Badge and Other Content -->
										<div class="mt-1">
											<p
												class="truncate text-[11px] font-medium sm:text-xs md:text-[12px] lg:text-[12px] xl:text-[13px]"
											>
												{s.name}
											</p>
											<p
												class="truncate text-[9px] text-gray-500 sm:text-[10px] md:text-[10px] lg:text-[10px] xl:text-[11px]"
											>
												{s.treatment}
											</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

<!-- Patients Table -->
<div class="w-full overflow-x-auto bg-white p-4 sm:p-6 lg:rounded-2xl lg:p-8 lg:shadow-lg">
	<!-- Heading + Button Container -->
	<div class="mb-3 flex items-center justify-between sm:mb-4">
		<h3 class="text-lg font-bold text-gray-800 sm:text-xl">All Patients</h3>
		<button
			onclick={() => (showAll = !showAll)}
			class="btn-dropdown-color1 rounded-lg px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 sm:px-4 sm:py-1.5 sm:text-sm"
		>
			{showAll ? "Show Less" : "View All"}
		</button>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full min-w-[600px] border-collapse text-xs sm:min-w-[700px] sm:text-sm">
			<thead>
				<tr class="text-left text-gray-300">
					<th class="p-2 sm:p-3">ID</th>
					<th class="p-2 sm:p-3">Name</th>
					<th class="p-2 sm:p-3">Date & Time</th>
					<th class="p-2 sm:p-3">Treatment</th>
					<th class="p-2 sm:p-3">Report</th>
					<th class="p-2 sm:p-3">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each (showAll ? patients : patients.slice(0, rowsToShow)) as p}
					<tr class="border-t border-gray-200 transition hover:bg-gray-50">
						<td class="p-2 font-medium sm:p-3">{p.id}</td>
						<td class="p-2 sm:p-3">{p.name}</td>
						<td class="p-2 text-gray-600 sm:p-3">{p.datetime}</td>
						<td class="p-2 sm:p-3">{p.treatment}</td>
						<td class="sm:p-3">{p.report}</td>
						<td class="p-2 sm:p-3">
							<span
								class="rounded-xl px-1 py-1 text-xs font-medium sm:px-2 {p.status === 'Completed'
									? 'bg-green-100'
									: p.status === 'Scheduled'
										? 'bg-yellow-100'
										: 'bg-blue-100'}"
							>
								{p.status}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
		<!-- Reviews -->
<div>
	<!-- Header Row -->
	<div class="mb-3 flex items-center justify-between sm:mb-4">
		<h3 class="text-lg font-bold sm:text-xl">Patient's Reviews</h3>

		<div class="flex items-center gap-2">
			<!-- View All Button -->
			<button
				onclick={() => (showAllReviews = !showAllReviews)}
				class="btn-dropdown-color1 rounded-lg px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 sm:px-4 sm:py-1.5 sm:text-sm"
			>
				{showAllReviews ? 'Show Less' : 'View All'}
			</button>

			<!-- Navigation Icons -->
			<button
				onclick={prevReview}
				class="btn-dropdown-color flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 sm:h-8 sm:w-8"
			>
				&lt;
			</button>
			<button
				onclick={nextReview}
				class="btn-dropdown-color flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 sm:h-8 sm:w-8"
			>
				&gt;
			</button>
		</div>
	</div>

	<!-- Reviews Slider -->
	<div class="flex gap-3 overflow-x-auto pb-2 sm:gap-4">
		{#if showAllReviews}
			{#each reviews as r}
				<div class="min-w-[220px] rounded-lg bg-gray-50 p-3 shadow-sm sm:min-w-[250px] sm:p-4">
					<div class="mb-2 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<img src={r.avatar} alt={r.name} class="h-10 w-10 rounded-full shadow-sm ring-1 ring-gray-200 sm:h-12 sm:w-12" />
							<h4 class="text-sm font-semibold sm:text-base">{r.name}</h4>
						</div>
						<p class="text-sm text-yellow-500 sm:text-base">{'★'.repeat(r.rating)}</p>
					</div>
					<hr class="mb-2 border-gray-200" />
					<p class="text-xs text-gray-600 sm:text-sm">{r.text}</p>
				</div>
			{/each}
		{:else}
			{#each reviews.slice(currentIndex, currentIndex + reviewsToShow) as r}
				<div class="min-w-[220px] rounded-lg bg-gray-50 p-3 shadow-sm sm:min-w-[250px] sm:p-4">
					<div class="mb-2 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<img src={r.avatar} alt={r.name} class="h-10 w-10 rounded-full shadow-sm ring-1 ring-gray-200 sm:h-12 sm:w-12" />
							<h4 class="text-sm font-semibold sm:text-base">{r.name}</h4>
						</div>
						<p class="text-sm text-yellow-500 sm:text-base">{'★'.repeat(r.rating)}</p>
					</div>
					<hr class="mb-2 border-gray-200" />
					<p class="text-xs text-gray-600 sm:text-sm">{r.text}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
		</div>
	</div>
</div>
