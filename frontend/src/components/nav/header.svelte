<script lang="ts">
	import '../../app.css';
	import { fly, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let showMobileSidebar = false;

	const user = {
		name: 'Anahera Jones',
		role: 'Admin',
		avatar: 'https://i.pravatar.cc/100?img=47'
	};

	const logo = '/logo.svg';

	const navItems = [
		{ name: 'Dashboard', path: '/' },
		{ name: 'Patients', path: '/patients' },
		{ name: 'Doctors', path: '/doctors' },
		{ name: 'Appointments', path: '/appointments' },
		{ name: 'Surgery Schedule', path: '/surgery-schedule' },
		{ name: 'Treatments', path: '/treatments' },
		{ name: 'Reviews', path: '/reviews' },
		{ name: 'Payments', path: '/payments' },
		{ name: 'Messages', path: '/messages', badge: 6 }
	];

	let btn = false;

	// $: activeItem = navItems.find((item) => $page.url.pathname === item.path) || {
	// 	name: 'Dashboard'
	// };
	$: activeItem = (() => {
		const currentPath = $page.url.pathname;

		if (currentPath.startsWith('/treatments/') && currentPath.split('/').length === 3) {
			btn = true;
			return { name: 'Treatment Details' };
		}
		if (currentPath.startsWith('/doctors/') && currentPath.split('/').length === 3) {
			btn = true;
			return { name: 'Doctors Details' };
		}
		if (currentPath.startsWith('/patients/') && currentPath.split('/').length === 3) {
			btn = true;
			return { name: 'Patients Details' };
		}
		btn = false;
		return navItems.find((item) => currentPath === item.path) || { name: 'Dashboard' };
	})();

	function toggleMobileSidebar() {
		showMobileSidebar = !showMobileSidebar;
	}

	function closeMobileSidebar() {
		showMobileSidebar = false;
	}

	function navigate(path: string) {
		goto(path);
		closeMobileSidebar();
	}
</script>

<!-- Header -->
<div class="flex w-full items-center justify-between bg-[#FFFEFC] px-6 py-4">
	<div class="flex gap-4 lg:flex-col lg:gap-0">
		{#if btn == true}
			<button
				on:click={() => history.back()}
				class="flex items-center gap-2  py-2 px-2 text-sm text-gray-600 rounded-full bg-gray-100"
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
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				<span class="hidden lg:block">Back to page</span>
			</button>
		{/if}

		<span class="text-lg font-semibold text-gray-700">{activeItem.name}</span>
	</div>

	<!-- Right: Desktop user info -->
	<div class="hidden items-center gap-4 md:flex">
		<div class="btn-dropdown-color1 cursor-pointer rounded-full p-2 transition-colors">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-blue-300"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
				/>
			</svg>
		</div>

		<img src={user.avatar} alt="User profile" class="h-8 w-8 rounded-full" />
		<div class="text-right text-sm">
			<p class="font-medium text-gray-800">{user.name}</p>
			<p class="text-gray-500">{user.role}</p>
		</div>
	</div>

	<!-- Mobile menu -->
	<div class="md:hidden">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			on:click={toggleMobileSidebar}
			class="text-gray-700 hover:text-gray-900 focus:outline-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</div>
</div>

<!-- Mobile Sidebar -->
{#if showMobileSidebar}
	<div
		class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
		on:click={closeMobileSidebar}
		transition:fade={{ duration: 200 }}
	>
		<div
			class="absolute top-0 left-0 z-50 flex h-full w-72 flex-col bg-[#FFFEFC] shadow-xl"
			on:click|stopPropagation
			transition:fly={{ x: -300, duration: 250, opacity: 1 }}
		>
			<!-- Sidebar Header -->
			<div class="flex items-center justify-between p-6">
				<div class="flex items-center gap-3">
					<img src="/medSynk-logo.png" alt="MedSynk logo" class="h-8 w-8" />
					<span class="text-xl font-bold text-gray-800">MedSynk</span>
				</div>
				<button on:click={closeMobileSidebar} class="rounded-full p-2 hover:bg-gray-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-gray-500"
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
			</div>

			<!-- Navigation (left aligned) -->
			<nav class="flex-1 overflow-y-auto py-6">
				<ul class="space-y-1 px-4 pb-20">
					{#each navItems as item}
						<li>
							<button
								on:click={() => navigate(item.path)}
								class="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-gray-700 transition-colors hover:bg-gray-50
								{$page.url.pathname === item.path ? 'btn-dropdown-color1  add-text-lg-color' : ''}"
							>
								<span class="font-medium">{item.name}</span>
								{#if item.badge}
									<span class="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white"
										>{item.badge}</span
									>
								{/if}
							</button>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- User Profile Bottom -->
			<div class="border-t border-gray-100 p-4">
				<div class="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
					<img src={user.avatar} alt="User profile" class="h-10 w-10 rounded-full" />
					<div>
						<p class="text-sm font-medium text-gray-800">{user.name}</p>
						<p class="text-xs text-gray-500">{user.role}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
