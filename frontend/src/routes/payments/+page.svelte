<script>
	import PaymentInvoice from '../../components/cards/paymentInvoice.svelte';
	import PaymentNavbar from '../../components/nav/paymentNavbar.svelte';
	import Pagination from '../../components/pagination/Pagination.svelte';
	import { invoices as invoiceData } from '$lib/invoicesData/invoices';

	let invoices = invoiceData;
	let searchTerm = '';
	let selectedCustomer = '';
	let selectedStatus = '';
	let selectedDate = '';
	let showDeleteModal = false;

	//  Filtering Logic
	$: filteredInvoice = invoices.filter((p) => {
		const q = searchTerm.toLowerCase();

		const matchesSearch =
			(p.name?.toLowerCase() ?? '').includes(q) ||
			(p.treatment?.toLowerCase() ?? '').includes(q) ||
			(p.id?.toLowerCase() ?? '').includes(q) ||
			(p.status?.toLowerCase() ?? '').includes(q);

		const matchesCustomer = selectedCustomer
			? p.name?.toLowerCase() === selectedCustomer.toLowerCase()
			: true;
		const matchesStatus = selectedStatus
			? p.status?.toLowerCase() === selectedStatus.toLowerCase()
			: true;
		const matchesDate = selectedDate ? (p.date?.split('T')[0] ?? '') === selectedDate : true;

		return matchesSearch && matchesCustomer && matchesStatus && matchesDate;
	});

	const statusClasses = (status) =>
		status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

	let selectAll = false;
	let selected = [];

	function toggleSelectAll() {
		selectAll = !selectAll;
		if (selectAll) {
			const newSelections = paginatedInvoices.map((i) => i.id);
			selected = Array.from(new Set([...selected, ...newSelections]));
		} else {
			selected = selected.filter((id) => !paginatedInvoices.some((i) => i.id === id));
		}
	}

	function toggleSelection(id) {
		selected = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
	}
	//  Pagination State
	let currentPage = 1;
	let itemsPerPage = 8;
	// Pagination Logic
	$: totalItems = filteredInvoice.length;
	$: totalPages = Math.ceil(totalItems / itemsPerPage);
	$: if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

	$: paginatedInvoices = filteredInvoice.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	//  Handle Page Change from Pagination Component
	function handlePageChange(e) {
		currentPage = e.detail;
	}
	function handleSearch(event) {
		searchTerm = event.detail;
		currentPage = 1;
	}
	function handleCustomerFilter(event) {
		selectedCustomer = event.detail;
		currentPage = 1;
	}
	function handleStatusFilter(event) {
		selectedStatus = event.detail;
		currentPage = 1;
	}
	function handleDateFilter(event) {
		selectedDate = event.detail;
		currentPage = 1;
	}
	function openDeleteModal() {
		showDeleteModal = true;
	}
	function closeDeleteModal() {
		showDeleteModal = false;
	}
	function confirmDelete() {
		// Remove selected invoices
		invoices = invoices.filter((i) => !selected.includes(i.id));
		selected = [];
		showDeleteModal = false;
	}
</script>

<div class="bg-[#f9f5f4] p-4">
	<PaymentInvoice />
	<br />
	<PaymentNavbar
		on:search={handleSearch}
		on:filterCustomer={handleCustomerFilter}
		on:filterStatus={handleStatusFilter}
		on:filterDate={handleDateFilter}
	/>

	<div class="hidden rounded-xl bg-white p-3 shadow md:block md:p-2 lg:p-4">
		<table class="min-w-full border-collapse text-sm md:text-[11px] lg:text-sm">
			<thead class="rounded-lg bg-[#f9f5f4]">
				<tr class="text-left text-gray-600">
					<th class="w-12 px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">
						<div class="flex items-center gap-2">
							<input
								type="checkbox"
								class="h-3.5 w-3.5 md:h-3 md:w-3 lg:h-4 lg:w-4"
								checked={paginatedInvoices.every((i) => selected.includes(i.id))}
								on:change={toggleSelectAll}
							/>
							{#if selectAll}
								<button
									class="text-red-500 hover:text-red-700"
									title="Delete Selected Invoices"
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
					</th>

					<th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Invoice ID</th>
					<th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Patient</th>
					<th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Treatment</th>
					<th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Payment</th>
					<th class="hidden px-3 py-4 md:px-1.5 md:py-2 lg:table-cell lg:px-3 lg:py-4">Amount</th>
					<th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Date</th>
					<th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Status</th>
				</tr>
			</thead>

			<tbody>
				{#each paginatedInvoices as inv}
					<tr class="border-b border-gray-200 hover:bg-[#D5F4FE]">
						<td class="flex items-center gap-2 p-2 md:p-1.5 lg:p-2">
							<input
								type="checkbox"
								class="h-3.5 w-3.5 md:h-3 md:w-3 lg:h-4 lg:w-4"
								checked={selected.includes(inv.id)}
								on:change={() => toggleSelection(inv.id)}
							/>
							{#if selected.includes(inv.id)}
								<button
									on:click={() => deleteInvoice(inv.id)}
									class="text-red-500 hover:text-red-700"
									title="Delete Invoice"
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
						</td>
						<td class="p-2 font-medium md:p-1.5 lg:p-2">{inv.id}</td>
						<td class="flex items-center gap-2 p-2 md:p-1.5 lg:p-2">
							<img
								src={inv.avatar}
								alt=""
								class="h-7 w-7 rounded-full md:h-6 md:w-6 lg:h-8 lg:w-8"
							/>
							<span class="md:text-[10px] lg:text-sm">{inv.name}</span>
						</td>
						<td class="p-2 md:p-1.5 md:text-[10px] lg:p-2 lg:text-sm">{inv.treatment}</td>
						<td class="p-2 md:p-1.5 lg:p-2">
							<span
								class="rounded-full bg-gray-100 px-2 py-0.5 text-xs md:px-1.5 md:py-0.5 md:text-[10px] lg:px-2 lg:py-0.5 lg:text-xs"
								>{inv.method}</span
							>
							<div class="mt-1 block text-xs font-semibold text-gray-600 md:text-[9px] lg:hidden">
								Amount: ${inv.amount}
							</div>
						</td>
						<td
							class="hidden p-2 font-semibold md:p-1.5 md:text-[10px] lg:table-cell lg:p-2 lg:text-sm"
							>${inv.amount}</td
						>
						<td class="p-2 md:p-1.5 md:text-[10px] lg:p-2 lg:text-sm">{inv.date}</td>
						<td class="p-2 md:p-1.5 lg:p-2">
							<span
								class={`rounded-full px-2.5 py-0.5 text-xs md:px-2 md:py-0.5 md:text-[10px] lg:px-3 lg:py-0.5 lg:text-xs ${statusClasses(inv.status)}`}
							>
								{inv.status}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex flex-col gap-3 md:hidden">
		{#each paginatedInvoices as inv}
			<div class="rounded-xl bg-white p-3 shadow">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<input
							type="checkbox"
							class="h-4 w-4"
							checked={selected.includes(inv.id)}
							on:change={() => toggleSelection(inv.id)}
						/>
						<span class="text-sm font-semibold">{inv.id} - {inv.date}</span>

						{#if selected.includes(inv.id)}
							<button
								on:click={() => deleteInvoice(inv.id)}
								class="ml-2 text-red-500 hover:text-red-700"
								title="Delete Invoice"
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
					<span class={`rounded-full px-2 py-1 text-xs ${statusClasses(inv.status)}`}
						>{inv.status}</span
					>
				</div>
				<div class="mt-2 flex items-center gap-3">
					<img src={inv.avatar} class="h-10 w-10 rounded-full" alt="" />
					<div>
						<p class="font-medium">{inv.name}</p>
						<p class="text-sm text-gray-500">{inv.treatment}</p>
					</div>
				</div>
				<div class="mt-2 flex items-center justify-between text-sm">
					<span class="rounded-full bg-gray-100 px-2 py-1">{inv.method}</span>
					<span class="font-semibold">Amount: ${inv.amount}</span>
				</div>
			</div>
		{/each}
	</div>

	{#if showDeleteModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div class="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
				<h2 class="text-lg font-semibold text-gray-800">Delete Confirmation</h2>
				<p class="mt-2 text-sm text-gray-600">
					Are you sure you want to delete the selected invoices?
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

	<!--  Pagination Component -->
	  {#if totalItems > 0}
	<Pagination {totalItems} {itemsPerPage} {currentPage} on:pageChange={handlePageChange} />
	{:else}
		<p class="py-4 text-center text-gray-500">No invoices found for the applied filters.</p>
	{/if}
</div>
