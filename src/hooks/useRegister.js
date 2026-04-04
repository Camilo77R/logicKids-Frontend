import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // ← Importa el default

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

  const register = async (userData) => {
    setLoading(true);
    setBackendError(null);
    
    const result = await authService.register(userData);
    
    if (result.success) {
      // Guardar token y usuario si vienen en result.data
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
      setTimeout(() => navigate('/dashboard'), 1000);
      return true;
    } else {
      setBackendError({ message: result.message });
      return false;
    }
  };

  return { register, loading, backendError, clearError: () => setBackendError(null) };
};