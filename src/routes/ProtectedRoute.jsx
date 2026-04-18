/**
 * ProtectedRoute
 * --------------
 * Bloquea el acceso a pantallas privadas mientras no exista una sesión válida.
 */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mientras se rehidrata/verifica sesión, mostramos espera en vez de decidir demasiado pronto.
  if (isLoading) {
    return (
      <div className="route-loader">
        <div className="route-loader__inner">
          <div className="spinner" />
          <span>Verificando sesión del tutor...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
