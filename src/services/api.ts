// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const setAuthToken = (token: string) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;