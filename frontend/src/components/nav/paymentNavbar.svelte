<script>
	import { createEventDispatcher,onMount } from 'svelte';
	import { invoices as invoiceData } from '$lib/invoicesData/invoices';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.min.css';
	let { searchValue = '' } = $props();
	let showCustomerDropdown = $state(false);
	let showStatusDropdown = $state(false);
	let showAddInvoiceModal = $state(false);
	let previewImage = $state('');
	const dispatch = createEventDispatcher();
	//  Dispatch search event whenever input changes
	function handleInput(e) {
		searchValue = e.target.value;
		dispatch('search', searchValue);
	}
	function toggleCustomerDropdown() {
		showCustomerDropdown = !showCustomerDropdown;
		showStatusDropdown = false;
	}

	function toggleStatusDropdown() {
		showStatusDropdown = !showStatusDropdown;
		showCustomerDropdown = false;
	}

	function selectCustomer(name) {
		dispatch('filterCustomer', name);
		showCustomerDropdown = false;
	}
	function selectStatus(status) {
		dispatch('filterStatus', status);
		showStatusDropdown = false;
	}
	function openAddInvoiceModal() {
		showAddInvoiceModal = true;
	}
	function closeAddInvoiceModal() {
		showAddInvoiceModal = false;
		previewImage = '';
	}
	function handleImageUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => (previewImage = e.target.result);
			reader.readAsDataURL(file);
		}
	}
	let uniqueStatuses = [...new Set(invoiceData.map((p) => p.status))];

	// Flatpickr integration
	onMount(() => {
		flatpickr(document.getElementById("datepicker"), {
			dateFormat: "Y-m-d",
			altInput: true,
			altFormat: "F j, Y",
			defaultDate: "today",
			onChange: (_, dateStr) => {
				dispatch('filterDate', dateStr);
			}
		});
	});
</script>

<nav
	class="flex w-full flex-wrap gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2"
>
	<!--  Right section -->
	<div class="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-start">
		<!--  Search Bar + Buttons Container (only on sm) -->
		<div class="flex w-full items-center gap-2 md:hidden">
			<input
				type="text"
				placeholder="Search..."
				class="flex-1 rounded-full border px-3 py-1.5 text-sm"
				value={searchValue}
				oninput={handleInput}
			/>
			<div class="flex gap-1">
				<button class="h-7 w-7 rounded-full bg-gray-300 text-base font-bold">+</button>
				<button class="h-7 w-7 rounded-full bg-gray-300 text-base font-bold">−</button>
			</div>
		</div>

		<!--  Date Picker (hidden on sm, visible on md+) -->
		<div class="relative hidden md:block">
	<input
		id="datepicker"
		type="text"
		placeholder="Select Date"
		class="btn-dropdown-color1 rounded-full w-32 pr-8 pl-3 py-1.5 text-xs lg:w-40 lg:pr-10 lg:pl-4 lg:py-2 lg:text-sm"
	/>
	<svg
		class="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		viewBox="0 0 24 24"
	>
		<path stroke-linecap="round" stroke-linejoin="round"
			d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v2H9V3a1 1 0 00-1-1H6a1 1 0 00-1 1v2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
	</svg>
</div>
		<!-- All Customers Dropdown -->
		<div class="relative hidden md:block">
			<button
				class="rounded-full bg-white px-3 py-1.5 text-xs hover:bg-gray-50 md:text-xs lg:px-4 lg:py-2 lg:text-sm"
				onclick={toggleCustomerDropdown}
			>
				All Customers <span class="text-[12px] leading-none">v</span>
			</button>
			{#if showCustomerDropdown}
				<div class="absolute left-0 z-10 mt-1 w-36 rounded-lg border bg-white shadow-lg">
					<button
						class="block w-full px-3 py-1.5 text-left text-xs font-semibold hover:bg-gray-100"
						onclick={() => selectCustomer('')}
					>
						All Customers
					</button>

					<!-- Show All Customers -->
					{#each invoiceData as p}
						<button
							class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
							onclick={() => selectCustomer(p.name)}
						>
							{p.name}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!--  All Status Dropdown -->
		<div class="relative hidden md:block">
			<button
				class="rounded-full bg-white px-3 py-1.5 text-xs hover:bg-gray-50 md:text-xs lg:px-4 lg:py-2 lg:text-sm"
				onclick={toggleStatusDropdown}
			>
				All Status <span class="text-[12px] leading-none">v</span>
			</button>
			{#if showStatusDropdown}
				<div class="absolute left-0 z-10 mt-1 w-28 rounded-lg border bg-white shadow-lg">
					<button
						class="block w-full px-3 py-1.5 text-left text-xs font-semibold hover:bg-gray-100"
						onclick={() => selectStatus('')}
					>
						All Status
					</button>

					<!-- Show All Customers -->
					{#each uniqueStatuses as status}
						<button
							class="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100"
							onclick={() => selectStatus(status)}
						>
							{status}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!--  Left section -->
	<div class="flex flex-wrap items-center gap-2">
		<!--  Search (only visible on lg) -->
		<input
			type="text"
			placeholder="Search Invoice ID or Patients..."
			class="hidden w-56 rounded-full bg-white px-3 py-2 text-sm lg:block"
			value={searchValue}
			oninput={handleInput}
		/>

		<!-- Search Icon (visible on md but hidden on lg) -->
		<button
			class="hidden h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 md:flex lg:hidden"
		>
			<svg
				class="h-4 w-4 text-gray-600"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
				/>
			</svg>
		</button>

		<!--  Add Invoice (hidden on sm) -->
		<button
			class="add-btn-lg-color hidden rounded-full px-3 py-1.5 text-xs md:block lg:px-4 lg:py-2 lg:text-sm"
			onclick={openAddInvoiceModal}
		>
			+ Add Invoice
		</button>
	</div>
</nav>

<!-- MODAL -->
{#if showAddInvoiceModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-white/30 px-4 backdrop-blur-sm"
	>
		<div class="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
			<!-- Header -->
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-bold text-gray-700">➕ Add New Invoice</h2>
				<button
					onclick={closeAddInvoiceModal}
					class="text-2xl leading-none text-gray-400 hover:text-gray-600">&times;</button
				>
			</div>

			<!-- Form -->
			<div class="space-y-4">
				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Invoice Number</label>
					<input
						type="text"
						placeholder="INV-0001"
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Customer Name</label>
					<input
						type="text"
						placeholder="Enter customer name"
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					/>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label class="mb-1 block text-sm font-semibold text-gray-600">Invoice Date</label>
						<input
							type="date"
							class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
						/>
					</div>

					<div>
						<label class="mb-1 block text-sm font-semibold text-gray-600">Due Date</label>
						<input
							type="date"
							class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
						/>
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Amount</label>
					<input
						type="number"
						placeholder="Enter invoice amount"
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Status</label>
					<select
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					>
						<option>Select Status</option>
						<option>Paid</option>
						<option>Pending</option>
						<option>Overdue</option>
					</select>
				</div>

				<div>
					<label class="mb-1 block text-sm font-semibold text-gray-600">Notes</label>
					<textarea
						placeholder="Optional notes..."
						class="w-full rounded-lg border p-2 text-sm shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring focus:ring-blue-100"
					></textarea>
				</div>
			</div>

			<!-- Footer -->
			<div class="mt-6 flex justify-end gap-3">
				<button
					onclick={closeAddInvoiceModal}
					class="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
				>
					Cancel
				</button>
				<button
					class="rounded-full bg-blue-500 px-5 py-2 text-sm text-white shadow transition hover:bg-blue-600"
				>
					Save Invoice
				</button>
			</div>
		</div>
	</div>
{/if}
