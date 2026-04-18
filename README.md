# LogicKids Frontend

Frontend web del tutor para LogicKids.

## Objetivo actual

Cerrar Sprint 1 con una base clara y defendible:

- registro de tutor;
- login de tutor;
- sesión persistente;
- logout seguro;
- rutas protegidas;
- diseño más cercano al target visual de `logickids-final`, pero sin adelantarnos a Sprint 2.

## Regla de oro

La DB oficial manda.

Por eso este frontend se alinea con el backend real de Sprint 1:

- registro con `full_name`, `email`, `password`;
- respuesta con `tutor` y `token`;
- sesión guardada en una sola capa central;
- acceso privado validado con JWT.

## Variables de entorno

Copie `.env.example` a `.env` si necesita cambiar el backend.

Por defecto:

- en desarrollo se espera backend local en `http://localhost:3000/api`;
- si se define `VITE_API_URL`, esa URL manda.

## Estructura importante

- `src/services/authService.js`
  Traduce el contrato HTTP del backend.
- `src/context/AuthContext.jsx`
  Fuente única de verdad para la sesión del tutor.
- `src/context/ThemeContext.jsx`
  Maneja modo claro/oscuro.
- `src/pages/AuthPage.module.css`
  Estilo compartido para login y register.
- `src/routes/ProtectedRoute.jsx`
  Protege pantallas privadas.

## Estructura por capas

Seguimos esta idea:

`page -> hook -> service -> api -> backend`

Y en paralelo:

`context -> estado global compartido`

### `src/pages/`

Pantallas completas.

Ejemplos:

- `Login.jsx`
- `Register.jsx`
- `Dashboard.jsx`

Una página debería:

- renderizar UI;
- capturar eventos;
- llamar hooks o contexto.

Una página no debería:

- hablar directo con `localStorage`;
- duplicar llamadas HTTP;
- decidir reglas de sesión por su cuenta.

### `src/hooks/`

Casos de uso de UI.

Ejemplos:

- `useLogin`
- `useRegister`
- `useAuth`
- `useTheme`

Sirven para que la página no cargue demasiada lógica.

### `src/services/`

Hablan con el backend o traducen datos externos.

Ejemplos:

- `api.js`
- `authService.js`

Aquí vive:

- Axios;
- base URL;
- interceptores;
- transformación del contrato HTTP.

### `src/context/`

Estado global compartido.

Ejemplos:

- `AuthContext`
- `ThemeContext`

Se usan cuando varias pantallas necesitan la misma verdad.

Analogía:

- `context` es como la recepción del edificio.
- todos preguntan ahí por la sesión o el tema,
- en lugar de que cada cuarto invente su propia versión.

### `src/routes/`

Define navegación y acceso.

Ejemplos:

- `AppRouter`
- `ProtectedRoute`
- `PublicRoute`

Aquí decidimos:

- qué pantalla abre cada ruta;
- quién puede entrar;
- a dónde redirigir si no cumple la condición.

### `src/components/`

Piezas reutilizables de UI.

Ejemplos:

- `LogicKidsLogo`
- `ThemeToggle`

### `src/utils/`

Helpers pequeños y reutilizables.

Ejemplo:

- `authStorage.js`

## Convenciones que seguimos

- La DB oficial manda sobre el contrato del sistema.
- El frontend no inventa reglas de negocio.
- La sesión del tutor vive en una sola fuente de verdad.
- Las rutas privadas se protegen tanto en frontend como en backend.
- Las pantallas no deben repetir lógica de servicios ni de storage.
- Los comentarios explican el por qué, no el qué obvio.

## Estado frente al backlog master

Hoy la lectura honesta es esta:

- Sprint 1 backend: muy bien encaminado.
- Sprint 1 frontend: bastante adelantado en auth y sesión.
- Sprint 1 completo: todavía no está 100% cerrado.

Lo que ya cubrimos bastante bien:

- registro tutor;
- login tutor;
- sesión persistente;
- logout;
- rutas protegidas;
- diseño base de login/register.

Lo que sigue pendiente para cerrar Sprint 1 de verdad:

- landing final conectada al flujo;
- entrada clara por actor;
- prueba manual completa del recorrido;
- ajuste final de integración visual y funcional.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Nota para el equipo

Este repo no copia `logickids-final` como producto terminado.
Lo usa como referencia de dirección visual y funcional.
La implementación del equipo se construye aquí, de forma incremental y documentada.
