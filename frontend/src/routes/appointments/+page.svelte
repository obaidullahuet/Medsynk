<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let currentDate = new Date();
	let searchQuery = '';
	let selectedDoctor = 'All Doctors';

	let screenWidth = 1024; 
	let visibleDaysCount = 6;
	let days: any[] = [];

	const events = [
		{
			doctor: 'Dr. Olivia Grant',
			title: 'Facial Rejuvenation',
			start: '9:00 AM',
			end: '10:00 AM',
			room: 'OR 1',
			date: '2025-08-01',
			color: 'bg-rose-100 border border-rose-300'
		},
		{
			doctor: 'Dr. Sophia Clark',
			title: 'Chemical Peels',
			start: '10:30 AM',
			end: '11:30 AM',
			room: 'OR 3',
			date: '2025-08-01',
			color: 'bg-blue-100 border border-blue-300'
		},
		{
			doctor: 'Dr. James Lawson',
			title: 'Scar Removal Surgery',
			start: '11:30 AM',
			end: '12:30 AM',
			room: 'OR 1',
			date: '2025-07-28',
			color: 'bg-purple-100 border border-purple-300'
		},
		{
			doctor: 'Dr. Megan Foster',
			title: 'Tattoo Removal',
			start: '11:20 AM',
			end: '12:20 PM',
			room: 'OR 2',
			date: '2025-08-02',
			color: 'bg-gray-200 border border-gray-300'
		},
		{
			doctor: 'Dr. Emily Ross',
			title: 'Acne Treatment',
			start: '10:00 AM',
			end: '11:00 AM',
			room: 'OR 2',
			date: '2025-08-02',
			color: 'bg-emerald-100 border border-emerald-300'
		},
		{
			doctor: 'Dr. Olivia Grant',
			title: 'Botox Injections',
			start: '12:00 PM',
			end: '1:00 PM',
			room: 'OR 3',
			date: '2025-07-29',
			color: 'bg-green-100 border border-green-300'
		},
		{
			doctor: 'Dr. Richard Allen',
			title: 'Liposuction Consultation',
			start: '1:00 PM',
			end: '2:00 PM',
			room: 'OR 4',
			date: '2025-08-02',
			color: 'bg-yellow-100 border border-yellow-300'
		},
		{
			doctor: 'Dr. Sophia Clark',
			title: 'Skin Brightening',
			start: '9:30 AM',
			end: '10:30 AM',
			room: 'OR 1',
			date: '2025-07-31',
			color: 'bg-pink-100 border border-pink-300'
		}
	];

	if (browser) {
		onMount(() => {
			updateScreenWidth();
			window.addEventListener('resize', updateScreenWidth);
		});

		onDestroy(() => {
			window.removeEventListener('resize', updateScreenWidth);
		});
	}

	function updateScreenWidth() {
		if (!browser) return;
		screenWidth = window.innerWidth;
		visibleDaysCount = screenWidth < 640 ? 3 : screenWidth < 1024 ? 4 : 6;
		days = getWeekDays(currentDate).slice(0, visibleDaysCount);
	}


	$: uniqueDoctors = Array.from(new Set(events.map((e) => e.doctor)));

	function getWeekDays(date: Date) {
		const start = new Date(date);
		start.setDate(date.getDate() - date.getDay() + 1);
		return Array.from({ length: 6 }, (_, i) => {
			const d = new Date(start);
			d.setDate(start.getDate() + i);
			return {
				name: d.toLocaleDateString('en-US', { weekday: 'short' }),
				date: d.getDate(),
				fullDate: d,
				iso: d.toISOString().split('T')[0]
			};
		});
	}

	$: if (browser) {
		days = getWeekDays(currentDate).slice(0, visibleDaysCount);
	}

	const startHour = 9;
	const endHour = 14;
	const hourHeight = 100;

	function toMinutes(timeStr: string) {
		const [time, meridiem] = timeStr.split(' ');
		let [hour, min] = time.split(':').map(Number);
		if (meridiem === 'PM' && hour !== 12) hour += 12;
		if (meridiem === 'AM' && hour === 12) hour = 0;
		return hour * 60 + min;
	}

	function getTop(timeStr: string) {
		return ((toMinutes(timeStr) - startHour * 60) / 60) * hourHeight + 4;
	}

	function getHeight(start: string, end: string) {
		return ((toMinutes(end) - toMinutes(start)) / 60) * hourHeight - 8;
	}

	const totalHeight = (endHour - startHour) * hourHeight;

	function filterEventsByDate(dateObj: Date) {
		if (!dateObj) return [];
		const targetDate = dateObj.toISOString().split('T')[0];

		const filteredEvents = events.filter((e) => {
			const matchesDate = e.date === targetDate;
			const matchesDoctor = selectedDoctor === 'All Doctors' || e.doctor === selectedDoctor;
			const matchesSearch =
				searchQuery === '' ||
				// e.patient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.room.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesDate && matchesDoctor && matchesSearch;
		});

		return filteredEvents
			.map((event) => ({
				...event,
				isHighlighted: searchQuery !== '' || selectedDoctor !== 'All Doctors'
			}))
			.sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
	}

	function isEventMatched(event: any) {
		const matchesDoctor = selectedDoctor === 'All Doctors' || event.doctor === selectedDoctor;
		const matchesSearch =
			searchQuery === '' ||
			event.patient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			event.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
			event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			event.room.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesDoctor && matchesSearch;
	}

	function goToToday() {
		currentDate = new Date();
		updateScreenWidth(); // recalc days for new week
	}

	function goToPreviousWeek() {
		const newDate = new Date(currentDate);
		newDate.setDate(currentDate.getDate() - 7);
		currentDate = newDate;
		updateScreenWidth();
	}

	function goToNextWeek() {
		const newDate = new Date(currentDate);
		newDate.setDate(currentDate.getDate() + 7);
		currentDate = newDate;
		updateScreenWidth();
	}

	function generateMonthOptions() {
		const options = [];
		const current = new Date();
		for (let i = -6; i < 6; i++) {
			const date = new Date(current.getFullYear(), current.getMonth() + i, 1);
			options.push({
				value: date,
				label: date.toLocaleString('default', { month: 'long', year: 'numeric' })
			});
		}
		return options;
	}

	$: monthOptions = generateMonthOptions();

	function handleMonthChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const selectedIndex = parseInt(target.value);
		currentDate = monthOptions[selectedIndex].value;
		updateScreenWidth();
	}
</script>

<!-- Filter Navbar -->

<div class="flex flex-col gap-4 xl:flex-row">
	<div class="xl:w-[70%]">
		<div class=" mb-4 flex flex-col-reverse md:flex-row  justify-between gap-2 sm:gap-4">
			<div class="flex items-center gap-2 sm:gap-3">
				<button
					onclick={goToToday}
					class="add-btn-lg-color add-text-lg-color1 rounded-full px-3 py-1 text-xs font-semibold transition-colors hover:bg-emerald-200 sm:text-sm"
				>
					Today
				</button>

				<div class="relative">
					<select
						onchange={handleMonthChange}
						class="btn-dropdown-color1 hover:add-text-lg-color1 cursor-pointer appearance-none rounded-full px-3 py-1 text-sm font-semibold outline-none"
					>
						{#each monthOptions as option, index}
							<option
								value={index}
								selected={option.value.getMonth() === currentDate.getMonth() &&
									option.value.getFullYear() === currentDate.getFullYear()}
							>
								{option.label}
							</option>
						{/each}
					</select>
					<svg
						class="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-emerald-800"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>

			<!-- Center Search -->
			

			<!-- Right Controls -->
			<div class="flex items-center gap-2">
				<!-- Doctor Filter -->

				<div class="max-w-md flex-1">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search patient, doctor, treatment, room..."
						class="w-full rounded-full border border-gray-200 bg-white px-4 py-1.5 pl-10 text-sm"
					/>
					<!-- Search icon -->
					<svg
						class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					{#if searchQuery}
						<!-- Clear search button -->
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							onclick={() => (searchQuery = '')}
							class="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
						>
							<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</div>
			</div>
				<select
					bind:value={selectedDoctor}
					class="btn-dropdown-color1 cursor-pointer rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none sm:text-sm"
				>
					<option value="All Doctors">All Doctors</option>
					{#each uniqueDoctors as doc}
						<option value={doc}>{doc}</option>
					{/each}
				</select>

				<!-- Navigation Arrows -->
				<div class="flex items-center gap-1">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						onclick={goToPreviousWeek}
						class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-emerald-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
						title="Previous Week"
					>
						<svg
							class="h-4 w-4 text-emerald-800"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						onclick={goToNextWeek}
						class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-emerald-200 focus:ring-2 focus:ring-emerald-300"
						title="Next Week"
					>
						<svg
							class="h-4 w-4 text-emerald-800"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<div class=" overflow-x-hidden rounded-xl bg-white p-3 sm:p-4">
			<div
				class="mb-4 grid grid-cols-[80px_repeat(3,1fr)] gap-2 text-xs font-semibold sm:gap-3 sm:text-sm md:grid-cols-[80px_repeat(4,1fr)] lg:grid-cols-[80px_repeat(6,1fr)]"
			>
				<div
					class="flex items-center justify-center rounded-xl bg-gray-100 p-2 text-center text-gray-700 sm:p-3"
				>
					UTC +1
				</div>

				{#each days as d}
					<div
						class="flex flex-col items-center justify-center rounded-xl bg-[#f9f5f4] px-3 py-2 transition duration-200 hover:bg-[#f3ecea] sm:px-4 sm:py-3"
					>
						<span class="text-[11px] text-gray-500">{d.name}</span>
						<span class="text-lg font-bold sm:text-2xl">{d.date}</span>
					</div>
				{/each}
			</div>

			<div class="flex gap-2 overflow-hidden sm:gap-3">
				<div class="relative w-[70px] sm:w-[100px]" style={`height:${totalHeight}px`}>
					{#each Array(endHour - startHour + 1)
						.fill(0)
						.map((_, i) => startHour + i) as h, i}
						<div
							class="absolute w-full border-t border-gray-200 pl-1 text-[10px] text-gray-600 sm:pl-2 sm:text-xs"
							style={`top:${i * hourHeight}px`}
						>
							{h <= 12 ? h : h - 12}:00 {h < 12 ? 'AM' : 'PM'}
						</div>
					{/each}
				</div>

				<div class="flex flex-1 gap-2 sm:gap-3">
					{#each days as d}
						<div class="relative flex-1 rounded-md p-1 sm:p-2" style={`height:${totalHeight}px`}>
							{#each Array(endHour - startHour + 1)
								.fill(0)
								.map((_, i) => i) as i}
								<div
									class="absolute w-full border-t border-gray-200"
									style={`top:${i * hourHeight}px`}
								></div>
							{/each}

							{#each filterEventsByDate(d.fullDate) as e, index}
								{@const isFiltered = searchQuery !== '' || selectedDoctor !== 'All Doctors'}
								{@const matchesCurrentFilter = isEventMatched(e)}
								<div
									class={`absolute right-1 left-1 cursor-pointer overflow-hidden rounded-lg p-1 text-[10px] break-words shadow-md transition-all duration-300 sm:p-2 sm:text-xs ${e.color}
								${isFiltered && matchesCurrentFilter ? 'ring-opacity-60 z-10 transform shadow-lg ring-2 ring-blue-400 hover:scale-[1.05] hover:shadow-xl' : 'hover:scale-[1.02] hover:shadow-lg'}
								${isFiltered && matchesCurrentFilter ? 'animate-pulse-slow' : ''}
							`}
									style={`top:${getTop(e.start) - (isFiltered && matchesCurrentFilter ? 2 : 0)}px; height:${getHeight(e.start, e.end) + (isFiltered && matchesCurrentFilter ? 4 : 0)}px; min-height:${isFiltered && matchesCurrentFilter ? 55 : 50}px;`}
									title={`${e.room} - ${e.title} with ${e.doctor}${isFiltered && matchesCurrentFilter ? ' (Filtered Result)' : ''}`}
								>
									{#if isFiltered && matchesCurrentFilter}
										<div
											class="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500"
										>
											<svg class="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
									{/if}

									<div class="mb-1 flex items-center gap-1 text-[9px] sm:text-[11px]">
									
										{#if isFiltered && matchesCurrentFilter}
											<svg
												class="h-3 w-3 text-blue-500"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M13 10V3L4 14h7v7l9-11h-7z"
												/>
											</svg>
										{/if}
									</div>
									<div
										class={`mb-1 truncate text-[11px] font-medium sm:text-[13px] ${isFiltered && matchesCurrentFilter ? 'font-semibold text-blue-900' : ''}`}
									>
										{e.doctor}
									</div>
									<div
										class={`mb-1 truncate text-[9px] font-medium sm:text-[12px] ${isFiltered && matchesCurrentFilter ? 'text-blue-800' : 'text-gray-700'}`}
									>
										{e.title}
									</div>
									<div
										class={`flex items-center gap-1 truncate text-[8px] sm:text-[10px] ${isFiltered && matchesCurrentFilter ? 'text-blue-700' : 'text-gray-600'}`}
									>
										<svg
											class="h-2 w-2 flex-shrink-0"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
										{e.start}
									</div>

									{#if isFiltered && matchesCurrentFilter}
										<div
											class="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-blue-100/20 to-blue-200/20"
										></div>
									{/if}
								</div>
							{/each}

							{#if filterEventsByDate(d.fullDate).length === 0}
								<div class="absolute inset-0 flex flex-col items-center justify-center p-2">
									{#if searchQuery || selectedDoctor !== 'All Doctors'}
										<div class="text-center">
											<svg
												class="mx-auto mb-2 h-8 w-8 text-gray-300"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
												/>
											</svg>
											<p class="text-xs font-medium text-gray-400">No matches</p>
											<p class="mt-1 text-[10px] text-gray-300">Try different filters</p>
										</div>
									{:else}
										<div class="text-center">
											<svg
												class="mx-auto mb-2 h-8 w-8 text-gray-200"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
												/>
											</svg>
											<p class="text-xs font-medium text-gray-300">No appointments</p>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="w-full space-y-2 xl:w-[30%]">
		<div class="grid grid-cols-3 gap-2 xl:gap-4">
			<div class="btn-dropdown-color1 flex flex-col gap-2 rounded-2xl p-3">
				<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
					<span class="text-sm text-white">📋</span>
				</div>
				<span class="add-text-lg-color text-[10px] leading-3 font-medium sm:text-xs"
					>Total Appointments</span
				>
				<div class="add-text-lg-color text-sm font-bold">120</div>
			</div>
			<div class="add-btn-lg-color flex flex-col gap-2 rounded-2xl p-3">
				<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
					<span class="text-sm text-white">🧍‍♂️</span>
				</div>
				<span class="add-text-lg-color1 text-xs leading-4 font-medium">New Patients</span>
				<div class="add-text-lg-color1 text-sm font-bold">45</div>
			</div>
			<div class="btn-dropdown-color1 flex flex-col gap-2 rounded-2xl p-3">
				<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
					<span class="text-sm text-white">🔁</span>
				</div>
				<span class="add-text-lg-color text-xs leading-4 font-medium">Follow-up</span>
				<div class="add-text-lg-color text-sm font-bold">75</div>
			</div>
		</div>

		<div class="rounded-xl bg-[#f9f5f4] p-4">
			<h3 class="mb-2 text-sm font-bold text-gray-700">On Going Appointment</h3>
			<div class="mb-2 flex flex-col gap-3 rounded-2xl bg-white p-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-2">
						<img
							src="https://randomuser.me/api/portraits/men/32.jpg"
							class="h-10 w-10 rounded-full"
							alt="Maurice Galley"
						/>
						<div>
							<p class="text-xs font-semibold">Maurice Galley</p>
							<p class="text-xs text-gray-500">PB-002</p>
						</div>
					</div>
					<div class="text-right">
						<p class="text-xs font-semibold text-gray-700">Dr. David Carter</p>
						<p class="text-xs text-gray-500">Laser Hair Removal</p>
					</div>
				</div>

				<hr class="border-t border-gray-200" />

				<div class="text-xs text-gray-600">Est. Time: 12:00 PM - 2:00 PM</div>
			</div>

			<div class="grid grid-cols-2 gap-3 text-xs text-gray-600">
				<div class="flex flex-col gap-3 p-2">
					<p><strong>Details:</strong> Male, 34 years old</p>
					<p><strong>Address:</strong> 45 Green Valley Road, Apt 12, New York, NY 30001</p>
				</div>
				<p class="p-2 text-xs">
					<strong>Consultation Notes:</strong> Maurice is responding well to the treatment, and further
					sessions may be required for complete results.
				</p>
			</div>
		</div>

		<div class="rounded-xl bg-[#f9f5f4] p-4">
			<h3 class="mb-4 text-sm font-bold text-gray-700">Upcoming Appointments</h3>
			<div class="space-y-4">
				<div class="flex items-start justify-between">
					<div class="flex items-center space-x-2">
						<img
							src="https://randomuser.me/api/portraits/men/32.jpg"
							class="h-8 w-8 rounded-full"
							alt="Laura"
						/>
						<div>
							<p class="text-sm font-semibold">Laura Bennett</p>
							<p class="text-xs text-gray-500">Acne Treatment · Dr. Emily Ross</p>
						</div>
					</div>
					<p class="text-xs text-gray-500">24 Sep 2025</p>
				</div>
				<hr class="border-t border-gray-200" />
				<div class="flex items-start justify-between">
					<div class="flex items-center space-x-2">
						<img
							src="https://randomuser.me/api/portraits/men/32.jpg"
							class="h-8 w-8 rounded-full"
							alt="Laura"
						/>
						<div>
							<p class="text-sm font-semibold">Laura Bennett</p>
							<p class="text-xs text-gray-500">Acne Treatment · Dr. Emily Ross</p>
						</div>
					</div>
					<p class="text-xs text-gray-500">24 Sep 2025</p>
				</div>
				<hr class="border-t border-gray-200" />
				<div class="flex items-start justify-between">
					<div class="flex items-center space-x-2">
						<img
							src="https://randomuser.me/api/portraits/men/32.jpg"
							class="h-8 w-8 rounded-full"
							alt="Laura"
						/>
						<div>
							<p class="text-sm font-semibold">Laura Bennett</p>
							<p class="text-xs text-gray-500">Acne Treatment · Dr. Emily Ross</p>
						</div>
					</div>
					<p class="text-xs text-gray-500">24 Sep 2025</p>
				</div>
			</div>
		</div>
	</div>
</div>
