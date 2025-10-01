// Authentication debugging utilities
import { getToken, isAuthenticated } from './auth.js';
import { serverUrl } from '../config.js';

export const debugAuth = () => {
    console.log("=== Authentication Debug Info ===");
    console.log("Server URL:", serverUrl);
    console.log("Is Authenticated:", isAuthenticated());
    console.log("Token exists:", !!getToken());
    console.log("Token preview:", getToken()?.substring(0, 20) + "...");
    console.log("Current URL:", window.location.href);
    console.log("LocalStorage token:", localStorage.getItem("token")?.substring(0, 20) + "...");
    console.log("================================");
};

export const testAuthFlow = async () => {
    try {
        console.log("Testing authentication flow...");
        
        // Test if we can reach the server
        const response = await fetch(`${serverUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'wrongpassword'
            })
        });
        
        console.log("Server reachable:", response.status);
        
        if (response.status === 400) {
            console.log("✅ Server is responding correctly to auth requests");
        }
        
    } catch (error) {
        console.error("❌ Cannot reach server:", error.message);
        console.log("Check if backend is running on:", serverUrl);
    }
};