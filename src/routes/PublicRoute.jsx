/**
 * PublicRoute
 * -----------
 * Evita que un tutor autenticado vuelva a login/register sin necesidad.
 */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="route-loader">
        <div className="route-loader__inner">
          <div className="spinner" />
          <span>Preparando acceso...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
