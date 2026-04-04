// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>LogicKids - Dashboard</h1>
        <p>Bienvenido, <strong>{user.name || 'Usuario'}</strong></p>
        <button onClick={handleLogout} className={styles.button}>Cerrar sesión</button>
      </div>
    </div>
  );
}