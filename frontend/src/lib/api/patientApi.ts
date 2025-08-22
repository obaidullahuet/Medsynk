import { env } from '$env/dynamic/public';

// const BASE_URL = 'https://htqfccxh-8000.inc1.devtunnels.ms';

export async function getPatients(page = 1, limit = 10) {
	try {
		const res = await fetch(`${BASE_URL}/api/patient/?page=${page}&limit=${limit}`);
		if (!res.ok) {
			throw new Error(`Failed to fetch patients: ${res.status}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error fetching patients:', err);
		throw err;
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
	const res = await fetch(`${BASE_URL}/api/appointment/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`Failed to fetch appointments: ${res.status}`);
    return res.json();
}

const BASE_URL = env.PUBLIC_API_BASE_URL || '';

export async function fetchPatients(page = 1, limit = 10) {
	try {
		const skip = Math.max(0, (page - 1) * limit);
		const res = await fetch(`${BASE_URL}/api/patient/?skip=${skip}&limit=${limit}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			throw new Error(`Failed to fetch patients: ${res.status}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error fetching patients:', err);
		throw err;
	}
}

export async function fetchPatientById(id: number | string) {
	try {
		const res = await fetch(`${BASE_URL}/api/patient/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		if (!res.ok) {
			throw new Error(`Failed to fetch patient ${id}: ${res.status}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error fetching patient by id:', err);
		throw err;
	}
}

export async function createPatient(formData: FormData) {
	try {
		const res = await fetch(`${BASE_URL}/api/patient/`, {
			method: 'POST',
			body: formData
		});
		if (!res.ok) {
			const text = await res.text();
			throw new Error(`Failed to create patient: ${res.status} ${text}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error creating patient:', err);
		throw err;
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
		const res = await fetch(`${BASE_URL}/api/patient/${id}`, {
			method: 'PUT',
			body: data
		});

		if (!res.ok) throw new Error(`Failed to update patient with id ${id}`);
		return await res.json();
	} catch (error) {
		console.error(error);
		throw error;
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
		const res = await fetch(`${BASE_URL}/api/patient/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});

		if (res.status === 204) {
			return { success: true };
		}

		const data = await res.json().catch(() => ({}));
		throw new Error(data.message || 'Failed to delete patient');
	} catch (error) {
		console.error('Delete error:', error);
		throw error;
	}
}
