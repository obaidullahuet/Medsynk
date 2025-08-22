import { env } from '$env/dynamic/public';

const BASE_URL = env.PUBLIC_API_BASE_URL || '';
// import { BASE_URL } from '$env/static/public';
export async function getTreatments(page = 1, limit = 10) {
	try {
		const res = await fetch(`${BASE_URL}/api/treatment/?page=${page}&limit=${limit}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) throw new Error('Failed to fetch treatments');

		return await res.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getTreatmentById(id: number) {
	try {
		const res = await fetch(`${BASE_URL}/api/treatment/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) throw new Error(`Failed to fetch treatment with id ${id}`);
		return await res.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function createTreatment(data: FormData) {
	try {
		// console.group('Base Url is ', `${BASE_URL}/api/treatment/`);
		const res = await fetch(`${BASE_URL}/api/treatment/`, {
			method: 'POST',
			// headers: { 'Content-Type': 'multipart/form-data' },
			// body: JSON.stringify(data)
			body: data
		});

		if (!res.ok) throw new Error('Failed to create treatment');
		return await res.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updateTreatment(id: number, data: FormData) {
	try {
		const res = await fetch(`${BASE_URL}/api/treatment/${id}`, {
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

export async function deleteTreatment(id: number) {
	const res = await fetch(`${BASE_URL}/api/treatment/${id}`, {
		method: 'DELETE',
		headers: { 'Accept': 'application/json' }
	});
	if (res.ok) {
		try {
			return await res.json();
		} catch {
			return {};
		}
	}
	let message = '';
	try {
		message = await res.text();
	} catch {
		message = '';
	}
	throw new Error(message || `Failed to delete treatment with id ${id}`);
}
