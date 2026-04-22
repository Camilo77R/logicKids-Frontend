# DB Reference

Esta carpeta deja visible la DB como guía para el frontend.

## Regla importante

- `schema-reference.sql` es una **copia de lectura**.
- La **fuente oficial de verdad** sigue siendo:
  - `logicKids-Backend/database/schema.sql`

## Convención de naming congelada

### Código interno
- usar `children` para el módulo de niños
- usar `child` para un registro individual
- usar `groups`, `group_id`, `access_code`, `is_session_active`
- usar `user` para sesión genérica
- usar `tutor` cuando el actor del negocio sea específicamente el tutor

### Texto visible al usuario
- mostrar `estudiantes`
- mostrar `niño`
- mostrar `código de acceso`
- mostrar `Tutor`

## Qué significa esto

- Backend y API se alinean con la DB oficial.
- Frontend interno también sigue esa base.
- La UI puede hablar en lenguaje de producto sin romper la consistencia técnica.
