<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	
	const dispatch = createEventDispatcher();
	
	export let isOpen = false;
	export let title = 'Confirm Delete';
	export let message = 'Are you sure you want to delete this item? This action cannot be undone.';
	export let itemName = '';
	export let isLoading = false;
	
	function handleConfirm() {
		dispatch('confirm');
	}
	
	function handleCancel() {
		dispatch('cancel');
	}
	
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleCancel();
		}
	}
</script>

{#if isOpen}
	<!-- Backdrop -->
	<div 
		class="fixed inset-0  bg-opacity-30 backdrop-blur-md z-50 flex items-center justify-center p-4"
		onclick={handleBackdropClick}
		transition:fade={{ duration: 200 }}
	>
		<!-- Modal -->
		<div 
			class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden border border-gray-200/50 p-4"
			transition:scale={{ duration: 300, start: 0.8 }}
		>
			<!-- Header -->
			<!-- <div class="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white text-center">
				<div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
					</svg>
				</div>
				<h3 class="text-lg font-bold">{title}</h3>
			</div> -->
			
			<!-- Content -->
			<!-- <div class="p-4 text-center">
				<p class="text-gray-600 mb-3 text-sm">{message}</p>
				{#if itemName}
					<div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
						<p class="text-red-800 font-semibold text-sm">"{itemName}"</p>
					</div>
				{/if} -->
				
				<!-- Warning Icon -->
				<div class="flex items-center justify-center mb-4">
					<div class="bg-yellow-100 rounded-full p-2">
						<svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
						</svg>
					</div>
				</div>
				
				<p class="text-xs text-gray-500 mb-4 p-2">
					This action will permanently delete the treatment and cannot be undone.
				</p>
			<!-- </div> -->
			
			<!-- Actions -->
			<div class="flex gap-3 p-4 pt-0">
				<button
					type="button"
					onclick={handleCancel}
					disabled={isLoading}
					class="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 text-sm"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={handleConfirm}
					disabled={isLoading}
					class="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 flex items-center justify-center text-sm"
				>
					{#if isLoading}
						<div class="flex items-center">
							<div class="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
							Deleting...
						</div>
					{:else}
						Delete Treatment
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
