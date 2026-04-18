/**
 * useRegister
 * -----------
 * Hook de caso de uso para la pantalla de registro.
 *
 * IDEA:
 * La pantalla arma el formulario, pero este hook decide cómo hablar con el backend
 * y cómo dejar la sesión activa cuando el registro sale bien.
 */
import { useState } from 'react';
import authService from '../services/authService';
import { useAuth } from './useAuth';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const { login: saveSession } = useAuth();

  const register = async (userData) => {
    setLoading(true);
    setBackendError(null);
    
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        if (result.data?.token && result.data?.tutor) {
          // En Sprint 1, registrar tutor también deja sesión activa.
          saveSession(result.data);
        }
        return true;
      } else {
        setBackendError({ message: result.message });
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, backendError, clearError: () => setBackendError(null) };
};
