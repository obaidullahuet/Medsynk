import api from '$lib/api';

export async function getTreatments(page = 1, limit = 10,search=null) {
	try {
		const res = await api.get('/api/treatment/', {
			params: { page, limit,search }
		});
		return res.data;
	} catch (error: any) {
		console.error(error);
		return [];
	}
}

export async function getTreatmentById(id: number) {
	try {
		const res = await api.get(`/api/treatment/${id}`);
		return res.data;
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

export async function createTreatment(data: FormData) {
	try {
		const res = await api.post('/api/treatment/', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return res.data;
	} catch (error: any) {
		console.error(error);
		throw error;
	}
}

export async function updateTreatment(id: number, data: FormData) {
	try {
		const res = await api.put(`/api/treatment/${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return res.data;
	} catch (error: any) {
		console.error(error);
		throw error;
	}
}

export async function deleteTreatment(id: number) {
	try {
		const res = await api.delete(`/api/treatment/${id}`);
		return res.data;
	} catch (error: any) {
		console.error(error);
		throw error;
	}
}

// export async function getDoctorAgainstTreatmentId(id: number) {
// 	try {
// 		const res = await fetch(`${BASE_URL}/api/treatment/doctors/${id}`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			}
// 		});

// 		if (!res.ok) throw new Error(`Failed to fetch doctor against treatment with id ${id}`);
// 		return await res.json();
// 	} catch (error) {
// 		console.error(error);
// 		return null;
// 	}
	
// }