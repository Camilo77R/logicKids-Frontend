// src/pages/Principal.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Play, LogIn, UserPlus, Brain, Gamepad2, BarChart3, Shield, Users, Trophy } from 'lucide-react';
import CookieBanner from '../components/Cookiebanner';
import './Principal.css';

const Home = () => {
  useEffect(() => {
    const checkWebPSupport = async () => {
      const webpSupport = document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('image/webp') === 5;
      
      if (webpSupport) {
        document.documentElement.classList.add('webp');
        document.documentElement.classList.add('webp-alpha');
        document.documentElement.classList.add('webp-animation');
        document.documentElement.classList.add('webp-lossless');
      }
    };
    
    checkWebPSupport();
    document.documentElement.style.setProperty('--scrollbar-width', '15px');
  }, []);

  return (
    <div className="root">
      <Header />
      
      <main className="main-content">
        <HomeWelcome />
        <InfoSection />
        <Funciona />
        
        
      </main>
      
      <Footer />
      <CookieBanner />
    </div>
  );
};

// Datos de juegos
const gamesData = [
  { title: "Math Adventure", grade: "K-2", icon: "🧮", color: "#FF6B6B", lessons: 24, rating: 4.8 },
  { title: "Word Puzzle", grade: "1-3", icon: "📝", color: "#4ECDC4", lessons: 18, rating: 4.9 },
  { title: "Typing Challenge", grade: "3-5", icon: "⌨️", color: "#45B7D1", lessons: 32, rating: 4.7 },
  { title: "Science Lab", grade: "4-6", icon: "🔬", color: "#96CEB4", lessons: 28, rating: 4.8 },
  { title: "Art Studio", grade: "K-5", icon: "🎨", color: "#FFEAA7", lessons: 15, rating: 4.6 },
  { title: "Music Maker", grade: "1-4", icon: "🎵", color: "#DDA0DD", lessons: 22, rating: 4.9 },
];

// ============================================================
// Componente HomeWelcome (Banner principal moderno)
// ============================================================
const HomeWelcome = () => {
  return (
    <section className="welcome-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="welcome-content"
        >
          <div className="welcome-text">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="welcome-badge"
            >
              <Sparkles className="badge-icon" />
              <span>Plataforma Educativa</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="welcome-title"
            >
              <span className="title-gradient">LogicKids</span>
              <span className="title-sub">Transforma el juego en evidencia cognitiva</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="welcome-description"
            >
              La plataforma interactiva que evalúa y potencia el talento lógico de los niños en tiempo real, 
              midiendo sus capacidades en un entorno de aulas seguras
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="welcome-stats"
            >
              <div className="stat">
                <div className="stat-number">7-12</div>
                <div className="stat-label">Años objetivo</div>
              </div>
              <div className="stat">
                <div className="stat-number">6+</div>
                <div className="stat-label">Habilidades</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Evaluación didáctica</div>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="play-now-btn"
            >
              <Play className="btn-icon" />
              Soy Tutor o Padre 
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="welcome-illustration"
          >
            <div className="floating-cards">
              <div className="float-card card-1"><Brain size={40} strokeWidth={1.5} color="white" /></div>
              <div className="float-card card-2"><Gamepad2 size={40} strokeWidth={1.5} color="white" /></div>
              <div className="float-card card-3"><BarChart3 size={40} strokeWidth={1.5} color="white" /></div>
              <div className="float-card card-4"><Users size={40} strokeWidth={1.5} color="white" /></div>
            </div>
            <div className="gradient-orb"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================
// Componente InfoSection (con estilo GameCard)
// ============================================================
const InfoSection = () => {
  const features = [
    {
      icon: <Brain size={48} strokeWidth={1.5} />,
      title: "Evaluación Cognitiva",
      description: "Nuestros juegos están diseñados para evaluar habilidades cognitivas clave como la memoria, atención, razonamiento lógico y resolución de problemas.",
      color: "#FF6B6B"
    },
    {
      icon: <Gamepad2 size={48} strokeWidth={1.5} />,
      title: "Juegos con Propósito",
      description: "Cada mini-juego fue diseñado con un objetivo educativo específico.",
      color: "#4ECDC4"
    },
    {
      icon: <BarChart3 size={48} strokeWidth={1.5} />,
      title: "Reportes para Tutores",
      description: "Paneles claros que muestran el progreso real del niño.",
      color: "#45B7D1"
    },
    {
      icon: <Shield size={48} strokeWidth={1.5} />,
      title: "Entorno Seguro",
      description: "Aulas controladas por el tutor.",
      color: "#750613"
    },
    {
      icon: <Users size={48} strokeWidth={1.5} />,
      title: "Gestión de Grupos",
      description: "Crea aulas, asigna jóvenes, controla sesiones y revisa resultados desde un solo panel.",
      color: "#96CEB4"
    },
    {
      icon: <Trophy size={48} strokeWidth={1.5} />,
      title: "Gamificación Motivadora",
      description: "Estrellas, insignias y metas reales que premian el esfuerzo, no solo el resultado.",
      color: "#DCFF42"
    }
  ];

  return (
    <section className="info-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <div className="section-badge">
            <Sparkles className="badge-icon" />
            <span>Capacidades</span>
          </div>
          <h2>No es otro juego más</h2>
          <p>Cada elemento fue diseñado para generar datos reales sobre el desarrollo cognitivo infantil</p>
        </motion.div>

        <div className="info-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="info-card"
              style={{ '--card-color': feature.color }}
            >
              <div className="info-card-gradient" style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` }}>
                <div className="info-card-icon">
                  <span className="info-emoji">{feature.icon}</span>
                </div>
              </div>
              <div className="info-card-info">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="info-card-btn"
                >
                  Explorar →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Componente Funciona (con números como iconos)
// ============================================================
const Funciona = () => {
  const steps = [
    {
      number: "01",
      title: "El tutor crea un aula",
      description: "Registra su cuenta institucional y configura un grupo de jóvenes con códigos de acceso únicos.",
      color: "#FF6B6B"
    },
    {
      number: "02",
      title: "Los jóvenes juegan y aprenden",
      description: "Ingresan con su clave secreta y completan minijuegos cognitivos diseñados para su edad.",
      color: "#4ECDC4"
    },
    {
      number: "03",
      title: "Se generan los datos",
      description: "Cada interacción se convierte en evidencia cognitiva: tiempos, aciertos, patrones de decisión.",
      color: "#45B7D1"
    },
    {
      number: "04",
      title: "Recomendaciones personalizadas",
      description: "El sistema genera un perfil cognitivo y sugiere actividades para fortalecer áreas débiles.",
      color: "#750613"
    }
  ];

  return (
    <section className="funciona-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <div className="section-badge">
            <Sparkles className="badge-icon" />
            <span>Proceso</span>
          </div>
          <h2>¿Cómo Funciona?</h2>
          <p>En cuatro pasos simples, de la diversión a la evidencia</p>
        </motion.div>

        <div className="funciona-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="funciona-card"
              style={{ '--card-color': step.color }}
            >
              <div className="funciona-card-gradient" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}>
                <div className="funciona-card-icon">
                  <span className="funciona-number">{step.number}</span>
                </div>
              </div>
              <div className="funciona-card-info">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="funciona-card-btn"
                >
                  Explorar →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Componente GameCard (con animaciones modernas)
// ============================================================
const GameCard = ({ title, grade, icon, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="game-card"
      style={{ '--card-color': color }}
    >
      <div className="game-card-gradient" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
        <div className="game-card-icon">
          <span className="game-emoji">{icon || '🎮'}</span>
        </div>
      </div>
      <div className="game-card-info">
        <h3>{title}</h3>
        <div className="game-card-meta">
          <span className="grade-badge">{grade}</span>
          <div className="rating">
            <Star className="star-icon" />
            <span>4.8</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="play-game-btn"
        >
          Jugar ahora →
        </motion.button>
      </div>
    </motion.div>
  );
};

// ============================================================
// Componente Header (con glassmorphism)
// ============================================================
const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="header"
    >
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo-icon">🎮</div>
          <span className="logo-text">LogicKids</span>
        </Link>
        
        <nav className="header-nav">
          <motion.a href="/grades" whileHover={{ y: -2 }}>Estadísticas</motion.a>
          <motion.a href="/games" whileHover={{ y: -2 }}>Juegos</motion.a>
          <motion.a href="/parents" whileHover={{ y: -2 }}>Padres</motion.a>
          <motion.a href="/teachers" whileHover={{ y: -2 }}>Tutores</motion.a>
        </nav>
        
        <div className="header-actions">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="login-btn">
            <LogIn className="btn-icon-small" />
            Iniciar Sesión
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="signup-btn">
            <UserPlus className="btn-icon-small" />
            Registrarse
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

// ============================================================
// Componente Footer (moderno)
// ============================================================
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🎮</span>
              <span className="logo-text">LogicKids</span>
            </div>
            <p className="footer-tagline">Making learning fun since 2024</p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🎵</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>LogicKids</h4>
              <a href="/about">Sobre Nosotros</a>
              <a href="/contact">Contacto</a>
              <a href="/blog">Blog</a>
            </div>
            <div className="footer-column">
              <h4>Recursos</h4>
              <a href="/parents">Para Padres</a>
              <a href="/teachers">Para Tutores</a>
              <a href="/help">Centro de Ayuda</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="/privacy">Política de Privacidad</a>
              <a href="/terms">Términos de Uso</a>
              <a href="/cookies">Política de Cookies</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 LogicKids. Todos los derechos reservados. Hecho con ❤️ para aprender</p>
        </div>
      </div>
    </footer>
  );
};

export default Home;