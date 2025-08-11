import { K as ensure_array_like, I as attr, G as escape_html, F as store_get, M as attr_class, J as unsubscribe_stores, E as pop, A as push, U as bind_props } from "../../../../chunks/index.js";
import { t as treatments } from "../../../../chunks/treatments.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import { d as derived } from "../../../../chunks/index2.js";
import "../../../../chunks/state.svelte.js";
import { p as page } from "../../../../chunks/stores.js";
function SpecialDoctor($$payload) {
  const doctors = [
    {
      name: "Dr. Nora Patel",
      specialty: "Neurologist",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dr. Ethan Nguyen",
      specialty: "Orthopedic Surgeon",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dr. Clara Fischer",
      specialty: "Pediatrician",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
    }
  ];
  const each_array = ensure_array_like(doctors);
  $$payload.out.push(`<div class="py-10"><h2 class="mb-6 text-2xl font-semibold text-gray-900">Meet our specialist</h2> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let doctor = each_array[$$index];
    $$payload.out.push(`<div class="flex sm:flex-col items-center gap-4 rounded-2xl bg-[#faf6f5] p-4 sm:py-10 xl:py-16"><div class="h-15 w-15 lg:h-20 lg:w-20 xl:h-25 xl:w-25 flex-shrink-0 overflow-hidden rounded-xl bg-pink-100"><img${attr("src", doctor.image)}${attr("alt", doctor.name)} class="h-full w-full object-cover"/></div> <div class="flex flex-col"><h3 class="text-sm lg:text-xl font-semibold text-gray-900">${escape_html(doctor.name)}</h3> <p class="text-xs lg:text-lg text-gray-600">${escape_html(doctor.specialty)}</p></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
}
function TreatmentInfo($$payload, $$props) {
  push();
  var $$store_subs;
  const { treatmentTitles } = $$props;
  const treatmentsByType = treatmentTitles.reduce(
    (acc, treatment) => {
      const key = treatment.type === "Non-surgical" ? "Non-Surgical Treatment" : "Surgical Treatment";
      if (!acc[key]) acc[key] = [];
      acc[key].push(treatment);
      return acc;
    },
    {}
  );
  const selectedTreatment = derived(page, ($page) => {
    const id = $page.url.pathname.split("/").pop();
    return treatmentTitles.find((t) => t.id === id);
  });
  const currentPath = derived(page, ($page) => $page.url.pathname);
  const each_array_1 = ensure_array_like(Object.keys(treatmentsByType));
  $$payload.out.push(`<div class="flex items-center justify-between border-b border-gray-200 bg-[#FFFEFC] px-2 py-4"><div class="flex items-center space-x-4">`);
  if (store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment)) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<span class="btn-dropdown-color1 add-text-lg-color inline-block rounded-full px-4 py-2 text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment).type)}</span>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="flex items-center space-x-2"><button class="btn-dropdown-color1 flex h-8 w-8 items-center justify-center rounded-full transition-colors"><svg class="add-text-lg-color h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <button class="btn-dropdown-color1 transition-color btn-dropdown-hover flex h-8 w-8 items-center justify-center rounded-full"><svg class="add-text-lg-color h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div> <div class="flex flex-col bg-[#FFFEFC] px-5 py-3 xl:flex-row"><div class="w-full lg:px-10 xl:w-[80%]">`);
  if (store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment)) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<h1 class="mb-8 text-xl font-medium text-gray-900 md:text-4xl">${escape_html(store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment).title)}</h1> <div class="mb-8 overflow-hidden rounded-2xl"><img${attr("src", store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment).image)}${attr("alt", store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment).title)} class="h-80 w-full object-cover"/></div> <div><h2 class="mb-6 font-semibold text-gray-900 md:text-2xl">About the Treatment</h2> <p class="text-base leading-relaxed font-medium text-gray-600">${escape_html(store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment).about)}</p></div> `);
    if (store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment).process?.length) {
      $$payload.out.push("<!--[-->");
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$selectedTreatment", selectedTreatment).process);
      $$payload.out.push(`<div class="mt-10"><h2 class="mb-6 text-2xl font-semibold text-gray-900">Process</h2> <ul class="list-disc space-y-6"><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let step = each_array[$$index];
        $$payload.out.push(`<li><p class="font-semibold text-gray-800">${escape_html(step.title)} - <span class="text-base font-medium text-gray-600">${escape_html(step.description)}</span></p></li>`);
      }
      $$payload.out.push(`<!--]--></ul></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]-->`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<h1 class="mb-8 text-4xl font-bold text-gray-900">Loading Treatment...</h1> <div class="rounded-2xl p-8 text-center"><div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300"><svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <h3 class="mb-2 text-xl font-semibold text-gray-800">Treatment Information</h3> <p class="text-gray-600">Please select a treatment from the sidebar.</p></div>`);
  }
  $$payload.out.push(`<!--]--> `);
  SpecialDoctor($$payload);
  $$payload.out.push(`<!----></div> <div class="bg flex h-fit flex-col gap-6 rounded-2xl bg-[#faf6f5] p-4 sm:flex-row sm:gap-4 xl:w-[20%] xl:flex-col"><!--[-->`);
  for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
    let category = each_array_1[$$index_2];
    const each_array_2 = ensure_array_like(treatmentsByType[category]);
    $$payload.out.push(`<div class="w-full sm:w-1/2 xl:w-full"><div class="mb-3"><h3 class="text-sm font-semibold text-gray-700 capitalize">${escape_html(category)}</h3></div> <div class="space-y-1 border-l border-gray-200 pl-3"><!--[-->`);
    for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
      let treatment = each_array_2[$$index_1];
      $$payload.out.push(`<button${attr_class("block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50", void 0, {
        "border-l-4": store_get($$store_subs ??= {}, "$currentPath", currentPath).endsWith(`/${treatment.id}`),
        "border-blue-400": store_get($$store_subs ??= {}, "$currentPath", currentPath).endsWith(`/${treatment.id}`),
        "bg-blue-50": store_get($$store_subs ??= {}, "$currentPath", currentPath).endsWith(`/${treatment.id}`),
        "text-blue-700": store_get($$store_subs ??= {}, "$currentPath", currentPath).endsWith(`/${treatment.id}`),
        "text-gray-600": !store_get($$store_subs ??= {}, "$currentPath", currentPath).endsWith(`/${treatment.id}`)
      })}>${escape_html(treatment.title)}</button>`);
    }
    $$payload.out.push(`<!--]--></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  let params = $$props["params"];
  let treatmentId = params.id;
  treatments.find((d) => d.id === treatmentId);
  let treatmentTitles = treatments.map((t) => t.title);
  console.log(treatmentTitles);
  TreatmentInfo($$payload, { treatmentTitles: treatments });
  bind_props($$props, { params });
  pop();
}
export {
  _page as default
};
