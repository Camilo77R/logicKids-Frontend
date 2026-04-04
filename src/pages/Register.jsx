import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister'; // ← Importar tu hook
import styles from './Register.module.css';

function Register() {
  const navigate = useNavigate();
  const { register, loading, backendError, clearError } = useRegister(); // ← usar hook
  
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    institucion: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = 'El nombre es requerido';
    if (!form.email) newErrors.email = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Correo inválido';
    if (!form.institucion) newErrors.institucion = 'La institución es requerida';
    if (!form.password) newErrors.password = 'La contraseña es requerida';
    else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirma tu contraseña';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!aceptaTerminos) newErrors.terminos = 'Debes aceptar los términos';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    clearError(); // Limpiar error del backend al cambiar inputs
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Mapear datos del formulario a lo que espera el backend
    const userData = {
      name: form.nombre,      // backend espera "name"
      email: form.email,
      password: form.password
    };
    
    const ok = await register(userData);
    if (ok) {
      setSuccess('✅ Cuenta creada. Redirigiendo...');
      setTimeout(() => navigate('/dashboard'), 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>LOGIC KIDS</h1>
        <h2 className={styles.subtitle}>Crear Cuenta</h2>
        <h3 className={styles.subSubtitle}>Registrarte como titular</h3>

        {backendError && <div className={styles.error}>{backendError.message}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Los mismos inputs, sin cambios */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
              placeholder="Ej. Dr. Javier Solís"
            />
            {errors.nombre && <span className={styles.fieldError}>{errors.nombre}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="tutor@logickids.edu"
            />
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Institución</label>
            <input
              type="text"
              name="institucion"
              value={form.institucion}
              onChange={handleChange}
              className={`${styles.input} ${errors.institucion ? styles.inputError : ''}`}
              placeholder="Nombre de la escuela o centro"
            />
            {errors.institucion && <span className={styles.fieldError}>{errors.institucion}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="*********"
              />
              <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirmar Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                placeholder="*********"
              />
              <button type="button" className={styles.passwordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
              Al registrarte, aceptas nuestros <strong>Términos de Servicio y Política de Privacidad</strong>.
            </label>
            {errors.terminos && <span className={styles.fieldError}>{errors.terminos}</span>}
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta →'}
          </button>
        </form>

        <p className={styles.loginLink}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

export default Register;