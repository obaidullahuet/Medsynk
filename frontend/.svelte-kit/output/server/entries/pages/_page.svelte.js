import "clsx";
import { G as escape_html, E as pop, A as push, K as ensure_array_like, I as attr, Q as attr_style, R as stringify, M as attr_class } from "../../chunks/index.js";
import { I as Icon, h as html } from "../../chunks/Icon.js";
import { Chart, registerables } from "chart.js";
function RevineueGraph($$payload, $$props) {
  push();
  Chart.register(...registerables);
  const totalPatients = 27930;
  $$payload.out.push(`<div class="w-full rounded-2xl bg-white p-4 sm:p-6 md:p-8"><div class="flex items-center justify-between mb-4"><div><h2 class="text-sm font-semibold text-gray-700">Patients by Gender</h2> <p class="text-sm text-gray-500 mt-1">Total Patient</p> <p class="text-xl font-semibold text-gray-800">👤 ${escape_html(totalPatients.toLocaleString())}</p></div> <button class="rounded-xl btn-dropdown-color1 px-3 py-1 text-sm">Last 8 Months</button></div> <div class="h-72"><canvas></canvas></div></div>`);
  pop();
}
function Revenue($$payload, $$props) {
  push();
  Chart.register(...registerables);
  const revenueData = [
    { month: "Jan", income: 6e3, expenses: 2e3 },
    { month: "Feb", income: 6200, expenses: 2100 },
    { month: "Mar", income: 6100, expenses: 2200 },
    { month: "Apr", income: 6300, expenses: 2400 },
    { month: "May", income: 6700, expenses: 2500 },
    { month: "Jun", income: 7150, expenses: 2700 },
    { month: "Jul", income: 7125, expenses: 3100 },
    { month: "Aug", income: 6900, expenses: 2950 },
    { month: "Sep", income: 6400, expenses: 2800 },
    { month: "Oct", income: 6100, expenses: 2750 },
    { month: "Nov", income: 5800, expenses: 2700 },
    { month: "Dec", income: 6e3, expenses: 2650 }
  ];
  revenueData.map((d) => d.income - d.expenses);
  $$payload.out.push(`<div class="rounded-2xl bg-white px-4 py-14 sm:py-16 md:py-18 w-full h-80"><div class="flex items-center justify-between mb-4"><h2 class="text-sm font-semibold text-gray-700">Revenue</h2> <button class="rounded-xl btn-dropdown-color1 px-3 py-1 text-sm">2027</button></div> <canvas></canvas></div>`);
  pop();
}
function PatientOverview($$payload) {
  let totalPatients = 3245;
  const segments = [
    {
      label: "New Patient",
      percent: 45,
      color: "#40C0E5",
      count: 1460,
      radius: 16
    },
    {
      label: "In Treatment",
      percent: 30,
      color: "#D5F4FE",
      count: 974,
      radius: 12
    },
    {
      label: "Recovered",
      percent: 25,
      color: "rgb(229, 231, 235)",
      count: 811,
      radius: 8
    }
  ];
  const fullCircle = 2 * Math.PI;
  const each_array = ensure_array_like(segments);
  const each_array_1 = ensure_array_like(segments);
  $$payload.out.push(`<div class="w-full rounded-2xl bg-white p-6"><div class="flex items-center justify-between"><h2 class="text-sm font-semibold text-gray-700">Patient Overview</h2> <button class="rounded-xl btn-dropdown-color1 px-3 py-1 text-sm">Monthly</button></div> <div class="relative mx-auto my-6 flex h-40 w-40 items-center justify-center"><svg viewBox="0 0 120 120" class="h-full w-full rotate-[-90deg]"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let seg = each_array[$$index];
    $$payload.out.push(`<circle cx="60" cy="60"${attr("r", seg.radius * 3)}${attr("stroke", seg.color)} stroke-opacity="0.2" stroke-width="8" fill="none"></circle><circle cx="60" cy="60"${attr("r", seg.radius * 3)}${attr("stroke", seg.color)} stroke-width="8" fill="none" stroke-linecap="round"${attr("stroke-dasharray", fullCircle * seg.radius * 3)}${attr("stroke-dashoffset", (1 - seg.percent / 100) * fullCircle * seg.radius * 3)}></circle>`);
  }
  $$payload.out.push(`<!--]--></svg></div> <p class="text-xs text-gray-400">Total Patient</p> <p class="text-lg font-semibold text-gray-800">${escape_html(totalPatients.toLocaleString())}</p> <hr class="my-2 border-t border-gray-200"/> <div class="mt-2 space-y-6"><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let seg = each_array_1[$$index_1];
    $$payload.out.push(`<div class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="rounded px-1.5 py-0.5 text-xs font-semibold text-white"${attr_style(`background-color: ${stringify(seg.color)}`)}>${escape_html(seg.percent)}%</span> <span class="text-sm text-gray-700">${escape_html(seg.label)}</span></div> <div class="flex items-center justify-between gap-3"><span class="text-sm text-gray-500">👤</span> <span class="text-sm text-gray-500">${escape_html(seg.count)}</span></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
}
function Patienttreatment($$payload) {
  const segments = [
    {
      label: "Rhinoplasty",
      percent: 45,
      color: "#D5F4FE",
      count: 142
    },
    {
      label: "Rhytidectomy",
      percent: 35,
      color: "#D5F4FE",
      count: 110
    },
    {
      label: "Blepharoplasty",
      percent: 20,
      color: "gray-300",
      count: 63
    }
  ];
  const each_array = ensure_array_like(segments);
  $$payload.out.push(`<div class="w-full rounded-2xl bg-white p-6"><div class="flex items-center justify-between"><h2 class="text-sm font-semibold text-gray-700">Patient by Treatment</h2> <button class="rounded-xl px-3 py-1 text-sm btn-dropdown-color1">Today</button></div> <div class="relative mx-auto my-6 flex h-40 w-40 items-center justify-center"><svg viewBox="0 0 36 36" class="h-full w-full rotate-[-90deg]"><circle class="text-gray-100" stroke-width="3" stroke="currentColor" fill="transparent" r="16" cx="18" cy="18"></circle><circle stroke="#D5F4FE" stroke-width="3" stroke-dasharray="45, 100" stroke-linecap="round" fill="transparent" r="16" cx="18" cy="18"></circle><circle stroke="#40C0E5" stroke-width="3" stroke-dasharray="35, 100" stroke-dashoffset="-45" stroke-linecap="round" fill="transparent" r="16" cx="18" cy="18"></circle><circle stroke="rgb(229, 231, 235)" stroke-width="3" stroke-dasharray="20, 100" stroke-dashoffset="-80" stroke-linecap="round" fill="transparent" r="16" cx="18" cy="18"></circle></svg> <div class="absolute text-center"><p class="text-xs text-gray-400">Total Patient</p> <p class="text-lg font-semibold text-gray-800">315</p></div></div> <div class="mt-2 space-y-6"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let seg = each_array[$$index];
    $$payload.out.push(`<div class="flex items-center justify-between"><div class="flex items-center gap-2"><span${attr_class("h-2 w-2 rounded-full", void 0, {
      "add-btn-lg-color": seg.label === "Rhinoplasty",
      "btn-dropdown-color1": seg.label === "Rhytidectomy",
      "bg-gray-400": seg.label === "Blepharoplasty"
    })}></span> <span class="text-sm text-gray-700">${escape_html(seg.label)}</span></div> <div class="flex items-center justify-between gap-2"><span class="text-sm text-gray-500">👤</span> <span class="text-sm text-gray-500">${escape_html(seg.count)}</span> <span class="text-sm font-semibold text-gray-700">${escape_html(seg.percent)}%</span></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
}
function Patientstatus($$payload) {
  let patients = [
    {
      id: 1,
      patient: "Patient 2",
      treatment: "Treatment 2",
      dateTime: "2024-06-13 12:30 PM",
      status: "Completed"
    },
    {
      id: 2,
      patient: "Sarah Miller",
      treatment: "Facial Rejuvenation Session",
      dateTime: "2024-06-13 11:45 AM",
      status: "Completed"
    },
    {
      id: 3,
      patient: "Maurice Bailey",
      treatment: "Laser Scar Removal",
      dateTime: "2024-06-13 08:15 AM",
      status: "In Progress"
    },
    {
      id: 4,
      patient: "Julia Watson",
      treatment: "Botox Injections 12 units face",
      dateTime: "2024-06-13 02:30 PM",
      status: "Scheduled"
    },
    {
      id: 5,
      patient: "Stephen Hawk",
      treatment: "Microdermabrasion Session",
      dateTime: "2024-06-13 01:15 PM",
      status: "Completed"
    },
    {
      id: 6,
      patient: "Emma Wilson",
      treatment: "Chemical Peel Treatment",
      dateTime: "2024-06-13 03:45 PM",
      status: "In Progress"
    }
  ];
  function getStatusClass(status) {
    switch (status) {
      case "Completed":
        return "add-btn-lg-color";
      case "In Progress":
        return "btn-dropdown-color1";
      case "Scheduled":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  const each_array = ensure_array_like(patients);
  $$payload.out.push(`<div class="rounded-2xl bg-white p-4 sm:p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-base sm:text-lg font-semibold text-gray-900">Patient Status</h2> <button class="text-sm text-gray-900 hover:text-blue-700 font-medium">View All</button></div> <div class="overflow-x-auto"><table class="min-w-full text-sm"><thead><tr class="border-b border-gray-100 whitespace-nowrap"><th class="text-left pb-3 font-medium text-gray-500 pr-6"><div class="flex items-center gap-1">Patient <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></th><th class="text-left pb-3 font-medium text-gray-500 pr-6"><div class="flex items-center gap-1">Treatment <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></th><th class="text-left pb-3 font-medium text-gray-500 pr-6"><div class="flex items-center gap-1">Date &amp; Time <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></th><th class="text-left pb-3 font-medium text-gray-500"><div class="flex items-center gap-1">Status <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></th></tr></thead><tbody><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let patient = each_array[$$index];
    $$payload.out.push(`<tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors whitespace-nowrap"><td class="py-3 pr-6 text-gray-900 font-medium">${escape_html(patient.patient)}</td><td class="py-3 pr-6 text-gray-600 max-w-xs"><div class="truncate"${attr("title", patient.treatment)}>${escape_html(patient.treatment)}</div></td><td class="py-3 pr-6 text-gray-600">${escape_html(patient.dateTime)}</td><td class="py-3"><span${attr_class(`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${stringify(getStatusClass(patient.status))}`)}>${escape_html(patient.status)}</span></td></tr>`);
  }
  $$payload.out.push(`<!--]--></tbody></table></div></div>`);
}
function Populartreatment($$payload, $$props) {
  push();
  const treatments = [
    {
      id: 1,
      name: "Facial Rejuvenation",
      rating: "4.2",
      reviews: "12500"
    },
    {
      id: 2,
      name: "Laser Hair Removal",
      rating: "4.2",
      reviews: "12500"
    },
    {
      id: 3,
      name: "Body Contouring",
      rating: "4.2",
      reviews: "12500"
    },
    {
      id: 4,
      name: "Body Contouring",
      rating: "4.2",
      reviews: "12500"
    },
    {
      id: 5,
      name: "Body Contouring",
      rating: "4.2",
      reviews: "12500"
    },
    {
      id: 6,
      name: "Body Contouring",
      rating: "4.2",
      reviews: "12500"
    }
  ];
  const each_array = ensure_array_like(treatments);
  $$payload.out.push(`<div class="rounded-2xl border border-gray-100 bg-white py-4 px-2"><div class="mb-6"><h2 class="mb-1 text-lg font-semibold text-gray-900">Most Popular Treatments</h2></div> <div class="space-y-2"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let treatment = each_array[$$index];
    $$payload.out.push(`<div class="flex cursor-pointer items-center gap-4 rounded-xl p-2"><div class="flex-shrink-0"><div class="btn-dropdown-color1 flex h-10 w-10 items-center justify-center rounded-xl text-lg">${escape_html(treatment.id.toString().padStart(2, "0"))}</div></div> <div class="min-w-0 flex-1"><h3 class="mt-1 text-sm font-medium text-gray-900">${escape_html(treatment.name)}</h3> <div class="flex items-center justify-between space-x-2"><p class="mt-1 flex items-center text-xs text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mr-1 h-3 w-3 text-yellow-400" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.73z"></path></svg> ${escape_html(treatment.rating)}</p> <p class="mt-1 flex items-center text-xs text-gray-600"><span class="mr-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span> ${escape_html(treatment.reviews)} reviews</p></div></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}
function Cards($$payload) {
  $$payload.out.push(`<div class="grid grid-cols-2 gap-2"><div class="btn-dropdown-color1 flex rounded-2xl p-3"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">`);
  Icon($$payload, { icon: "mdi:currency-usd", class: "h-5 w-5" });
  $$payload.out.push(`<!----></div> <div class="flex flex-col gap-1"><span class="add-text-lg-color text-sm">Earnings</span> <div class="text-lg font-bold text-gray-900">$125,000</div></div></div> <div class="add-btn-lg-color flex rounded-2xl p-3"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">`);
  Icon($$payload, { icon: "mdi:account-group", class: "h-5 w-5" });
  $$payload.out.push(`<!----></div> <div class="flex flex-col gap-1"><span class="add-text-lg-color1 text-sm">Total Patients</span> <div class="text-lg font-bold text-gray-900">315</div></div></div> <div class="add-btn-lg-color flex rounded-2xl p-3"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">`);
  Icon($$payload, { icon: "mdi:calendar-check", class: "h-5 w-5" });
  $$payload.out.push(`<!----></div> <div class="flex flex-col gap-1"><span class="add-text-lg-color1 text-sm">Appointments</span> <div class="text-lg font-bold text-gray-900">250</div></div></div> <div class="btn-dropdown-color1 flex rounded-2xl p-3"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">`);
  Icon($$payload, { icon: "mdi:stethoscope", class: "h-5 w-5" });
  $$payload.out.push(`<!----></div> <div class="flex flex-col gap-1"><span class="add-text-lg-color text-sm">Surgeries</span> <div class="text-lg font-bold text-gray-900">65</div></div></div></div>`);
}
function Calender($$payload) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30]
  ];
  const highlightedDates = [4, 25, 26];
  const each_array = ensure_array_like(days);
  const each_array_1 = ensure_array_like(dates);
  $$payload.out.push(`<div class="rounded-xl bg-white"><div class="mb-4 flex items-center justify-between"><h3 class="text-lg font-semibold text-gray-900">September 2028</h3> <div class="flex space-x-2"><button class="rounded p-1 hover:bg-gray-100"><iconify-icon icon="mdi:chevron-left" class="text-gray-400"></iconify-icon></button> <button class="rounded p-1 hover:bg-gray-100"><iconify-icon icon="mdi:chevron-right" class="text-gray-400"></iconify-icon></button></div></div> <div class="mb-2 grid grid-cols-7 gap-1"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let day = each_array[$$index];
    $$payload.out.push(`<div class="py-2 text-center text-xs font-medium text-gray-500">${escape_html(day)}</div>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="grid grid-cols-7 gap-1"><!--[-->`);
  for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
    let week = each_array_1[$$index_2];
    const each_array_2 = ensure_array_like(week);
    $$payload.out.push(`<!--[-->`);
    for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
      let date = each_array_2[$$index_1];
      $$payload.out.push(`<div class="flex aspect-square items-center justify-center text-sm">`);
      if (date) {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<button${attr_class(`flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 ${stringify(highlightedDates.includes(date) ? "add-btn-lg-color text-white" : "text-gray-700")}`)}>${escape_html(date)}</button>`);
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--></div>`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
}
function Surgeryshedules($$payload) {
  const schedules = [
    {
      id: 1,
      doctor: "Dr. Olivia Grant",
      patient: "Sarah Miller",
      room: "OR 1",
      time: "9:00 AM - 11:30 AM",
      completed: true
    },
    {
      id: 2,
      doctor: "Dr. David Carter",
      patient: "Michael Brown",
      room: "OR 2",
      time: "12:00 PM - 2:00 PM",
      completed: true
    },
    {
      id: 3,
      doctor: "Dr. Emily Ross",
      patient: "Julia Watson",
      room: "OR 3",
      time: "2:30 PM - 4:00 PM",
      completed: false
    },
    {
      id: 4,
      doctor: "Dr. Emily Ross",
      patient: "Julia Watson",
      room: "OR 3",
      time: "2:30 PM - 4:00 PM",
      completed: false
    },
    {
      id: 5,
      doctor: "Dr. Emily Ross",
      patient: "Julia Watson",
      room: "OR 3",
      time: "2:30 PM - 4:00 PM",
      completed: false
    }
  ];
  const each_array = ensure_array_like(schedules);
  $$payload.out.push(`<div class="rounded-2xl py-2 bg-white"><div class="mb-6 flex items-center justify-between"><div><h2 class="mb-1 text-lg font-semibold text-gray-900">Surgery Schedules</h2> <p class="text-sm text-gray-500">Tuesday, 5 Sep 2028</p></div> <button class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"><svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button></div> <div class="space-y-2"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let schedule = each_array[$$index];
    $$payload.out.push(`<div class="flex items-start gap-2 rounded-xl p-2 transition-colors"><div class="mt-1 flex-shrink-0">`);
    if (schedule.completed) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="flex h-5 w-5 items-center justify-center rounded-md add-btn-lg-color"><svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<div class="h-5 w-5 rounded-md border-2 border-gray-300"></div>`);
    }
    $$payload.out.push(`<!--]--></div> <div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><div class="min-w-0 flex-1"><p class="text-sm font-semibold text-gray-900 sm:text-base lg:text-xs whitespace-nowrap xl:text-base">${escape_html(schedule.doctor)}</p> <p class="mt-1 text-xs text-gray-600">${escape_html(schedule.patient)}</p></div> <div class="flex-shrink-0 text-right"><span class="mb-1 inline-block rounded-full btn-dropdown-color1 px-1 py-1 text-xs lg:text-xs font-medium">Room ${escape_html(schedule.room)}</span> <p class="text-xs text-gray-600 sm:text-sm lg:text-xs">${escape_html(schedule.time)}</p></div></div></div></div>`);
  }
  $$payload.out.push(`<!--]--> <button class="rounded-full btn-dropdown-color1 p-3 w-full">View all schedules</button></div></div>`);
}
function Recentactivity($$payload) {
  const activities = [
    {
      id: 1,
      time: "10:15 AM",
      type: "appointment",
      title: "Appointment confirmation",
      description: "Emily Roberts (Receptionist) confirmed Sarah Miller's appointment with Dr. Olivia Grant for Facial Rejuvenation.",
      icon: "calendar",
      iconBg: "add-btn-lg-color"
    },
    {
      id: 2,
      time: "11:00 AM",
      type: "payment",
      title: "Payment processed",
      description: "Laura Jenkins (Accountant) processed the payment for Michael Brown's Laser Hair Removal treatment.",
      icon: "credit-card",
      iconBg: "btn-dropdown-color1"
    },
    {
      id: 3,
      time: "12:30 PM",
      type: "checkin",
      title: "Patient check-in",
      description: "Emily Roberts (Receptionist) checked in Julia Watson for Botox Injections with Dr. Emily Ross.",
      icon: "clipboard-check",
      iconBg: "add-btn-lg-color"
    }
  ];
  const icons = {
    calendar: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
			<line x1="16" y1="2" x2="16" y2="6"></line>
			<line x1="8" y1="2" x2="8" y2="6"></line>
			<line x1="3" y1="10" x2="21" y2="10"></line>
		</svg>`,
    "credit-card": `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
			<line x1="1" y1="10" x2="23" y2="10"></line>
		</svg>`,
    "clipboard-check": `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4"></path>
		</svg>`,
    "check-circle": `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
		</svg>`,
    "calendar-plus": `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
			<line x1="16" y1="2" x2="16" y2="6"></line>
			<line x1="8" y1="2" x2="8" y2="6"></line>
			<line x1="3" y1="10" x2="21" y2="10"></line>
			<line x1="12" y1="14" x2="12" y2="18"></line>
			<line x1="10" y1="16" x2="14" y2="16"></line>
		</svg>`
  };
  const each_array = ensure_array_like(activities);
  $$payload.out.push(`<div class="w-full rounded-2xl"><div class="mb-5 flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2> <button class="text-gray-400 transition-colors hover:text-gray-600"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg></button></div> <div class="space-y-0"><!--[-->`);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let activity = each_array[index];
    $$payload.out.push(`<div class="flex items-start gap-4 py-3"><div class="mt-1 flex-shrink-0"><div${attr_class(`h-7 w-7 rounded-lg ${stringify(activity.iconBg)} flex items-center justify-center ${stringify(activity.iconColor)}`)}>${html(icons[activity.icon])}</div></div> <div class="min-w-0 flex-1 pt-0.5"><div class="flex items-center justify-start gap-2"><span class="text-xs font-medium whitespace-nowrap text-gray-500">${escape_html(activity.time)}</span> <h3 class="mb-0.5 text-xs font-medium text-gray-500">${escape_html(activity.title)}</h3></div> <p class="text-sm leading-4 lg:text-xs text-gray-900">${escape_html(activity.description)}</p></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
}
function _page($$payload, $$props) {
  push();
  (/* @__PURE__ */ new Date()).toLocaleDateString();
  $$payload.out.push(`<div class="rounded-2xl bg-[#f9f5f4] px-2 py-2"><div class="grid grid-cols-1 gap-1 lg:grid-cols-12"><div class="rounded-xl bg-[#f9f5f4] p-2 lg:col-span-9"><div class="grid grid-cols-1 gap-2 lg:grid-cols-6"><div class="space-y-2 lg:col-span-4">`);
  Cards($$payload);
  $$payload.out.push(`<!----> <div>`);
  Revenue($$payload);
  $$payload.out.push(`<!----></div> <div>`);
  RevineueGraph($$payload);
  $$payload.out.push(`<!----></div> <div>`);
  Patientstatus($$payload);
  $$payload.out.push(`<!----></div></div> <div class="space-y-2 lg:col-span-2">`);
  PatientOverview($$payload);
  $$payload.out.push(`<!----> `);
  Patienttreatment($$payload);
  $$payload.out.push(`<!----> `);
  Populartreatment($$payload);
  $$payload.out.push(`<!----></div></div></div> <div class="space-y-5 rounded-2xl bg-white p-2 lg:col-span-3">`);
  Calender($$payload);
  $$payload.out.push(`<!----> `);
  Surgeryshedules($$payload);
  $$payload.out.push(`<!----> `);
  Recentactivity($$payload);
  $$payload.out.push(`<!----></div></div></div>`);
  pop();
}
export {
  _page as default
};
