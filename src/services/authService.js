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
      // Manejar diferentes códigos de error según lo que dijo Camilo
      if (error.response?.status === 409) {
        return {
          success: false,
          message: 'El correo ya está registrado. Usa otro o inicia sesión.'
        };
      }
      if (error.response?.status === 400) {
        return {
          success: false,
          message: 'Datos inválidos. Revisa los campos.'
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrar. Intenta de nuevo.'
      };
    }
  }
};

export default authService;