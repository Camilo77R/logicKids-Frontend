// src/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const result = await authService.login(email, password);

    if (result.success) {
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
      navigate('/dashboard');
      return true;
    } else {
      setError({ message: result.message });
      return false;
    }
  };

  return { login, loading, error, clearError: () => setError(null) };
};