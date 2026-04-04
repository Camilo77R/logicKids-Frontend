import axios from 'axios';

const API_URL = 'https://logickids-backend.onrender.com/api';

// Configuración base de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir token automáticamente a futuras peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  // Registro de usuario - LISTO PARA QUE JONATHAN LO USE
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      
      // Guardar JWT automáticamente
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      // Manejo específico de errores para que Jonathan los muestre
      let errorMessage = 'Error al conectar con el servidor';
      let errorType = 'unknown';
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Datos inválidos. Verifica la información.';
            errorType = 'validation';
            break;
          case 409:
            errorMessage = 'Este email ya está registrado. Por favor usa otro.';
            errorType = 'duplicate';
            break;
          default:
            errorMessage = error.response.data.message || 'Error en el servidor';
        }
      } else if (error.request) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        errorType = 'connection';
      }
      
      return {
        success: false,
        data: null,
        error: {
          message: errorMessage,
          type: errorType,
          status: error.response?.status
        }
      };
    }
  },
  
  // Utilidades que Jonathan también puede usar
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getToken: () => localStorage.getItem('token'),
  
  isAuthenticated: () => !!localStorage.getItem('token'),
  
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default api;