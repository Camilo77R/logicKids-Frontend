# LOGIC KIDS - Frontend

## Estado del Sprint (HU-03: 1-3 abril / HU-04: 4-5 abril)

### ✅ COMPLETADO POR JONATHAN (HU-03 y HU-04)

#### HU-03 Registro (entregado el 3 abril - fecha límite: 3 abril)
- Formulario con: nombre, email, institución, contraseña, confirmar contraseña
- Checkbox de términos y condiciones
- Validaciones: campos requeridos, email válido, **contraseña mínimo 8 caracteres**, coincidencia de contraseñas
- CSS modules (estilos separados)
- Icono ver contraseña (👁️/🙈) en ambos campos
- Mock temporal (simula registro mientras no hay backend real)
- Redirección a `/dashboard` (con mock)
- Enlace a login

#### HU-04 Login (entregado el 3 abril - fecha límite: 5 abril)
- Formulario con: email, contraseña
- Enlace "¿Olvidaste tu contraseña?"
- Validaciones: campos requeridos, email válido
- CSS modules (misma paleta profesional)
- Icono ver contraseña (👁️/🙈)
- Mock temporal (simula login mientras no hay backend real)
- Redirección a `/dashboard` (con mock)
- Enlace a registro

### ⏳ PENDIENTE DE DORADO (según Trello)
- Conectar formularios con backend real
- Manejar JWT y guardar token
- Redirección real a dashboard

## Rama actual
`feature/hu01-register-frontend`

## Cómo correr el proyecto
```bash
npm install
npm run dev