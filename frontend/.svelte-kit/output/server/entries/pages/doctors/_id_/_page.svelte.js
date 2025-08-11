import { K as ensure_array_like, I as attr, G as escape_html, M as attr_class, R as stringify, E as pop, A as push, U as bind_props } from "../../../../chunks/index.js";
import { d as doctors } from "../../../../chunks/doctors.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { Chart, registerables } from "chart.js";
function DoctorProfile($$payload, $$props) {
  push();
  let { doctor } = $$props;
  Chart.register(...registerables);
  const chartData = [
    { date: "15 Sep", newPatient: 30, recovered: 70 },
    { date: "16 Sep", newPatient: 10, recovered: 60 },
    { date: "17 Sep", newPatient: 80, recovered: 50 },
    { date: "18 Sep", newPatient: 20, recovered: 40 },
    { date: "19 Sep", newPatient: 80, recovered: 30 }
  ];
  chartData.map((d) => d.date);
  [
    {
      label: "New Patients",
      data: chartData.map((d) => d.newPatient),
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderRadius: 6,
      stack: "Stack 0"
    },
    {
      label: "Recovered",
      data: chartData.map((d) => d.recovered),
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderRadius: 6,
      stack: "Stack 1"
    }
  ];
  const stats = [
    {
      title: "Total Patients",
      value: 2150,
      change: 2.45,
      positive: true
    },
    {
      title: "Consultations",
      value: 1780,
      change: 1.98,
      positive: false
    },
    { title: "Surgeries", value: 250, change: 3.82, positive: true }
  ];
  const schedule = [
    {
      name: "Sarah Miller",
      treatment: "Facial Rejuvenation",
      date: "Tuesday, 12 Sep",
      // time: '9am',
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Claire Thompson",
      treatment: "Lip Fillers",
      date: "Friday, 14 Sep",
      // time: '10pm',
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Hannah Lee",
      treatment: "Acne Treatment",
      date: "Friday, 15 Sep",
      // time: '2am',
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Ethan Hughes",
      treatment: "Tattoo Removal",
      date: "Friday, 16 Sep",
      // time: '11pm',
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Miller",
      treatment: "Facial Rejuvenation",
      date: "Tuesday, 12 Sep",
      // time: '9am',
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Claire Thompson",
      treatment: "Lip Fillers",
      date: "Friday, 14 Sep",
      // time: '10pm',
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Miller",
      treatment: "Facial Rejuvenation",
      date: "Tuesday, 12 Sep",
      // time: '9am',
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Claire Thompson",
      treatment: "Lip Fillers",
      date: "Friday, 14 Sep",
      // time: '10am',
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Hannah Lee",
      treatment: "Acne Treatment",
      date: "Friday, 15 Sep",
      // time: '2pm',
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];
  const rowsToShow = 5;
  const patients = [
    {
      id: "PB-001",
      name: "Sarah Miller",
      datetime: "2028-09-12, 9:00 AM",
      treatment: "Facial Rejuvenation",
      report: "Skin improving well",
      status: "Completed"
    },
    {
      id: "PB-008",
      name: "Claire Thompson",
      datetime: "2028-09-14, 10:00 AM",
      treatment: "Lip Fillers",
      report: "Slight swelling observed",
      status: "Scheduled"
    },
    {
      id: "PB-009",
      name: "Ethan Hughes",
      datetime: "2028-09-15, 2:00 PM",
      treatment: "Tattoo Removal",
      report: "Healing as expected",
      status: "InProgress"
    },
    {
      id: "PB-010",
      name: "Hannah Lee",
      datetime: "2028-09-16, 11:00 AM",
      treatment: "Acne Treatment",
      report: "Skin sensitivity noted",
      status: "Completed"
    },
    {
      id: "PB-008",
      name: "Claire Thompson",
      datetime: "2028-09-14, 10:00 AM",
      treatment: "Lip Fillers",
      report: "Slight swelling observed",
      status: "Scheduled"
    },
    {
      id: "PB-009",
      name: "Ethan Hughes",
      datetime: "2028-09-15, 2:00 PM",
      treatment: "Tattoo Removal",
      report: "Healing as expected",
      status: "InProgress"
    },
    {
      id: "PB-010",
      name: "Hannah Lee",
      datetime: "2028-09-16, 11:00 AM",
      treatment: "Acne Treatment",
      report: "Skin sensitivity noted",
      status: "Completed"
    },
    {
      id: "PB-008",
      name: "Claire Thompson",
      datetime: "2028-09-14, 10:00 AM",
      treatment: "Lip Fillers",
      report: "Slight swelling observed",
      status: "Scheduled"
    },
    {
      id: "PB-009",
      name: "Ethan Hughes",
      datetime: "2028-09-15, 2:00 PM",
      treatment: "Tattoo Removal",
      report: "Healing as expected",
      status: "InProgress"
    },
    {
      id: "PB-010",
      name: "Hannah Lee",
      datetime: "2028-09-16, 11:00 AM",
      treatment: "Acne Treatment",
      report: "Skin sensitivity noted",
      status: "Completed"
    },
    {
      id: "PB-008",
      name: "Claire Thompson",
      datetime: "2028-09-14, 10:00 AM",
      treatment: "Lip Fillers",
      report: "Slight swelling observed",
      status: "Scheduled"
    },
    {
      id: "PB-009",
      name: "Ethan Hughes",
      datetime: "2028-09-15, 2:00 PM",
      treatment: "Tattoo Removal",
      report: "Healing as expected",
      status: "InProgress"
    },
    {
      id: "PB-010",
      name: "Hannah Lee",
      datetime: "2028-09-16, 11:00 AM",
      treatment: "Acne Treatment",
      report: "Skin sensitivity noted",
      status: "Completed"
    }
  ];
  const reviewsToShow = 3;
  let currentIndex = 0;
  const reviews = [
    {
      name: "Sarah Miller",
      rating: 5,
      text: "Dr. Olivia is amazing! My skin feels rejuvenated and looks better than ever.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Claire Thompson",
      rating: 4,
      text: "Great experience, though some swelling post-treatment. Dr. Grant was very attentive.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Ethan Hughes",
      rating: 5,
      text: "Excellent service! The tattoo removal process was smooth and professional.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Sarah Miller",
      rating: 5,
      text: "Dr. Olivia is amazing! My skin feels rejuvenated and looks better than ever.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Claire Thompson",
      rating: 4,
      text: "Great experience, though some swelling post-treatment. Dr. Grant was very attentive.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Ethan Hughes",
      rating: 5,
      text: "Excellent service! The tattoo removal process was smooth and professional.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];
  const each_array = ensure_array_like(doctor.experiences);
  const each_array_1 = ensure_array_like(stats);
  const each_array_2 = ensure_array_like(schedule);
  const each_array_3 = ensure_array_like(patients.slice(0, rowsToShow));
  $$payload.out.push(`<div class="flex min-h-screen flex-col gap-4 p-2 text-gray-800 bg-[#f9f5f4] sm:gap-6 sm:p-4"><div class="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-12"><div class="xl:col-span-3"><div class="relative rounded-lg bg-gradient-to-b from-white to-gray-50 p-4 transition-shadow duration-300 hover:shadow-2xl sm:p-6 lg:rounded-2xl lg:shadow-lg xl:sticky xl:top-4"><div class="flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-gray-300 lg:flex-col lg:divide-x-0"><div class="flex flex-col items-center md:w-1/3 md:items-start md:pr-4 lg:w-full lg:items-center lg:pr-0"><div class="relative"><img class="mx-auto h-20 w-20 rounded-full shadow-md ring-4 ring-white sm:h-24 sm:w-24"${attr("src", doctor.photo)}${attr("alt", doctor.name)}/> <span class="absolute right-1 bottom-1 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span></div> <h2 class="mt-3 text-center text-lg font-extrabold text-gray-800 sm:text-xl md:text-lg lg:text-center lg:text-2xl">${escape_html(doctor.name)}</h2> <p class="text-center text-xs font-medium text-gray-500 sm:text-sm md:text-left lg:text-center">${escape_html(doctor.id)} • <span class="text-xs font-medium text-black sm:text-sm">${escape_html(doctor.specialty)}</span></p></div> <div class="mt-4 flex flex-col md:mt-0 md:w-1/3 md:px-4 lg:mt-4 lg:w-full lg:px-0"><div class="pt-3"><h3 class="flex items-center gap-2 text-base font-semibold text-gray-700 sm:text-lg">About</h3> <p class="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">${escape_html(doctor.about)}</p></div></div> <div class="mt-4 flex flex-col md:mt-0 md:w-1/3 md:pl-4 lg:mt-4 lg:w-full lg:pl-0"><div class="pt-3"><h3 class="flex items-center gap-2 text-base font-semibold text-gray-700 sm:text-lg">Contact Info</h3> <div class="mt-2 space-y-2"><p class="flex items-center gap-2 text-xs text-gray-700 sm:text-sm">📞 <span class="truncate">${escape_html(doctor.phone)}</span></p> <p class="flex items-center gap-2 text-xs text-gray-700 sm:text-sm">📧 <span class="truncate">${escape_html(doctor.email)}</span></p> <p class="flex items-center gap-2 text-xs text-gray-700 sm:text-sm">📍 <span class="truncate">${escape_html(doctor.address)}</span></p></div></div></div></div> <div class="mt-4 py-4 sm:mt-5 md:mt-6 lg:mt-4"><div class="border-t border-gray-300 pt-3 sm:pt-4"><h3 class="flex items-center gap-2 text-base font-semibold text-gray-700 sm:text-lg"><svg class="add-text-lg-color h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg> Experiences</h3> <ul class="mt-2 flex flex-col gap-3 sm:mt-3 md:flex-row md:flex-wrap md:gap-4 lg:flex-col"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let exp = each_array[$$index];
    $$payload.out.push(`<li class="min-w-[200px] flex-1 rounded-lg border border-gray-200 bg-gray-50 p-2 shadow-sm sm:p-3"><p class="text-sm font-semibold text-gray-800 sm:text-base">${escape_html(exp.role)}</p> <p class="add-text-lg-color text-xs font-medium sm:text-sm">${escape_html(exp.place)}</p> <p class="text-xs text-gray-500 sm:text-sm">${escape_html(exp.years)}</p></li>`);
  }
  $$payload.out.push(`<!--]--></ul></div></div></div></div> <div class="flex flex-col gap-4 sm:gap-6 xl:col-span-9"><div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-4"><div class="flex flex-col gap-4 sm:gap-6 lg:col-span-3"><div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:flex md:flex-row md:flex-wrap md:gap-3 lg:grid-cols-3"><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let s = each_array_1[$$index_1];
    $$payload.out.push(`<div class="btn-dropdown-color1 flex min-h-[120px] w-full flex-col justify-between rounded-xl p-3 shadow sm:p-4 md:w-auto md:flex-1 md:p-3"><div class="flex items-center gap-2"><span class="rounded-lg bg-white p-1 shadow-sm">`);
    Icon($$payload, { icon: "mdi:stethoscope", class: "h-5 w-5" });
    $$payload.out.push(`<!----></span> <h4 class="text-xs font-medium text-gray-500">${escape_html(s.title)}</h4></div> <div class="mt-3 flex w-full items-center justify-between"><p class="text-lg font-bold sm:text-xl lg:text-2xl">${escape_html(s.value)}</p> <span${attr_class(`text-xs ${stringify(s.positive ? "add-text-lg-color" : "text-red-500")} rounded-xl bg-white p-1 shadow-sm`)}>${escape_html(s.positive ? "▲" : "▼")}
										${escape_html(s.change)}%</span></div></div>`);
  }
  $$payload.out.push(`<!--]--></div>  <div class="w-full rounded-2xl bg-white p-4 shadow-md sm:p-6 md:p-8"><canvas class="h-full w-full"></canvas></div></div>  <div class="lg:col-span-1"><div class="flex flex-col rounded-lg bg-white shadow-sm lg:sticky lg:top-4 lg:rounded-lg lg:shadow-md"><div class="flex-shrink-0 border-b border-gray-100 p-2 sm:p-3 lg:p-2"><h3 class="text-xs font-bold sm:text-sm lg:text-xs xl:text-sm">Schedule</h3></div> <div class="grid grid-cols-1 gap-2 p-2 pt-1 sm:grid-cols-2 sm:gap-3 sm:p-3 sm:pt-1 md:grid-cols-2 md:gap-3 md:p-3 lg:max-h-[420px] lg:grid-cols-1 lg:gap-2 lg:overflow-y-auto lg:px-2 xl:max-h-[500px] xl:overflow-y-auto"><!--[-->`);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let s = each_array_2[$$index_2];
    $$payload.out.push(`<div class="flex items-center gap-2 rounded-md bg-gray-50/50 p-2 transition hover:bg-gray-100 sm:gap-2 sm:p-2.5 lg:gap-2 lg:p-2.5"><img class="h-7 w-7 flex-shrink-0 rounded-full sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-9 lg:w-9"${attr("src", s.avatar)}${attr("alt", s.name)}/> <div class="min-w-0 flex-1 leading-tight"><p class="inline-block rounded-full bg-green-100 px-1.5 py-0.5 text-[7px] font-medium text-green-700 sm:text-[7.5px] md:text-[8px] lg:text-[8px] xl:text-[8.5px]">${escape_html(s.date)}</p> <div class="mt-1"><p class="truncate text-[11px] font-medium sm:text-xs md:text-[12px] lg:text-[12px] xl:text-[13px]">${escape_html(s.name)}</p> <p class="truncate text-[9px] text-gray-500 sm:text-[10px] md:text-[10px] lg:text-[10px] xl:text-[11px]">${escape_html(s.treatment)}</p></div></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div></div></div> <div class="w-full overflow-x-auto bg-white p-4 sm:p-6 lg:rounded-2xl lg:p-8 lg:shadow-lg"><div class="mb-3 flex items-center justify-between sm:mb-4"><h3 class="text-lg font-bold text-gray-800 sm:text-xl">All Patients</h3> <button class="btn-dropdown-color1 rounded-lg px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 sm:px-4 sm:py-1.5 sm:text-sm">${escape_html("View All")}</button></div> <div class="overflow-x-auto"><table class="w-full min-w-[600px] border-collapse text-xs sm:min-w-[700px] sm:text-sm"><thead><tr class="text-left text-gray-300"><th class="p-2 sm:p-3">ID</th><th class="p-2 sm:p-3">Name</th><th class="p-2 sm:p-3">Date &amp; Time</th><th class="p-2 sm:p-3">Treatment</th><th class="p-2 sm:p-3">Report</th><th class="p-2 sm:p-3">Status</th></tr></thead><tbody><!--[-->`);
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let p = each_array_3[$$index_3];
    $$payload.out.push(`<tr class="border-t border-gray-200 transition hover:bg-gray-50"><td class="p-2 font-medium sm:p-3">${escape_html(p.id)}</td><td class="p-2 sm:p-3">${escape_html(p.name)}</td><td class="p-2 text-gray-600 sm:p-3">${escape_html(p.datetime)}</td><td class="p-2 sm:p-3">${escape_html(p.treatment)}</td><td class="sm:p-3">${escape_html(p.report)}</td><td class="p-2 sm:p-3"><span${attr_class(`rounded-xl px-1 py-1 text-xs font-medium sm:px-2 ${stringify(p.status === "Completed" ? "bg-green-100" : p.status === "Scheduled" ? "bg-yellow-100" : "bg-blue-100")}`)}>${escape_html(p.status)}</span></td></tr>`);
  }
  $$payload.out.push(`<!--]--></tbody></table></div></div> <div><div class="mb-3 flex items-center justify-between sm:mb-4"><h3 class="text-lg font-bold sm:text-xl">Patient's Reviews</h3> <div class="flex items-center gap-2"><button class="btn-dropdown-color1 rounded-lg px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 sm:px-4 sm:py-1.5 sm:text-sm">${escape_html("View All")}</button> <button class="btn-dropdown-color flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 sm:h-8 sm:w-8">&lt;</button> <button class="btn-dropdown-color flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 sm:h-8 sm:w-8">></button></div></div> <div class="flex gap-3 overflow-x-auto pb-2 sm:gap-4">`);
  {
    $$payload.out.push("<!--[!-->");
    const each_array_5 = ensure_array_like(reviews.slice(currentIndex, currentIndex + reviewsToShow));
    $$payload.out.push(`<!--[-->`);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let r = each_array_5[$$index_5];
      $$payload.out.push(`<div class="min-w-[220px] rounded-lg bg-gray-50 p-3 shadow-sm sm:min-w-[250px] sm:p-4"><div class="mb-2 flex items-center justify-between"><div class="flex items-center gap-2"><img${attr("src", r.avatar)}${attr("alt", r.name)} class="h-10 w-10 rounded-full shadow-sm ring-1 ring-gray-200 sm:h-12 sm:w-12"/> <h4 class="text-sm font-semibold sm:text-base">${escape_html(r.name)}</h4></div> <p class="text-sm text-yellow-500 sm:text-base">${escape_html("★".repeat(r.rating))}</p></div> <hr class="mb-2 border-gray-200"/> <p class="text-xs text-gray-600 sm:text-sm">${escape_html(r.text)}</p></div>`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div></div></div></div></div>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  let params = $$props["params"];
  let doctorId = params.id;
  let doctor = doctors.find((d) => d.id === doctorId);
  DoctorProfile($$payload, { doctor });
  bind_props($$props, { params });
  pop();
}
export {
  _page as default
};
