// frontend/src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Certifique-se de que a URL base do seu backend está correta
});

// Adiciona um interceptor de requisições para incluir o token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Obtém o token salvo no Login.jsx
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o cabeçalho de Autorização
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;