# Context

Esta carpeta guarda estado global compartido.

Se usa cuando varias pantallas necesitan la misma verdad.

Ejemplos:

- `AuthContext` para la sesión del tutor;
- `ThemeContext` para modo claro/oscuro.

No usar `context` para todo.

Si un dato solo vive en una pantalla, mejor dejarlo local.
