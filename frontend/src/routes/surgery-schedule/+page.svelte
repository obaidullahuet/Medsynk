<script>
	import Icon from '@iconify/svelte';
	import ScheduleNavbar from '../../components/nav/scheduleNav.svelte';

	let currentDate = new Date();
	let currentView = 'Week';
	let views = ['Day', 'Week', 'Month'];

	// --- Events ---
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

	// --- Week Days ---
	function getWeekDays(date) {
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
	$: days = getWeekDays(currentDate);

	// --- Month Days ---
	function getMonthDays(date) {
		const start = new Date(date.getFullYear(), date.getMonth(), 1);
		const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		const startDay = (start.getDay() + 6) % 7;
		const totalDays = end.getDate();
		const cells = [];
		for (let i = 0; i < startDay; i++) cells.push(null);
		for (let d = 1; d <= totalDays; d++)
			cells.push(new Date(date.getFullYear(), date.getMonth(), d));
		while (cells.length % 7 !== 0) cells.push(null);
		return cells;
	}
	$: monthDays = getMonthDays(currentDate);

	// --- Navigation ---
	function prevPeriod() {
		if (currentView === 'Week') currentDate.setDate(currentDate.getDate() - 7);
		if (currentView === 'Day') currentDate.setDate(currentDate.getDate() - 1);
		if (currentView === 'Month') currentDate.setMonth(currentDate.getMonth() - 1);
		currentDate = new Date(currentDate);
	}
	function nextPeriod() {
		if (currentView === 'Week') currentDate.setDate(currentDate.getDate() + 7);
		if (currentView === 'Day') currentDate.setDate(currentDate.getDate() + 1);
		if (currentView === 'Month') currentDate.setMonth(currentDate.getMonth() + 1);
		currentDate = new Date(currentDate);
	}
	function goToday() {
		currentDate = new Date();
	}

	// --- Time Calculations ---
	const startHour = 9;
	const endHour = 14;
	const hourHeight = 100;
	function toMinutes(timeStr) {
		const [time, meridiem] = timeStr.split(' ');
		let [hour, min] = time.split(':').map(Number);
		if (meridiem === 'PM' && hour !== 12) hour += 12;
		if (meridiem === 'AM' && hour === 12) hour = 0;
		return hour * 60 + min;
	}
	function getTop(timeStr) {
		return ((toMinutes(timeStr) - startHour * 60) / 60) * hourHeight + 4;
	}
	function getHeight(start, end) {
		return ((toMinutes(end) - toMinutes(start)) / 60) * hourHeight - 8;
	}
	const totalHeight = (endHour - startHour) * hourHeight;

	// --- Filter Events by Date ---
	function filterEventsByDate(dateObj) {
		if (!dateObj) return [];
		const targetDate = dateObj.toISOString().split('T')[0];
		return events.filter((e) => e.date === targetDate);
	}
	function selectMonth(newDate) {
		currentDate = new Date(newDate);
	}
</script>

<div class="bg-[#f9f5f4]">
	<!-- Navbar -->
	<ScheduleNavbar
		onPrev={prevPeriod}
		onNext={nextPeriod}
		onToday={goToday}
		{currentView}
		setView={(v) => (currentView = v)}
		{views}
		currentMonth={currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
		onMonthSelect={selectMonth}
	/>

	<!-- Content -->
	<div class="overflow-x-auto p-3 sm:p-6">
		<!-- Category Badges -->
		<div class="mb-4 flex flex-wrap gap-2">
			{#each ['Dermatology', 'Body Contouring', 'Laser Treatments', 'Aesthetic Medicine', 'Plastic Surgery', 'Cosmetic Surgery', 'Reconstructive Surgery'] as cat}
				<span
					class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm shadow-sm"
				>
					<span class="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100">
						<Icon icon="mdi:check" class="h-3 w-3 text-black" />
					</span>
					{cat}
				</span>
			{/each}
		</div>

		<!-- Conditional Views -->
		{#if currentView === 'Week'}
			<!-- Week View -->

			<div class="overflow-x-auto rounded-xl bg-white p-3 shadow sm:p-4">
				<div class="min-w-[900px]">
					<div class="mb-2 grid grid-cols-[80px_repeat(6,1fr)] text-xs font-semibold sm:text-sm">
						<div class="p-2 sm:p-3">UTC +1</div>
						{#each days as d}
							<div
								class="mx-1 flex flex-col items-center rounded-xl bg-[#f9f5f4] p-2 sm:mx-2 sm:p-3"
							>
								<span class="text-[11px] text-gray-500">{d.name}</span>
								<span class="text-lg font-bold sm:text-2xl">{d.date}</span>
							</div>
						{/each}
					</div>
					<br />

					<div class="flex gap-2 sm:gap-3">
						<!-- Time Column -->
						<div class="relative w-[70px] sm:w-[100px]" style={`height:${totalHeight}px`}>
							{#each Array(endHour - startHour + 1)
								.fill(0)
								.map((_, i) => startHour + i) as h, i}
								<div
									class="absolute w-full border-t border-gray-200 pl-1 text-[10px] sm:pl-2 sm:text-xs"
									style={`top:${i * hourHeight}px`}
								>
									{h <= 12 ? h : h - 12}:00 {h < 12 ? 'AM' : 'PM'}
								</div>
							{/each}
						</div>

						<!-- Day Columns -->
						<div class="flex flex-1 gap-2 sm:gap-3">
							{#each days as d}
								<div
									class="relative flex-1 rounded-md p-1 sm:p-2"
									style={`height:${totalHeight}px`}
								>
									{#each Array(endHour - startHour + 1)
										.fill(0)
										.map((_, i) => i) as i}
										<div
											class="absolute w-full border-t border-gray-200"
											style={`top:${i * hourHeight}px`}
										></div>
									{/each}

									{#each filterEventsByDate(d.fullDate) as e}
										<div
											class={`absolute right-1 left-1 overflow-hidden rounded-lg p-1 text-[10px] break-words shadow-md sm:p-2 sm:text-xs ${e.color}`}
											style={`top:${getTop(e.start)}px; height:${getHeight(e.start, e.end)}px; min-height:40px;`}
										>
											<div class="mb-1 flex items-center gap-1 text-[9px] sm:text-[11px]">
												<span class="h-2 w-2 rounded-full bg-green-500"></span>
												<span class="truncate font-semibold">{e.room}</span>
												<span class="text-gray-500">• {e.start}</span>
											</div>
											<div class="truncate text-[11px] font-medium sm:text-[13px]">{e.doctor}</div>
											<div class="truncate text-[9px] text-gray-700 sm:text-[12px]">{e.title}</div>
										</div>
									{/each}
								</div>
							{/each}
						</div>
					</div>
					<br />
				</div>
			</div>
		{:else if currentView === 'Day'}
			<!--  Day View  -->
			<div class="rounded-xl bg-white p-3 shadow sm:p-4">
				<h3 class="mb-3 text-lg font-semibold">{currentDate.toDateString()}</h3>

				<div class="border-l-2 border-gray-300 pl-3">
					{#each Array(endHour - startHour + 1)
						.fill(0)
						.map((_, i) => startHour + i) as h}
						<div class="mb-6">
							<div class="mb-2 text-[10px] text-gray-500 sm:text-xs">
								{h <= 12 ? h : h - 12}:00 {h < 12 ? 'AM' : 'PM'}
							</div>

							<div class="flex flex-col gap-2">
								{#each filterEventsByDate(currentDate).filter((e) => Math.floor(toMinutes(e.start) / 60) === h) as e}
									<div class={`rounded-lg p-2 shadow-md sm:p-3 ${e.color} w-full`}>
										<div class="mb-1 flex items-center gap-1 text-[10px] sm:text-[11px]">
											<span class="h-2 w-2 rounded-full bg-green-500"></span>
											<span class="font-semibold">{e.room}</span>
											<span class="text-gray-500">• {e.start}</span>
										</div>
										<div class="text-[11px] font-medium sm:text-[13px]">{e.doctor}</div>
										<div class="text-[9px] text-gray-700 sm:text-[12px]">{e.title}</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if currentView === 'Month'}
			<!-- Month View -->
			<div class="overflow-x-auto bg-white p-3 shadow sm:p-4">
				<h3 class="mb-3 text-lg font-semibold">
					{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
				</h3>

				<div
					class="grid min-w-[600px] grid-cols-7 gap-2 text-center text-xs font-medium sm:gap-3 sm:text-sm"
				>
					{#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as d}
						<div class="py-2 text-gray-600">{d}</div>
					{/each}

					{#each monthDays as d}
						<div
							class="relative flex min-h-[80px] flex-col items-start rounded-md border border-gray-200 p-1 sm:min-h-[110px] sm:p-2"
						>
							{#if d}
								<span class="absolute top-1 left-1 text-[10px] font-semibold sm:text-xs"
									>{d.getDate()}</span
								>

								<div class="mt-5 flex w-full flex-col gap-1">
									{#each filterEventsByDate(d).slice(0, 3) as e}
										<div
											class={`truncate rounded px-1 py-0.5 text-[9px] sm:text-[11px] ${e.color}`}
										>
											{e.title}
										</div>
									{/each}
								</div>

								{#if filterEventsByDate(d).length > 3}
									<span class="absolute right-1 bottom-1 text-[9px] text-blue-500 sm:text-[10px]"
										>+more</span
									>
								{/if}
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
