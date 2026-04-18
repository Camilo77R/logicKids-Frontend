// src/hooks/useLogin.js
/**
 * useLogin
 * --------
 * Hook de caso de uso para la pantalla de login.
 *
 * RESPONSABILIDAD:
 * - encender/apagar loading;
 * - pedir login al service;
 * - guardar sesión si todo sale bien;
 * - exponer un error amigable para la UI.
 */
import { useState } from 'react';
import authService from '../services/authService';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: saveSession } = useAuth();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(email, password);

      if (result.success) {
        if (result.data?.token && result.data?.tutor) {
          // Guardamos la sesión en el contexto, no directamente en la página.
          saveSession(result.data);
        }
        return true;
      } else {
        setError({ message: result.message });
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, clearError: () => setError(null) };
};
