# Frontend Architecture and Conventions

## Objetivo de este documento

Explicar para que sirve cada carpeta principal del frontend y como se conectan entre si.

La idea es que alguien nuevo pueda entrar al proyecto sin adivinar.

## Flujo mental del frontend

Pensarlo asi:

`pantalla -> hook -> service -> api -> backend`

Y aparte:

`context -> estado global compartido`

## Capas principales

### `pages`

Contienen pantallas completas.

Responsabilidad:

- mostrar interfaz;
- recoger inputs del usuario;
- disparar acciones.

No deben:

- manejar storage directamente;
- repetir peticiones HTTP;
- guardar reglas globales por su cuenta.

### `hooks`

Encapsulan comportamiento de UI o acceso a contexto.

Responsabilidad:

- manejar loading;
- manejar errores de formulario;
- exponer acciones simples a la página.

Ejemplo:

- `useLogin` permite que `Login.jsx` no tenga toda la lógica de autenticación adentro.

### `services`

Puente con el backend.

Responsabilidad:

- hacer requests;
- transformar respuestas;
- centralizar manejo de errores repetidos.

Ejemplo:

- `authService` traduce la respuesta real del backend a `tutor + token`.

### `api`

Instancia base de Axios.

Responsabilidad:

- definir base URL;
- adjuntar JWT;
- reaccionar a `401` en rutas privadas.

### `context`

Estado global de la aplicación.

Responsabilidad:

- compartir una sola verdad entre varias pantallas.

Ejemplo:

- `AuthContext` guarda la sesión del tutor.
- `ThemeContext` guarda modo claro/oscuro.

Analogía:

Es como la recepción de un edificio. Todos consultan ahí la misma verdad, en vez de que cada oficina invente una copia distinta.

### `routes`

Define navegación y control de acceso.

Responsabilidad:

- mapear rutas a pantallas;
- bloquear o redirigir según sesión.

Ejemplo:

- `ProtectedRoute`
- `PublicRoute`

### `components`

Piezas reutilizables de interfaz.

Responsabilidad:

- evitar duplicación visual;
- mantener consistencia.

### `utils`

Helpers pequeños que no son páginas ni servicios.

Ejemplo:

- `authStorage`

## Convenciones oficiales del frontend

- El frontend no inventa reglas de negocio.
- El contrato del backend manda.
- Si varias pantallas comparten estado, se evalúa usar `context`.
- Si una pantalla repite lógica de red o sesión, se mueve a hook o service.
- Si algo es reutilizable visualmente, se mueve a `components`.
- Si un comentario existe, debe explicar intención o decisión.

## Cuándo usar `context`

Usarlo cuando:

- varias rutas necesitan el mismo dato;
- el dato debe sobrevivir mientras navega el usuario;
- no queremos pasar props por muchos niveles.

No usarlo cuando:

- el dato solo vive en una pantalla;
- un `useState` local resuelve el problema.

## Cómo pensar una ruta protegida

- frontend: decide qué pantalla mostrar;
- backend: decide qué petición aceptar.

La seguridad real vive en backend.
La experiencia ordenada vive también en frontend.
