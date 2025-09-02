import api from '$lib/api';


export async function createMedicalInfo(formData: FormData) {
	try {
		const res = await api.post('/api/patient-medical-info/',
            
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
		return res.data;
	} catch (error) {
		console.error('Error creating medical info:', error);
		throw error;
	}
}


export async function getPatientMedicalInformation(id: number, page: number = 1, limit: number = 10) {
	try {
		const res = await api.get(`/api/patient-medical-info/patient/${id}/?page=${page}&limit=${limit}`);
		return res.data
	} catch (err: unknown) {
		const msg = (err as any)?.response?.data?.message || (err as Error)?.message || 'Unknown error';
		console.error("Error fetching notifications:", msg);
		throw new Error(msg)
	}
}
