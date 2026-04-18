/**
 * AuthProvider
 * ------------
 * Fuente única de verdad para la sesión del tutor.
 *
 * IDEA CLAVE:
 * Login, register, dashboard y rutas privadas no deberían leer/escribir
 * localStorage por su cuenta. Todo pasa por aquí.
 */
import { useEffect, useMemo, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "./auth-context";
import {
  clearTutorSession,
  getStoredToken,
  getStoredTutor,
  saveTutorSession,
} from "../utils/authStorage";

export function AuthProvider({ children }) {
  // Intentamos rehidratar la sesión local para sobrevivir a un refresh del navegador.
  const [user, setUser] = useState(() => getStoredTutor());
  const [token, setToken] = useState(() => getStoredToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyStoredSession = async () => {
      const storedToken = getStoredToken();

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      // Confirmamos con backend que el token guardado sigue siendo válido.
      const result = await authService.verifySession();

      if (!result.success) {
        clearTutorSession();
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    };

    verifyStoredSession();
  }, []);

  // Se usa tanto en login como en register para guardar una sesión recién creada.
  const login = ({ tutor, token: nextToken }) => {
    saveTutorSession({ tutor, token: nextToken });
    setUser(tutor);
    setToken(nextToken);
  };

  // Logout centralizado: limpia storage y estado React a la vez.
  const logout = () => {
    clearTutorSession();
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
