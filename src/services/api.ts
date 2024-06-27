// src/services/api.ts
import axios from 'axios';
import { logout } from './auth'; // Função para realizar o logout

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

export const setAuthToken = (token: string) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Adiciona um interceptor para verificar a validade do token
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
