import { K as ensure_array_like, M as attr_class, G as escape_html, R as stringify, I as attr, E as pop, A as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let selectedChat = "Grace Parker";
  let messageInput = "";
  let searchQuery = "";
  let activeTab = "All";
  let currentSection = "Inbox";
  let allChats = {
    personal: [
      {
        name: "Grace Parker",
        time: "11:38 AM",
        msg: "Thank you! Should I avoid sunlight after the surgery?",
        img: "https://randomuser.me/api/portraits/women/1.jpg",
        unread: false,
        active: true,
        type: "personal"
      },
      {
        name: "Victor Ramirez",
        time: "11:45 AM",
        msg: "I have a question about the new medication...",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        unread: true,
        active: false,
        type: "personal"
      },
      {
        name: "Emma Davis",
        time: "11:27 AM",
        msg: "When can I schedule the next appointment?",
        img: "https://randomuser.me/api/portraits/women/2.jpg",
        unread: false,
        active: false,
        type: "personal"
      }
    ],
    customerSupport: [
      {
        name: "Support Team",
        time: "10:30 AM",
        msg: "How can we help you today?",
        img: "https://randomuser.me/api/portraits/men/20.jpg",
        unread: false,
        active: false,
        type: "support"
      },
      {
        name: "Technical Support",
        time: "09:15 AM",
        msg: "Your issue has been resolved.",
        img: "https://randomuser.me/api/portraits/women/20.jpg",
        unread: true,
        active: false,
        type: "support"
      }
    ],
    doctorSupport: [
      {
        name: "Dr. Smith",
        time: "2:30 PM",
        msg: "Your test results are ready for review.",
        img: "https://randomuser.me/api/portraits/men/15.jpg",
        unread: true,
        active: false,
        type: "doctor"
      },
      {
        name: "Dr. Johnson",
        time: "1:45 PM",
        msg: "Please schedule your follow-up appointment.",
        img: "https://randomuser.me/api/portraits/women/15.jpg",
        unread: false,
        active: false,
        type: "doctor"
      }
    ],
    internalTeam: [
      {
        name: "Team Lead",
        time: "3:20 PM",
        msg: "Meeting scheduled for tomorrow at 10 AM.",
        img: "https://randomuser.me/api/portraits/men/25.jpg",
        unread: false,
        active: false,
        type: "internal"
      },
      {
        name: "HR Department",
        time: "2:50 PM",
        msg: "Please update your profile information.",
        img: "https://randomuser.me/api/portraits/women/25.jpg",
        unread: true,
        active: false,
        type: "internal"
      }
    ],
    appointments: [
      {
        name: "Appointment Bot",
        time: "4:00 PM",
        msg: "Reminder: You have an appointment tomorrow at 2 PM.",
        img: "https://randomuser.me/api/portraits/men/30.jpg",
        unread: true,
        active: false,
        type: "appointment"
      }
    ]
  };
  let integrations = [
    { name: "Google Calendar", connected: true, status: "Active" },
    {
      name: "Google Drive",
      connected: false,
      status: "Disconnected"
    },
    { name: "Zoom Meeting", connected: true, status: "Active" }
  ];
  let allMessages = {
    "Grace Parker": [
      {
        id: 1,
        sender: "Grace Parker",
        text: "Thank you! Should I avoid sunlight after the surgery?",
        time: "11:38 AM",
        isOwn: false,
        img: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      {
        id: 2,
        sender: "You",
        text: "Yes, please avoid direct sunlight for at least 2 weeks after the surgery.",
        time: "11:40 AM",
        isOwn: true,
        img: "https://randomuser.me/api/portraits/women/1.jpg"
      }
    ],
    "Victor Ramirez": [
      {
        id: 1,
        sender: "Victor Ramirez",
        text: "I have a question about the new medication for my surgery. Could you let me know when to start taking it?",
        time: "11:40 AM",
        isOwn: false,
        img: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      {
        id: 2,
        sender: "You",
        text: "Hi Victor! You should apply the ointment twice a day starting right after the dressing is removed.",
        time: "11:42 AM",
        isOwn: true,
        img: "https://randomuser.me/api/portraits/women/1.jpg"
      }
    ],
    "Dr. Smith": [
      {
        id: 1,
        sender: "Dr. Smith",
        text: "Your test results are ready for review. Everything looks normal.",
        time: "2:30 PM",
        isOwn: false,
        img: "https://randomuser.me/api/portraits/men/15.jpg"
      }
    ],
    "Support Team": [
      {
        id: 1,
        sender: "Support Team",
        text: "How can we help you today?",
        time: "10:30 AM",
        isOwn: false,
        img: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  };
  let currentMessages = allMessages[selectedChat] || [];
  let currentChats = (() => {
    switch (currentSection) {
      case "Inbox":
        return [
          ...allChats.personal,
          ...allChats.customerSupport,
          ...allChats.doctorSupport,
          ...allChats.internalTeam,
          ...allChats.appointments
        ];
      case "Draft":
        return [];
      case "Customer Support":
        return allChats.customerSupport;
      case "Doctor Support":
        return allChats.doctorSupport;
      case "Internal Team":
        return allChats.internalTeam;
      case "Appointment Reminders":
        return allChats.appointments;
      default:
        return allChats.personal;
    }
  })();
  let filteredChats = (() => {
    let chats = currentChats;
    return chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.msg.toLowerCase().includes(searchQuery.toLowerCase()));
  })();
  let currentChatImg = (() => {
    const allChatsFlat = Object.values(allChats).flat();
    return allChatsFlat.find((chat) => chat.name === selectedChat)?.img || "https://randomuser.me/api/portraits/women/1.jpg";
  })();
  let sidebarSections = [
    {
      title: "General",
      items: [
        { name: "Inbox", active: true, count: 5, type: "button" },
        { name: "Draft", active: false, count: 2, type: "button" }
      ],
      hasAddButton: false
    },
    {
      title: "Channels",
      items: [
        {
          name: "Customer Support",
          active: false,
          count: 2,
          type: "button"
        },
        {
          name: "Doctor Support",
          active: false,
          count: 1,
          type: "button"
        },
        {
          name: "Internal Team",
          active: false,
          count: 1,
          type: "button"
        },
        {
          name: "Appointment Reminders",
          active: false,
          count: 1,
          type: "button"
        }
      ],
      hasAddButton: true,
      addButtonText: "+ Create New Channel"
    },
    {
      title: "Integration",
      items: [
        {
          name: "Google Calendar",
          active: false,
          count: null,
          type: "button"
        },
        {
          name: "Google Drive",
          active: false,
          count: null,
          type: "button"
        },
        {
          name: "Zoom Meeting",
          active: false,
          count: null,
          type: "button"
        }
      ],
      hasAddButton: true,
      addButtonText: "+ Add Plugin"
    },
    {
      title: "",
      items: [
        { name: "Live chat", active: false, count: 3, type: "button" }
      ],
      hasAddButton: false
    }
  ];
  const each_array = ensure_array_like(sidebarSections);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="flex h-screen gap-4 bg-white"><aside${attr_class(
    ` fixed inset-y-0 left-0 z-50 w-72 transform bg-white/95 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-in-out lg:relative lg:z-auto lg:w-64 lg:translate-x-0 lg:bg-white lg:shadow-none lg:backdrop-blur-none xl:w-72 ${stringify("-translate-x-full lg:translate-x-0")} `,
    "svelte-kca5zh"
  )}><div class="flex h-full flex-col"><div class="flex items-center justify-between p-4 lg:hidden lg:justify-center"><h1 class="text-lg font-medium text-gray-800 lg:text-xl">Medical Chat</h1> <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Close sidebar" aria-label="Close sidebar"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="flex-1 overflow-y-auto px-4"><div class="space-y-6"><!--[-->`);
  for (let sectionIndex = 0, $$length = each_array.length; sectionIndex < $$length; sectionIndex++) {
    let section = each_array[sectionIndex];
    $$payload.out.push(`<div class="rounded-xl bg-[#f9f5f4] p-4">`);
    if (section.title) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<h2 class="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">${escape_html(section.title)}</h2>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> `);
    if (section.title === "General") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="space-y-2"><button${attr_class(`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-medium transition-all ${stringify(section.items[0].active ? "btn-dropdown-color1 " : "text-gray-600 hover:bg-gray-100")}`)} aria-label="Inbox"><span class="flex items-center gap-2"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h16M0 13h2M4 13h2m0 0V9a2 2 0 012-2h8a2 2 0 012 2v4M6 13h12"></path></svg> Inbox</span> <span class="add-btn-lg-color rounded-full px-2 py-0.5 text-xs font-medium">${escape_html(section.items[0].count)}</span></button> <button${attr_class(`flex hidden w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all ${stringify(section.items[1].active ? "btn-dropdown-color1" : "text-gray-600 hover:bg-gray-100")}`)} aria-label="Draft"><span class="flex items-center gap-2"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Draft</span> `);
      if (section.items[1].count > 0) {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<span class="add-btn-lg-color rounded-full px-2 py-0.5 text-xs font-medium">${escape_html(section.items[1].count)}</span>`);
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--></button></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      const each_array_1 = ensure_array_like(section.items);
      $$payload.out.push(`<ul class="space-y-1"><!--[-->`);
      for (let itemIndex = 0, $$length2 = each_array_1.length; itemIndex < $$length2; itemIndex++) {
        let item = each_array_1[itemIndex];
        $$payload.out.push(`<li><button${attr_class(`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all ${stringify(item.active ? "btn-dropdown-color1" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700")}`)}${attr("aria-label", item.name)}><span>${escape_html(item.name)}</span> `);
        if (item.count !== null && item.count > 0) {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<span class="add-btn-lg-color rounded-full px-2 py-0.5 text-xs font-medium">${escape_html(item.count)}</span>`);
        } else {
          $$payload.out.push("<!--[!-->");
        }
        $$payload.out.push(`<!--]--> `);
        if (section.title === "Integration") {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<span${attr_class(`text-xs ${stringify(integrations.find((i) => i.name === item.name)?.connected ? "text-green-600" : "text-red-600")}`)}>${escape_html(integrations.find((i) => i.name === item.name)?.status)}</span>`);
        } else {
          $$payload.out.push("<!--[!-->");
        }
        $$payload.out.push(`<!--]--></button></li>`);
      }
      $$payload.out.push(`<!--]--></ul>`);
    }
    $$payload.out.push(`<!--]--> `);
    if (section.hasAddButton) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<button class="btn-dropdown-color1 mt-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium"${attr("aria-label", section.addButtonText)}>${escape_html(section.addButtonText)}</button>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div>`);
  }
  $$payload.out.push(`<!--]--></div></div></div></aside> <div class="flex min-w-0 flex-1 flex-col gap-4 rounded-2xl bg-[#f9f5f4] p-4 lg:flex-row"><section${attr_class(` flex h-full w-full flex-col rounded-2xl bg-white p-4 lg:w-80 xl:w-96 ${stringify("flex")} `)}><div class="p-2"><div class="mb-4 flex items-center justify-between"><button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden" title="Open sidebar" aria-label="Open sidebar"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div> <div class="relative"><svg class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="text" placeholder="Search conversations..."${attr("value", searchQuery)} class="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-[#40C0E5] focus:bg-white focus:ring-2 focus:ring-[#40C0E5] focus:outline-none"/></div></div> `);
  {
    $$payload.out.push("<!--[!-->");
    if (currentSection.includes("Integration") || ["Google Calendar", "Google Drive", "Zoom Meeting"].includes(currentSection)) {
      $$payload.out.push("<!--[-->");
      const each_array_3 = ensure_array_like(integrations);
      $$payload.out.push(`<div class="flex-1 overflow-y-auto p-4"><h3 class="mb-4 text-sm font-semibold text-gray-700">Integration Settings</h3> <div class="space-y-3"><!--[-->`);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let integration = each_array_3[$$index_3];
        $$payload.out.push(`<div class="rounded-lg bg-white p-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100"><svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 005.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg></div> <div><h4 class="font-medium text-gray-900">${escape_html(integration.name)}</h4> <p class="text-sm text-gray-500">Status: ${escape_html(integration.status)}</p></div></div> <button${attr_class(`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${stringify(integration.connected ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200")}`)}>${escape_html(integration.connected ? "Disconnect" : "Connect")}</button></div></div>`);
      }
      $$payload.out.push(`<!--]--></div></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      {
        $$payload.out.push("<!--[!-->");
        const each_array_4 = ensure_array_like(["All", "Personal", "Groups"]);
        $$payload.out.push(`<div class="rounded-2xl bg-[#f9f5f4] p-4"><div class="flex space-x-1"><!--[-->`);
        for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
          let tab = each_array_4[$$index_4];
          $$payload.out.push(`<button${attr_class(`rounded-2xl px-3 py-1.5 text-sm font-medium transition-all ${stringify(activeTab === tab ? "btn-dropdown-color1" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700")}`)}${attr("aria-label", tab)}>${escape_html(tab)}</button>`);
        }
        $$payload.out.push(`<!--]--></div></div> <div class="flex-1 overflow-y-auto rounded-2xl p-2">`);
        if (filteredChats.length === 0) {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<div class="py-8 text-center text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> <p class="mt-2">No conversations found</p></div>`);
        } else {
          $$payload.out.push("<!--[!-->");
          const each_array_5 = ensure_array_like(filteredChats);
          $$payload.out.push(`<ul class="space-y-2 rounded-2xl bg-white"><!--[-->`);
          for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
            let chat = each_array_5[$$index_5];
            $$payload.out.push(`<li${attr_class(`cursor-pointer rounded-2xl px-4 py-3 transition-all hover:bg-white ${stringify(chat.active ? "btn-dropdown-color1  rounded-2xl border border-[#40C0E5]" : "")}`)} role="listitem"${attr("aria-label", chat.name)}><div class="flex items-center gap-3"><div class="relative flex-shrink-0"><img${attr("src", chat.img || "/placeholder.svg")}${attr("alt", chat.name)} class="h-12 w-12 rounded-full object-cover shadow-sm ring-2 ring-white"/> `);
            if (chat.unread) {
              $$payload.out.push("<!--[-->");
              $$payload.out.push(`<div class="add-btn-lg-color absolute -top-1 -right-1 h-3 w-3 rounded-full ring-2 ring-white"></div>`);
            } else {
              $$payload.out.push("<!--[!-->");
            }
            $$payload.out.push(`<!--]--></div> <div class="min-w-0 flex-1"><div class="flex items-center justify-between"><h3${attr_class(`truncate font-medium text-gray-900 ${stringify(chat.unread ? "font-semibold" : "")}`)}>${escape_html(chat.name)}</h3> <span class="flex-shrink-0 text-xs text-gray-500">${escape_html(chat.time)}</span></div> <p class="mt-1 truncate text-sm text-gray-600">${escape_html(chat.msg)}</p></div></div></li>`);
          }
          $$payload.out.push(`<!--]--></ul>`);
        }
        $$payload.out.push(`<!--]--></div> <footer class="sticky bottom-0 rounded-2xl bg-white"><button type="submit" class="add-btn-lg-color hover:add-btn-lg-color w-full cursor-pointer rounded-full p-3 text-white transition-all focus:ring-2 focus:ring-emerald-200 focus:outline-none"${attr("disabled", messageInput.trim() === "", true)} title="Send message" aria-label="Send message">New Message</button></footer>`);
      }
      $$payload.out.push(`<!--]-->`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></section> <main${attr_class(`flex min-w-0 flex-1 flex-col rounded-2xl bg-white ${stringify("hidden lg:flex")}`)}><header class="rounded-2xl px-2 py-3 sm:px-4"><div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2"><div class="flex items-center gap-1.5 sm:gap-3"><button class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2 lg:hidden" title="Back to chats" aria-label="Back to chats"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <div class="flex items-center gap-1 sm:gap-3"><img${attr("src", currentChatImg)}${attr("alt", selectedChat)} class="am:w-10 h-8 w-8 rounded-full object-cover shadow-sm ring-2 ring-white sm:h-10"/> <div><h2 class="text-xs font-semibold whitespace-nowrap text-gray-900">${escape_html(selectedChat)}</h2> <div class="flex items-center gap-1 text-sm text-[#40c0e5]"><div class="add-btn-lg-color h-2 w-2 rounded-full"></div> <span>Online</span></div></div></div></div> <div class="flex items-center gap-1"><button class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2" title="Voice call" aria-label="Voice call"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></button> <button class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2" title="Video call" aria-label="Video call"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button> <button class="rounded-lg text-gray-500 hover:bg-gray-100 sm:p-2" title="More options" aria-label="More options"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button></div></div></header> <div class="flex-1 overflow-y-auto p-4 pb-6"><div class="mx-auto max-w-4xl space-y-4">`);
  if (currentMessages.length === 0) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="py-8 text-center text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> <p class="mt-2">Start a conversation with ${escape_html(selectedChat)}</p></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
    const each_array_6 = ensure_array_like(currentMessages);
    $$payload.out.push(`<!--[-->`);
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let message = each_array_6[$$index_6];
      $$payload.out.push(`<div${attr_class(`flex gap-3 ${stringify(message.isOwn ? "justify-end" : "justify-start")}`)}>`);
      if (!message.isOwn) {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<img${attr("src", message.img || "/placeholder.svg")}${attr("alt", message.sender)} class="h-8 w-8 flex-shrink-0 rounded-full object-cover shadow-sm ring-2 ring-white"/>`);
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--> <div${attr_class(`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${stringify(message.isOwn ? "order-first" : "")}`)}><div${attr_class(`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${stringify(message.isOwn ? "btn-dropdown-color1 text-white" : "border border-gray-200 bg-white text-gray-800")}`)}>${escape_html(message.text)}</div> <div${attr_class(`mt-1 text-xs text-gray-500 ${stringify(message.isOwn ? "text-right" : "text-left")}`)}>${escape_html(message.time)}</div></div> `);
      if (message.isOwn) {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<img${attr("src", message.img || "/placeholder.svg")}${attr("alt", message.sender)} class="h-8 w-8 flex-shrink-0 rounded-full object-cover shadow-sm ring-2 ring-white"/>`);
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--></div>`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div></div> <footer class="sticky bottom-[-20px] rounded-2xl border-t border-gray-200 bg-white p-4"><form class="mx-auto flex max-w-4xl items-end gap-3"><div class="flex-1"><textarea placeholder="Type your message..." rows="1" class="w-full resize-none rounded-lg px-4 py-3 text-sm transition-all focus:border-[#40C0E5] focus:bg-white focus:ring-2 focus:ring-[#40C0E5] focus:outline-none">`);
  const $$body = escape_html(messageInput);
  if ($$body) {
    $$payload.out.push(`${$$body}`);
  }
  $$payload.out.push(`</textarea></div> <button type="submit" class="btn-dropdown-color1 hover:add-btn-lg-color rounded-lg p-3 text-white shadow-lg transition-all focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"${attr("disabled", messageInput.trim() === "", true)} title="Send message" aria-label="Send message"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button></form></footer></main></div></div>`);
  pop();
}
export {
  _page as default
};
