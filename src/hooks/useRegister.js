import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

  const register = async (userData) => {
    setLoading(true);
    setBackendError(null);
    
    const result = await authService.register(userData);
    
    if (result.success) {
      // Redirigir al dashboard después del registro exitoso
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      return true;
    } else {
      setBackendError(result.error);
      return false;
    }
  };

  return {
    register,
    loading,
    backendError,
    clearError: () => setBackendError(null)
  };
};