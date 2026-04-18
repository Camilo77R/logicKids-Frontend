/**
 * authService
 * ----------
 * Traduce el contrato HTTP del backend a un formato simple para el frontend.
 *
 * POR QUÉ:
 * Queremos que las páginas y hooks hablen siempre el mismo idioma:
 * `tutor + token`, sin repetir manejo de errores en cada pantalla.
 */
import api from './api';

// El backend responde dentro de `data`, así que normalizamos aquí una sola vez.
const buildAuthSession = (responseData) => ({
  tutor: responseData?.data?.tutor ?? null,
  token: responseData?.data?.token ?? null,
});

const authService = {
  // Registro público del tutor para Sprint 1.
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return {
        success: true,
        data: buildAuthSession(response.data),
        status: response.status
      };
    } catch (error) {
      if (error.response?.status === 400) {
        const backendMsg = error.response?.data?.message || 'Datos inválidos. Revisa los campos.';
        const details = error.response?.data?.errors || [];
        return {
          success: false,
          message: backendMsg,
          details: details,
          status: 400
        };
      }
      if (error.response?.status === 409) {
        return {
          success: false,
          message: 'El correo ya está registrado. Usa otro o inicia sesión.',
          status: 409
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrar. Intenta de nuevo.',
        status: error.response?.status || 500
      };
    }
  },

  // Login del tutor usando email + password.
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return {
        success: true,
        data: buildAuthSession(response.data),
        status: response.status
      };
    } catch (error) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Correo o contraseña incorrectos.',
          status: 401
        };
      }
      if (error.response?.status === 400) {
        return {
          success: false,
          message: error.response?.data?.message || 'Datos de inicio de sesión inválidos.',
          status: 400
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.',
        status: error.response?.status || 500
      };
    }
  },

  // Verifica si el token guardado sigue sirviendo antes de abrir zonas privadas.
  verifySession: async () => {
    try {
      const response = await api.get('/protected/me');
      return {
        success: true,
        data: response.data?.data?.user ?? null,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'No se pudo verificar la sesión.',
        status: error.response?.status || 500,
      };
    }
  }
};

export default authService;
