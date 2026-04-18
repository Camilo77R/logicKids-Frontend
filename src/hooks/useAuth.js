/**
 * useAuth
 * -------
 * Atajo para consumir AuthContext sin repetir `useContext(...)` en cada página.
 */
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
};
