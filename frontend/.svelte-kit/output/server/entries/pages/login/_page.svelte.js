import { I as attr, G as escape_html, E as pop, A as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let email = "";
  let password = "";
  let errors = {};
  $$payload.out.push(`<section class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8"><div class="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white md:h-[600px] md:flex-row" style="box-shadow: 0 0 30px rgba(64, 192, 229, 0.6);"><div class="hidden w-full bg-cover bg-center md:block md:w-1/2" style="background-image: url('/loginImage.jpeg');"></div> <div class="flex w-full flex-col items-center justify-center px-6 py-10 md:w-1/2"><div class="w-full max-w-sm"><a href="#" class="mb-6 flex items-center justify-center text-2xl font-semibold text-gray-900"><img class="mr-2 h-8 w-8" src="/medSynk-logo.png" alt="logo"/> MedSynk</a> <h1 class="mb-6 text-center text-3xl font-bold text-gray-900">Welcome Back</h1> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <form class="space-y-4"><div><label class="mb-1 block text-sm font-medium text-gray-900">Email</label> <input type="email"${attr("value", email)} placeholder="name@company.com" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"/> `);
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
  $$payload.out.push(`<!--]--></div> <button type="submit" class="btn-dropdown-color w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none">Login</button> <p class="text-center text-sm text-gray-600">Don’t have an account? <a href="/signup" class="font-medium text-blue-600 hover:underline">Sign up here</a></p></form></div></div></div></section>`);
  pop();
}
export {
  _page as default
};
