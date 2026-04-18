/**
 * api.js
 * ------
 * Instancia única de Axios para el portal del tutor.
 *
 * RESPONSABILIDAD:
 * - decidir la base URL;
 * - adjuntar JWT automáticamente;
 * - limpiar sesión si una ruta privada responde 401.
 */
import axios from 'axios';
import { clearTutorSession, getStoredToken } from "../utils/authStorage";

// En local preferimos backend local para evitar la lentitud del cold start de Render.
const DEFAULT_API_URL = import.meta.env.DEV
  ? 'http://localhost:3000/api'
  : 'https://logickids-backend.onrender.com/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Si hay token guardado, lo enviamos en cada request protegida sin repetir lógica.
api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const hasTutorSession = Boolean(getStoredToken());
    const requestUrl = error.config?.url || '';
    const isAuthRequest =
      requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');

    // Solo limpiamos sesión si la app ya estaba autenticada y falló una ruta privada.
    if (error.response?.status === 401 && hasTutorSession && !isAuthRequest) {
      clearTutorSession();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
