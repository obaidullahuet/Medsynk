import api from '$lib/api';
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
  const res = await api.post('/api/doctor-availability/add', [entry]);
  return res.data;
}

// Convenience: post many entries in parallel
export async function addDoctorAvailabilityBulk(entries: DoctorAvailabilityPayload[]) {
  const res = await api.post('/api/doctor-availability/add', entries);
  return res.data;
}

// Try to fetch availability for a doctor using common endpoint shapes
export async function fetchDoctorAvailability(doctorId: number | string) {
  const endpoints = [
    `/api/doctor-availability/doctor/${doctorId}`,
    `/api/doctor-availability/${doctorId}`,
    `/api/doctor-availability?doctorId=${doctorId}`
  ];
  let lastErr: unknown = null;
  for (const endpoint of endpoints) {
    try {
      const res = await api.get(endpoint);
      return res.data;
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  throw lastErr ?? new Error('No availability endpoint responded');
}


