import { env } from '$env/dynamic/public';

const BASE_URL = env.PUBLIC_API_BASE_URL || '';
// const BASE_URL ="https://htqfccxh-8000.inc1.devtunnels.ms"
export type DoctorAvailabilityPayload = {
  doctorId: number;
  day: string; // e.g., 'monday'
  startTime: string; // ISO time string, e.g., '09:00:00Z'
  endTime: string;   // ISO time string
  createdAt?: string; // optional; server may set
};

// Posts one availability entry
export async function addDoctorAvailability(entry: DoctorAvailabilityPayload) {
  // Fallback single-entry POST (if ever needed)
  const res = await fetch(`${BASE_URL}/api/doctor-availability/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([entry])
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add availability: ${res.status} ${text}`);
  }
  return res.json();
}

// Convenience: post many entries in parallel
export async function addDoctorAvailabilityBulk(entries: DoctorAvailabilityPayload[]) {
  const res = await fetch(`${BASE_URL}/api/doctor-availability/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add availability (bulk): ${res.status} ${text}`);
  }
  return res.json();
}

// Try to fetch availability for a doctor using common endpoint shapes
export async function fetchDoctorAvailability(doctorId: number | string) {
  const endpoints = [
    `${BASE_URL}/api/doctor-availability/doctor/${doctorId}`,
    `${BASE_URL}/api/doctor-availability/${doctorId}`,
    `${BASE_URL}/api/doctor-availability?doctorId=${doctorId}`
  ];
  let lastErr: unknown = null;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) {
        lastErr = new Error(`Failed GET ${url}: ${res.status}`);
        continue;
      }
      return await res.json();
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  throw lastErr ?? new Error('No availability endpoint responded');
}


