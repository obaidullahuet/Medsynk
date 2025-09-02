import { env } from '$env/dynamic/public';
import { token } from '$lib/store/tokenStore';
const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export type LoginPayload = {
    email: string,
    password: string
}

export async function Login(loginData: LoginPayload) {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed : ${response.status} ${text}`);

        }
        const responseData = await response.json();
        console.log(responseData.token)
        // token.set(responseData.token);
        localStorage.setItem('token', responseData.token);
        return responseData

    } catch (error) {
        console.error(error);
        return null

    }
}