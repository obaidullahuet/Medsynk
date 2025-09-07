import { env } from '$env/dynamic/public';
import api from '$lib/api';
const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';



export async function sendVoiceNotes(audioFile: File) {
    try {
        const fd = new FormData();
        fd.append('file', audioFile);
        const response = await api.post(`${BASE_URL}/api/note-taker/chat`, fd, {
            headers: {
                'Content-Type':'multipart/form-data'
            }  
        });
        return response.data;
    } catch (err: any) {
        const msg = err.response?.data?.message || err.message;
		console.error("Error fetching doctor appointments:", msg);
		throw new Error(msg);
    }
  
}
