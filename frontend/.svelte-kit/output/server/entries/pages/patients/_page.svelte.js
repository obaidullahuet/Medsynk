import "clsx";
import { I as attr, E as pop, A as push, K as ensure_array_like, G as escape_html, M as attr_class, U as bind_props } from "../../../chunks/index.js";
import "flatpickr";
/* empty css                            */
import { P as Pagination } from "../../../chunks/Pagination.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/state.svelte.js";
const patients = [
  {
    id: "PB-001",
    name: "Sarah Miller",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "2028-09-12",
    time: "09:00 AM",
    doctor: "Dr. Olivia Grant",
    doctorAvatar: "https://randomuser.me/api/portraits/women/21.jpg",
    treatment: "Facial Rejuvenation",
    status: "Completed",
    hpi: "HPI-001",
    expiryDate: "2032-01-01",
    age: "29 years old",
    gender: "Female",
    birthday: "1999-04-28",
    about: "Sarah is a regular patient undergoing facial rejuvenation treatments to maintain skin health.",
    phone: "+1 555-123-4567",
    address: "123 Main St, Springfield, USA",
    email: "sarah.miller@example.com",
    emergencyContact: "John Miller (+1 555-987-6543)",
    allergies: ["Penicillin", "Pollen", "Latex"],
    medications: [
      "Ibuprofen (200 mg as needed)",
      "Cetirizine (10 mg daily for allergies)",
      "Vitamin D supplements"
    ],
    bodyTemperature: "37",
    heartRate: "72",
    bloodPressure: "120",
    respiratory: "16"
  },
  {
    id: "PB-002",
    name: "Maurice Galley",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "2028-09-12",
    time: "12:00 PM",
    doctor: "Dr. David Carter",
    doctorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    treatment: "Laser Hair Removal",
    status: "In Progress",
    hpi: "HPI-002",
    expiryDate: "2032-01-01",
    age: "32 years old",
    gender: "Male",
    birthday: "1992-07-15",
    about: "Maurice is undergoing a series of laser hair removal sessions.",
    phone: "+1 555-234-5678",
    address: "456 Elm St, Springfield, USA",
    email: "maurice.galley@example.com",
    emergencyContact: "Anna Galley (+1 555-654-3210)",
    allergies: ["Pollen", "Latex"],
    medications: ["Cetirizine (10 mg daily for allergies)", "Vitamin D supplements"],
    bodyTemperature: "36.9",
    heartRate: "75",
    bloodPressure: "118",
    respiratory: "17"
  },
  {
    id: "PB-003",
    name: "Julia Watson",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "2028-09-12",
    time: "02:30 PM",
    doctor: "Dr. Emily Ross",
    doctorAvatar: "https://randomuser.me/api/portraits/women/23.jpg",
    treatment: "Botox Injections",
    status: "Scheduled",
    hpi: "HPI-003",
    expiryDate: "2032-01-01",
    age: "27 years old",
    gender: "Female",
    birthday: "1997-03-10",
    about: "Julia has scheduled Botox treatment to reduce fine lines.",
    phone: "+1 555-345-6789",
    address: "789 Oak St, Springfield, USA",
    email: "julia.watson@example.com",
    emergencyContact: "Peter Watson (+1 555-765-4321)",
    allergies: ["Penicillin"],
    medications: ["Ibuprofen (200 mg as needed)"],
    bodyTemperature: "37.1",
    heartRate: "70",
    bloodPressure: "119",
    respiratory: "16"
  },
  {
    id: "PB-004",
    name: "Stephen Hawk",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2028-09-12",
    time: "04:30 PM",
    doctor: "Dr. James Lawson",
    doctorAvatar: "https://randomuser.me/api/portraits/men/24.jpg",
    treatment: "Microdermabrasion",
    status: "Completed",
    hpi: "HPI-004",
    expiryDate: "2032-01-01",
    age: "40 years old",
    gender: "Male",
    birthday: "1984-11-21",
    about: "Stephen underwent microdermabrasion for skin resurfacing.",
    phone: "+1 555-456-7890",
    address: "321 Pine St, Springfield, USA",
    email: "stephen.hawk@example.com",
    emergencyContact: "Laura Hawk (+1 555-321-6547)",
    allergies: ["Latex"],
    medications: ["Vitamin D supplements"],
    bodyTemperature: "37.2",
    heartRate: "74",
    bloodPressure: "121",
    respiratory: "15"
  },
  {
    id: "PB-005",
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2028-09-13",
    time: "09:30 AM",
    doctor: "Dr. Sophia Clark",
    doctorAvatar: "https://randomuser.me/api/portraits/women/25.jpg",
    treatment: "Chemical Peels",
    status: "In Progress",
    hpi: "HPI-005",
    expiryDate: "2032-01-01",
    age: "30 years old",
    gender: "Female",
    birthday: "1995-06-12",
    about: "Emma is receiving chemical peel treatments to improve skin texture.",
    phone: "+1 555-567-8901",
    address: "654 Maple St, Springfield, USA",
    email: "emma.wilson@example.com",
    emergencyContact: "David Wilson (+1 555-432-7654)",
    allergies: ["Pollen", "Penicillin"],
    medications: ["Cetirizine (10 mg daily for allergies)", "Vitamin D supplements"],
    bodyTemperature: "37",
    heartRate: "73",
    bloodPressure: "117",
    respiratory: "16"
  },
  {
    id: "PB-006",
    name: "Victor Ramirez",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    date: "2028-09-13",
    time: "01:00 PM",
    doctor: "Dr. Richard Allen",
    doctorAvatar: "https://randomuser.me/api/portraits/men/26.jpg",
    treatment: "Body Contouring",
    status: "Scheduled",
    hpi: "HPI-006",
    expiryDate: "2032-01-01",
    age: "35 years old",
    gender: "Male",
    birthday: "1989-02-18",
    about: "Victor is scheduled for body contouring treatment to enhance physique.",
    phone: "+1 555-678-9012",
    address: "987 Cedar St, Springfield, USA",
    email: "victor.ramirez@example.com",
    emergencyContact: "Maria Ramirez (+1 555-210-9876)",
    allergies: ["Latex"],
    medications: ["Ibuprofen (200 mg as needed)"],
    bodyTemperature: "37.3",
    heartRate: "76",
    bloodPressure: "122",
    respiratory: "17"
  },
  {
    id: "PB-007",
    name: "Grace Parker",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    date: "2028-09-13",
    time: "04:00 PM",
    doctor: "Dr. Megan Foster",
    doctorAvatar: "https://randomuser.me/api/portraits/women/27.jpg",
    treatment: "Acne Treatment",
    status: "Completed",
    hpi: "HPI-007",
    expiryDate: "2032-01-01",
    age: "26 years old",
    gender: "Female",
    birthday: "1998-09-05",
    about: "Grace completed an acne treatment plan to improve her skin condition.",
    phone: "+1 555-789-0123",
    address: "222 Birch St, Springfield, USA",
    email: "grace.parker@example.com",
    emergencyContact: "Liam Parker (+1 555-654-9870)",
    allergies: ["Penicillin", "Pollen"],
    medications: ["Cetirizine (10 mg daily for allergies)"],
    bodyTemperature: "36.8",
    heartRate: "71",
    bloodPressure: "116",
    respiratory: "16"
  },
  {
    id: "PB-008",
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    date: "2028-09-12",
    time: "12:00 PM",
    doctor: "Dr. David Carter",
    doctorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    treatment: "Laser Hair Removal",
    status: "In Progress",
    hpi: "HPI-008",
    expiryDate: "2032-01-01",
    age: "31 years old",
    gender: "Male",
    birthday: "1993-05-22",
    about: "Michael is undergoing laser hair removal to achieve smoother skin.",
    phone: "+1 555-890-1234",
    address: "333 Willow St, Springfield, USA",
    email: "michael.brown@example.com",
    emergencyContact: "Sophia Brown (+1 555-876-5432)",
    allergies: ["Latex"],
    medications: ["Ibuprofen (200 mg as needed)", "Vitamin D supplements"],
    bodyTemperature: "37.2",
    heartRate: "74",
    bloodPressure: "120",
    respiratory: "15"
  },
  {
    id: "PB-009",
    name: "Daniel Evans",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    date: "2028-09-12",
    time: "04:30 PM",
    doctor: "Dr. James Lawson",
    doctorAvatar: "https://randomuser.me/api/portraits/men/24.jpg",
    treatment: "Microdermabrasion",
    status: "Completed",
    hpi: "HPI-009",
    expiryDate: "2032-01-01",
    age: "38 years old",
    gender: "Male",
    birthday: "1986-08-14",
    about: "Daniel successfully completed microdermabrasion sessions for skin care.",
    phone: "+1 555-901-2345",
    address: "444 Cherry St, Springfield, USA",
    email: "daniel.evans@example.com",
    emergencyContact: "Olivia Evans (+1 555-543-2109)",
    allergies: ["Pollen"],
    medications: ["Cetirizine (10 mg daily for allergies)"],
    bodyTemperature: "37",
    heartRate: "72",
    bloodPressure: "118",
    respiratory: "16"
  },
  {
    id: "PB-010",
    name: "Noah Davis",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    date: "2028-09-13",
    time: "01:00 PM",
    doctor: "Dr. Richard Allen",
    doctorAvatar: "https://randomuser.me/api/portraits/men/26.jpg",
    treatment: "Body Contouring",
    status: "Scheduled",
    hpi: "HPI-010",
    expiryDate: "2032-01-01",
    age: "33 years old",
    gender: "Male",
    birthday: "1991-12-30",
    about: "Noah has scheduled body contouring to improve body shape.",
    phone: "+1 555-012-3456",
    address: "555 Aspen St, Springfield, USA",
    email: "noah.davis@example.com",
    emergencyContact: "Emma Davis (+1 555-109-8765)",
    allergies: ["Penicillin", "Latex"],
    medications: ["Ibuprofen (200 mg as needed)", "Vitamin D supplements"],
    bodyTemperature: "37.1",
    heartRate: "73",
    bloodPressure: "119",
    respiratory: "16"
  },
  {
    id: "PB-001",
    name: "Sarah Miller",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "2028-09-12",
    time: "09:00 AM",
    doctor: "Dr. Olivia Grant",
    doctorAvatar: "https://randomuser.me/api/portraits/women/21.jpg",
    treatment: "Facial Rejuvenation",
    status: "Completed",
    hpi: "HPI-001",
    expiryDate: "2032-01-01",
    age: "29 years old",
    gender: "Female",
    birthday: "1999-04-28",
    about: "Sarah is a regular patient undergoing facial rejuvenation treatments to maintain skin health.",
    phone: "+1 555-123-4567",
    address: "123 Main St, Springfield, USA",
    email: "sarah.miller@example.com",
    emergencyContact: "John Miller (+1 555-987-6543)",
    allergies: ["Penicillin", "Pollen", "Latex"],
    medications: [
      "Ibuprofen (200 mg as needed)",
      "Cetirizine (10 mg daily for allergies)",
      "Vitamin D supplements"
    ],
    bodyTemperature: "37",
    heartRate: "72",
    bloodPressure: "120",
    respiratory: "16"
  },
  {
    id: "PB-002",
    name: "Maurice Galley",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "2028-09-12",
    time: "12:00 PM",
    doctor: "Dr. David Carter",
    doctorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    treatment: "Laser Hair Removal",
    status: "In Progress",
    hpi: "HPI-002",
    expiryDate: "2032-01-01",
    age: "32 years old",
    gender: "Male",
    birthday: "1992-07-15",
    about: "Maurice is undergoing a series of laser hair removal sessions.",
    phone: "+1 555-234-5678",
    address: "456 Elm St, Springfield, USA",
    email: "maurice.galley@example.com",
    emergencyContact: "Anna Galley (+1 555-654-3210)",
    allergies: ["Pollen", "Latex"],
    medications: ["Cetirizine (10 mg daily for allergies)", "Vitamin D supplements"],
    bodyTemperature: "36.9",
    heartRate: "75",
    bloodPressure: "118",
    respiratory: "17"
  },
  {
    id: "PB-003",
    name: "Julia Watson",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "2028-09-12",
    time: "02:30 PM",
    doctor: "Dr. Emily Ross",
    doctorAvatar: "https://randomuser.me/api/portraits/women/23.jpg",
    treatment: "Botox Injections",
    status: "Scheduled",
    hpi: "HPI-003",
    expiryDate: "2032-01-01",
    age: "27 years old",
    gender: "Female",
    birthday: "1997-03-10",
    about: "Julia has scheduled Botox treatment to reduce fine lines.",
    phone: "+1 555-345-6789",
    address: "789 Oak St, Springfield, USA",
    email: "julia.watson@example.com",
    emergencyContact: "Peter Watson (+1 555-765-4321)",
    allergies: ["Penicillin"],
    medications: ["Ibuprofen (200 mg as needed)"],
    bodyTemperature: "37.1",
    heartRate: "70",
    bloodPressure: "119",
    respiratory: "16"
  },
  {
    id: "PB-004",
    name: "Stephen Hawk",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2028-09-12",
    time: "04:30 PM",
    doctor: "Dr. James Lawson",
    doctorAvatar: "https://randomuser.me/api/portraits/men/24.jpg",
    treatment: "Microdermabrasion",
    status: "Completed",
    hpi: "HPI-004",
    expiryDate: "2032-01-01",
    age: "40 years old",
    gender: "Male",
    birthday: "1984-11-21",
    about: "Stephen underwent microdermabrasion for skin resurfacing.",
    phone: "+1 555-456-7890",
    address: "321 Pine St, Springfield, USA",
    email: "stephen.hawk@example.com",
    emergencyContact: "Laura Hawk (+1 555-321-6547)",
    allergies: ["Latex"],
    medications: ["Vitamin D supplements"],
    bodyTemperature: "37.2",
    heartRate: "74",
    bloodPressure: "121",
    respiratory: "15"
  },
  {
    id: "PB-005",
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2028-09-13",
    time: "09:30 AM",
    doctor: "Dr. Sophia Clark",
    doctorAvatar: "https://randomuser.me/api/portraits/women/25.jpg",
    treatment: "Chemical Peels",
    status: "In Progress",
    hpi: "HPI-005",
    expiryDate: "2032-01-01",
    age: "30 years old",
    gender: "Female",
    birthday: "1995-06-12",
    about: "Emma is receiving chemical peel treatments to improve skin texture.",
    phone: "+1 555-567-8901",
    address: "654 Maple St, Springfield, USA",
    email: "emma.wilson@example.com",
    emergencyContact: "David Wilson (+1 555-432-7654)",
    allergies: ["Pollen", "Penicillin"],
    medications: ["Cetirizine (10 mg daily for allergies)", "Vitamin D supplements"],
    bodyTemperature: "37",
    heartRate: "73",
    bloodPressure: "117",
    respiratory: "16"
  },
  {
    id: "PB-006",
    name: "Victor Ramirez",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    date: "2028-09-13",
    time: "01:00 PM",
    doctor: "Dr. Richard Allen",
    doctorAvatar: "https://randomuser.me/api/portraits/men/26.jpg",
    treatment: "Body Contouring",
    status: "Scheduled",
    hpi: "HPI-006",
    expiryDate: "2032-01-01",
    age: "35 years old",
    gender: "Male",
    birthday: "1989-02-18",
    about: "Victor is scheduled for body contouring treatment to enhance physique.",
    phone: "+1 555-678-9012",
    address: "987 Cedar St, Springfield, USA",
    email: "victor.ramirez@example.com",
    emergencyContact: "Maria Ramirez (+1 555-210-9876)",
    allergies: ["Latex"],
    medications: ["Ibuprofen (200 mg as needed)"],
    bodyTemperature: "37.3",
    heartRate: "76",
    bloodPressure: "122",
    respiratory: "17"
  },
  {
    id: "PB-007",
    name: "Grace Parker",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    date: "2028-09-13",
    time: "04:00 PM",
    doctor: "Dr. Megan Foster",
    doctorAvatar: "https://randomuser.me/api/portraits/women/27.jpg",
    treatment: "Acne Treatment",
    status: "Completed",
    hpi: "HPI-007",
    expiryDate: "2032-01-01",
    age: "26 years old",
    gender: "Female",
    birthday: "1998-09-05",
    about: "Grace completed an acne treatment plan to improve her skin condition.",
    phone: "+1 555-789-0123",
    address: "222 Birch St, Springfield, USA",
    email: "grace.parker@example.com",
    emergencyContact: "Liam Parker (+1 555-654-9870)",
    allergies: ["Penicillin", "Pollen"],
    medications: ["Cetirizine (10 mg daily for allergies)"],
    bodyTemperature: "36.8",
    heartRate: "71",
    bloodPressure: "116",
    respiratory: "16"
  },
  {
    id: "PB-008",
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    date: "2028-09-12",
    time: "12:00 PM",
    doctor: "Dr. David Carter",
    doctorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    treatment: "Laser Hair Removal",
    status: "In Progress",
    hpi: "HPI-008",
    expiryDate: "2032-01-01",
    age: "31 years old",
    gender: "Male",
    birthday: "1993-05-22",
    about: "Michael is undergoing laser hair removal to achieve smoother skin.",
    phone: "+1 555-890-1234",
    address: "333 Willow St, Springfield, USA",
    email: "michael.brown@example.com",
    emergencyContact: "Sophia Brown (+1 555-876-5432)",
    allergies: ["Latex"],
    medications: ["Ibuprofen (200 mg as needed)", "Vitamin D supplements"],
    bodyTemperature: "37.2",
    heartRate: "74",
    bloodPressure: "120",
    respiratory: "15"
  }
];
function PatientsNavbar($$payload, $$props) {
  push();
  let { searchValue = "" } = $$props;
  $$payload.out.push(`<nav class="flex w-full flex-wrap gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2"><div class="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-start"><div class="flex w-full items-center gap-2 md:hidden"><input type="text" placeholder="Search..." class="flex-1 rounded-full border px-3 py-1.5 text-sm"${attr("value", searchValue)}/> <div class="flex gap-1"><button class="btn-dropdown-color1 h-7 w-7 rounded-full text-base font-bold">+</button> <button class="btn-dropdown-color1 h-7 w-7 rounded-full text-base font-bold">−</button></div></div> <input type="text" placeholder="Search patients,treatments.." class="hidden w-56 rounded-full bg-white px-3 py-2 text-sm lg:block"${attr("value", searchValue)}/> <div class="relative hidden md:block"><button class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"><span>Treatment</span> <svg class="ml-1 h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> <div class="relative hidden md:block"><button class="hover:bg-opacity-70 btn-dropdown-color1 flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium md:text-xs lg:px-4 lg:py-2 lg:text-sm"><span>Doctor</span> <svg class="ml-1 h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div> <div class="flex flex-wrap items-center gap-2"><div class="relative hidden md:block"><input id="datepicker" type="text" placeholder="Select Date" class="btn-dropdown-color1 rounded-full w-32 pr-8 pl-3 py-1.5 text-xs lg:w-40 lg:pr-10 lg:pl-4 lg:py-2 lg:text-sm"/> <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v2H9V3a1 1 0 00-1-1H6a1 1 0 00-1 1v2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div> <button class="hidden h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 md:flex lg:hidden"><svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"></path></svg></button> <button class="add-btn-lg-color hidden rounded-full px-3 py-1.5 text-xs md:block lg:px-4 lg:py-2 lg:text-sm">+ Add Patient</button></div></nav> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  pop();
}
function PatientsTable($$payload, $$props) {
  push();
  let patients2 = $$props["patients"];
  let selected = [];
  const getStatusClass = (status) => {
    if (status === "Completed") return "bg-green-100 text-gray-600";
    if (status === "In Progress") return "bg-red-100 text-gray-600";
    return "bg-gray-100 text-gray-600";
  };
  const each_array = ensure_array_like(patients2);
  $$payload.out.push(`<div class="w-full overflow-x-auto rounded-xl bg-white xl:overflow-x-visible"><table class="w-full overflow-hidden rounded-xl text-xs sm:text-sm md:text-base"><thead class="bg-white"><tr class="border-b border-gray-200 text-gray-300"><th class="p-2 text-left sm:p-3"><label class="btn-dropdown-color1 relative flex h-4 w-4 items-center justify-center rounded"><input type="checkbox" class="absolute inset-0 cursor-pointer opacity-0"${attr("checked", patients2.every((p) => selected.includes(p.id)), true)}/> <span class="absolute text-xs font-bold text-white">−</span></label></th><th class="p-2 text-left whitespace-nowrap sm:p-3">Patient ID</th><th class="p-2 text-left whitespace-nowrap sm:p-3">Name</th><th class="p-2 text-left whitespace-nowrap sm:p-3">Date &amp; Time</th><th class="p-2 text-left whitespace-nowrap sm:p-3">Doctor</th><th class="p-2 text-left whitespace-nowrap sm:p-3">Treatment</th><th class="p-2 text-left whitespace-nowrap sm:p-3">Status</th></tr></thead><tbody><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let patient = each_array[$$index];
    $$payload.out.push(`<tr class="cursor-pointer border-b border-gray-200 bg-white transition hover:bg-[#D5F4FE]"><td class="w-8 p-2 sm:p-3"><div class="flex items-center gap-2"><input type="checkbox" class="h-4 w-4 cursor-pointer rounded border border-gray-200 accent-blue-300 transition duration-150 hover:border-blue-300"${attr("checked", selected.includes(patient.id), true)}/> `);
    if (selected.includes(patient.id)) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<button class="text-red-500 hover:text-red-700" title="Delete Patient"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div></td><td class="p-2 whitespace-nowrap sm:p-3">${escape_html(patient.id)}</td><td class="flex items-center gap-2 p-2 sm:gap-3 sm:p-3"><img${attr("src", patient.avatar)}${attr("alt", patient.name)} class="h-6 w-6 rounded-full sm:h-8 sm:w-8"/> <span class="truncate sm:max-w-[150px]">${escape_html(patient.name)}</span></td><td class="p-2 whitespace-nowrap sm:p-3">${escape_html(patient.date)} - ${escape_html(patient.time)}</td><td class="truncate p-2 sm:p-3">${escape_html(patient.doctor)}</td><td class="truncate p-2 sm:p-3">${escape_html(patient.treatment)}</td><td class="p-2 whitespace-nowrap sm:p-3"><span${attr_class(`rounded-full px-2 py-0.5 text-xs font-medium sm:px-3 sm:py-1 sm:text-sm ${getStatusClass(patient.status)}`)}>${escape_html(patient.status)}</span></td></tr>`);
  }
  $$payload.out.push(`<!--]--></tbody></table></div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, { patients: patients2 });
  pop();
}
function _page($$payload, $$props) {
  push();
  let filteredPatients, totalItems, totalPages, paginatedPatients;
  let patients$1 = patients;
  let searchTerm = "";
  let currentPage = 1;
  const itemsPerPage = 6;
  filteredPatients = patients$1.filter((p) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = (p.name?.toLowerCase() ?? "").includes(q) || (p.treatment?.toLowerCase() ?? "").includes(q) || (p.doctor?.toLowerCase() ?? "").includes(q) || (p.status?.toLowerCase() ?? "").includes(q);
    const matchesDoctor = true;
    const matchesTreatment = true;
    const matchesDate = true;
    return matchesSearch && matchesDoctor && matchesTreatment && matchesDate;
  });
  totalItems = filteredPatients.length;
  totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
  paginatedPatients = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $$payload.out.push(`<div class="bg-[#f9f5f4] p-4">`);
  PatientsNavbar($$payload, {});
  $$payload.out.push(`<!----> `);
  if (
    //  Event Handlers
    totalItems > 0
  ) {
    $$payload.out.push("<!--[-->");
    PatientsTable($$payload, { patients: paginatedPatients });
    $$payload.out.push(`<!----> `);
    if (totalPages > 1) {
      $$payload.out.push("<!--[-->");
      Pagination($$payload, { totalItems, itemsPerPage, currentPage });
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]-->`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<p class="py-4 text-center text-gray-500">No patients found for the applied filters.</p>`);
  }
  $$payload.out.push(`<!--]--></div>`);
  pop();
}
export {
  _page as default
};
