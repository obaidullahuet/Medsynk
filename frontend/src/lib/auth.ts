import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export function checkAuth(): boolean {
    if (!browser) return true; // Allow server-side rendering
    
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.log('🔒 No token found - Redirecting to login');
        goto('/login', { replaceState: true });
        return false;
    }
    
    return true;
}

export function requireAuth(): void {
    checkAuth();
}

export function logout(): void {
    if (browser) {
        localStorage.removeItem('token');
        console.log('🔒 Logged out - Redirecting to login');
        goto('/login', { replaceState: true });
    }
}
