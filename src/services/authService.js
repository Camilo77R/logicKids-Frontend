import api from './api';

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return {
        success: true,
        data: response.data,
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

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return {
        success: true,
        data: response.data,
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
  }
};

export default authService;