import { K as ensure_array_like, I as attr, G as escape_html, M as attr_class, R as stringify, E as pop, A as push } from "../../../../chunks/index.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function _page($$payload, $$props) {
  push();
  let patientData = null;
  let upcomingEvents = [];
  let historyEvents = [];
  let patientNotes = "No notes available for this patient.";
  if (!patientData) {
    patientData = {
      name: "Unknown Patient",
      profileImage: "https://via.placeholder.com/150?text=No+Image",
      hpi: "N/A",
      expiryDate: "N/A",
      status: "N/A",
      age: "N/A",
      gender: "N/A",
      birthday: "N/A",
      idPatient: "N/A"
    };
  }
  let vitals = {
    bodyTemp: { unit: "°C" },
    heartRate: { unit: "BPM" },
    bloodPressure: { unit: "/80 mmHg" },
    respiratory: { unit: "breaths/min" }
  };
  (/* @__PURE__ */ new Date()).toLocaleDateString();
  const each_array = ensure_array_like(patientData.allergies);
  const each_array_1 = ensure_array_like(patientData.medications);
  $$payload.out.push(`<div class="rounded-2xl bg-[#f9f5f4] px-2 py-2"><div class="grid grid-cols-1 gap-2 lg:grid-cols-12"><div class="flex flex-col space-y-2 rounded-2xl bg-white p-2 md:flex-row lg:col-span-3 lg:flex-col"><div class="flex flex-col items-center gap-5 text-center"><img${attr("src", patientData.avatar)} alt="Patient" class="h-20 w-20 rounded-full object-cover"/> <h2 class="text-xl font-semibold text-gray-900">${escape_html(patientData.name)}</h2> <div class="flex space-x-3"><button class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200">`);
  Icon($$payload, { icon: "mdi:calendar", class: "h-5 w-5 text-gray-600" });
  $$payload.out.push(`<!----></button> <button class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200">`);
  Icon($$payload, { icon: "mdi:email-outline", class: "h-5 w-5 text-gray-600" });
  $$payload.out.push(`<!----></button> <button class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200">`);
  Icon($$payload, { icon: "mdi:phone-outline", class: "h-5 w-5 text-gray-600" });
  $$payload.out.push(`<!----></button> <button class="btn-dropdown-color1 rounded-full p-2 transition-colors hover:bg-gray-200">`);
  Icon($$payload, { icon: "lucide:file-text", class: "h-5 w-5 text-gray-600" });
  $$payload.out.push(`<!----></button></div> <div class="btn-dropdown-color1 flex w-full flex-col gap-4 rounded-xl p-4"><div class="flex items-center"><div class="mr-2 flex h-8 w-8 items-center justify-center rounded"><img src="/medSynk-logo.png" alt=""/></div> <span class="add-text-lg-color text-sm font-medium whitespace-nowrap">HealthPlus Insurance</span></div> <div class="flex flex-col items-start"><p class="text-sm font-semibold text-gray-900">${escape_html(patientData.name)}</p> <p class="text-xs text-gray-600">${escape_html(patientData.hpi)}</p></div> <div class="flex items-center justify-between"><div class="flex flex-col"><span class="text-xs text-gray-500">Expiry Date</span> <span class="text-xs">${escape_html(patientData.expiryDate)}</span></div> <span class="add-btn-lg-color add-text-lg-color1 rounded-full px-2 py-1 text-xs">${escape_html(patientData.status)}</span></div></div></div> <div class="rounded-2xl bg-white px-2 py-2 md:px-6 lg:px-2"><div class="mb-2 flex items-center justify-between md:mb-6 lg:mb-2"><h3 class="text-md font-semibold text-gray-900">General Info</h3> `);
  Icon($$payload, {
    icon: "lucide:more-horizontal",
    class: "h-5 w-5 text-gray-400"
  });
  $$payload.out.push(`<!----></div> <div class="flex items-center justify-between"><h3 class="text-xs font-semibold text-gray-500">About patient</h3></div> <div class="space-y-2 text-xs sm:text-sm lg:text-xs"><p class="leading-5 text-gray-700">${escape_html(patientData.about)}</p> <hr class="text-gray-400"/> <div class="space-y-4 md:space-y-2 lg:space-y-1.5"><div class="flex justify-between"><span class="text-gray-500">ID Patient</span> <span class="font-medium text-gray-700">${escape_html(patientData.id)}</span></div> <div class="flex justify-between"><span class="text-gray-500">Gender</span> <span class="font-medium text-gray-700">${escape_html(patientData.gender)}</span></div> <div class="flex justify-between"><span class="text-gray-500">Birthday</span> <span class="font-medium text-gray-700">${escape_html(patientData.birthday)}</span></div> <div class="flex justify-between"><span class="text-gray-500">Age</span> <span class="font-medium text-gray-700">${escape_html(patientData.age)}</span></div></div> <button class="btn-dropdown-color1 flex w-full items-center justify-center rounded-full px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 lg:mt-8 xl:mt-5">Edit Patient Data</button></div></div></div>  <div class="space-y-2 rounded-xl bg-white p-2 lg:col-span-6"><div class="flex items-center justify-between px-2 py-1"><h3 class="text-md font-semibold text-gray-900">Medical Info</h3> `);
  Icon($$payload, {
    icon: "lucide:more-horizontal",
    class: "h-6 w-6 text-gray-400"
  });
  $$payload.out.push(`<!----></div> <div class="flex flex-col gap-2 md:flex-row lg:flex-col"><div class="grid grid-cols-2 gap-2"><div class="btn-dropdown-color1 rounded-2xl p-3 lg:p-6"><div class="mb-2 flex items-center"><div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"><span class="text-md text-white">🌡️</span></div> <span class="add-text-lg-color text-xs font-medium lg:text-lg">Body Temperature</span></div> <div class="text-xl font-bold text-gray-900 lg:text-xl">${escape_html(patientData.bodyTemperature)}<span class="text-sm font-normal text-gray-600">${escape_html(vitals.bodyTemp.unit)}</span></div></div> <div class="add-btn-lg-color rounded-2xl p-3 lg:p-6"><div class="mb-2 flex items-center"><div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"><span class="text-sm text-white">💗</span></div> <span class="add-text-lg-color1 text-sm font-medium lg:text-lg">Heart Rate</span></div> <div class="text-xl font-bold text-gray-900 lg:text-xl">${escape_html(patientData.heartRate)}<span class="text-sm font-normal text-gray-600">${escape_html(vitals.heartRate.unit)}</span></div></div> <div class="add-btn-lg-color rounded-2xl p-3 lg:p-6"><div class="mb-2 flex items-center"><div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"><span class="text-sm text-white">💧</span></div> <span class="add-text-lg-color1 text-sm font-medium lg:text-lg">Blood Pressure</span></div> <div class="text-xl leading-2 font-bold text-gray-900 lg:text-xl">${escape_html(patientData.bloodPressure)}<span class="text-sm font-normal text-gray-600">${escape_html(vitals.bloodPressure.unit)}</span></div></div> <div class="btn-dropdown-color1 rounded-2xl p-3 lg:p-6"><div class="mb-2 flex items-center"><div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"><span class="text-sm text-white">🫁</span></div> <span class="font-xs add-text-lg-color text-sm lg:text-lg">Respiratory</span></div> <div class="text-xl leading-2 font-bold text-gray-900 lg:text-xl">${escape_html(patientData.respiratory)}<span class="text-sm font-normal text-gray-600">${escape_html(vitals.respiratory.unit)}</span></div></div></div>  <div class="flex gap-2 sm:grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"><div class="rounded-2xl bg-white p-3"><h3 class="mb-4 text-sm font-semibold text-gray-500">Allergies</h3> <ul class="space-y-1 text-xs"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let allergy = each_array[$$index];
    $$payload.out.push(`<li class="flex items-center"><div class="mr-3 h-1 w-1 rounded-full bg-black"></div> <span class="text-gray-700">${escape_html(allergy)}</span></li>`);
  }
  $$payload.out.push(`<!--]--></ul></div> <div class="rounded-2xl bg-white p-2"><h3 class="mb-4 text-sm font-semibold text-gray-500">Medications</h3> <ul class="space-y-2 text-xs"><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let med = each_array_1[$$index_1];
    $$payload.out.push(`<li class="flex items-center"><div class="mr-3 h-1 w-1 rounded-full bg-black"></div> <span class="leading-3 text-gray-700">${escape_html(med)}</span></li>`);
  }
  $$payload.out.push(`<!--]--></ul></div></div></div> <div class="grid grid-cols-1 gap-2 md:grid-cols-2"><div class="rounded-2xl bg-white p-3"><div class="mb-4 flex items-center justify-between"><h3 class="text-md font-semibold text-gray-900">Contact Person</h3> `);
  Icon($$payload, {
    icon: "lucide:more-horizontal",
    class: "h-5 w-5 text-gray-400"
  });
  $$payload.out.push(`<!----></div> <div class="space-y-4 text-xs"><div class="flex items-center">`);
  Icon($$payload, { icon: "lucide:phone", class: "mr-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <div><p class="text-sm text-gray-500">Phone</p> <p class="font-medium text-gray-800">${escape_html(patientData.phone)}</p></div></div> <div class="flex items-center">`);
  Icon($$payload, { icon: "lucide:map-pin", class: "mr-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <div><p class="text-sm text-gray-500">Address</p> <p class="font-medium text-gray-800">${escape_html(patientData.address)}</p></div></div> <div class="flex items-center">`);
  Icon($$payload, { icon: "lucide:mail", class: "mr-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <div><p class="text-sm text-gray-500">Email</p> <p class="font-medium text-gray-800">${escape_html(patientData.email)}</p></div></div> <div class="flex items-center">`);
  Icon($$payload, {
    icon: "lucide:alert-triangle",
    class: "mr-3 h-5 w-5 text-gray-400"
  });
  $$payload.out.push(`<!----> <div><p class="text-sm text-gray-500">Emergency Contact</p> <p class="font-medium text-gray-800">${escape_html(patientData.emergencyContact)}</p></div></div></div></div> <div class="rounded-2xl bg-white p-3"><div class="mb-4 flex items-center justify-between"><h3 class="text-md font-semibold text-gray-900">Health Report</h3> `);
  Icon($$payload, {
    icon: "lucide:more-horizontal",
    class: "h-5 w-5 text-gray-400"
  });
  $$payload.out.push(`<!----></div> <div class="space-y-4 text-xs lg:space-y-6"><div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2"><div class="flex items-center">`);
  Icon($$payload, { icon: "lucide:file-text", class: "mr-3 h-5 w-5 text-red-500" });
  $$payload.out.push(`<!----> <div><p class="text-xs font-medium text-gray-800">Skin Test Report</p> <p class="text-xs text-gray-500">PDF • 1 MB</p></div></div></div> <div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2"><div class="flex items-center">`);
  Icon($$payload, { icon: "lucide:file-text", class: "mr-3 h-5 w-5 text-red-500" });
  $$payload.out.push(`<!----> <div><p class="text-xs font-medium text-gray-800">Laser Hair Removal Pre-treatm...</p> <p class="text-xs text-gray-500">PDF • 500 KB</p></div></div></div> <div class="flex items-center justify-between rounded-2xl bg-[#f9f5f4] p-2"><div class="flex items-center">`);
  Icon($$payload, { icon: "lucide:file-text", class: "mr-3 h-5 w-5 text-red-500" });
  $$payload.out.push(`<!----> <div><p class="text-xs font-medium text-gray-800">Laser Hair Removal Pre-treatm...</p> <p class="text-xs text-gray-500">PDF • 500 KB</p></div></div></div></div></div></div></div> <div class="space-y-1 rounded-2xl bg-white p-2 lg:col-span-3"><div class="flex items-center justify-between rounded-2xl px-2 py-1"><h3 class="text-md font-semibold text-gray-900">Treatment</h3> `);
  Icon($$payload, {
    icon: "lucide:more-horizontal",
    class: "h-6 w-6 text-gray-400"
  });
  $$payload.out.push(`<!----></div> <div class="grid gap-2 md:grid md:grid-cols-3 lg:grid-cols-1"><div class="rounded-2xl bg-white lg:text-center"><div class="rounded-2xl bg-[#f9f5f4] p-2"><img${attr("src", patientData.doctorAvatar)} alt="Doctor" class="mb-3 h-16 w-16 rounded-full object-cover lg:mx-auto"/> <h3 class="font-semibold text-gray-900">${escape_html(patientData.doctor)}</h3></div> <div class="rounded-2xl bg-white py-2 text-start"><h3 class="text-md mb-2 font-semibold text-gray-900">Upcoming</h3> `);
  if (upcomingEvents.length > 0) {
    $$payload.out.push("<!--[-->");
    const each_array_2 = ensure_array_like(upcomingEvents);
    $$payload.out.push(`<!--[-->`);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let event = each_array_2[$$index_2];
      $$payload.out.push(`<div class="space-y-2 rounded-2xl bg-[#f9f5f4] p-2"><div class="flex items-center"><div class="mr-3 h-3 w-3 rounded-full bg-red-400"></div> <span class="text-xs font-medium text-red-600">${escape_html(event.status)}</span></div> <div class="px-6"><h4 class="text-xs font-semibold text-gray-900">${escape_html(event.title)}</h4> <div class="mt-1 flex items-center text-xs text-gray-500">`);
      Icon($$payload, { icon: "lucide:calendar", class: "mr-1 h-4 w-4" });
      $$payload.out.push(`<!----> <span>${escape_html(event.date)} - ${escape_html(event.start)}</span></div></div></div>`);
    }
    $$payload.out.push(`<!--]-->`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<p class="text-xs text-gray-500">No upcoming scheduled appointments.</p>`);
  }
  $$payload.out.push(`<!--]--></div></div> <div class="rounded-2xl bg-white"><h3 class="text-md mb-2 font-semibold text-gray-900">History</h3> `);
  if (historyEvents.length > 0) {
    $$payload.out.push("<!--[-->");
    const each_array_3 = ensure_array_like(historyEvents);
    $$payload.out.push(`<div class="space-y-3"><!--[-->`);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let event = each_array_3[$$index_3];
      $$payload.out.push(`<div class="rounded-2xl bg-[#f9f5f4] p-3"><div class="flex items-center p-1"><div${attr_class(`mr-3 h-3 w-3 rounded-full ${stringify(event.status === "Completed" ? "bg-green-400" : "bg-gray-400")}`)}></div> <span${attr_class(`text-xs font-medium ${stringify(event.status === "Completed" ? "text-green-600" : "text-gray-600")}`)}>${escape_html(event.status)}</span></div> <div class="px-6"><h4 class="text-xs font-semibold text-gray-900">${escape_html(event.title)}</h4> <div class="mt-1 flex items-center text-sm text-gray-500">`);
      Icon($$payload, { icon: "lucide:calendar", class: "mr-1 h-4 w-4" });
      $$payload.out.push(`<!----> <span class="text-xs">${escape_html(event.date)} - ${escape_html(event.start)}</span></div></div></div>`);
    }
    $$payload.out.push(`<!--]--></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<p class="p-2 text-xs text-gray-500">No past events found for this patient.</p>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="rounded-2xl"><h3 class="text-md mb-1 font-medium text-gray-900">Notes</h3> <div class="rounded-2xl bg-[#f9f5f4] p-3 lg:space-y-1 lg:p-3.5 xl:space-y-1 xl:p-3"><div class="text-sm text-gray-500">2028/09/12 - 12:00 PM</div> <p class="text-sm leading-relaxed text-gray-700">${escape_html(patientNotes)}</p></div></div></div></div></div></div>`);
  pop();
}
export {
  _page as default
};
