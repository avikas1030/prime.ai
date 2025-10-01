import axios from 'axios';
import { serverUrl } from '../config.js';
import { getToken, removeToken } from './auth.js';

// Create axios instance
const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
});

// Request interceptor to add token to headers
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;