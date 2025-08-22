import { env } from '$env/dynamic/public';

const BASE_URL = env.PUBLIC_API_BASE_URL || '';

export interface AppointmentCreatePayload {
    doctorId: number;
    patientId: number;
    treatmentId: number;
    scheduledDate: string; // YYYY-MM-DD
    scheduledTime: string; // HH:MM[:SS]
    status: string;
    // notes?: string;
}

export async function fetchAppointments() {
    const res = await fetch(`${BASE_URL}/api/appointment/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`Failed to fetch appointments: ${res.status}`);
    return res.json();
}

export async function fetchAppointmentById(id: number | string) {
    const res = await fetch(`${BASE_URL}/api/appointment/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`Failed to fetch appointment ${id}: ${res.status}`);
    return res.json();
}

export async function createAppointment(payload: AppointmentCreatePayload) {
    const res = await fetch(`${BASE_URL}/api/appointment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create appointment: ${res.status} ${text}`);
    }
    return res.json();
}

export async function deleteAppointment(id: number | string) {
    const res = await fetch(`${BASE_URL}/api/appointment/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete appointment ${id}: ${res.status} ${text}`);
    }
    return res.json();
}

export async function updateAppointment(
    id: number | string,
    payload: Partial<AppointmentCreatePayload>
) {
    const res = await fetch(`${BASE_URL}/api/appointment/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to update appointment ${id}: ${res.status} ${text}`);
    }
    return res.json();
}