import { F as store_get, G as escape_html, I as attr, J as unsubscribe_stores, E as pop, A as push, K as ensure_array_like, M as attr_class, N as clsx, O as slot } from "../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/state.svelte.js";
import { p as page } from "../../chunks/stores.js";
import { I as Icon } from "../../chunks/Icon.js";
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  let activeItem;
  const user = {
    name: "Anahera Jones",
    role: "Admin",
    avatar: "https://i.pravatar.cc/100?img=47"
  };
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Patients", path: "/patients" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointments", path: "/appointments" },
    { name: "Surgery Schedule", path: "/surgery-schedule" },
    { name: "Treatments", path: "/treatments" },
    { name: "Reviews", path: "/reviews" },
    { name: "Payments", path: "/payments" },
    { name: "Messages", path: "/messages", badge: 6 }
  ];
  let btn = false;
  activeItem = (() => {
    const currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    if (currentPath.startsWith("/treatments/") && currentPath.split("/").length === 3) {
      btn = true;
      return { name: "Treatment Details" };
    }
    if (currentPath.startsWith("/doctors/") && currentPath.split("/").length === 3) {
      btn = true;
      return { name: "Doctors Details" };
    }
    if (currentPath.startsWith("/patients/") && currentPath.split("/").length === 3) {
      btn = true;
      return { name: "Patients Details" };
    }
    btn = false;
    return navItems.find((item) => currentPath === item.path) || { name: "Dashboard" };
  })();
  $$payload.out.push(`<div class="flex w-full items-center justify-between bg-[#FFFEFC] px-6 py-4"><div class="flex gap-4 lg:flex-col lg:gap-0">`);
  if (btn == true) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<button class="flex items-center gap-2 py-2 px-2 text-sm text-gray-600 rounded-full bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> <span class="hidden lg:block">Back to page</span></button>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <span class="text-lg font-semibold text-gray-700">${escape_html(activeItem.name)}</span></div> <div class="hidden items-center gap-4 md:flex"><div class="btn-dropdown-color1 cursor-pointer rounded-full p-2 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></div> <img${attr("src", user.avatar)} alt="User profile" class="h-8 w-8 rounded-full"/> <div class="text-right text-sm"><p class="font-medium text-gray-800">${escape_html(user.name)}</p> <p class="text-gray-500">${escape_html(user.role)}</p></div></div> <div class="md:hidden"><button class="text-gray-700 hover:text-gray-900 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Sidebar($$payload, $$props) {
  push();
  const iconMap = {
    Dashboard: "mdi:home",
    Patients: "mdi:account",
    Doctors: "mdi:stethoscope",
    Appointments: "mdi:calendar",
    "Surgery Schedule": "mdi:file-document",
    Treatments: "mdi:pill",
    Reviews: "mdi:star",
    Payments: "mdi:credit-card",
    Messages: "mdi:message"
  };
  let navItems = [
    { label: "Dashboard", path: "/", active: true },
    { label: "Patients", path: "/patients", active: false },
    { label: "Doctors", path: "/doctors", active: false },
    { label: "Appointments", path: "/appointments", active: false },
    {
      label: "Surgery Schedule",
      path: "/surgery-schedule",
      active: false
    },
    { label: "Treatments", path: "/treatments", active: false },
    { label: "Reviews", path: "/reviews", active: false },
    { label: "Payments", path: "/payments", active: false },
    {
      label: "Messages",
      path: "/messages",
      active: false,
      badge: 6
    },
    { label: "Logout", path: "/login", active: false }
  ];
  let toggleIcon = "ic:sharp-space-dashboard";
  const each_array = ensure_array_like(navItems);
  $$payload.out.push(`<div${attr_class(`hidden flex-col bg-[#FFFEFC] transition-all duration-300 md:flex ${"w-64"}`)} style="min-height: calc(100vh - 4rem);"><div class="flex items-center p-4"><button class="flex cursor-pointer items-center gap-4 rounded py-2 text-gray-700" aria-label="Toggle Sidebar"><img src="/medSynk-logo.png" alt="MedSynk logo"${attr_class(`transition-all duration-300 ${"h-12 w-12"}`)}/> <span${attr_class(`text-lg font-semibold ${"block"}`)}>MedSynk</span> `);
  Icon($$payload, { icon: toggleIcon, class: "h-5 w-5 text-gray-700" });
  $$payload.out.push(`<!----></button></div> <nav class="mt-4 flex-1 overflow-y-auto"><!--[-->`);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let item = each_array[index];
    $$payload.out.push(`<div${attr_class(`group relative mx-2 my-1 flex cursor-pointer items-center rounded-lg px-4 py-3 ${item.active ? "btn-dropdown-color text-blue-800" : "btn-dropdown-hover text-gray-600"}`)}>`);
    Icon($$payload, { icon: iconMap[item.label], class: "h-5 w-5" });
    $$payload.out.push(`<!----> <span${attr_class(`ml-4 text-sm font-medium ${""}`)}>${escape_html(item.label)}</span> `);
    if (item.badge && true) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<span class="absolute top-2 right-3 rounded-full bg-red-200 px-1.5 text-xs text-red-800">${escape_html(item.badge)}</span>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div>`);
  }
  $$payload.out.push(`<!--]--></nav> `);
  {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="btn-dropdown-color1 m-3 flex flex-col gap-5 rounded-xl p-4"><img src="/medSynk-logo.png" alt="MedSynk logo"${attr_class(`transition-all duration-300 ${"h-12 w-12"}`)}/> <p class="text-md leading-5 text-gray-800">Enjoy improved performance, new features, and a smoother interface.</p> <button class="add-btn-lg-color cursor-pointer rounded-full px-3 py-3 text-xs">Explore the Update!</button></div>`);
  }
  $$payload.out.push(`<!--]--> <div class="btn-dropdown-hover m-3 flex cursor-pointer items-center gap-2 rounded-md bg-[#faf6f5] p-4 text-sm text-gray-600 hover:bg-gray-200">`);
  Icon($$payload, { icon: "mdi:logout", class: "h-5 w-5" });
  $$payload.out.push(`<!----> <span${attr_class(clsx(""))}>Logout</span></div></div>`);
  pop();
}
function Footer($$payload) {
  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms and conditions", href: "/terms" },
    { name: "Contact", href: "/contact" }
  ];
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: "facebook"
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: "twitter"
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: "instagram"
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: "youtube"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: "linkedin"
    }
  ];
  const each_array = ensure_array_like(footerLinks);
  const each_array_1 = ensure_array_like(socialLinks);
  $$payload.out.push(`<footer class="gap-2 border-t border-gray-100 bg-[#FFFEFC] px-2 md:p-8"><div class="mx-auto flex flex-col items-center justify-between sm:flex-row"><div class="flex flex-col items-center sm:flex-row lg:gap-6"><div class="text-sm text-gray-600">Copyright ©️ 2025 MedSynk</div> <div class="flex items-center gap-2 lg:gap-6"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$payload.out.push(`<a${attr("href", link.href)} class="text-sm text-gray-500 transition-colors hover:text-gray-700">${escape_html(link.name)}</a>`);
  }
  $$payload.out.push(`<!--]--></div></div> <div class="flex items-center gap-4"><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let social = each_array_1[$$index_1];
    $$payload.out.push(`<a${attr("href", social.href)} target="_blank" rel="noopener noreferrer" class="text-gray-400 transition-colors hover:text-gray-600"${attr("aria-label", social.name)}>`);
    if (social.icon === "facebook") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>`);
    } else {
      $$payload.out.push("<!--[!-->");
      if (social.icon === "twitter") {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>`);
      } else {
        $$payload.out.push("<!--[!-->");
        if (social.icon === "instagram") {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-2.504 0-4.534-2.03-4.534-4.534s2.03-4.534 4.534-4.534 4.534 2.03 4.534 4.534-2.03 4.534-4.534 4.534zm7.119-8.068c-.588 0-1.064-.476-1.064-1.064s.476-1.064 1.064-1.064 1.064.476 1.064 1.064-.476 1.064-1.064 1.064z"></path><path d="M12.017 7.056c-2.731 0-4.948 2.217-4.948 4.948s2.217 4.948 4.948 4.948 4.948-2.217 4.948-4.948-2.217-4.948-4.948-4.948zm0 8.164c-1.774 0-3.216-1.442-3.216-3.216s1.442-3.216 3.216-3.216 3.216 1.442 3.216 3.216-1.442 3.216-3.216 3.216z"></path></svg>`);
        } else {
          $$payload.out.push("<!--[!-->");
          if (social.icon === "youtube") {
            $$payload.out.push("<!--[-->");
            $$payload.out.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>`);
          } else {
            $$payload.out.push("<!--[!-->");
            if (social.icon === "linkedin") {
              $$payload.out.push("<!--[-->");
              $$payload.out.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>`);
            } else {
              $$payload.out.push("<!--[!-->");
            }
            $$payload.out.push(`<!--]-->`);
          }
          $$payload.out.push(`<!--]-->`);
        }
        $$payload.out.push(`<!--]-->`);
      }
      $$payload.out.push(`<!--]-->`);
    }
    $$payload.out.push(`<!--]--></a>`);
  }
  $$payload.out.push(`<!--]--></div></div></footer>`);
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let currentPath, showLayout;
  const hiddenRoutes = ["/login", "/signup"];
  currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  showLayout = !hiddenRoutes.includes(currentPath);
  $$payload.out.push(`<div class="flex h-screen w-screen flex-col overflow-hidden">`);
  if (showLayout) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="flex flex-1 overflow-hidden">`);
    Sidebar($$payload);
    $$payload.out.push(`<!----> <div class="flex flex-1 flex-col overflow-hidden"><div class="h-20 shrink-0">`);
    Header($$payload);
    $$payload.out.push(`<!----></div> <div class="flex-1 overflow-y-auto rounded-2xl"><!---->`);
    slot($$payload, $$props, "default", {});
    $$payload.out.push(`<!----></div> <div class="h-20 shrink-0">`);
    Footer($$payload);
    $$payload.out.push(`<!----></div></div> <div class="bg-[#fffefc] sm:w-5"></div></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<!---->`);
    slot($$payload, $$props, "default", {});
    $$payload.out.push(`<!---->`);
  }
  $$payload.out.push(`<!--]--></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
