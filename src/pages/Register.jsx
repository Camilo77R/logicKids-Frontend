import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogicKidsLogo from "../components/LogicKidsLogo";
import ThemeToggle from "../components/ThemeToggle";
import { useRegister } from "../hooks/useRegister";
import styles from "./AuthPage.module.css";

function Register() {
  const navigate = useNavigate();
  const { register, loading, backendError, clearError } = useRegister();
  
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.full_name.trim()) newErrors.full_name = "El nombre es requerido";
    if (!form.email) newErrors.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    else if (form.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    }
    if (!form.confirmPassword) newErrors.confirmPassword = "Confirma tu contraseña";
    else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!aceptaTerminos) newErrors.terminos = "Debes aceptar los términos";
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
    
    const userData = {
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };
    
    const ok = await register(userData);
    if (ok) {
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
          <h1 className={styles.title}>Crear cuenta</h1>
          <p className={styles.subtitle}>
            Registro del tutor alineado con el backend real de Sprint 1 y con el estilo visual de LogicKids final.
          </p>
        </div>

        <div className={styles.card}>
          {backendError && (
            <div className="auth-alert auth-alert--error">{backendError.message}</div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className={`auth-field ${errors.full_name ? "auth-field--error" : ""}`}>
              <label htmlFor="register-full-name">Nombre completo</label>
              <input
                id="register-full-name"
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="María García López"
                autoComplete="name"
              />
              {errors.full_name && (
                <span className="auth-field__error">{errors.full_name}</span>
              )}
            </div>

            <div className={`auth-field ${errors.email ? "auth-field--error" : ""}`}>
              <label htmlFor="register-email">Correo electrónico</label>
              <input
                id="register-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tutor@logickids.edu"
                autoComplete="email"
              />
              {errors.email && (
                <span className="auth-field__error">{errors.email}</span>
              )}
            </div>

            <div className={`auth-field ${errors.password ? "auth-field--error" : ""}`}>
              <label htmlFor="register-password">Contraseña</label>
              <div className="auth-password">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
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

            <div
              className={`auth-field ${
                errors.confirmPassword ? "auth-field--error" : ""
              }`}
            >
              <label htmlFor="register-confirm-password">Confirmar contraseña</label>
              <div className="auth-password">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-password__toggle"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  {showConfirmPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="auth-field__error">{errors.confirmPassword}</span>
              )}
            </div>

            <label className="auth-terms">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
              />
              <span>
                Acepto continuar con el registro y entiendo que esta base corresponde
                al cierre funcional de Sprint 1.
              </span>
            </label>
            {errors.terminos && (
              <span className="auth-field__error">{errors.terminos}</span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary auth-submit"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Creando cuenta...
                </>
              ) : (
                "Crear cuenta"
              )}
            </button>
          </form>

          <div className={styles.note}>
            En esta etapa el registro público crea tutores y deja la sesión activa al
            terminar. Roles institucionales y datos extra vendrán después.
          </div>
        </div>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className={styles.helperLink}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
