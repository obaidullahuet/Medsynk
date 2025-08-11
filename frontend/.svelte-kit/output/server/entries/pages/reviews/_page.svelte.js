import { K as ensure_array_like, I as attr, G as escape_html, M as attr_class, E as pop, A as push, R as stringify, T as spread_props } from "../../../chunks/index.js";
import { P as Pagination } from "../../../chunks/Pagination.js";
function ReviewCard($$payload, $$props) {
  let {
    name,
    date,
    review,
    treatment,
    rating,
    avatar,
    status,
    isSelected = false
  } = $$props;
  const each_array = ensure_array_like(Array(5));
  const each_array_1 = ensure_array_like(Array(5));
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-[0_0_30px_#D5F4FE] lg:flex-row"><div class="flex flex-col gap-2 max-[425px]:block lg:hidden"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><input type="checkbox"${attr("checked", isSelected, true)} class="btn-dropdown-color h-4 w-4 shrink-0 accent-[#40C0E5]"/> <span class="text-xs text-gray-500">${escape_html(date)}</span></div> <button class="btn-dropdown-color rounded-full px-3 py-1 text-xs font-semibold text-gray-700 transition hover:opacity-90">${escape_html(status)}</button></div> <br/> <div class="flex items-start gap-3"><img${attr("src", avatar)}${attr("alt", name)} class="h-12 w-12 shrink-0 rounded-lg object-cover"/> <div class="flex flex-col"><p class="text-base font-bold text-gray-800">${escape_html(name)}</p> <div class="flex items-center gap-1"><div class="flex gap-0.5"><!--[-->`);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    $$payload.out.push(`<svg class="h-3.5 w-3.5"${attr("fill", i < rating ? "#fbbf24" : "none")} stroke="#fbbf24" stroke-width="1" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`);
  }
  $$payload.out.push(`<!--]--></div> <p class="ml-2 text-xs text-gray-600">${escape_html(treatment)}</p></div></div></div> <p class="my-2 text-sm text-gray-700">${escape_html(review)}</p></div> <div class="hidden min-w-0 flex-1 items-start gap-3 lg:flex"><div class="flex items-center gap-3"><input type="checkbox"${attr("checked", isSelected, true)} class="btn-dropdown-color h-5 w-5 shrink-0 accent-[#40C0E5]"/> <img${attr("src", avatar)}${attr("alt", name)} class="h-16 w-16 shrink-0 rounded-xl object-cover"/></div> <div class="flex min-w-0 flex-col justify-center"><div class="flex flex-wrap items-center gap-2"><span class="truncate text-base font-bold text-gray-800">${escape_html(name)}</span> <span class="truncate text-xs text-gray-500">${escape_html(date)}</span></div> <p class="mt-1 line-clamp-2 text-sm text-gray-700">${escape_html(review)}</p></div></div> <div class="hidden flex-col flex-wrap gap-2 text-right text-sm text-gray-800 lg:flex lg:flex-row lg:items-center lg:justify-end lg:gap-4 lg:text-left"><div class="flex flex-col items-end lg:items-start"><p class="text-xs text-gray-500">Treatment</p> <p class="max-w-[100px] truncate text-right font-medium lg:text-left">${escape_html(treatment)}</p></div> <div class="flex items-center justify-end gap-0.5 lg:justify-center"><!--[-->`);
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    each_array_1[i];
    $$payload.out.push(`<svg class="h-4 w-4"${attr("fill", i < rating ? "#fbbf24" : "none")} stroke="#fbbf24" stroke-width="1" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`);
  }
  $$payload.out.push(`<!--]--></div> <button class="btn-dropdown-color self-end rounded-full px-4 py-1 text-xs font-semibold text-gray-700 transition hover:opacity-90 lg:self-auto">${escape_html(status)}</button></div></div>`);
}
function ReviewsNavbar($$payload, $$props) {
  push();
  let {
    searchTerm = "",
    selectedStatus = "All Reviews",
    selectedSort = "Latest"
  } = $$props;
  const statusOptions = ["All Reviews", "Published", "Archived"];
  let localSearchTerm = searchTerm;
  const each_array = ensure_array_like(statusOptions);
  $$payload.out.push(`<div class="w-full py-3 md:py-2"><div class="flex flex-col-reverse gap-3 md:flex-row md:items-center md:gap-2 md:text-xs lg:justify-between lg:text-sm xl:flex-row xl:items-center"><div class="btn-dropdown-color1 flex w-fit rounded-full sm:flex-wrap sm:gap-1.5 md:gap-1"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let status = each_array[$$index];
    $$payload.out.push(`<button${attr_class(`rounded-full px-2 py-1 text-[11px] whitespace-nowrap transition-all duration-200 md:px-3 md:py-1 md:text-xs lg:px-4 lg:py-2 lg:text-sm ${stringify(selectedStatus === status ? "add-btn-lg-color text-blue-800" : "btn-dropdown-color1 text-gray-600 hover:bg-gray-50")}`)}>${escape_html(status)}</button>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="flex flex-wrap items-center gap-2 md:gap-1 lg:gap-3"><div class="flex items-center gap-2"><div class="relative flex w-40 flex-1 sm:w-32 sm:flex-none md:w-40 lg:w-64"><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 md:pl-2 lg:pl-3"><svg class="h-3 w-3 text-gray-400 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input type="text" placeholder="Search reviews..."${attr("value", localSearchTerm)} class="w-full rounded-full bg-white py-1.5 pr-3 pl-8 text-xs focus:border-transparent focus:ring-2 focus:ring-blue-300 focus:outline-none md:text-xs lg:py-2.5 lg:pl-10 lg:text-sm"/> `);
  if (localSearchTerm) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<button class="absolute inset-y-0 right-0 flex items-center pr-3"><svg class="h-3 w-3 text-gray-400 transition-colors hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="dropdown-container relative flex"><button class="btn-dropdown-color1 flex w-full min-w-[90px] items-center justify-between rounded-full px-3 py-1.5 text-xs text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none sm:w-auto lg:min-w-[120px] lg:px-4 lg:py-2 lg:text-sm"><span>${escape_html(selectedSort)}</span> <svg${attr_class(`ml-1 h-3 w-3 text-gray-400 transition-transform duration-200 ${stringify("")} md:h-3.5 md:w-3.5 lg:h-4 lg:w-4`)} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div></div></div></div>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  let reviews = [
    {
      id: 1,
      name: "Daniel Evans",
      date: "Monday, 20 Sep 2028, 11:45 AM",
      review: "The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)",
      treatment: "Microderma",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 2,
      name: "Emma Wilson",
      date: "Tuesday, 19 Sep 2028, 2:15 PM",
      review: "The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)",
      treatment: "Chemical Peels",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      isSelected: false,
      status: "Archived"
    },
    {
      id: 3,
      name: "Grace Parker",
      date: "Monday, 18 Sep 2028, 10:30 AM",
      review: "The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)",
      treatment: "Scar Removal Surgery",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      isSelected: true,
      status: "Published"
    },
    {
      id: 4,
      name: "Hannah Lee",
      date: "Saturday, 16 Sep 2028, 1:00 PM",
      review: "Effective acne treatment, though a bit of discomfort after. Overall, I'm happy with the results.",
      treatment: "Acne Treatment",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 5,
      name: "Ethan Hughes",
      date: "Friday, 15 Sep 2028, 5:00 PM",
      review: "The microdermabrasion treatment was amazing! My skin feels so much smoother now. :)",
      treatment: "Tattoo Removal",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      isSelected: false,
      status: "Archived"
    },
    {
      id: 6,
      name: "Sophia Martinez",
      date: "Thursday, 14 Sep 2028, 9:30 AM",
      review: "The Botox treatment exceeded my expectations. The results look natural.",
      treatment: "Botox Treatment",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 7,
      name: "Michael Chen",
      date: "Wednesday, 13 Sep 2028, 3:45 PM",
      review: "Great experience with the laser hair removal. The staff was professional and the clinic was very clean.",
      treatment: "Laser Hair Removal",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 8,
      name: "Lily Thompson",
      date: "Tuesday, 12 Sep 2028, 11:00 AM",
      review: "Very satisfied with the facial rejuvenation. The atmosphere was relaxing.",
      treatment: "Facial Rejuvenation",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 9,
      name: "James Walker",
      date: "Monday, 11 Sep 2028, 4:20 PM",
      review: "The service was good but the results took a while to show.",
      treatment: "Hair Transplant",
      rating: 3,
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
      isSelected: false,
      status: "Archived"
    },
    {
      id: 10,
      name: "Chloe Bennett",
      date: "Sunday, 10 Sep 2028, 10:45 AM",
      review: "Loved the lip filler results! Definitely coming back.",
      treatment: "Lip Fillers",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 11,
      name: "Benjamin Scott",
      date: "Saturday, 9 Sep 2028, 12:15 PM",
      review: "Good consultation and friendly staff. Procedure was smooth.",
      treatment: "Skin Tightening",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 12,
      name: "Natalie Brooks",
      date: "Friday, 8 Sep 2028, 3:30 PM",
      review: "Pleased with the laser treatment. Great hygiene and safety protocols.",
      treatment: "Laser Skin Resurfacing",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      isSelected: false,
      status: "Archived"
    },
    {
      id: 13,
      name: "Oliver White",
      date: "Thursday, 7 Sep 2028, 5:00 PM",
      review: "Botox session went well. Doctor was informative and precise.",
      treatment: "Botox Treatment",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
      isSelected: false,
      status: "Published"
    },
    {
      id: 14,
      name: "Isabella Moore",
      date: "Wednesday, 6 Sep 2028, 9:00 AM",
      review: "Excellent experience. My acne scars are visibly reduced!",
      treatment: "Acne Scar Reduction",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      isSelected: false,
      status: "Published"
    }
  ];
  let searchTerm = "";
  let selectedStatus = "All Reviews";
  let selectedSort = "Latest";
  let currentPage = 1;
  let itemsPerPage = 7;
  function parseDate(dateString) {
    const parts = dateString.split(", ");
    const datePart = parts[1];
    const timePart = parts[2];
    return /* @__PURE__ */ new Date(`${datePart} ${timePart}`);
  }
  let filteredReviews = () => {
    let filtered = [...reviews];
    {
      filtered.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    }
    return filtered;
  };
  let totalItems = filteredReviews().length;
  let paginatedReviews = filteredReviews().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const each_array = ensure_array_like(paginatedReviews);
  $$payload.out.push(`<div class="min-h-screen bg-[#f9f5f4]"><div class="px-4 py-8"><div class="mb-8">`);
  ReviewsNavbar($$payload, {
    searchTerm,
    selectedStatus,
    selectedSort
  });
  $$payload.out.push(`<!----></div> <div class="mx-auto max-w-6xl space-y-4"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let review = each_array[$$index];
    ReviewCard($$payload, spread_props([review]));
  }
  $$payload.out.push(`<!--]--></div> `);
  if (filteredReviews().length > 0) {
    $$payload.out.push("<!--[-->");
    Pagination($$payload, { currentPage, itemsPerPage, totalItems });
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  if (filteredReviews().length === 0) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="py-12 text-center"><div class="text-lg text-gray-500">${escape_html("No reviews found")}</div> <p class="mt-2 text-sm text-gray-400">${escape_html("Patient reviews will appear here")}</p> `);
    {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}
export {
  _page as default
};
