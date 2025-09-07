<script>
	let { onPrev, onNext, onToday, currentView, setView, views, currentMonth, onMonthSelect } =
		$props();

	let showMonthDropdown = $state(false);

	function getMonthList(currentMonth) {
		const current = new Date(currentMonth);
		return [
			new Date(current.getFullYear(), current.getMonth() - 1, 1),
			current,
			new Date(current.getFullYear(), current.getMonth() + 1, 1)
		].map((d) => ({
			label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
			value: d
		}));
	}
	let showCustomerDropdown = $state(false);
	let showStatusDropdown = $state(false);

	function toggleCustomerDropdown() {
		showCustomerDropdown = !showCustomerDropdown;
		showStatusDropdown = false;
	}

	function toggleStatusDropdown() {
		showStatusDropdown = !showStatusDropdown;
		showCustomerDropdown = false;
	}
</script>

<div class="relative flex items-center justify-between px-3 py-2 sm:hidden">
	<div class="flex items-center gap-2">
		<button
			class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full text-sm"
			onclick={onPrev}>‹</button
		>
		<button
			class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full text-sm"
			onclick={onNext}>›</button
		>
		<button
			class="btn-dropdown-color1 rounded-full px-2 py-1 text-xs font-medium text-gray-700"
			onclick={onToday}>Today</button
		>

		<div class="relative">
			<span
				class="cursor-pointer text-xs font-medium text-gray-700"
				onclick={() => (showMonthDropdown = !showMonthDropdown)}
			>
				{currentMonth}
			</span>

			{#if showMonthDropdown}
				<div class="absolute top-full left-0 z-10 mt-1 w-40 rounded-md border bg-white shadow-lg">
					{#each getMonthList(new Date(currentMonth)) as m}
						<div
							class="cursor-pointer px-3 py-1 text-sm hover:bg-gray-100"
							onclick={() => {
								onMonthSelect(m.value);
								showMonthDropdown = false;
							}}
						>
							{m.label}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<button class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full"
		>⚙️</button
	>
</div>

<!-- Desktop Navbar -->
<div
	class="relative hidden px-3 py-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between md:flex-wrap md:px-3 md:py-2 lg:px-4 lg:py-3"
>
	<!-- Left -->
	<div class="flex flex-wrap items-center gap-1.5 md:gap-2 lg:gap-3">
		<button
			class="btn-dropdown-color1 rounded-full px-2 py-0.5 text-[11px] font-medium text-gray-700 md:px-2 md:py-0.5 md:text-xs lg:px-3 lg:py-1 lg:text-sm"
			onclick={onToday}>Today</button
		>
		<button
			class="btn-dropdown-color1 flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7 lg:h-8 lg:w-8"
			onclick={onPrev}>‹</button
		>
		<button
			class="btn-dropdown-color1 flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7 lg:h-8 lg:w-8"
			onclick={onNext}>›</button
		>

		<!-- Month Dropdown -->
		<div class="relative">
			<select class="hidden" disabled><option>{currentMonth}</option></select>
			<div
				class="cursor-pointer rounded-md bg-white px-2 py-1 text-xs font-medium shadow hover:bg-gray-100"
				onclick={() => (showMonthDropdown = !showMonthDropdown)}
			>
				{currentMonth}
			</div>

			{#if showMonthDropdown}
				<div class="absolute top-full left-0 z-10 mt-1 w-48 rounded-md border bg-white shadow-md">
					{#each getMonthList(new Date(currentMonth)) as m}
						<div
							class="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
							onclick={() => {
								onMonthSelect(m.value);
								showMonthDropdown = false;
							}}
						>
							{m.label}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Right -->
	<div class="flex flex-wrap items-center gap-1.5 p-1 md:gap-2 lg:gap-3 lg:p-2">
		<!-- Rooms Dropdown -->
		<div class="relative">
			<button
				onclick={toggleCustomerDropdown}
				class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"
			>
				<span>Rooms</span>
				<svg
					class="ml-1 h-3 w-3 md:h-4 md:w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{#if showCustomerDropdown}
				<div class="absolute left-0 z-10 mt-1 w-36 rounded-lg border bg-white shadow-lg">
					<button class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100">Paid</button>
					<button class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
						>Pending</button
					>
				</div>
			{/if}
		</div>

		<!-- Doctors Dropdown -->
		<div class="relative">
			<button
				onclick={toggleStatusDropdown}
				class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"
			>
				<span>Doctors</span>
				<svg
					class="ml-1 h-3.5 w-3.5 md:h-4 md:w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{#if showStatusDropdown}
				<div class="absolute left-0 z-10 mt-1 w-28 rounded-lg border bg-white shadow-lg">
					<button class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
						>Sarah Miller</button
					>
					<button class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
						>Ethan Hughes</button
					>
					<button class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
						>Grace Parker</button
					>
				</div>
			{/if}
		</div>

		<!-- Views Buttons -->
		<div class="btn-dropdown-color1 flex flex-wrap gap-1 rounded-full px-1 py-0.5">
			{#each views as v}
				<button
					class="rounded-full px-2 py-0.5 text-[11px] font-medium transition md:px-2 md:py-0.5 md:text-xs lg:px-3 lg:py-1 lg:text-sm"
					class:btn-dropdown-color={currentView === v}
					class:text-white={currentView === v}
					class:text-gray-700={currentView !== v}
					onclick={() => setView(v)}
				>
					{v}
				</button>
			{/each}
		</div>
	</div>
</div>

<hr class="border-gray-200" />
