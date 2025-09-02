import { env } from '$env/dynamic/public';

const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
export type signUpPayload = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    // confirmPassword: string,
    // role: string,
    createdAt?: string
}

export async function signUp(data: signUpPayload) {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed : ${response.status} ${text}`);
        }
        return response.json();

    } catch (error) {
        console.error(error);
        return null
    }

}
