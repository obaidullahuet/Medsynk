import { env } from '$env/dynamic/public';

const BASE_URL = env.PUBLIC_API_BASE_URL || '';
// const BASE_URL = 'https://cool-centrally-mosquito.ngrok-free.app';
export async function fetchDoctors(page = 1, limit = 10) {
	try {
		const skip = Math.max(0, (page - 1) * limit);
		const res = await fetch(`${BASE_URL}/api/doctor/?skip=${skip}&limit=${limit}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			throw new Error(`Failed to fetch doctors: ${res.status}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error fetching doctors:', err);
		throw err;
	}
}

export async function fetchDoctorById(id: number | string) {
	try {
		const res = await fetch(`${BASE_URL}/api/doctor/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		if (!res.ok) {
			throw new Error(`Failed to fetch doctor ${id}: ${res.status}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error fetching doctor by id:', err);
		throw err;
	}
}

export async function createDoctor(formData: FormData) {
	try {
		const res = await fetch(`${BASE_URL}/api/doctor/`, {
			method: 'POST',
			body: formData
		});
		if (!res.ok) {
			const text = await res.text();
			throw new Error(`Failed to create doctor: ${res.status} ${text}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error creating doctor:', err);
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

export async function updateDoctor(id: number, data: FormData) {
	try {
		const res = await fetch(`${BASE_URL}/api/doctor/${id}`, {
			method: 'PUT',
			body: data
		});

		if (!res.ok) throw new Error(`Failed to update treatment with id ${id}`);
		return await res.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}
export async function deleteDoctor(id: number | string) {
	try {
		const res = await fetch(`${BASE_URL}/api/doctor/${id}`, {
			method: 'DELETE'
		});
		if (!res.ok) {
			const text = await res.text();
			throw new Error(`Failed to delete doctor ${id}: ${res.status} ${text}`);
		}
		return await res.json();
	} catch (err) {
		console.error('Error deleting doctor:', err);
		throw err;
	}
}