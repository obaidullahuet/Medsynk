import { V as fallback, K as ensure_array_like, G as escape_html, I as attr, M as attr_class, U as bind_props, E as pop, A as push } from "./index.js";
function Pagination($$payload, $$props) {
  push();
  let totalPages, rangeOptions;
  let totalItems = fallback($$props["totalItems"], 48);
  let itemsPerPage = fallback($$props["itemsPerPage"], 12);
  let currentPage = fallback($$props["currentPage"], 1);
  totalPages = Math.ceil(totalItems / itemsPerPage);
  rangeOptions = Array.from({ length: totalPages }, (_, i) => {
    const start = i * itemsPerPage + 1;
    const end = Math.min((i + 1) * itemsPerPage, totalItems);
    return { label: `${start}–${end}`, value: i + 1 };
  });
  const each_array = ensure_array_like(Array(totalPages).fill(0).map((_, i) => i + 1));
  $$payload.out.push(`<div class="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row"><div class="hidden items-center gap-2 text-sm text-gray-700 sm:flex"><span>Showing</span> <span class="inline-block rounded-full btn-dropdown-color1 px-3 py-1 text-sm font-medium text-blue-800 select-none">${escape_html(rangeOptions.find((opt) => opt.value === currentPage)?.label)}</span> <span>out of ${escape_html(totalItems)}</span></div> <div class="flex items-center gap-2"><button class="btn-dropdown-color1 flex h-8 w-8 items-center justify-center rounded-full text-gray-700 disabled:opacity-40"${attr("disabled", currentPage === 1, true)}>&lt;</button> <!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let page = each_array[$$index];
    $$payload.out.push(`<button${attr_class(`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${page === currentPage ? "add-btn-lg-color font-semibold text-white" : "btn-dropdown-color1 text-gray-700"}`)}>${escape_html(page)}</button>`);
  }
  $$payload.out.push(`<!--]--> <button class="btn-dropdown-color1 flex h-8 w-8 items-center justify-center rounded-full text-gray-700 disabled:opacity-40"${attr("disabled", currentPage === totalPages, true)}>></button></div></div>`);
  bind_props($$props, { totalItems, itemsPerPage, currentPage });
  pop();
}
export {
  Pagination as P
};
