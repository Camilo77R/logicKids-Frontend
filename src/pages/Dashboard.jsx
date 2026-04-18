import { useNavigate } from "react-router-dom";
import LogicKidsLogo from "../components/LogicKidsLogo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const tutorName = user?.nombre || user?.full_name || "Tutor";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-shell">
      <div className="dashboard-shell__panel">
        <header className="dashboard-topbar">
          <div className="dashboard-brand">
            <LogicKidsLogo />
            <div>
              <strong>Portal del tutor</strong>
              <span>Sprint 1 cerrado sobre acceso seguro</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <section className="dashboard-hero">
          <div>
            <span className="dashboard-badge">Sesión activa</span>
            <h1 className="dashboard-hero__title">Hola, {tutorName}</h1>
            <p className="dashboard-hero__description">
              Ya podemos defender una base clara de Sprint 1: registro, login,
              persistencia de sesión, logout y protección de rutas.
            </p>
          </div>

          <div className="dashboard-hero__actions">
            <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
              Ver acceso público
            </button>
            <button type="button" className="btn-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </section>

        <div className="dashboard-grid">
          <div className="dashboard-stack">
            <article className="dashboard-card">
              <h3>Qué ya está listo</h3>
              <ul className="dashboard-list">
                <li>Auth alineada con la DB oficial y JWT funcionando.</li>
                <li>Sesión persistente con una sola fuente de verdad en frontend.</li>
                <li>Rutas públicas y privadas separadas sin atajos raros.</li>
              </ul>
            </article>

            <article className="dashboard-card">
              <h3>Qué sigue en Sprint 2</h3>
              <ul className="dashboard-list">
                <li>Dashboard con datos reales del grupo.</li>
                <li>Gestión de estudiantes y códigos de acceso.</li>
                <li>Primer enlace real con estadísticas y control de aula.</li>
              </ul>
            </article>
          </div>

          <div className="dashboard-stack">
            <article className="dashboard-card">
              <h3>Contrato actual</h3>
              <p>
                El frontend ya habla el mismo idioma que el backend de Sprint 1:
                <strong> full_name/email/password </strong> al registrar y sesión
                protegida después del login.
              </p>
            </article>

            <article className="dashboard-card">
              <h3>Estado del entorno</h3>
              <p>
                En desarrollo usamos backend local por defecto para evitar la lentitud
                de Render. Si quieren otro backend, se define con <strong>VITE_API_URL</strong>.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
