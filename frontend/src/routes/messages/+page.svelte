<script lang="ts">
	// Svelte 5 runes syntax for reactive state
	let selectedChat = $state('Grace Parker');
	let messageInput = $state('');
	let searchQuery = $state('');
	let activeTab = $state('All');
	let showChat = $state(false);
	let showSidebar = $state(false);
	let currentSection = $state('Inbox');

	// All chats data organized by type
	let allChats = $state({
		personal: [
			{
				name: 'Grace Parker',
				time: '11:38 AM',
				msg: 'Thank you! Should I avoid sunlight after the surgery?',
				img: 'https://randomuser.me/api/portraits/women/1.jpg',
				unread: false,
				active: true,
				type: 'personal'
			},
			{
				name: 'Victor Ramirez',
				time: '11:45 AM',
				msg: 'I have a question about the new medication...',
				img: 'https://randomuser.me/api/portraits/men/1.jpg',
				unread: true,
				active: false,
				type: 'personal'
			},
			{
				name: 'Emma Davis',
				time: '11:27 AM',
				msg: 'When can I schedule the next appointment?',
				img: 'https://randomuser.me/api/portraits/women/2.jpg',
				unread: false,
				active: false,
				type: 'personal'
			}
		],
		customerSupport: [
			{
				name: 'Support Team',
				time: '10:30 AM',
				msg: 'How can we help you today?',
				img: 'https://randomuser.me/api/portraits/men/20.jpg',
				unread: false,
				active: false,
				type: 'support'
			},
			{
				name: 'Technical Support',
				time: '09:15 AM',
				msg: 'Your issue has been resolved.',
				img: 'https://randomuser.me/api/portraits/women/20.jpg',
				unread: true,
				active: false,
				type: 'support'
			}
		],
		doctorSupport: [
			{
				name: 'Dr. Smith',
				time: '2:30 PM',
				msg: 'Your test results are ready for review.',
				img: 'https://randomuser.me/api/portraits/men/15.jpg',
				unread: true,
				active: false,
				type: 'doctor'
			},
			{
				name: 'Dr. Johnson',
				time: '1:45 PM',
				msg: 'Please schedule your follow-up appointment.',
				img: 'https://randomuser.me/api/portraits/women/15.jpg',
				unread: false,
				active: false,
				type: 'doctor'
			}
		],
		internalTeam: [
			{
				name: 'Team Lead',
				time: '3:20 PM',
				msg: 'Meeting scheduled for tomorrow at 10 AM.',
				img: 'https://randomuser.me/api/portraits/men/25.jpg',
				unread: false,
				active: false,
				type: 'internal'
			},
			{
				name: 'HR Department',
				time: '2:50 PM',
				msg: 'Please update your profile information.',
				img: 'https://randomuser.me/api/portraits/women/25.jpg',
				unread: true,
				active: false,
				type: 'internal'
			}
		],
		appointments: [
			{
				name: 'Appointment Bot',
				time: '4:00 PM',
				msg: 'Reminder: You have an appointment tomorrow at 2 PM.',
				img: 'https://randomuser.me/api/portraits/men/30.jpg',
				unread: true,
				active: false,
				type: 'appointment'
			}
		]
	});

	// Draft messages
	let draftMessages = $state([
		{
			id: 1,
			recipient: 'Dr. Smith',
			content: 'Hello Doctor, I wanted to ask about my recent test results...',
			timestamp: '11:30 AM',
			img: 'https://randomuser.me/api/portraits/men/15.jpg'
		},
		{
			id: 2,
			recipient: 'Support Team',
			content: 'I am experiencing issues with the appointment booking system...',
			timestamp: '10:45 AM',
			img: 'https://randomuser.me/api/portraits/men/20.jpg'
		}
	]);

	// Integration status
	let integrations = $state([
		{ name: 'Google Calendar', connected: true, status: 'Active' },
		{ name: 'Google Drive', connected: false, status: 'Disconnected' },
		{ name: 'Zoom Meeting', connected: true, status: 'Active' }
	]);

	// Live chat status
	let liveChatStatus = $state({
		isOnline: true,
		activeChats: 3,
		waitingQueue: 1
	});

	// Messages for different chats
	let allMessages = $state({
		'Grace Parker': [
			{
				id: 1,
				sender: 'Grace Parker',
				text: 'Thank you! Should I avoid sunlight after the surgery?',
				time: '11:38 AM',
				isOwn: false,
				img: 'https://randomuser.me/api/portraits/women/1.jpg'
			},
			{
				id: 2,
				sender: 'You',
				text: 'Yes, please avoid direct sunlight for at least 2 weeks after the surgery.',
				time: '11:40 AM',
				isOwn: true,
				img: 'https://randomuser.me/api/portraits/women/1.jpg'
			}
		],
		'Victor Ramirez': [
			{
				id: 1,
				sender: 'Victor Ramirez',
				text: 'I have a question about the new medication for my surgery. Could you let me know when to start taking it?',
				time: '11:40 AM',
				isOwn: false,
				img: 'https://randomuser.me/api/portraits/men/1.jpg'
			},
			{
				id: 2,
				sender: 'You',
				text: 'Hi Victor! You should apply the ointment twice a day starting right after the dressing is removed.',
				time: '11:42 AM',
				isOwn: true,
				img: 'https://randomuser.me/api/portraits/women/1.jpg'
			}
		],
		'Dr. Smith': [
			{
				id: 1,
				sender: 'Dr. Smith',
				text: 'Your test results are ready for review. Everything looks normal.',
				time: '2:30 PM',
				isOwn: false,
				img: 'https://randomuser.me/api/portraits/men/15.jpg'
			}
		],
		'Support Team': [
			{
				id: 1,
				sender: 'Support Team',
				text: 'How can we help you today?',
				time: '10:30 AM',
				isOwn: false,
				img: 'https://randomuser.me/api/portraits/men/20.jpg'
			}
		]
	});

	// Get current messages based on selected chat
	let currentMessages = $derived(allMessages[selectedChat] || []);

	// Get current chats based on active section
	let currentChats = $derived.by(() => {
		switch (currentSection) {
			case 'Inbox':
				return [
					...allChats.personal,
					...allChats.customerSupport,
					...allChats.doctorSupport,
					...allChats.internalTeam,
					...allChats.appointments
				];
			case 'Draft':
				return [];
			case 'Customer Support':
				return allChats.customerSupport;
			case 'Doctor Support':
				return allChats.doctorSupport;
			case 'Internal Team':
				return allChats.internalTeam;
			case 'Appointment Reminders':
				return allChats.appointments;
			default:
				return allChats.personal;
		}
	});

	// Filtered chats based on search and active tab
	let filteredChats = $derived.by(() => {
		let chats = currentChats;

		// Filter by tab
		if (activeTab === 'Personal') {
			chats = chats.filter((chat) => chat.type === 'personal');
		} else if (activeTab === 'Groups') {
			chats = chats.filter((chat) =>
				['support', 'doctor', 'internal', 'appointment'].includes(chat.type)
			);
		}

		// Filter by search
		return chats.filter(
			(chat) =>
				chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				chat.msg.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	// Get current chat image for header
	let currentChatImg = $derived.by(() => {
		const allChatsFlat = Object.values(allChats).flat();
		return (
			allChatsFlat.find((chat) => chat.name === selectedChat)?.img ||
			'https://randomuser.me/api/portraits/women/1.jpg'
		);
	});

	// Functions
	function sendMessage() {
		if (messageInput.trim() === '') return;

		const newMessage = {
			id: (currentMessages.length || 0) + 1,
			sender: 'You',
			text: messageInput,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			isOwn: true,
			img: 'https://randomuser.me/api/portraits/women/1.jpg'
		};

		if (!allMessages[selectedChat]) {
			allMessages[selectedChat] = [];
		}
		allMessages[selectedChat].push(newMessage);
		messageInput = '';
	}

	function setActiveTab(tab: string) {
		activeTab = tab;
	}

	let sidebarSections = $state([
		{
			title: 'General',
			items: [
				{ name: 'Inbox', active: true, count: 5, type: 'button' },
				{ name: 'Draft', active: false, count: 2, type: 'button' }
			],
			hasAddButton: false
		},
		{
			title: 'Channels',
			items: [
				{ name: 'Customer Support', active: false, count: 2, type: 'button' },
				{ name: 'Doctor Support', active: false, count: 1, type: 'button' },
				{ name: 'Internal Team', active: false, count: 1, type: 'button' },
				{ name: 'Appointment Reminders', active: false, count: 1, type: 'button' }
			],
			hasAddButton: true,
			addButtonText: '+ Create New Channel'
		},
		{
			title: 'Integration',
			items: [
				{ name: 'Google Calendar', active: false, count: null, type: 'button' },
				{ name: 'Google Drive', active: false, count: null, type: 'button' },
				{ name: 'Zoom Meeting', active: false, count: null, type: 'button' }
			],
			hasAddButton: true,
			addButtonText: '+ Add Plugin'
		},
		{
			title: '',
			items: [{ name: 'Live chat', active: false, count: 3, type: 'button' }],
			hasAddButton: false
		}
	]);

	// Functions for sidebar interactions
	function handleSidebarItemClick(sectionIndex: number, itemIndex: number, itemName: string) {
		// Reset all items to inactive
		sidebarSections.forEach((section) => {
			section.items.forEach((item) => (item.active = false));
		});
		// Set clicked item as active
		sidebarSections[sectionIndex].items[itemIndex].active = true;
		currentSection = itemName;

		// Close sidebar on mobile after selection
		if (typeof window !== 'undefined' && window.innerWidth < 1024) {
			showSidebar = false;
		}
	}

	function selectChat(chatName: string) {
		// Reset all chats to inactive in all categories
		Object.keys(allChats).forEach((category) => {
			allChats[category].forEach((chat) => {
				chat.active = false;
			});
		});

		// Find and activate the selected chat
		Object.keys(allChats).forEach((category) => {
			const chat = allChats[category].find((c) => c.name === chatName);
			if (chat) {
				chat.active = true;
			}
		});

		selectedChat = chatName;
		showChat = true;

		// Force reactivity update
		allChats = { ...allChats };
	}

	function goBackToChats() {
		showChat = false;
	}

	function toggleSidebar() {
		showSidebar = !showSidebar;
	}

	function closeSidebar() {
		showSidebar = false;
	}

	function deleteDraft(draftId: number) {
		draftMessages = draftMessages.filter((draft) => draft.id !== draftId);
	}

	function editDraft(draftId: number) {
		const draft = draftMessages.find((d) => d.id === draftId);
		if (draft) {
			messageInput = draft.content;
			selectedChat = draft.recipient;
			showChat = true;
			deleteDraft(draftId);
		}
	}

	function toggleIntegration(integrationName: string) {
		const integration = integrations.find((i) => i.name === integrationName);
		if (integration) {
			integration.connected = !integration.connected;
			integration.status = integration.connected ? 'Active' : 'Disconnected';
		}
	}
</script>

<!-- Mobile/Tablet Sidebar Overlay with Blur Effect -->
{#if showSidebar}
	<div
		class="fixed inset-0 z-40 bg-white/20 backdrop-blur-sm lg:hidden"
		onclick={closeSidebar}
		role="button"
		tabindex="-1"
		onkeydown={(e) => e.key === 'Enter' && closeSidebar()}
	></div>
{/if}

<div class="flex h-screen gap-4 bg-white">
	<!-- Sidebar -->
	<aside
		class="
        fixed inset-y-0 left-0 z-50 w-72 transform bg-white/95 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-in-out
        lg:relative lg:z-auto lg:w-64 lg:translate-x-0 lg:bg-white lg:shadow-none lg:backdrop-blur-none xl:w-72
        {showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    "
	>
		<div class="flex h-full flex-col">
			<!-- Sidebar Header -->
			<div class="flex items-center justify-between p-4 lg:hidden lg:justify-center">
				<h1 class="text-lg font-medium text-gray-800 lg:text-xl">Medical Chat</h1>
				<button
					class="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
					onclick={closeSidebar}
					title="Close sidebar"
					aria-label="Close sidebar"
				>
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

			<!-- Sidebar Content -->
			<div class="flex-1 overflow-y-auto px-4">
				<div class="space-y-6">
					{#each sidebarSections as section, sectionIndex}
						<div class="rounded-xl bg-[#f9f5f4] p-4">
							{#if section.title}
								<h2 class="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
									{section.title}
								</h2>
							{/if}

							{#if section.title === 'General'}
								<div class="space-y-2">
									<button
										class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-medium transition-all {section
											.items[0].active
											? 'btn-dropdown-color1 '
											: 'text-gray-600 hover:bg-gray-100'}"
										onclick={() => handleSidebarItemClick(sectionIndex, 0, 'Inbox')}
										aria-label="Inbox"
									>
										<span class="flex items-center gap-2">
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h16M0 13h2M4 13h2m0 0V9a2 2 0 012-2h8a2 2 0 012 2v4M6 13h12"
												></path>
											</svg>
											Inbox
										</span>
										<span class="add-btn-lg-color rounded-full px-2 py-0.5 text-xs font-medium"
											>{section.items[0].count}</span
										>
									</button>
									<button
										class="flex hidden w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all {section
											.items[1].active
											? 'btn-dropdown-color1'
											: 'text-gray-600 hover:bg-gray-100'}"
										onclick={() => handleSidebarItemClick(sectionIndex, 1, 'Draft')}
										aria-label="Draft"
									>
										<span class="flex items-center gap-2">
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
												></path>
											</svg>
											Draft
										</span>
										{#if section.items[1].count > 0}
											<span class="add-btn-lg-color rounded-full px-2 py-0.5 text-xs font-medium"
												>{section.items[1].count}</span
											>
										{/if}
									</button>
								</div>
							{:else}
								<ul class="space-y-1">
									{#each section.items as item, itemIndex}
										<li>
											<button
												class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all {item.active
													? 'btn-dropdown-color1'
													: 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'}"
												onclick={() => handleSidebarItemClick(sectionIndex, itemIndex, item.name)}
												aria-label={item.name}
											>
												<span>{item.name}</span>
												{#if item.count !== null && item.count > 0}
													<span
														class="add-btn-lg-color rounded-full px-2 py-0.5 text-xs font-medium"
														>{item.count}</span
													>
												{/if}
												{#if section.title === 'Integration'}
													<span
														class="text-xs {integrations.find((i) => i.name === item.name)
															?.connected
															? 'text-green-600'
															: 'text-red-600'}"
													>
														{integrations.find((i) => i.name === item.name)?.status}
													</span>
												{/if}
											</button>
										</li>
									{/each}
								</ul>
							{/if}

							{#if section.hasAddButton}
								<button
									class="btn-dropdown-color1 mt-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium"
									aria-label={section.addButtonText}
								>
									{section.addButtonText}
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</aside>

	<!-- Main Content Area -->
	<div class="flex min-w-0 flex-1 flex-col gap-4 rounded-2xl bg-[#f9f5f4] p-4 lg:flex-row">
		<!-- Chat List Section -->
		<section
			class="
            flex h-full w-full flex-col rounded-2xl bg-white p-4
            lg:w-80 xl:w-96
            {showChat ? 'hidden lg:flex' : 'flex'}
        "
		>
			<!-- Chat List Header -->
			<div class=" p-2">
				<div class="mb-4 flex items-center justify-between">
					<button
						class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
						onclick={toggleSidebar}
						title="Open sidebar"
						aria-label="Open sidebar"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</button>
					<!-- <h2 class="text-lg font-semibold text-gray-800">{currentSection}</h2>
                    <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="New chat" aria-label="New chat">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button> -->
				</div>

				<!-- Search Input -->
				<div class="relative">
					<svg
						class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
					<input
						type="text"
						placeholder="Search conversations..."
						bind:value={searchQuery}
						class="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-[#40C0E5] focus:bg-white focus:ring-2 focus:ring-[#40C0E5] focus:outline-none"
					/>
				</div>
			</div>

			<!-- Content based on current section -->
			{#if currentSection === 'Draft'}
				<!-- Draft Messages -->
				<div class="flex-1 overflow-y-auto p-4">
					<h3 class="mb-4 text-sm font-semibold text-gray-700">
						Draft Messages ({draftMessages.length})
					</h3>
					{#if draftMessages.length === 0}
						<div class="py-8 text-center text-gray-500">
							<svg
								class="mx-auto h-12 w-12 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
								></path>
							</svg>
							<p class="mt-2">No draft messages</p>
						</div>
					{:else}
						<div class="space-y-3">
							{#each draftMessages as draft}
								<div class="rounded-lg bg-yellow-50 p-3">
									<div class="flex items-start justify-between">
										<div class="flex-1">
											<div class="mb-2 flex items-center gap-2">
												<img
													src={draft.img || '/placeholder.svg'}
													alt={draft.recipient}
													class="h-6 w-6 rounded-full"
												/>
												<span class="text-sm font-medium text-gray-900">To: {draft.recipient}</span>
												<span class="text-xs text-gray-500">{draft.timestamp}</span>
											</div>
											<p class="line-clamp-2 text-sm text-gray-700">{draft.content}</p>
										</div>
										<div class="ml-2 flex gap-1">
											<button
												onclick={() => editDraft(draft.id)}
												class="rounded p-1 text-blue-600 hover:bg-blue-100"
												title="Edit draft"
												aria-label="Edit draft"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
													></path>
												</svg>
											</button>
											<button
												onclick={() => deleteDraft(draft.id)}
												class="rounded p-1 text-red-600 hover:bg-red-100"
												title="Delete draft"
												aria-label="Delete draft"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													></path>
												</svg>
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{:else if currentSection.includes('Integration') || ['Google Calendar', 'Google Drive', 'Zoom Meeting'].includes(currentSection)}
				<!-- Integration Settings -->
				<div class="flex-1 overflow-y-auto p-4">
					<h3 class="mb-4 text-sm font-semibold text-gray-700">Integration Settings</h3>
					<div class="space-y-3">
						{#each integrations as integration}
							<div class="rounded-lg bg-white p-4">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
											<svg
												class="h-5 w-5 text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 005.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
												></path>
											</svg>
										</div>
										<div>
											<h4 class="font-medium text-gray-900">{integration.name}</h4>
											<p class="text-sm text-gray-500">Status: {integration.status}</p>
										</div>
									</div>
									<button
										onclick={() => toggleIntegration(integration.name)}
										class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors {integration.connected
											? 'bg-red-100 text-red-700 hover:bg-red-200'
											: 'bg-green-100 text-green-700 hover:bg-green-200'}"
									>
										{integration.connected ? 'Disconnect' : 'Connect'}
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else if currentSection === 'Live chat'}
				<!-- Live Chat Dashboard -->
				<div class="flex-1 overflow-y-auto p-4">
					<h3 class="mb-4 text-sm font-semibold text-gray-700">Live Chat Dashboard</h3>
					<div class="space-y-4">
						<div class="rounded-lg bg-white p-4">
							<div class="mb-3 flex items-center justify-between">
								<h4 class="font-medium text-gray-900">Status</h4>
								<span
									class="flex items-center gap-1 text-sm {liveChatStatus.isOnline
										? 'text-green-600'
										: 'text-red-600'}"
								>
									<div
										class="h-2 w-2 rounded-full {liveChatStatus.isOnline
											? 'bg-green-500'
											: 'bg-red-500'}"
									></div>
									{liveChatStatus.isOnline ? 'Online' : 'Offline'}
								</span>
							</div>
							<div class="grid grid-cols-2 gap-4 text-center">
								<div class="rounded-lg bg-blue-50 p-3">
									<div class="text-2xl font-bold text-blue-600">{liveChatStatus.activeChats}</div>
									<div class="text-sm text-blue-600">Active Chats</div>
								</div>
								<div class="rounded-lg bg-orange-50 p-3">
									<div class="text-2xl font-bold text-orange-600">
										{liveChatStatus.waitingQueue}
									</div>
									<div class="text-sm text-orange-600">In Queue</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<!-- Chat Tabs -->
				<div class=" rounded-2xl bg-[#f9f5f4] p-4">
					<div class="flex space-x-1">
						{#each ['All', 'Personal', 'Groups'] as tab}
							<button
								class="rounded-2xl px-3 py-1.5 text-sm font-medium transition-all {activeTab === tab
									? 'btn-dropdown-color1'
									: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}"
								onclick={() => setActiveTab(tab)}
								aria-label={tab}
							>
								{tab}
							</button>
						{/each}
					</div>
				</div>

				<!-- Chat List -->
				<div class="flex-1 overflow-y-auto rounded-2xl p-2">
					{#if filteredChats.length === 0}
						<div class="py-8 text-center text-gray-500">
							<svg
								class="mx-auto h-12 w-12 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								></path>
							</svg>
							<p class="mt-2">No conversations found</p>
						</div>
					{:else}
						<ul class=" space-y-2 rounded-2xl bg-white">
							{#each filteredChats as chat}
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<li
									class="cursor-pointer rounded-2xl px-4 py-3 transition-all hover:bg-white {chat.active
										? 'btn-dropdown-color1  rounded-2xl border border-[#40C0E5]'
										: ''}"
									role="listitem"
									aria-label={chat.name}
									onclick={() => selectChat(chat.name)}
									onkeydown={(e) => {
										if (e.key === 'Enter') {
											selectChat(chat.name);
										}
									}}
								>
									<div class="flex items-center gap-3">
										<div class="relative flex-shrink-0">
											<img
												src={chat.img || '/placeholder.svg'}
												alt={chat.name}
												class="h-12 w-12 rounded-full object-cover shadow-sm ring-2 ring-white"
											/>
											{#if chat.unread}
												<div
													class="add-btn-lg-color absolute -top-1 -right-1 h-3 w-3 rounded-full ring-2 ring-white"
												></div>
											{/if}
										</div>
										<div class="min-w-0 flex-1">
											<div class="flex items-center justify-between">
												<h3
													class="truncate font-medium text-gray-900 {chat.unread
														? 'font-semibold'
														: ''}"
												>
													{chat.name}
												</h3>
												<span class="flex-shrink-0 text-xs text-gray-500">{chat.time}</span>
											</div>
											<p class="mt-1 truncate text-sm text-gray-600">{chat.msg}</p>
										</div>
									</div>
								</li>
							{/each}
						</ul>
					{/if}
				</div>

				<footer class="sticky bottom-0 rounded-2xl bg-white">
					<button
						type="submit"
						class="add-btn-lg-color hover:add-btn-lg-color w-full cursor-pointer rounded-full p-3 text-white transition-all focus:ring-2 focus:ring-emerald-200 focus:outline-none"
						disabled={messageInput.trim() === ''}
						title="Send message"
						aria-label="Send message"
						>New Message
					</button>
				</footer>
			{/if}
		</section>

		<!-- Chat Conversation Section -->
		<main
			class="flex min-w-0 flex-1 flex-col rounded-2xl bg-white {showChat
				? 'flex'
				: 'hidden lg:flex'}"
		>
			<!-- Chat Header -->
			<header class="rounded-2xl px-2 py-3 sm:px-4">
				<div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2">
					<div class="flex items-center gap-1.5 sm:gap-3">
						<button
							class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2 lg:hidden"
							onclick={goBackToChats}
							title="Back to chats"
							aria-label="Back to chats"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								></path>
							</svg>
						</button>
						<div class="flex items-center gap-1 sm:gap-3">
							<img
								src={currentChatImg || '/placeholder.svg'}
								alt={selectedChat}
								class="am:w-10 h-8 w-8 rounded-full object-cover shadow-sm ring-2 ring-white sm:h-10"
							/>
							<div>
								<h2 class="text-xs font-semibold whitespace-nowrap text-gray-900">
									{selectedChat}
								</h2>
								<div class="flex items-center gap-1 text-sm text-[#40c0e5]">
									<div class="add-btn-lg-color h-2 w-2 rounded-full"></div>
									<span>Online</span>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center gap-1">
						<button
							class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2"
							title="Voice call"
							aria-label="Voice call"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								></path>
							</svg>
						</button>
						<button
							class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2"
							title="Video call"
							aria-label="Video call"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
								></path>
							</svg>
						</button>
						<button
							class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2"
							title="More options"
							aria-label="More options"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</header>

			<!-- Messages Area -->
			<div class="flex-1 overflow-y-auto p-4 pb-6">
				<div class="mx-auto max-w-4xl space-y-4">
					{#if currentMessages.length === 0}
						<div class="py-8 text-center text-gray-500">
							<svg
								class="mx-auto h-12 w-12 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								></path>
							</svg>
							<p class="mt-2">Start a conversation with {selectedChat}</p>
						</div>
					{:else}
						{#each currentMessages as message (message.id)}
							<div class="flex gap-3 {message.isOwn ? 'justify-end' : 'justify-start'}">
								{#if !message.isOwn}
									<img
										src={message.img || '/placeholder.svg'}
										alt={message.sender}
										class="h-8 w-8 flex-shrink-0 rounded-full object-cover shadow-sm ring-2 ring-white"
									/>
								{/if}
								<div
									class="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl {message.isOwn
										? 'order-first'
										: ''}"
								>
									<div
										class="rounded-2xl px-4 py-2.5 text-sm shadow-sm {message.isOwn
											? 'btn-dropdown-color1 text-white'
											: 'border border-gray-200 bg-white text-gray-800'}"
									>
										{message.text}
									</div>
									<div
										class="mt-1 text-xs text-gray-500 {message.isOwn ? 'text-right' : 'text-left'}"
									>
										{message.time}
									</div>
								</div>
								{#if message.isOwn}
									<img
										src={message.img || '/placeholder.svg'}
										alt={message.sender}
										class="h-8 w-8 flex-shrink-0 rounded-full object-cover shadow-sm ring-2 ring-white"
									/>
								{/if}
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<!-- Message Input -->
			<footer class="sticky bottom-[-20px] rounded-2xl border-t border-gray-200 bg-white p-4">
				<form
					class="mx-auto flex max-w-4xl items-end gap-3"
					onsubmit={(e) => {
						e.preventDefault();
						sendMessage();
					}}
				>
					<div class="flex-1">
						<textarea
							placeholder="Type your message..."
							bind:value={messageInput}
							rows="1"
							class="w-full resize-none rounded-lg px-4 py-3 text-sm transition-all focus:border-[#40C0E5] focus:bg-white focus:ring-2 focus:ring-[#40C0E5] focus:outline-none"
							onkeydown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									sendMessage();
								}
							}}
						></textarea>
					</div>
					<button
						type="submit"
						class="btn-dropdown-color1 hover:add-btn-lg-color rounded-lg p-3 text-white shadow-lg transition-all focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						disabled={messageInput.trim() === ''}
						title="Send message"
						aria-label="Send message"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							></path>
						</svg>
					</button>
				</form>
			</footer>
		</main>
	</div>
</div>

<style>
	/* Custom scrollbar styles */
	:global(.overflow-y-auto::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb) {
		background: rgba(156, 163, 175, 0.3);
		border-radius: 3px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
		background: rgba(156, 163, 175, 0.5);
	}

	/* Smooth transitions for mobile sidebar */
	@media (max-width: 1023px) {
		aside {
			transition: transform 0.3s ease-in-out;
		}
	}

	/* Line clamp utility */
	:global(.line-clamp-2) {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
