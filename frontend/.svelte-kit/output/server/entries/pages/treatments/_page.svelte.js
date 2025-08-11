import { K as ensure_array_like, M as attr_class, G as escape_html, I as attr, E as pop, A as push, R as stringify, T as spread_props } from "../../../chunks/index.js";
import { t as treatments } from "../../../chunks/treatments.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "clsx";
import "../../../chunks/state.svelte.js";
function TreatmentNavbar($$payload, $$props) {
  push();
  let {
    treatmentTypes = [],
    searchTerm = "",
    selectedTreatment = "All Treatments",
    selectedDoctor = "All Doctor",
    selectedSort = "Treatment"
  } = $$props;
  let internalSearchTerm = searchTerm;
  let internalSelectedTreatment = selectedTreatment;
  let internalSelectedDoctor = selectedDoctor;
  let internalSelectedSort = selectedSort;
  const each_array = ensure_array_like(treatmentTypes);
  $$payload.out.push(`<div class="w-full py-4"><div class="flex flex-col-reverse gap-4 bg-[#faf6f5] lg:justify-between xl:flex-row xl:items-center"><div class="btn-dropdown-color1 flex w-fit rounded-full sm:flex-wrap sm:gap-2"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let treatment = each_array[$$index];
    $$payload.out.push(`<button${attr_class(`rounded-full px-2 py-2 whitespace-nowrap transition-all duration-200 sm:font-medium md:px-4 ${stringify(internalSelectedTreatment === treatment ? "add-btn-lg-color text-blue-800" : "btn-dropdown-color1 text-gray-600 hover:bg-gray-50")}`)}>${escape_html(treatment)}</button>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="flex flex-wrap items-center gap-3"><div class="relative flex w-64 flex-1 sm:flex-none"><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input type="text" placeholder="Search treatment"${attr("value", internalSearchTerm)} class="w-full rounded-full bg-white py-2.5 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"/></div> <div class="dropdown-container relative hidden md:flex"><button class="btn-dropdown-color1 flex w-full min-w-[120px] items-center justify-between rounded-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>${escape_html(internalSelectedDoctor)}</span> <svg${attr_class(`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${stringify("")}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="hidden items-center gap-3 md:flex"><span class="text-sm whitespace-nowrap text-gray-600">Sort by:</span> <div class="dropdown-container relative"><button class="btn-dropdown-color1 flex min-w-[100px] items-center justify-between rounded-full border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>${escape_html(internalSelectedSort)}</span> <svg${attr_class(`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${stringify("")}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div>  <button class="add-btn-lg-color rounded-full p-2.5 text-gray-400 transition-colors duration-200 hover:text-gray-600"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path></svg></button></div></div> <div class="mt-4 block sm:hidden"><div class="dropdown-container relative"><button class="btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-4 py-2.5 text-sm text-gray-700"><span>${escape_html(internalSelectedTreatment)}</span> <svg${attr_class(`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${stringify("")}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div></div>`);
  pop();
}
function Treatements($$payload, $$props) {
  push();
  let { id, title, type, description, image, doctors } = $$props;
  $$payload.out.push(`<div class="space-y-4 sm:hidden"><div class="flex cursor-pointer items-start gap-3 rounded-xl bg-transparent p-3 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md"><img${attr("src", image)}${attr("alt", title)} class="h-28 w-24 rounded-lg object-cover"/> <div class="flex-1"><span class="btn-dropdown-color1 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-blue-800">${escape_html(type)}</span> <h2 class="mt-1 text-base font-bold text-gray-900">${escape_html(title)}</h2> <p class="mt-1 line-clamp-2 text-xs text-gray-600">${escape_html(description)}</p> <div class="mt-1 flex items-center gap-1 text-xs text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 2.5-2 4-2 4h4s-2-1.5-2-4m0-4a2 2 0 100 4 2 2 0 000-4zm-6 8v-1a4 4 0 014-4h0a4 4 0 014 4v1M6 21h12"></path></svg> <span>${escape_html(doctors)}</span></div></div></div></div>   <div class="hidden cursor-pointer rounded-2xl bg-transparent p-4 transition-transform hover:scale-[1.03] hover:shadow-lg sm:flex sm:flex-col"><div class="overflow-hidden rounded-2xl"><img${attr("src", image)}${attr("alt", title)} class="h-36 w-full object-cover md:h-40"/></div> <span class="btn-dropdown-color1 mt-3 inline-block w-auto max-w-max rounded-full px-3 py-1 text-sm font-medium text-blue-800">${escape_html(type)}</span> <h2 class="mt-2 text-base font-semibold text-gray-900 md:text-lg">${escape_html(title)}</h2> <p class="mt-1 line-clamp-3 text-xs text-gray-600 md:text-sm">${escape_html(description)}</p> <div class="mt-2 flex items-center gap-1 text-xs text-gray-700 md:mt-3 md:text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 2.5-2 4-2 4h4s-2-1.5-2-4m0-4a2 2 0 100 4 2 2 0 000-4zm-6 8v-1a4 4 0 014-4h0a4 4 0 014 4v1M6 21h12"></path></svg> <span>${escape_html(doctors)}</span></div></div>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  let searchTerm = "";
  let selectedTreatment = "All Treatments";
  let selectedDoctor = "All Doctor";
  let selectedSort = "All Treatments";
  const treatmentTypes = ["All Treatments", ...new Set(treatments.map((t) => t.type))];
  ["All Doctor", ...new Set(treatments.map((t) => t.doctors))];
  ["All Treatments", ...new Set(treatments.map((t) => t.title))];
  const filteredTreatments = () => {
    const filtered = treatments.filter((t) => {
      const titleMatch = selectedSort === "All Treatments";
      return titleMatch;
    });
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  };
  $$payload.out.push(`<div class="min-h-screen bg-[#faf6f5]"><div class="p-4">`);
  TreatmentNavbar($$payload, {
    treatmentTypes,
    searchTerm,
    selectedTreatment,
    selectedDoctor,
    selectedSort
  });
  $$payload.out.push(`<!----></div> <div class="grid grid-cols-1 gap-6 bg-[#faf6f5] p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">`);
  if (filteredTreatments().length > 0) {
    $$payload.out.push("<!--[-->");
    const each_array = ensure_array_like(filteredTreatments());
    $$payload.out.push(`<!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let treatment = each_array[$$index];
      Treatements($$payload, spread_props([treatment]));
    }
    $$payload.out.push(`<!--]-->`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<div class="col-span-full py-12 text-center"><div class="text-lg text-gray-500">No treatments found matching your criteria</div> <p class="mt-2 text-gray-400">Try adjusting your filters or search term</p></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}
export {
  _page as default
};
