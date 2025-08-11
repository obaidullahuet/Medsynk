const doctors = [
  {
    name: "Dr. Olivia Grant",
    id: "DB-001",
    specialty: "Dermatology",
    status: "Active",
    phone: "(123) 456-7891",
    rating: 4.9,
    reviews: 2150,
    about: "A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments...",
    email: "olivia.grant@clinic.com",
    address: "78 Beauty Boulevard, Suite 4, New York, NY 10011",
    experiences: [
      { role: "Lead Dermatologist", place: "Beauty Derm Clinic", years: "2010 - Present" },
      { role: "Associate Dermatologist", place: "Skin Health Center", years: "2007 - 2010" }
    ],
    photo: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Dr. David Carter",
    id: "DB-002",
    specialty: "Cosmetic Surgery",
    status: "On Leave",
    phone: "(123) 456-7892",
    rating: 4.8,
    reviews: 1980,
    about: "A renowned cosmetic surgeon with extensive experience in advanced cosmetic procedures...",
    email: "david.carter@clinic.com",
    address: "22 Aesthetic Avenue, Suite 7, Los Angeles, CA 90001",
    experiences: [
      {
        role: "Chief Cosmetic Surgeon",
        place: "Aesthetic Surgery Center",
        years: "2012 - Present"
      },
      { role: "Junior Surgeon", place: "Skin Health Center", years: "2008 - 2012" }
    ],
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Dr. Sophia Miller",
    id: "DB-003",
    specialty: "Pediatrics",
    status: "Inactive",
    phone: "(321) 654-9871",
    rating: 4.7,
    reviews: 1320,
    about: "A pediatrician passionate about child healthcare with over a decade of experience in preventive medicine...",
    email: "sophia.miller@clinic.com",
    address: "15 Kids Care Lane, Suite 9, Chicago, IL 60601",
    experiences: [
      { role: "Senior Pediatrician", place: "Happy Kids Clinic", years: "2014 - Present" },
      { role: "Pediatric Resident", place: "Children’s Hospital", years: "2010 - 2014" }
    ],
    photo: "https://randomuser.me/api/portraits/women/72.jpg"
  },
  {
    name: "Dr. Ethan Walker",
    id: "DB-004",
    specialty: "Orthopedics",
    status: "Active",
    phone: "(213) 789-4561",
    rating: 4.6,
    reviews: 980,
    about: "A dedicated orthopedic surgeon specializing in joint replacement and sports injuries...",
    email: "ethan.walker@clinic.com",
    address: "44 Joint Health Rd, Suite 12, Dallas, TX 75201",
    experiences: [
      { role: "Orthopedic Consultant", place: "Joint Recovery Center", years: "2015 - Present" },
      { role: "Orthopedic Surgeon", place: "City Hospital", years: "2011 - 2015" }
    ],
    photo: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    name: "Dr. Isabella Chen",
    id: "DB-005",
    specialty: "Cardiology",
    status: "On Leave",
    phone: "(987) 123-6547",
    rating: 4.9,
    reviews: 2050,
    about: "A cardiologist with expertise in diagnosing and treating cardiovascular diseases...",
    email: "isabella.chen@clinic.com",
    address: "89 Heartbeat Street, Suite 5, San Francisco, CA 94105",
    experiences: [
      { role: "Lead Cardiologist", place: "Heart Wellness Center", years: "2013 - Present" },
      { role: "Cardiology Fellow", place: "Medical University Hospital", years: "2009 - 2013" }
    ],
    photo: "https://randomuser.me/api/portraits/women/81.jpg"
  },
  {
    name: "Dr. Liam Johnson",
    id: "DB-006",
    specialty: "Neurology",
    status: "Inactive",
    phone: "(654) 987-3214",
    rating: 4.5,
    reviews: 860,
    about: "Expert neurologist with a focus on neurodegenerative diseases and patient-centered care...",
    email: "liam.johnson@clinic.com",
    address: "60 Brain Health Blvd, Suite 8, Seattle, WA 98101",
    experiences: [
      { role: "Head Neurologist", place: "Neuro Health Institute", years: "2016 - Present" },
      { role: "Resident Neurologist", place: "City Medical Center", years: "2012 - 2016" }
    ],
    photo: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    name: "Dr. Nathan Brooks",
    id: "DB-010",
    specialty: "Plastic Surgery",
    status: "Active",
    phone: "(555) 234-6789",
    rating: 4.7,
    reviews: 1450,
    about: "An experienced plastic surgeon specializing in reconstructive and cosmetic enhancements.",
    email: "nathan.brooks@clinic.com",
    address: "12 Aesthetic Plaza, Suite 9, Miami, FL 33101",
    experiences: [
      { role: "Senior Plastic Surgeon", place: "Elite Aesthetics", years: "2013 - Present" },
      { role: "Resident Surgeon", place: "City Medical Hospital", years: "2008 - 2013" }
    ],
    photo: "https://randomuser.me/api/portraits/men/83.jpg"
  },
  {
    name: "Dr. Amelia Rivera",
    id: "DB-011",
    specialty: "Endocrinology",
    status: "On Leave",
    phone: "(555) 456-1122",
    rating: 4.8,
    reviews: 1100,
    about: "Specialist in hormone-related conditions with a focus on diabetes and thyroid disorders.",
    email: "amelia.rivera@clinic.com",
    address: "55 Wellness Street, Suite 3, Boston, MA 02110",
    experiences: [
      { role: "Lead Endocrinologist", place: "Metabolic Care Center", years: "2014 - Present" },
      { role: "Clinical Researcher", place: "Harvard Medical Labs", years: "2010 - 2014" }
    ],
    photo: "https://randomuser.me/api/portraits/women/90.jpg"
  },
  {
    name: "Dr. Lucas Perez",
    id: "DB-012",
    specialty: "Ophthalmology",
    status: "Inactive",
    phone: "(555) 678-9901",
    rating: 4.6,
    reviews: 980,
    about: "Dedicated ophthalmologist providing top-notch care for eye health and vision restoration.",
    email: "lucas.perez@clinic.com",
    address: "18 Vision Lane, Suite 10, Denver, CO 80202",
    experiences: [
      { role: "Chief Ophthalmologist", place: "Bright Vision Center", years: "2015 - Present" },
      { role: "Ophthalmology Resident", place: "City Eye Institute", years: "2010 - 2015" }
    ],
    photo: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    name: "Dr. Chloe Anderson",
    id: "DB-013",
    specialty: "Rheumatology",
    status: "Active",
    phone: "(555) 234-2233",
    rating: 4.9,
    reviews: 1590,
    about: "Expert rheumatologist with a passion for treating autoimmune and joint disorders.",
    email: "chloe.anderson@clinic.com",
    address: "9 Joint Health Road, Suite 2, Austin, TX 73301",
    experiences: [
      { role: "Head Rheumatologist", place: "Autoimmune Care Center", years: "2012 - Present" },
      { role: "Research Fellow", place: "National Arthritis Institute", years: "2007 - 2012" }
    ],
    photo: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Dr. Henry Matthews",
    id: "DB-014",
    specialty: "Gastroenterology",
    status: "On Leave",
    phone: "(555) 987-3210",
    rating: 4.5,
    reviews: 900,
    about: "Experienced gastroenterologist focusing on digestive disorders and liver health.",
    email: "henry.matthews@clinic.com",
    address: "44 Digestive Care Blvd, Suite 7, Phoenix, AZ 85004",
    experiences: [
      {
        role: "Consultant Gastroenterologist",
        place: "Digestive Wellness Clinic",
        years: "2013 - Present"
      },
      { role: "GI Specialist", place: "Metro Medical Hospital", years: "2008 - 2013" }
    ],
    photo: "https://randomuser.me/api/portraits/men/66.jpg"
  },
  {
    name: "Dr. Layla Scott",
    id: "DB-015",
    specialty: "Oncology",
    status: "Inactive",
    phone: "(555) 765-4321",
    rating: 4.8,
    reviews: 1750,
    about: "Highly regarded oncologist specializing in personalized cancer treatment and research.",
    email: "layla.scott@clinic.com",
    address: "77 Cancer Care Ave, Suite 11, San Diego, CA 92101",
    experiences: [
      { role: "Lead Oncologist", place: "Hope Cancer Center", years: "2011 - Present" },
      { role: "Clinical Oncologist", place: "University Health Hospital", years: "2007 - 2011" }
    ],
    photo: "https://randomuser.me/api/portraits/women/55.jpg"
  },
  {
    name: "Dr. Samuel Lewis",
    id: "DB-016",
    specialty: "Urology",
    status: "Active",
    phone: "(555) 321-7890",
    rating: 4.7,
    reviews: 1020,
    about: "Urologist with extensive expertise in urinary tract and male reproductive health.",
    email: "samuel.lewis@clinic.com",
    address: "25 Urology Street, Suite 6, Portland, OR 97201",
    experiences: [
      { role: "Chief Urologist", place: "Prostate & Kidney Center", years: "2015 - Present" },
      { role: "Urology Specialist", place: "City Health Hospital", years: "2010 - 2015" }
    ],
    photo: "https://randomuser.me/api/portraits/men/58.jpg"
  },
  {
    name: "Dr. Zoe Martinez",
    id: "DB-017",
    specialty: "Gynecology",
    status: "Active",
    phone: "(555) 432-9876",
    rating: 4.9,
    reviews: 1985,
    about: "Gynecologist dedicated to women’s health, specializing in minimally invasive procedures.",
    email: "zoe.martinez@clinic.com",
    address: "30 Women Wellness Blvd, Suite 8, Orlando, FL 32801",
    experiences: [
      { role: "Senior Gynecologist", place: "Women’s Health Center", years: "2013 - Present" },
      { role: "OB/GYN Resident", place: "Florida Medical University", years: "2009 - 2013" }
    ],
    photo: "https://randomuser.me/api/portraits/women/49.jpg"
  },
  {
    name: "Dr. Olivia Grant",
    id: "DB-001",
    specialty: "Dermatology",
    phone: "(123) 456-7891",
    rating: 4.9,
    reviews: 2150,
    about: "A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments...",
    email: "olivia.grant@clinic.com",
    address: "78 Beauty Boulevard, Suite 4, New York, NY 10011",
    experiences: [
      { role: "Lead Dermatologist", place: "Beauty Derm Clinic", years: "2010 - Present" },
      { role: "Associate Dermatologist", place: "Skin Health Center", years: "2007 - 2010" }
    ],
    photo: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Dr. David Carter",
    id: "DB-002",
    specialty: "Cosmetic Surgery",
    phone: "(123) 456-7892",
    rating: 4.8,
    reviews: 1980,
    about: "A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments...",
    email: "olivia.grant@clinic.com",
    address: "78 Beauty Boulevard, Suite 4, New York, NY 10011",
    experiences: [
      { role: "Lead Dermatologist", place: "Beauty Derm Clinic", years: "2010 - Present" },
      { role: "Associate Dermatologist", place: "Skin Health Center", years: "2007 - 2010" }
    ],
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Dr. Olivia Grant",
    id: "DB-001",
    specialty: "Dermatology",
    phone: "(123) 456-7891",
    rating: 4.9,
    reviews: 2150,
    about: "A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments...",
    email: "olivia.grant@clinic.com",
    address: "78 Beauty Boulevard, Suite 4, New York, NY 10011",
    experiences: [
      { role: "Lead Dermatologist", place: "Beauty Derm Clinic", years: "2010 - Present" },
      { role: "Associate Dermatologist", place: "Skin Health Center", years: "2007 - 2010" }
    ],
    photo: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Dr. David Carter",
    id: "DB-002",
    specialty: "Cosmetic Surgery",
    phone: "(123) 456-7892",
    rating: 4.8,
    reviews: 1980,
    about: "A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments A highly skilled dermatologist with over 15 years of experience in providing specialized skin treatments...",
    email: "olivia.grant@clinic.com",
    address: "78 Beauty Boulevard, Suite 4, New York, NY 10011",
    experiences: [
      { role: "Lead Dermatologist", place: "Beauty Derm Clinic", years: "2010 - Present" },
      { role: "Associate Dermatologist", place: "Skin Health Center", years: "2007 - 2010" }
    ],
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];
export {
  doctors as d
};
