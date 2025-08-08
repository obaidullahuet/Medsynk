<script>
	let { show = false, onCancel, onConfirm, selectedCount = 0, deleteAll = false } = $props();
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
		<div class="w-80 rounded-xl bg-white p-6 shadow-2xl">
			<h2 class="text-lg font-bold text-gray-700">Confirm Deletion</h2>
			<p class="mt-2 text-sm text-gray-500">
				{#if deleteAll}
					Are you sure you want to delete <b>ALL</b> patients?
				{:else}
					Are you sure you want to delete <b>{selectedCount}</b> patients?
				{/if}
			</p>

			<div class="mt-5 flex justify-end gap-3">
				<button
					class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
					onclick={onCancel}
				>
					Cancel
				</button>
				<button
					class="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
					onclick={onConfirm}
				>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}
