<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	let collapsed = $state(false);

	function toggleSidebar() {
		collapsed = !collapsed;
	}

	const iconMap = {
		Dashboard: 'mdi:home',
		Patients: 'mdi:account',
		Doctors: 'mdi:stethoscope',
		Appointments: 'mdi:calendar',
		'Surgery Schedule': 'mdi:file-document',
		Treatments: 'mdi:pill',
		Reviews: 'mdi:star',
		Payments: 'mdi:credit-card',
		Messages: 'mdi:message'
	};

	let navItems = $state([
		{ label: 'Dashboard', path: '/', active: true },
		{ label: 'Patients', path: '/patients', active: false },
		{ label: 'Doctors', path: '/doctors', active: false },
		{ label: 'Appointments', path: '/appointments', active: false },
		{ label: 'Surgery Schedule', path: '/surgery-schedule', active: false },
		{ label: 'Treatments', path: '/treatments', active: false },
		{ label: 'Reviews', path: '/reviews', active: false },
		{ label: 'Payments', path: '/payments', active: false },
		{ label: 'Messages', path: '/messages', active: false, badge: 6 },
		{ label: 'Logout', path: '/login', active: false }
	]);

	let toggleIcon = $derived(collapsed ? '' : 'ic:sharp-space-dashboard');

	function handleNavClick(index: any) {
		navItems = navItems.map((item, i) => ({ ...item, active: i === index }));
		goto(navItems[index].path);
	}
</script>

<div
	class={`hidden flex-col bg-[#FFFEFC] transition-all duration-300 md:flex ${collapsed ? 'w-20' : 'w-64'}`}
	style="min-height: calc(100vh - 4rem);"
>
	<div class="flex items-center p-4">
		<button
			class="flex cursor-pointer items-center gap-4 rounded py-2 text-gray-700"
			aria-label="Toggle Sidebar"
			onclick={toggleSidebar}
		>
			<img
				src="/medSynk-logo.png"
				alt="MedSynk logo"
				class={`transition-all duration-300 ${collapsed ? 'h-8 w-8' : 'h-12 w-12'}`}
			/>

			<span class={`text-lg font-semibold ${collapsed ? 'hidden' : 'block'}`}> MedSynk </span>

			<Icon icon={toggleIcon} class="h-5 w-5 text-gray-700" />
		</button>
	</div>

	<nav class="mt-4 flex-1 overflow-y-auto">
		{#each navItems as item, index}
			<div
				onclick={() => handleNavClick(index)}
				class={`group relative mx-2 my-1 flex cursor-pointer items-center rounded-lg px-4 py-3 ${item.active ? 'btn-dropdown-color text-blue-800' : 'btn-dropdown-hover text-gray-600'}`}
			>
				<Icon icon={iconMap[item.label]} class="h-5 w-5" />
				<span class={`ml-4 text-sm font-medium ${collapsed ? 'hidden' : ''}`}>{item.label}</span>

				{#if item.badge && !collapsed}
					<span class="absolute top-2 right-3 rounded-full bg-red-200 px-1.5 text-xs text-red-800"
						>{item.badge}</span
					>
				{/if}
			</div>
		{/each}
	</nav>

	{#if !collapsed}
		<div class="btn-dropdown-color1 m-3 flex flex-col gap-5 rounded-xl p-4">
			<img
				src="/medSynk-logo.png"
				alt="MedSynk logo"
				class={`transition-all duration-300 ${collapsed ? 'h-8 w-8' : 'h-12 w-12'}`}
			/>
			<p class=" text-md leading-5 text-gray-800">
				Enjoy improved performance, new features, and a smoother interface.
			</p>
			<button class="add-btn-lg-color cursor-pointer rounded-full px-3 py-3 text-xs"
				>Explore the Update!</button
			>
		</div>
	{/if}

	<div
		onclick={() => goto('/login')}
		class="btn-dropdown-hover m-3 flex cursor-pointer items-center gap-2 rounded-md bg-[#faf6f5] p-4 text-sm text-gray-600 hover:bg-gray-200"
	>
		<Icon icon="mdi:logout" class="h-5 w-5" />
		<span class={collapsed ? 'hidden' : ''}>Logout</span>
	</div>
</div>
