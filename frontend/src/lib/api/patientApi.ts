import api from '$lib/api';

// export async function getPatients(page = 1, limit = 10) {
// 	try {
// 		const res = await api.get(`${BASE_URL}/api/patient/?page=${page}&limit=${limit}`,
// 			// {
// 			// 	headers: {
// 			// 		'Authorization': `Bearer ${tokenValue}`
// 			// 	}
// 			// }
// 		);
// 		if (!res.ok) {
// 			throw new Error(`Failed to fetch patients: ${res.status}`);
// 		}
// 		return await res.json();
// 	} catch (err) {
// 		console.error('Error fetching patients:', err);
// 		throw err;
// 	}
// }

export async function getPatients(page = 1, limit = 10) {
	try {
		// Axios automatically includes headers & baseURL (from api.js)
		const res = await api.get(`/api/patient/`, {
			params: { page, limit }
		});

		// response body is already in res.data
		return res.data;

	} catch (err) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching patients:", msg);
		throw new Error(msg);
	}
}


export async function getPatientslist() {
	// try {
	// 	const res = await fetch(`${BASE_URL}/api/patient/?page=${page}&limit=${limit}`);
	// 	if (!res.ok) {
	// 		throw new Error(`Failed to fetch patients: ${res.status}`);
	// 	}
	// 	return await res.json();
	// } catch (err) {
	// 	console.error('Error fetching patients:', err);
	// 	throw err;
	// }
	try {
		console.log("hitting wih axios")
		const res = await api.get(`/api/appointment/`);
		// if (!res.ok) throw new Error(`Failed to fetch appointments: ${res.status}`);
		// return res.json();
		return res.data
	} catch (err) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching patients:", msg);
		throw new Error(msg);
	}

}


export async function fetchPatients(page = 1, limit = 10) {
	try {
		const skip = Math.max(0, (page - 1) * limit);
		const res = await api.get(`/api/patient/`, {
			params: { skip, limit }
		});
		return res.data;
	} catch (err) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching patients:", msg);
		throw new Error(msg);
	}
}

export async function fetchPatientById(id: number | string) {
	try {
		const res = await api.get(`/api/patient/${id}`);
		return res.data
	} catch (err) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching patients:", msg);
		throw new Error(msg);
	}
}

export async function createPatient(formData: FormData) {
	try {
		const res = await api.post("/api/patient/", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});


		return res.data;
	} catch (err) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching patients:", msg);
		throw new Error(msg);
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

export async function updatePatient(id: number, data: FormData) {
	try {
		const res = await api.put(`/api/patient/${id}`, data, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});

		// if (!res.ok) throw new Error(`Failed to update patient with id ${id}`);
		// return await res.json();
		return res.data
	} catch (err) {
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching patients:", msg);
		throw new Error(msg)
	}
}
// export async function deletePatient(id: number | string) {
// 	try {
// 		const res = await fetch(`${BASE_URL}/api/patient/${id}`, {
// 			method: 'DELETE'
// 		});
// 		if (!res.ok) {
// 			const text = await res.text();
// 			throw new Error(`Failed to delete patient ${id}: ${res.status} ${text}`);
// 		}
// 		return await res.json();
// 	} catch (err) {
// 		console.error('Error deleting patient:', err);
// 		throw err;
// 	}
// }

export async function deletePatient(id: number) {
	try {
		const res = await api.delete(`/api/patient/${id}`);

		// if (res.status === 204) {
		// 	return { success: true };
		// }

		// const data = await res.json().catch(() => ({}));
		// throw new Error(data.message || 'Failed to delete patient');
		return res.data
	} catch (err) {
		console.error('Delete error:', err);
		const msg = err.response?.data?.message || err.message;
		console.error("Error fetching patients:", msg);
		throw new Error(msg)
	}
}