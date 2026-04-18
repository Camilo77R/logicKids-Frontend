import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogicKidsLogo from "../components/LogicKidsLogo";
import ThemeToggle from "../components/ThemeToggle";
import { useLogin } from "../hooks/useLogin";
import styles from "./AuthPage.module.css";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useLogin();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await login(form.email, form.password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.background} />
      <div className={styles.themeToggleWrap}>
        <ThemeToggle />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Link to="/login" className={styles.brand}>
            <LogicKidsLogo />
            <div className={styles.brandText}>
              <strong>LogicKids</strong>
              <span>Proyecto de grado · SENA</span>
            </div>
          </Link>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <p className={styles.subtitle}>
            Entra al portal del tutor con una base limpia, protegida y alineada con la DB oficial.
          </p>
        </div>

        <div className={styles.card}>
          {error && <div className="auth-alert auth-alert--error">{error.message}</div>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className={`auth-field ${errors.email ? "auth-field--error" : ""}`}>
              <label htmlFor="login-email">Correo electrónico</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tutor@logickids.edu"
                autoComplete="email"
                autoFocus
              />
              {errors.email && (
                <span className="auth-field__error">{errors.email}</span>
              )}
            </div>

            <div className={`auth-field ${errors.password ? "auth-field--error" : ""}`}>
              <label htmlFor="login-password">Contraseña</label>
              <div className="auth-password">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-password__toggle"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
              {errors.password && (
                <span className="auth-field__error">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary auth-submit"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Ingresando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>
        </div>

        <p className={styles.footer}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" className={styles.helperLink}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
