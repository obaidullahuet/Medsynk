import { K as ensure_array_like, I as attr, G as escape_html, E as pop, A as push, T as spread_props } from "../../../chunks/index.js";
import "clsx";
import { P as Pagination } from "../../../chunks/Pagination.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/state.svelte.js";
import { d as doctors } from "../../../chunks/doctors.js";
function DoctorDetails($$payload, $$props) {
  push();
  let { name, id, specialty, phone, rating, reviews, photo } = $$props;
  const each_array = ensure_array_like(Array(5));
  const each_array_1 = ensure_array_like(Array(5));
  $$payload.out.push(`<div class="block h-full w-full rounded-xl bg-white p-4 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg sm:hidden"><div class="flex gap-4 text-left"><img${attr("src", photo)}${attr("alt", name)} class="h-28 w-24 flex-shrink-0 rounded-xl object-cover"/> <div class="flex-1 overflow-hidden"><h2 class="truncate text-lg font-semibold">${escape_html(name)}</h2> <p class="mt-1 truncate text-sm text-gray-500">${escape_html(id)} • <span class="text-black">${escape_html(specialty)}</span></p> <p class="mt-1 truncate text-sm text-gray-600">📞 ${escape_html(phone)}</p> <div class="mt-3 border-t border-gray-200 pt-2"><div class="flex flex-wrap items-center gap-x-1 text-sm text-gray-700"><div class="flex items-center gap-[1px]"><!--[-->`);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    $$payload.out.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("fill", i < Math.round(rating) ? "#fcd34d" : "none")} viewBox="0 0 24 24" stroke="#fcd34d" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z"></path></svg>`);
  }
  $$payload.out.push(`<!--]--></div> <span>${escape_html(rating)}</span> <span class="text-xs text-gray-500">(${escape_html(reviews.toLocaleString())} reviews)</span></div></div></div></div></div> <div class="hidden h-full w-full cursor-pointer rounded-xl bg-white px-6 py-10 text-center shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_4px_20px_#D5F4FE] sm:block"><img${attr("src", photo)}${attr("alt", name)} class="mx-auto h-24 w-24 rounded-xl object-cover"/> <h2 class="mt-4 text-xl font-semibold">${escape_html(name)}</h2> <p class="text-sm text-gray-500">${escape_html(id)} • <span class="text-black">${escape_html(specialty)}</span></p> <p class="mt-1 text-sm text-gray-600">📞 ${escape_html(phone)}</p> <div class="mt-4 border-t-2 border-solid border-gray-100 pt-4"><div class="flex items-center justify-center gap-1"><!--[-->`);
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    each_array_1[i];
    $$payload.out.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("fill", i < Math.round(rating) ? "#fcd34d" : "none")} viewBox="0 0 24 24" stroke="#fcd34d" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z"></path></svg>`);
  }
  $$payload.out.push(`<!--]--> <span class="ml-2 font-medium text-gray-700">${escape_html(rating)}</span></div> <p class="text-sm text-gray-500">(${escape_html(reviews.toLocaleString())} reviews)</p></div></div>`);
  pop();
}
function DoctorNavbar($$payload, $$props) {
  push();
  $$payload.out.push(`<div class="bg-navbar px-4 py-5"><div class="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-2 md:text-[11px] lg:flex-wrap lg:gap-4 lg:text-sm"><div class="block flex w-full items-center justify-between sm:hidden md:w-auto"><div class="relative w-full max-w-[65%] md:max-w-[55%]"><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><svg class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input type="text" placeholder="Search" class="search-input-color block w-full rounded-full border py-2 pr-4 pl-10 text-xs focus:outline-none md:py-2 md:pl-10 md:text-[11px] lg:text-sm"/></div> <div class="flex gap-1 md:gap-1.5"><button class="btn-dropdown-color1 flex h-9 w-9 items-center justify-center rounded-full shadow-md md:h-9 md:w-9"><svg class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2l-7 7v5l-2 2v-7L3 6V4z"></path></svg></button> <button class="btn-dropdown-color1 flex h-9 w-9 items-center justify-center rounded-full shadow-md md:h-9 md:w-9"><svg class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button></div></div> <div class="hidden w-full sm:flex sm:flex-row sm:items-center md:w-auto md:flex-nowrap md:gap-1.5 md:text-[11px] lg:gap-3 lg:text-sm"><div class="relative w-full sm:w-auto"><button class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-4 py-2.5 text-[11px] sm:w-40 md:w-28 md:px-2.5 md:py-1.5 lg:w-44 lg:px-4 lg:py-2.5 lg:text-sm"><span class="md:text-[10px] lg:text-sm">specialization</span> <svg class="ml-2 h-3 w-3 md:ml-1 md:h-2.5 md:w-2.5 lg:ml-2 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="relative w-full sm:w-auto"><button class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-4 py-2.5 text-[11px] sm:w-32 md:w-20 md:px-2.5 md:py-1.5 lg:w-36 lg:px-4 lg:py-2.5 lg:text-sm"><span class="md:text-[10px] lg:text-sm">status</span> <svg class="ml-2 h-3 w-3 md:ml-1 md:h-2.5 md:w-2.5 lg:ml-2 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div> <div class="hidden w-full sm:flex sm:flex-row sm:items-center md:w-auto md:flex-nowrap md:gap-1.5 md:text-[11px] lg:gap-3 lg:text-sm"><div class="relative w-full sm:w-52 md:w-36"><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 md:pl-2.5 lg:pl-3"><svg class="h-3 w-3 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input type="text" placeholder="Search doctor" class="search-input-color block w-full rounded-full border py-2.5 pr-4 pl-10 text-[11px] focus:outline-none md:py-1.5 md:pr-3 md:pl-8 md:text-[10px] lg:py-2.5 lg:pr-4 lg:pl-10 lg:text-sm"/></div> <button class="add-btn-lg-color inline-flex items-center justify-center rounded-full px-4 py-2.5 text-[11px] font-medium whitespace-nowrap focus:outline-none md:min-w-[70px] md:px-2.5 md:py-1.5 md:text-[10px] lg:min-w-[110px] lg:px-4 lg:py-2.5 lg:text-sm"><svg class="mr-2 h-3 w-3 md:mr-1 md:h-2.5 md:w-2.5 lg:mr-2 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Add Doctors</button></div></div></div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  pop();
}
function _page($$payload, $$props) {
  push();
  let currentPage = 1;
  let itemsPerPage = 12;
  [...new Set(doctors.map((d) => d.specialty))];
  [...new Set(doctors.map((d) => d.status))];
  const filteredDoctors = doctors.filter((d) => {
    const searchMatch = true;
    return searchMatch;
  });
  const totalItems = filteredDoctors.length;
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $$payload.out.push(`<div class="min-h-screen bg-[#f9f5f4] p-4">`);
  DoctorNavbar($$payload);
  $$payload.out.push(`<!----> <div class="px-4 py-4">`);
  if (totalItems > 0) {
    $$payload.out.push("<!--[-->");
    const each_array = ensure_array_like(paginatedDoctors);
    $$payload.out.push(`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let doc = each_array[$$index];
      DoctorDetails($$payload, spread_props([doc]));
    }
    $$payload.out.push(`<!--]--></div> `);
    Pagination($$payload, { currentPage, itemsPerPage, totalItems });
    $$payload.out.push(`<!---->`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<p class="py-4 text-center text-gray-500">No Doctors found for the applied filters.</p>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}
export {
  _page as default
};
