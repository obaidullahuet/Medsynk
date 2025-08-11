import { K as ensure_array_like, M as attr_class, G as escape_html, I as attr, E as pop, A as push } from "../../../chunks/index.js";
import "flatpickr";
/* empty css                            */
import { P as Pagination } from "../../../chunks/Pagination.js";
function PaymentInvoice($$payload) {
  let stats = [
    {
      title: "Total Invoice",
      value: 815,
      change: "+2.45%",
      up: true,
      bg: "btn-dropdown-color",
      line: "bg-white"
    },
    {
      title: "Paid Invoice",
      value: 430,
      change: "+3.68%",
      up: true,
      bg: "btn-dropdown-color1",
      line: "bg-white"
    },
    {
      title: "Pending",
      value: 205,
      change: "-1.20%",
      up: false,
      bg: "btn-dropdown-color",
      line: "bg-white"
    },
    {
      title: "Overdue",
      value: 180,
      change: "+0.84%",
      up: true,
      bg: "btn-dropdown-color1",
      line: "bg-white"
    }
  ];
  const each_array = ensure_array_like(stats);
  $$payload.out.push(`<div class="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let s = each_array[$$index];
    $$payload.out.push(`<div${attr_class(`rounded-2xl p-3 sm:p-2 md:p-4 ${s.bg}`)}><div class="hidden h-full w-full md:flex lg:hidden"><div${attr_class(`hidden h-8 w-1 rounded md:block md:h-14 ${s.line}`)}></div> <div class="flex w-full flex-col items-end pl-3"><h3 class="text-[10px] font-medium text-gray-700">${escape_html(s.title)}</h3> <p class="text-sm font-bold text-gray-900 md:text-base">${escape_html(s.value)}</p> <span class="mt-1 flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-medium shadow">`);
    if (s.up) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<svg class="h-2.5 w-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7"></path></svg>`);
    } else {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<svg class="h-2.5 w-2.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7"></path></svg>`);
    }
    $$payload.out.push(`<!--]--> ${escape_html(s.change)}</span> <span class="mt-0.5 text-[7px] text-gray-500">vs last month</span></div></div> <div class="flex w-full items-center justify-between md:hidden lg:flex"><div class="flex items-center gap-2 sm:justify-start sm:gap-1"><div${attr_class(`hidden h-8 w-1 rounded md:block ${s.line}`)}></div> <div class="sm:flex sm:flex-col sm:items-start"><h3 class="text-[11px] font-medium text-gray-700 sm:text-[10px] lg:text-sm">${escape_html(s.title)}</h3> <p class="text-lg font-bold text-gray-900 sm:text-base lg:text-xl">${escape_html(s.value)}</p></div></div> <div class="flex flex-col items-end sm:items-end"><span class="flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-medium shadow sm:text-[8px] lg:text-[10px]">`);
    if (s.up) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<svg class="h-2.5 w-2.5 text-green-600 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7"></path></svg>`);
    } else {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<svg class="h-2.5 w-2.5 text-red-600 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7"></path></svg>`);
    }
    $$payload.out.push(`<!--]--> ${escape_html(s.change)}</span> <span class="mt-0.5 text-[8px] text-gray-500 sm:text-[7px] lg:text-[10px]">vs last month</span></div></div></div>`);
  }
  $$payload.out.push(`<!--]--></div> <hr class="mt-5 border-t-2 border-gray-200"/>`);
}
const invoices = [
  {
    id: "BT-INV-001",
    name: "Sarah Miller",
    treatment: "Facial Rejuvenation",
    method: "Credit Card",
    amount: 300,
    date: "2028-09-20",
    status: "Paid",
    avatar: "https://i.pravatar.cc/40?img=1"
  },
  {
    id: "BT-INV-002",
    name: "Claire Thompson",
    treatment: "Lip Fillers",
    method: "Credit Card",
    amount: 250,
    date: "2028-09-22",
    status: "Paid",
    avatar: "https://i.pravatar.cc/40?img=2"
  },
  {
    id: "BT-INV-003",
    name: "Ethan Hughes",
    treatment: "Tattoo Removal",
    method: "Paypal",
    amount: 500,
    date: "2028-09-23",
    status: "Paid",
    avatar: "https://i.pravatar.cc/40?img=3"
  },
  {
    id: "BT-INV-004",
    name: "Hannah Lee",
    treatment: "Acne Treatment",
    method: "Credit Card",
    amount: 150,
    date: "2028-09-24",
    status: "Pending",
    avatar: "https://i.pravatar.cc/40?img=4"
  },
  {
    id: "BT-INV-005",
    name: "Grace Parker",
    treatment: "Scar Removal Surgery",
    method: "Credit Card",
    amount: 700,
    date: "2028-09-25",
    status: "Paid",
    avatar: "https://i.pravatar.cc/40?img=5"
  },
  {
    id: "BT-INV-006",
    name: "Emma Wilson",
    treatment: "Chemical Peels",
    method: "Bank Transfer",
    amount: 200,
    date: "2028-09-26",
    status: "Paid",
    avatar: "https://i.pravatar.cc/40?img=6"
  },
  {
    id: "BT-INV-007",
    name: "Daniel Evans",
    treatment: "Microdermabrasion",
    method: "Credit Card",
    amount: 350,
    date: "2028-09-27",
    status: "Pending",
    avatar: "https://i.pravatar.cc/40?img=7"
  },
  {
    id: "BT-INV-008",
    name: "Victor Ramirez",
    treatment: "Body Contouring",
    method: "Paypal",
    amount: 800,
    date: "2028-09-28",
    status: "Pending",
    avatar: "https://i.pravatar.cc/40?img=8"
  },
  {
    id: "BT-INV-009",
    name: "Julia Watson",
    treatment: "Botox Injections",
    method: "Credit Card",
    amount: 280,
    date: "2028-09-28",
    status: "Pending",
    avatar: "https://i.pravatar.cc/40?img=9"
  },
  {
    id: "BT-INV-010",
    name: "Maurice Galley",
    treatment: "Laser Hair Removal",
    method: "Bank Transfer",
    amount: 450,
    date: "2028-09-30",
    status: "Paid",
    avatar: "https://i.pravatar.cc/40?img=10"
  }
];
function PaymentNavbar($$payload, $$props) {
  push();
  let { searchValue = "" } = $$props;
  [...new Set(invoices.map((p) => p.status))];
  $$payload.out.push(`<nav class="flex w-full flex-wrap gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2"><div class="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-start"><div class="flex w-full items-center gap-2 md:hidden"><input type="text" placeholder="Search..." class="flex-1 rounded-full border px-3 py-1.5 text-sm"${attr("value", searchValue)}/> <div class="flex gap-1"><button class="h-7 w-7 rounded-full bg-gray-300 text-base font-bold">+</button> <button class="h-7 w-7 rounded-full bg-gray-300 text-base font-bold">−</button></div></div> <div class="relative hidden md:block"><input id="datepicker" type="text" placeholder="Select Date" class="btn-dropdown-color1 rounded-full w-32 pr-8 pl-3 py-1.5 text-xs lg:w-40 lg:pr-10 lg:pl-4 lg:py-2 lg:text-sm"/> <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v2H9V3a1 1 0 00-1-1H6a1 1 0 00-1 1v2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div> <div class="relative hidden md:block"><button class="rounded-full bg-white px-3 py-1.5 text-xs hover:bg-gray-50 md:text-xs lg:px-4 lg:py-2 lg:text-sm">All Customers <span class="text-[12px] leading-none">v</span></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="relative hidden md:block"><button class="rounded-full bg-white px-3 py-1.5 text-xs hover:bg-gray-50 md:text-xs lg:px-4 lg:py-2 lg:text-sm">All Status <span class="text-[12px] leading-none">v</span></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div> <div class="flex flex-wrap items-center gap-2"><input type="text" placeholder="Search Invoice ID or Patients..." class="hidden w-56 rounded-full bg-white px-3 py-2 text-sm lg:block"${attr("value", searchValue)}/> <button class="hidden h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 md:flex lg:hidden"><svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"></path></svg></button> <button class="add-btn-lg-color hidden rounded-full px-3 py-1.5 text-xs md:block lg:px-4 lg:py-2 lg:text-sm">+ Add Invoice</button></div></nav> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  pop();
}
function _page($$payload, $$props) {
  push();
  let filteredInvoice, totalItems, totalPages, paginatedInvoices;
  let invoices$1 = invoices;
  let searchTerm = "";
  const statusClasses = (status) => status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  let selected = [];
  let currentPage = 1;
  let itemsPerPage = 8;
  filteredInvoice = invoices$1.filter((p) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = (p.name?.toLowerCase() ?? "").includes(q) || (p.treatment?.toLowerCase() ?? "").includes(q) || (p.id?.toLowerCase() ?? "").includes(q) || (p.status?.toLowerCase() ?? "").includes(q);
    const matchesCustomer = true;
    const matchesStatus = true;
    const matchesDate = true;
    return matchesSearch && matchesCustomer && matchesStatus && matchesDate;
  });
  totalItems = filteredInvoice.length;
  totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
  paginatedInvoices = filteredInvoice.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const each_array = ensure_array_like(
    //  Handle Page Change from Pagination Component
    // Remove selected invoices
    paginatedInvoices
  );
  const each_array_1 = ensure_array_like(paginatedInvoices);
  $$payload.out.push(`<div class="bg-[#f9f5f4] p-4">`);
  PaymentInvoice($$payload);
  $$payload.out.push(`<!----> <br/> `);
  PaymentNavbar($$payload, {});
  $$payload.out.push(`<!----> <div class="hidden rounded-xl bg-white p-3 shadow md:block md:p-2 lg:p-4"><table class="min-w-full border-collapse text-sm md:text-[11px] lg:text-sm"><thead class="rounded-lg bg-[#f9f5f4]"><tr class="text-left text-gray-600"><th class="w-12 px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4"><div class="flex items-center gap-2"><input type="checkbox" class="h-3.5 w-3.5 md:h-3 md:w-3 lg:h-4 lg:w-4"${attr("checked", paginatedInvoices.every((i) => selected.includes(i.id)), true)}/> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></th><th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Invoice ID</th><th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Patient</th><th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Treatment</th><th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Payment</th><th class="hidden px-3 py-4 md:px-1.5 md:py-2 lg:table-cell lg:px-3 lg:py-4">Amount</th><th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Date</th><th class="px-3 py-4 md:px-1.5 md:py-2 lg:px-3 lg:py-4">Status</th></tr></thead><tbody><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let inv = each_array[$$index];
    $$payload.out.push(`<tr class="border-b border-gray-200 hover:bg-[#D5F4FE]"><td class="flex items-center gap-2 p-2 md:p-1.5 lg:p-2"><input type="checkbox" class="h-3.5 w-3.5 md:h-3 md:w-3 lg:h-4 lg:w-4"${attr("checked", selected.includes(inv.id), true)}/> `);
    if (selected.includes(inv.id)) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<button class="text-red-500 hover:text-red-700" title="Delete Invoice"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></td><td class="p-2 font-medium md:p-1.5 lg:p-2">${escape_html(inv.id)}</td><td class="flex items-center gap-2 p-2 md:p-1.5 lg:p-2"><img${attr("src", inv.avatar)} alt="" class="h-7 w-7 rounded-full md:h-6 md:w-6 lg:h-8 lg:w-8"/> <span class="md:text-[10px] lg:text-sm">${escape_html(inv.name)}</span></td><td class="p-2 md:p-1.5 md:text-[10px] lg:p-2 lg:text-sm">${escape_html(inv.treatment)}</td><td class="p-2 md:p-1.5 lg:p-2"><span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs md:px-1.5 md:py-0.5 md:text-[10px] lg:px-2 lg:py-0.5 lg:text-xs">${escape_html(inv.method)}</span> <div class="mt-1 block text-xs font-semibold text-gray-600 md:text-[9px] lg:hidden">Amount: $${escape_html(inv.amount)}</div></td><td class="hidden p-2 font-semibold md:p-1.5 md:text-[10px] lg:table-cell lg:p-2 lg:text-sm">$${escape_html(inv.amount)}</td><td class="p-2 md:p-1.5 md:text-[10px] lg:p-2 lg:text-sm">${escape_html(inv.date)}</td><td class="p-2 md:p-1.5 lg:p-2"><span${attr_class(`rounded-full px-2.5 py-0.5 text-xs md:px-2 md:py-0.5 md:text-[10px] lg:px-3 lg:py-0.5 lg:text-xs ${statusClasses(inv.status)}`)}>${escape_html(inv.status)}</span></td></tr>`);
  }
  $$payload.out.push(`<!--]--></tbody></table></div> <div class="flex flex-col gap-3 md:hidden"><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let inv = each_array_1[$$index_1];
    $$payload.out.push(`<div class="rounded-xl bg-white p-3 shadow"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><input type="checkbox" class="h-4 w-4"${attr("checked", selected.includes(inv.id), true)}/> <span class="text-sm font-semibold">${escape_html(inv.id)} - ${escape_html(inv.date)}</span> `);
    if (selected.includes(inv.id)) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<button class="ml-2 text-red-500 hover:text-red-700" title="Delete Invoice"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div> <span${attr_class(`rounded-full px-2 py-1 text-xs ${statusClasses(inv.status)}`)}>${escape_html(inv.status)}</span></div> <div class="mt-2 flex items-center gap-3"><img${attr("src", inv.avatar)} class="h-10 w-10 rounded-full" alt=""/> <div><p class="font-medium">${escape_html(inv.name)}</p> <p class="text-sm text-gray-500">${escape_html(inv.treatment)}</p></div></div> <div class="mt-2 flex items-center justify-between text-sm"><span class="rounded-full bg-gray-100 px-2 py-1">${escape_html(inv.method)}</span> <span class="font-semibold">Amount: $${escape_html(inv.amount)}</span></div></div>`);
  }
  $$payload.out.push(`<!--]--></div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  if (totalItems > 0) {
    $$payload.out.push("<!--[-->");
    Pagination($$payload, { totalItems, itemsPerPage, currentPage });
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<p class="py-4 text-center text-gray-500">No invoices found for the applied filters.</p>`);
  }
  $$payload.out.push(`<!--]--></div>`);
  pop();
}
export {
  _page as default
};
