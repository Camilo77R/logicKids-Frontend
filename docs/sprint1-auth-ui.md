# Sprint 1 — Cierre de Auth y UI

## Que problema estabamos resolviendo

El frontend tenia tres problemas al mismo tiempo:

1. diseño muy basico y lejos del target visual del proyecto;
2. manejo de sesion disperso entre hooks, paginas y localStorage;
3. percepcion de lentitud por una espera artificial y por depender de Render en desarrollo.

## Que decision tomamos

Aplicar una solucion pequena pero limpia:

- `AuthContext` para centralizar sesion;
- `ThemeContext` para modo claro/oscuro;
- `AuthPage.module.css` para compartir el lenguaje visual entre login y register;
- `api.js` con URL configurable y mejor manejo de `401`.

## Por que esto es mejor

### 1. Single Responsibility

- `authService` entiende el backend.
- `AuthContext` guarda y limpia sesion.
- `useLogin` y `useRegister` coordinan UI.
- `ProtectedRoute` decide acceso.
- las paginas renderizan pantalla y nada mas.

### 2. Menos duplicacion

Antes, login y register repetian estructura y estilos de forma pobre.
Ahora comparten un shell visual y un sistema de tokens.

### 3. Alineacion real con Sprint 1

El backend actual solo soporta:

- `full_name` o `nombre`
- `email`
- `password`

No soporta todavia:

- `role` publico en register
- `institution`

Por eso el formulario del frontend se dejo honesto con el sprint real.

## Por que se sentia lento

Habia dos causas:

1. `Register.jsx` esperaba 1 segundo antes de navegar aunque el backend ya hubiera respondido.
2. el frontend apuntaba por defecto a Render, que puede tener cold start.

## Que se cambio para mejorar eso

- se elimino la espera artificial;
- en desarrollo, el frontend usa backend local por defecto;
- Render queda como opcion por `VITE_API_URL`.

## Archivos clave

- `src/services/api.js`
- `src/services/authService.js`
- `src/context/AuthContext.jsx`
- `src/context/ThemeContext.jsx`
- `src/pages/AuthPage.module.css`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/Dashboard.jsx`

## Mapa mental rapido para novatos

- `api.js`
  Conexion base con backend y manejo automatico del token.
- `authService.js`
  Traduce respuestas HTTP a datos simples para la UI.
- `AuthContext.jsx`
  Guarda la sesion del tutor y la comparte a toda la app.
- `useLogin.js` / `useRegister.js`
  Coordinan loading, error y exito de cada formulario.
- `ProtectedRoute.jsx`
  Decide si una pantalla privada puede abrirse o no.

## Resultado esperado

Con esto Sprint 1 queda mucho mas cerca de estar cerrado de verdad:

- login/register integrados;
- sesion persistente;
- logout limpio;
- dashboard base protegido;
- diseño coherente;
- base lista para Sprint 2.
