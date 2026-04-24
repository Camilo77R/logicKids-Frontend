import { useNavigate } from "react-router-dom";
import LogicKidsLogo from "../components/LogicKidsLogo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import { useDashboardSummary } from "../hooks/useDashboardSummary";

function DashboardMetrics({ metrics }) {
  if (!metrics.length) {
    return (
      <article className="card dashboard-empty">
        <span className="badge">Sin metricas</span>
        <h3 className="dashboard-section__title">Aun no hay datos del grupo</h3>
        <p>
          Cuando el backend entregue actividad real del grupo, aqui veras el resumen
          principal del tutor.
        </p>
      </article>
    );
  }

  return (
    <div className="dashboard-metrics">
      {metrics.map((metric) => (
        <article key={metric.id} className={`card card-metric metric-tone--${metric.tone || "primary"}`}>
          <span className="badge badge-primary">{metric.label}</span>
          <strong className="metric-value">{metric.value}</strong>
          <p>{metric.helper}</p>
        </article>
      ))}
    </div>
  );
}

function DashboardInsights({ insights, group }) {
  const mostPlayedGame = insights?.mostPlayedGame;
  const developmentSkill = insights?.developmentSkill;

  return (
    <div className="dashboard-insights">
      <article className="card card-interactive">
        <span className="badge">Juego mas jugado</span>
        <h3 className="dashboard-section__title">{mostPlayedGame?.name || "Sin datos"}</h3>
        <strong className="metric-value">{mostPlayedGame?.percentage ?? 0}%</strong>
        <p>{mostPlayedGame?.helper || "Aun no hay actividad suficiente para medirlo."}</p>
      </article>

      <article className="card card-interactive">
        <span className="badge">Estado de estudiantes</span>
        <h3 className="dashboard-section__title">Activos vs inactivos</h3>
        <div className="dashboard-split-metric">
          <div>
          
            <span>Activos</span>
            <strong>{group?.activeStudents ?? 0}</strong>
          </div>
          <div>
            <span>Inactivos</span>
            <strong>{group?.inactiveStudents ?? 0}</strong>
          </div>
        </div>
        <p>Este corte ayuda a priorizar seguimiento y reactivacion del grupo.</p>
      </article>

      <article className="card card-interactive">
        <span className="badge">Habilidad mas desarrollada</span>
        <h3 className="dashboard-section__title">{developmentSkill?.name || "Sin datos"}</h3>
        <strong className="metric-value">{developmentSkill?.percentage ?? 0}%</strong>
        <p>{developmentSkill?.helper || "Aun no hay evidencia suficiente para destacarla."}</p>
      </article>
    </div>
  );
}

function RecentActivity({ items }) {
  return (
    <article className="card">
      <div className="dashboard-section__header">
        <div>
          <span className="badge">Actividad reciente</span>
          <h3 className="dashboard-section__title">Lo ultimo que paso en el grupo</h3>
        </div>
      </div>

      {!items.length ? (
        <div className="dashboard-empty">
          <p>No hay actividad reciente por mostrar.</p>
        </div>
      ) : (
        <div className="dashboard-list">
          {items.map((item) => (
            <article key={item.id} className="card card-interactive dashboard-feed-item">
              <div className="dashboard-feed-item__meta">
                <strong>{item.title}</strong>
                <span>{item.timestamp}</span>
              </div>
              <p>{item.description}</p>
              <span className="badge badge-primary">{item.status}</span>
            </article>
          ))}
        </div>
      )}
    </article>
  );
}

function TopPerformers({ students }) {
  return (
    <article className="card">
      <div className="dashboard-section__header">
        <div>
          <span className="badge">Ranking</span>
          <h3 className="dashboard-section__title">Top 3 del grupo</h3>
        </div>
      </div>

      {!students.length ? (
        <div className="dashboard-empty">
          <p>Todavia no hay suficientes resultados para construir el ranking.</p>
        </div>
      ) : (
        <div className="dashboard-ranking">
          {students.map((student) => (
            <article key={student.id} className="card card-interactive dashboard-ranking-item">
              <div className="dashboard-ranking-item__header">
                <div className="dashboard-ranking-item__identity">
                  <span className="dashboard-ranking-item__place">#{student.rank}</span>
                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.badge}</span>
                  </div>
                </div>
                <span className="badge badge-primary">{student.score}%</span>
              </div>
              <p>{student.wins} retos superados esta semana.</p>
            </article>
          ))}
        </div>
      )}
    </article>
  );
}

function FocusStudents({ students }) {
  return (
    <article className="card">
      <div className="dashboard-section__header">
        <div>
          <span className="badge">Seguimiento</span>
          <h3 className="dashboard-section__title">Estudiantes para revisar hoy</h3>
        </div>
      </div>

      {!students.length ? (
        <div className="dashboard-empty">
          <p>No hay estudiantes marcados para seguimiento.</p>
        </div>
      ) : (
        <div className="dashboard-students">
          {students.map((student) => (
            <article key={student.id} className="card card-interactive dashboard-student-card">
              <div className="dashboard-student-card__top">
                <div>
                  <strong>{student.name}</strong>
                  <span>{student.age} anos</span>
                </div>
                <span className="badge badge-primary">{student.progress}%</span>
              </div>
              <p>{student.note}</p>
              <div className="dashboard-student-card__footer">
                <span>Racha actual: {student.streak}</span>
                <span>Progreso general: {student.progress}%</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { summary, isLoading, error, reloadSummary } = useDashboardSummary();
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
              <span>Dashboard inicial de Sprint 2</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <section className="dashboard-hero">
          <div className="dashboard-hero__content">
            <span className="badge badge-primary">HU-09 lista para iterar</span>
            <h1 className="dashboard-hero__title">Hola, {tutorName}</h1>
            <p className="dashboard-hero__description">
              Este resumen usa mocks por ahora y deja listo el patron de servicios para
              conectar datos reales del grupo cuando el backend de Sprint 2 este listo.
            </p>
            <div className="dashboard-actions">
              <button type="button" className="btn-primary" onClick={reloadSummary}>
                {isLoading ? <span className="spinner" aria-hidden="true" /> : null}
                Actualizar resumen
              </button>
              <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
                Ver acceso publico
              </button>
              <button type="button" className="btn-danger" onClick={handleLogout}>
                Cerrar sesion
              </button>
            </div>
          </div>

          <article className="card dashboard-overview-card">
            <span className="badge">Grupo actual</span>
            <strong>{summary?.group?.name || "Cargando grupo..."}</strong>
            <p>{summary?.group?.level || "Preparando informacion del nivel"}</p>
            <div className="dashboard-overview-card__stats">
              <div>
                <span>Activos</span>
                <strong>{summary?.group?.activeStudents ?? "--"}</strong>
              </div>
              <div>
                <span>Promedio</span>
                <strong>{summary?.group?.completionRate ?? "--"}%</strong>
              </div>
              <div>
                <span>Proxima sesion</span>
                <strong>{summary?.group?.nextSessionLabel || "--"}</strong>
              </div>
            </div>
          </article>
        </section>

        {error ? (
          <div className="alert alert-error dashboard-feedback">
            <div>
              <strong>No pudimos cargar el dashboard.</strong>
              <p>{error}</p>
            </div>
            <button type="button" className="btn-subtle" onClick={reloadSummary}>
              Reintentar
            </button>
          </div>
        ) : null}

        {isLoading ? (
          <div className="card dashboard-loading">
            <span className="spinner" aria-hidden="true" />
            <p>Cargando resumen del grupo...</p>
          </div>
        ) : (
          <div className="dashboard-grid dashboard-grid--summary">
            <div className="dashboard-stack">
              <DashboardMetrics metrics={summary?.metrics || []} />
              <DashboardInsights
                insights={summary?.insights}
                group={summary?.group}
              />
              <RecentActivity items={summary?.recentActivity || []} />
            </div>

            <div className="dashboard-stack">
              <TopPerformers students={summary?.topPerformers || []} />
              <FocusStudents students={summary?.focusStudents || []} />

              <article className="card">
                <span className="badge">Estado del grupo</span>
                <h3 className="dashboard-section__title">Resumen rapido</h3>
                <div className="dashboard-summary-list">
                  <div className="dashboard-summary-item">
                    <span>Total de estudiantes</span>
                    <strong>{summary?.group?.totalStudents ?? 0}</strong>
                  </div>
                  <div className="dashboard-summary-item">
                    <span>Inactivos</span>
                    <strong>{summary?.group?.inactiveStudents ?? 0}</strong>
                  </div>
                  <div className="dashboard-summary-item">
                    <span>Edad promedio</span>
                    <strong>{summary?.group?.averageAge ?? 0} anos</strong>
                  </div>
                  <div className="dashboard-summary-item">
                    <span>Revisiones pendientes</span>
                    <strong>{summary?.group?.pendingReviews ?? 0}</strong>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
