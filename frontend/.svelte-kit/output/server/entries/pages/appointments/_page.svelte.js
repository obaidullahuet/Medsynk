import { K as ensure_array_like, I as attr, S as maybe_selected, G as escape_html, Q as attr_style, M as attr_class, E as pop, A as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let uniqueDoctors, monthOptions;
  let currentDate = /* @__PURE__ */ new Date();
  let searchQuery = "";
  let selectedDoctor = "All Doctors";
  let days = [];
  const events = [
    {
      doctor: "Dr. Olivia Grant",
      title: "Facial Rejuvenation",
      start: "9:00 AM",
      end: "10:00 AM",
      room: "OR 1",
      date: "2025-08-01",
      color: "bg-rose-100 border border-rose-300"
    },
    {
      doctor: "Dr. Sophia Clark",
      title: "Chemical Peels",
      start: "10:30 AM",
      end: "11:30 AM",
      room: "OR 3",
      date: "2025-08-01",
      color: "bg-blue-100 border border-blue-300"
    },
    {
      doctor: "Dr. James Lawson",
      title: "Scar Removal Surgery",
      start: "11:30 AM",
      end: "12:30 AM",
      room: "OR 1",
      date: "2025-07-28",
      color: "bg-purple-100 border border-purple-300"
    },
    {
      doctor: "Dr. Megan Foster",
      title: "Tattoo Removal",
      start: "11:20 AM",
      end: "12:20 PM",
      room: "OR 2",
      date: "2025-08-02",
      color: "bg-gray-200 border border-gray-300"
    },
    {
      doctor: "Dr. Emily Ross",
      title: "Acne Treatment",
      start: "10:00 AM",
      end: "11:00 AM",
      room: "OR 2",
      date: "2025-08-02",
      color: "bg-emerald-100 border border-emerald-300"
    },
    {
      doctor: "Dr. Olivia Grant",
      title: "Botox Injections",
      start: "12:00 PM",
      end: "1:00 PM",
      room: "OR 3",
      date: "2025-07-29",
      color: "bg-green-100 border border-green-300"
    },
    {
      doctor: "Dr. Richard Allen",
      title: "Liposuction Consultation",
      start: "1:00 PM",
      end: "2:00 PM",
      room: "OR 4",
      date: "2025-08-02",
      color: "bg-yellow-100 border border-yellow-300"
    },
    {
      doctor: "Dr. Sophia Clark",
      title: "Skin Brightening",
      start: "9:30 AM",
      end: "10:30 AM",
      room: "OR 1",
      date: "2025-07-31",
      color: "bg-pink-100 border border-pink-300"
    }
  ];
  const startHour = 9;
  const endHour = 14;
  const hourHeight = 100;
  function toMinutes(timeStr) {
    const [time, meridiem] = timeStr.split(" ");
    let [hour, min] = time.split(":").map(Number);
    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;
    return hour * 60 + min;
  }
  function getTop(timeStr) {
    return (toMinutes(timeStr) - startHour * 60) / 60 * hourHeight + 4;
  }
  function getHeight(start, end) {
    return (toMinutes(end) - toMinutes(start)) / 60 * hourHeight - 8;
  }
  const totalHeight = (endHour - startHour) * hourHeight;
  function filterEventsByDate(dateObj) {
    if (!dateObj) return [];
    const targetDate = dateObj.toISOString().split("T")[0];
    const filteredEvents = events.filter((e) => {
      const matchesDate = e.date === targetDate;
      const matchesDoctor = selectedDoctor === "All Doctors";
      const matchesSearch = searchQuery === "";
      return matchesDate && matchesDoctor && matchesSearch;
    });
    return filteredEvents.map((event) => ({
      ...event,
      isHighlighted: selectedDoctor !== "All Doctors"
    })).sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  }
  function generateMonthOptions() {
    const options = [];
    const current = /* @__PURE__ */ new Date();
    for (let i = -6; i < 6; i++) {
      const date = new Date(current.getFullYear(), current.getMonth() + i, 1);
      options.push({
        value: date,
        label: date.toLocaleString("default", { month: "long", year: "numeric" })
      });
    }
    return options;
  }
  uniqueDoctors = Array.from(new Set(events.map((e) => e.doctor)));
  monthOptions = generateMonthOptions();
  const each_array = ensure_array_like(monthOptions);
  const each_array_1 = ensure_array_like(uniqueDoctors);
  const each_array_2 = ensure_array_like(days);
  const each_array_3 = ensure_array_like(Array(endHour - startHour + 1).fill(0).map((_, i) => startHour + i));
  const each_array_4 = ensure_array_like(days);
  $$payload.out.push(`<div class="flex flex-col gap-4 xl:flex-row"><div class="xl:w-[70%]"><div class="mb-4 flex flex-col-reverse md:flex-row justify-between gap-2 sm:gap-4"><div class="flex items-center gap-2 sm:gap-3"><button class="add-btn-lg-color add-text-lg-color1 rounded-full px-3 py-1 text-xs font-semibold transition-colors hover:bg-emerald-200 sm:text-sm">Today</button> <div class="relative"><select class="btn-dropdown-color1 hover:add-text-lg-color1 cursor-pointer appearance-none rounded-full px-3 py-1 text-sm font-semibold outline-none"><!--[-->`);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let option = each_array[index];
    $$payload.out.push(`<option${attr("value", index)}${maybe_selected($$payload, index)}${attr("selected", option.value.getMonth() === currentDate.getMonth() && option.value.getFullYear() === currentDate.getFullYear(), true)}>${escape_html(option.label)}</option>`);
  }
  $$payload.out.push(`<!--]--></select> <svg class="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-emerald-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></div></div>  <div class="flex items-center gap-2"><div class="max-w-md flex-1"><div class="relative"><input type="text"${attr("value", searchQuery)} placeholder="Search patient, doctor, treatment, room..." class="w-full rounded-full border border-gray-200 bg-white px-4 py-1.5 pl-10 text-sm"/> <svg class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div> <select class="btn-dropdown-color1 cursor-pointer rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none sm:text-sm">`);
  $$payload.select_value = selectedDoctor;
  $$payload.out.push(`<option value="All Doctors"${maybe_selected($$payload, "All Doctors")}>All Doctors</option><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let doc = each_array_1[$$index_1];
    $$payload.out.push(`<option${attr("value", doc)}${maybe_selected($$payload, doc)}>${escape_html(doc)}</option>`);
  }
  $$payload.out.push(`<!--]-->`);
  $$payload.select_value = void 0;
  $$payload.out.push(`</select> <div class="flex items-center gap-1"><button class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-emerald-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none" title="Previous Week"><svg class="h-4 w-4 text-emerald-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg></button> <button class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-emerald-200 focus:ring-2 focus:ring-emerald-300" title="Next Week"><svg class="h-4 w-4 text-emerald-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></button></div></div></div> <div class="overflow-x-hidden rounded-xl bg-white p-3 sm:p-4"><div class="mb-4 grid grid-cols-[80px_repeat(3,1fr)] gap-2 text-xs font-semibold sm:gap-3 sm:text-sm md:grid-cols-[80px_repeat(4,1fr)] lg:grid-cols-[80px_repeat(6,1fr)]"><div class="flex items-center justify-center rounded-xl bg-gray-100 p-2 text-center text-gray-700 sm:p-3">UTC +1</div> <!--[-->`);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let d = each_array_2[$$index_2];
    $$payload.out.push(`<div class="flex flex-col items-center justify-center rounded-xl bg-[#f9f5f4] px-3 py-2 transition duration-200 hover:bg-[#f3ecea] sm:px-4 sm:py-3"><span class="text-[11px] text-gray-500">${escape_html(d.name)}</span> <span class="text-lg font-bold sm:text-2xl">${escape_html(d.date)}</span></div>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="flex gap-2 overflow-hidden sm:gap-3"><div class="relative w-[70px] sm:w-[100px]"${attr_style(`height:${totalHeight}px`)}><!--[-->`);
  for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
    let h = each_array_3[i];
    $$payload.out.push(`<div class="absolute w-full border-t border-gray-200 pl-1 text-[10px] text-gray-600 sm:pl-2 sm:text-xs"${attr_style(`top:${i * hourHeight}px`)}>${escape_html(h <= 12 ? h : h - 12)}:00 ${escape_html(h < 12 ? "AM" : "PM")}</div>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="flex flex-1 gap-2 sm:gap-3"><!--[-->`);
  for (let $$index_6 = 0, $$length = each_array_4.length; $$index_6 < $$length; $$index_6++) {
    let d = each_array_4[$$index_6];
    const each_array_5 = ensure_array_like(Array(endHour - startHour + 1).fill(0).map((_, i) => i));
    const each_array_6 = ensure_array_like(filterEventsByDate(d.fullDate));
    $$payload.out.push(`<div class="relative flex-1 rounded-md p-1 sm:p-2"${attr_style(`height:${totalHeight}px`)}><!--[-->`);
    for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
      let i = each_array_5[$$index_4];
      $$payload.out.push(`<div class="absolute w-full border-t border-gray-200"${attr_style(`top:${i * hourHeight}px`)}></div>`);
    }
    $$payload.out.push(`<!--]--> <!--[-->`);
    for (let index = 0, $$length2 = each_array_6.length; index < $$length2; index++) {
      let e = each_array_6[index];
      $$payload.out.push(`<div${attr_class(`absolute right-1 left-1 cursor-pointer overflow-hidden rounded-lg p-1 text-[10px] break-words shadow-md transition-all duration-300 sm:p-2 sm:text-xs ${e.color}
								${"hover:scale-[1.02] hover:shadow-lg"}
								${""}
							`)}${attr_style(`top:${getTop(e.start) - 0}px; height:${getHeight(e.start, e.end) + 0}px; min-height:${50}px;`)}${attr("title", `${e.room} - ${e.title} with ${e.doctor}${""}`)}>`);
      {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--> <div class="mb-1 flex items-center gap-1 text-[9px] sm:text-[11px]">`);
      {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--></div> <div${attr_class(`mb-1 truncate text-[11px] font-medium sm:text-[13px] ${""}`)}>${escape_html(e.doctor)}</div> <div${attr_class(`mb-1 truncate text-[9px] font-medium sm:text-[12px] ${"text-gray-700"}`)}>${escape_html(e.title)}</div> <div${attr_class(`flex items-center gap-1 truncate text-[8px] sm:text-[10px] ${"text-gray-600"}`)}><svg class="h-2 w-2 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> ${escape_html(e.start)}</div> `);
      {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--></div>`);
    }
    $$payload.out.push(`<!--]--> `);
    if (filterEventsByDate(d.fullDate).length === 0) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="absolute inset-0 flex flex-col items-center justify-center p-2">`);
      {
        $$payload.out.push("<!--[!-->");
        $$payload.out.push(`<div class="text-center"><svg class="mx-auto mb-2 h-8 w-8 text-gray-200" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"></path></svg> <p class="text-xs font-medium text-gray-300">No appointments</p></div>`);
      }
      $$payload.out.push(`<!--]--></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div>`);
  }
  $$payload.out.push(`<!--]--></div></div></div></div> <div class="w-full space-y-2 xl:w-[30%]"><div class="grid grid-cols-3 gap-2 xl:gap-4"><div class="btn-dropdown-color1 flex flex-col gap-2 rounded-2xl p-3"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white"><span class="text-sm text-white">📋</span></div> <span class="add-text-lg-color text-[10px] leading-3 font-medium sm:text-xs">Total Appointments</span> <div class="add-text-lg-color text-sm font-bold">120</div></div> <div class="add-btn-lg-color flex flex-col gap-2 rounded-2xl p-3"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white"><span class="text-sm text-white">🧍‍♂️</span></div> <span class="add-text-lg-color1 text-xs leading-4 font-medium">New Patients</span> <div class="add-text-lg-color1 text-sm font-bold">45</div></div> <div class="btn-dropdown-color1 flex flex-col gap-2 rounded-2xl p-3"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white"><span class="text-sm text-white">🔁</span></div> <span class="add-text-lg-color text-xs leading-4 font-medium">Follow-up</span> <div class="add-text-lg-color text-sm font-bold">75</div></div></div> <div class="rounded-xl bg-[#f9f5f4] p-4"><h3 class="mb-2 text-sm font-bold text-gray-700">On Going Appointment</h3> <div class="mb-2 flex flex-col gap-3 rounded-2xl bg-white p-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-2"><img src="https://randomuser.me/api/portraits/men/32.jpg" class="h-10 w-10 rounded-full" alt="Maurice Galley"/> <div><p class="text-xs font-semibold">Maurice Galley</p> <p class="text-xs text-gray-500">PB-002</p></div></div> <div class="text-right"><p class="text-xs font-semibold text-gray-700">Dr. David Carter</p> <p class="text-xs text-gray-500">Laser Hair Removal</p></div></div> <hr class="border-t border-gray-200"/> <div class="text-xs text-gray-600">Est. Time: 12:00 PM - 2:00 PM</div></div> <div class="grid grid-cols-2 gap-3 text-xs text-gray-600"><div class="flex flex-col gap-3 p-2"><p><strong>Details:</strong> Male, 34 years old</p> <p><strong>Address:</strong> 45 Green Valley Road, Apt 12, New York, NY 30001</p></div> <p class="p-2 text-xs"><strong>Consultation Notes:</strong> Maurice is responding well to the treatment, and further
					sessions may be required for complete results.</p></div></div> <div class="rounded-xl bg-[#f9f5f4] p-4"><h3 class="mb-4 text-sm font-bold text-gray-700">Upcoming Appointments</h3> <div class="space-y-4"><div class="flex items-start justify-between"><div class="flex items-center space-x-2"><img src="https://randomuser.me/api/portraits/men/32.jpg" class="h-8 w-8 rounded-full" alt="Laura"/> <div><p class="text-sm font-semibold">Laura Bennett</p> <p class="text-xs text-gray-500">Acne Treatment · Dr. Emily Ross</p></div></div> <p class="text-xs text-gray-500">24 Sep 2025</p></div> <hr class="border-t border-gray-200"/> <div class="flex items-start justify-between"><div class="flex items-center space-x-2"><img src="https://randomuser.me/api/portraits/men/32.jpg" class="h-8 w-8 rounded-full" alt="Laura"/> <div><p class="text-sm font-semibold">Laura Bennett</p> <p class="text-xs text-gray-500">Acne Treatment · Dr. Emily Ross</p></div></div> <p class="text-xs text-gray-500">24 Sep 2025</p></div> <hr class="border-t border-gray-200"/> <div class="flex items-start justify-between"><div class="flex items-center space-x-2"><img src="https://randomuser.me/api/portraits/men/32.jpg" class="h-8 w-8 rounded-full" alt="Laura"/> <div><p class="text-sm font-semibold">Laura Bennett</p> <p class="text-xs text-gray-500">Acne Treatment · Dr. Emily Ross</p></div></div> <p class="text-xs text-gray-500">24 Sep 2025</p></div></div></div></div></div>`);
  pop();
}
export {
  _page as default
};
