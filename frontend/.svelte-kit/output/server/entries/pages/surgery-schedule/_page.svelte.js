import { K as ensure_array_like, G as escape_html, I as attr, S as maybe_selected, M as attr_class, E as pop, A as push, Q as attr_style } from "../../../chunks/index.js";
import { I as Icon } from "../../../chunks/Icon.js";
function ScheduleNav($$payload, $$props) {
  push();
  let {
    currentView,
    views,
    currentMonth
  } = $$props;
  const each_array_2 = ensure_array_like(views);
  $$payload.out.push(`<div class="relative flex items-center justify-between px-3 py-2 sm:hidden"><div class="flex items-center gap-2"><button class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full text-sm">‹</button> <button class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full text-sm">›</button> <button class="btn-dropdown-color1 rounded-full px-2 py-1 text-xs font-medium text-gray-700">Today</button> <div class="relative"><span class="cursor-pointer text-xs font-medium text-gray-700">${escape_html(currentMonth)}</span> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div> <button class="btn-dropdown-color1 flex h-7 w-7 items-center justify-center rounded-full">⚙️</button></div> <div class="relative hidden px-3 py-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between md:flex-wrap md:px-3 md:py-2 lg:px-4 lg:py-3"><div class="flex flex-wrap items-center gap-1.5 md:gap-2 lg:gap-3"><button class="btn-dropdown-color1 rounded-full px-2 py-0.5 text-[11px] font-medium text-gray-700 md:px-2 md:py-0.5 md:text-xs lg:px-3 lg:py-1 lg:text-sm">Today</button> <button class="btn-dropdown-color1 flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7 lg:h-8 lg:w-8">‹</button> <button class="btn-dropdown-color1 flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7 lg:h-8 lg:w-8">›</button> <div class="relative"><select class="hidden" disabled><option${attr("value", currentMonth)}${maybe_selected($$payload, currentMonth)}>${escape_html(currentMonth)}</option></select> <div class="cursor-pointer rounded-md bg-white px-2 py-1 text-xs font-medium shadow hover:bg-gray-100">${escape_html(currentMonth)}</div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div> <div class="flex flex-wrap items-center gap-1.5 p-1 md:gap-2 lg:gap-3 lg:p-2"><div class="relative"><button class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"><span>Rooms</span> <svg class="ml-1 h-3 w-3 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="relative"><button class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"><span>Doctors</span> <svg class="ml-1 h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="btn-dropdown-color1 flex flex-wrap gap-1 rounded-full px-1 py-0.5"><!--[-->`);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let v = each_array_2[$$index_2];
    $$payload.out.push(`<button${attr_class("rounded-full px-2 py-0.5 text-[11px] font-medium transition md:px-2 md:py-0.5 md:text-xs lg:px-3 lg:py-1 lg:text-sm", void 0, {
      "btn-dropdown-color": currentView === v,
      "text-white": currentView === v,
      "text-gray-700": currentView !== v
    })}>${escape_html(v)}</button>`);
  }
  $$payload.out.push(`<!--]--></div></div></div> <hr class="border-gray-200"/>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  let days;
  let currentDate = /* @__PURE__ */ new Date();
  let currentView = "Week";
  let views = ["Day", "Week", "Month"];
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
  function getWeekDays(date) {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay() + 1);
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return {
        name: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.getDate(),
        fullDate: d,
        iso: d.toISOString().split("T")[0]
      };
    });
  }
  function getMonthDays(date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = (start.getDay() + 6) % 7;
    const totalDays = end.getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(date.getFullYear(), date.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }
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
    return events.filter((e) => e.date === targetDate);
  }
  days = getWeekDays(currentDate);
  getMonthDays(currentDate);
  const each_array = ensure_array_like([
    "Dermatology",
    "Body Contouring",
    "Laser Treatments",
    "Aesthetic Medicine",
    "Plastic Surgery",
    "Cosmetic Surgery",
    "Reconstructive Surgery"
  ]);
  $$payload.out.push(`<div class="bg-[#f9f5f4]">`);
  ScheduleNav($$payload, {
    currentView,
    views,
    currentMonth: currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  });
  $$payload.out.push(`<!----> <div class="overflow-x-auto p-3 sm:p-6"><div class="mb-4 flex flex-wrap gap-2"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let cat = each_array[$$index];
    $$payload.out.push(`<span class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm shadow-sm"><span class="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100">`);
    Icon($$payload, { icon: "mdi:check", class: "h-3 w-3 text-black" });
    $$payload.out.push(`<!----></span> ${escape_html(cat)}</span>`);
  }
  $$payload.out.push(`<!--]--></div> `);
  {
    $$payload.out.push("<!--[-->");
    const each_array_1 = ensure_array_like(days);
    const each_array_2 = ensure_array_like(Array(endHour - startHour + 1).fill(0).map((_, i) => startHour + i));
    const each_array_3 = ensure_array_like(days);
    $$payload.out.push(`<div class="overflow-x-auto rounded-xl bg-white p-3 shadow sm:p-4"><div class="min-w-[900px]"><div class="mb-2 grid grid-cols-[80px_repeat(6,1fr)] text-xs font-semibold sm:text-sm"><div class="p-2 sm:p-3">UTC +1</div> <!--[-->`);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let d = each_array_1[$$index_1];
      $$payload.out.push(`<div class="mx-1 flex flex-col items-center rounded-xl bg-[#f9f5f4] p-2 sm:mx-2 sm:p-3"><span class="text-[11px] text-gray-500">${escape_html(d.name)}</span> <span class="text-lg font-bold sm:text-2xl">${escape_html(d.date)}</span></div>`);
    }
    $$payload.out.push(`<!--]--></div> <br/> <div class="flex gap-2 sm:gap-3"><div class="relative w-[70px] sm:w-[100px]"${attr_style(`height:${totalHeight}px`)}><!--[-->`);
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      let h = each_array_2[i];
      $$payload.out.push(`<div class="absolute w-full border-t border-gray-200 pl-1 text-[10px] sm:pl-2 sm:text-xs"${attr_style(`top:${i * hourHeight}px`)}>${escape_html(h <= 12 ? h : h - 12)}:00 ${escape_html(h < 12 ? "AM" : "PM")}</div>`);
    }
    $$payload.out.push(`<!--]--></div> <div class="flex flex-1 gap-2 sm:gap-3"><!--[-->`);
    for (let $$index_5 = 0, $$length = each_array_3.length; $$index_5 < $$length; $$index_5++) {
      let d = each_array_3[$$index_5];
      const each_array_4 = ensure_array_like(Array(endHour - startHour + 1).fill(0).map((_, i) => i));
      const each_array_5 = ensure_array_like(filterEventsByDate(d.fullDate));
      $$payload.out.push(`<div class="relative flex-1 rounded-md p-1 sm:p-2"${attr_style(`height:${totalHeight}px`)}><!--[-->`);
      for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
        let i = each_array_4[$$index_3];
        $$payload.out.push(`<div class="absolute w-full border-t border-gray-200"${attr_style(`top:${i * hourHeight}px`)}></div>`);
      }
      $$payload.out.push(`<!--]--> <!--[-->`);
      for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
        let e = each_array_5[$$index_4];
        $$payload.out.push(`<div${attr_class(`absolute right-1 left-1 overflow-hidden rounded-lg p-1 text-[10px] break-words shadow-md sm:p-2 sm:text-xs ${e.color}`)}${attr_style(`top:${getTop(e.start)}px; height:${getHeight(e.start, e.end)}px; min-height:40px;`)}><div class="mb-1 flex items-center gap-1 text-[9px] sm:text-[11px]"><span class="h-2 w-2 rounded-full bg-green-500"></span> <span class="truncate font-semibold">${escape_html(e.room)}</span> <span class="text-gray-500">• ${escape_html(e.start)}</span></div> <div class="truncate text-[11px] font-medium sm:text-[13px]">${escape_html(e.doctor)}</div> <div class="truncate text-[9px] text-gray-700 sm:text-[12px]">${escape_html(e.title)}</div></div>`);
      }
      $$payload.out.push(`<!--]--></div>`);
    }
    $$payload.out.push(`<!--]--></div></div> <br/></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}
export {
  _page as default
};
