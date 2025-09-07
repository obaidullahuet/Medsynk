import api from '$lib/api';

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
    try {
        const res = await api.get(`/api/appointment/`);
        return res.data
    } catch (err: any) {
        const msg = err.response?.data?.message || err.message;
        console.error("Error fetching appointments:", msg);
        throw new Error(msg)
    }
}

export async function fetchAppointmentById(id: number | string) {
    try {
        const res = await api.get(`/api/appointment/${id}`);
        // if (!res.ok) throw new Error(`Failed to fetch appointment ${id}: ${res.status}`);
        // return res.json();
        return res.data
    } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error("Error fetching patients:", msg);
        throw new Error(msg)
    }
}

export async function createAppointment(payload: AppointmentCreatePayload) {
    try {
        const res = await api.post('/api/appointment/', payload);
        return res.data
    } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error("Error fetching patients:", msg);
        throw new Error(msg)
    }
}

export async function deleteAppointment(id: number | string) {
    try {
        const res = await api.delete(`/api/appointment/${id}`);
        // if (!res.ok) {
        //     const text = await res.text();
        //     throw new Error(`Failed to delete appointment ${id}: ${res.status} ${text}`);
        // }
        // return res.json();
        return res.data
    } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error("Error fetching patients:", msg);
        throw new Error(msg)
    }
}

export async function updateAppointment(
    id: number | string,
    payload: Partial<AppointmentCreatePayload>
) {
    try {
        const res = await api.put(`/api/appointment/${id}`, payload);
        return res.data
    } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error("Error fetching patients:", msg);
        throw new Error(msg)
    }
}

export async function getPatientAppointments(id: number | string,filter:string){
    try {
        const res = await api.get(`/api/appointment/patient/${id}?filter=${filter}`);
        return res.data
    } catch (error) {
        const msg = error.response?.data?.message || error.message;
        console.error("Error fetching patient appointments:", msg);
        throw new Error(msg)
    }
}