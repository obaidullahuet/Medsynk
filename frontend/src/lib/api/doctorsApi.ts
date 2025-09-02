import { env } from '$env/dynamic/public';
import api from '$lib/api';

// const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export async function fetchDoctors(page = 1, limit = 10) {
	// try {
		const skip = Math.max(0, (page - 1) * limit);
		const res = await api.get(`/api/doctor/`, {
			params: {
				skip,
				limit
			}
		});
		return res.data;
	// } catch (err: any) {
		// const msg = err.response?.data?.message || err.message;
		// console.error("Error fetching doctors:", msg);
		// throw new Error(msg)
	// }
}

export async function fetchDoctorById(id: number | string) {
	try {
		const res = await api.get(`/api/doctor/${id}`, {
		});
		return res.data;
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching doctor:", msg);
		throw new Error(msg)
	}
}

export async function createDoctor(formData: FormData) {
	try {
		const res = await api.post(`/api/doctor/`, formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);
		return res.data;
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error creating doctor:", msg);
		throw new Error(msg)
	}
}

// export async function updateDoctor(id: number | string, data: Record<string, unknown>) {
// 	try {
// 		const res = await fetch(`${BASE_URL}/api/doctor/${id}`, {
// 			method: 'PUT',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(data)
// 		});
// 		if (!res.ok) {
// 			const text = await res.text();
// 			throw new Error(`Failed to update doctor ${id}: ${res.status} ${text}`);
// 		}
// 		return await res.json();
// 	} catch (err) {
// 		console.error('Error updating doctor:', err);
// 		throw err;
// 	}
// }

export async function updateDoctor(id: number, data: FormData) {
	try {
		const res = await api.put(`/api/doctor/${id}`, data, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		return res.data;
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error updating doctor:", msg);
		throw new Error(msg)
	}
}

export async function deleteDoctor(id: number | string) {
	try {
		const res = await api.delete(`/api/doctor/${id}`);
		return res.data;
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error deleting doctor:", msg);
		throw new Error(msg)
	}
}


export async function getDoctorAppointments(doctorId: number, date?: string) {
	try {
		let res;

		if (date) {
			res = await api.get(`/api/appointment/doctor/${doctorId}?date=${date}`);
		} else {
			res = await api.get(`/api/appointment/doctor/${doctorId}`);
		}

		return res.data;
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching doctor appointments:", msg);
		throw new Error(msg);
	}
}


export async function getDoctorsForTreatment(treatmentId: number) {
	try {
		const res = await api.get(`/api/treatment/doctors/${treatmentId}`);
		return res.data;
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching doctors for treatment:", msg);
		throw new Error(msg)
	}
}

export async function getDoctorAvailabilityForDate(doctorId: number, day: string) {
	try {
		const res = await api.get(`/api/doctor-availability/?doctorId=${doctorId}&day=${day.trim().toLowerCase()}`);
		return res.data;
	} catch (err: any) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching doctor availability for date:", msg);
		throw new Error(msg)
	}
}
