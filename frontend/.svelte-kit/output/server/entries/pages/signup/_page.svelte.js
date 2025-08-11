import { I as attr, G as escape_html, E as pop, A as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let termsAccepted = false;
  let errors = {};
  $$payload.out.push(`<section class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8"><div class="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white md:h-[650px] md:flex-row" style="box-shadow: 0 0 30px rgba(64, 192, 229, 0.6);"><div class="hidden w-full bg-cover bg-center md:block md:w-1/2" style="background-image: url('/signupImage.jpg');"></div> <div class="flex w-full flex-col items-center justify-center px-6 py-16 md:w-1/2 md:py-20"><div class="w-full max-w-sm"><a href="#" class="mb-6 flex items-center justify-center text-2xl font-semibold text-gray-900"><img class="mr-2 h-8 w-8" src="/medSynk-logo.png" alt="logo"/> MedSynk</a> <h1 class="mb-6 text-center text-3xl font-bold text-gray-900">Create an account</h1> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <form class="space-y-4"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-gray-900">First Name</label> <input type="text"${attr("value", firstName)} placeholder="John" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"/> `);
  if (errors.firstName) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-xs text-red-500">${escape_html(errors.firstName)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div><label class="mb-1 block text-sm font-medium text-gray-900">Last Name</label> <input type="text"${attr("value", lastName)} placeholder="Doe" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"/> `);
  if (errors.lastName) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-xs text-red-500">${escape_html(errors.lastName)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div>  <div><label class="mb-1 block text-sm font-medium text-gray-900">Your Email</label> <input type="email"${attr("value", email)} placeholder="name@company.com" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"/> `);
  if (errors.email) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-xs text-red-500">${escape_html(errors.email)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div><label class="mb-1 block text-sm font-medium text-gray-900">Password</label> <input type="password"${attr("value", password)} placeholder="••••••••" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"/> `);
  if (errors.password) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-xs text-red-500">${escape_html(errors.password)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div><label class="mb-1 block text-sm font-medium text-gray-900">Confirm Password</label> <input type="password"${attr("value", confirmPassword)} placeholder="••••••••" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"/> `);
  if (errors.confirmPassword) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-xs text-red-500">${escape_html(errors.confirmPassword)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="flex items-start"><input id="terms" type="checkbox"${attr("checked", termsAccepted, true)} class="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"/> <label for="terms" class="ml-2 text-sm text-gray-700">I accept the <a href="#" class="font-medium text-blue-600 hover:underline">Terms &amp; Conditions</a></label></div> `);
  if (errors.terms) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-xs text-red-500">${escape_html(errors.terms)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <button type="submit" class="btn-dropdown-color w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none">Create an account</button> <p class="text-center text-sm text-gray-600">Already have an account? <a href="/login" class="font-medium text-blue-600 hover:underline">Login here</a></p></form></div></div></div></section>`);
  pop();
}
export {
  _page as default
};
