<script lang="ts">
	export let text: string = 'Loading...';
</script>

<div class="flex flex-col items-center justify-center py-16">
	<!-- Spinner -->
	<div class="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
	
	<!-- Optional text -->
	<p class="mt-4 text-lg font-medium text-gray-600">{text}</p>
</div>

<style>
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	.animate-spin {
		animation: spin 0.8s linear infinite;
	}
</style>
