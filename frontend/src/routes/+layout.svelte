<script>
	import { onMount } from 'svelte';
	import Header from '../components/nav/header.svelte';
	import Sidebar from '../components/nav/sidebar.svelte';
	import Footer from '../components/nav/footer.svelte';
	import { page } from '$app/stores';
	import { checkAuth } from '$lib/auth';
	import '../styles/global.css';
	import toast, { Toaster } from 'svelte-french-toast';
	
	const hiddenRoutes = ['/login', '/signup'];
	$: currentPath = $page.url.pathname;
	$: showLayout = !hiddenRoutes.includes(currentPath);
	
	// Check authentication for all routes except login and signup
	onMount(() => {
		if (!hiddenRoutes.includes(currentPath)) {
			checkAuth();
		}
	});
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	{#if showLayout}
		<!-- Main section: Sidebar + Content + Footer wrapper -->
		<div class="flex flex-1 overflow-hidden">
			<!-- Sidebar -->
			<Sidebar />

			<!-- Main content + Footer (column layout) -->
			<div class="flex flex-1 flex-col overflow-hidden">
				<div class="h-20 shrink-0">
					<Header />
				</div>

				<!-- Content -->
				<div class="flex-1 overflow-y-auto rounded-2xl">
					<slot />
				</div>

				<!-- Footer -->
				<div class="h-20 shrink-0">
					<Footer />
				</div>
			</div>

			<div class="bg-[#fffefc] sm:w-5"></div>
		</div>
	{:else}
		<!-- Just render the page content for hidden routes -->
		<slot />
	{/if}
</div>
<Toaster />
