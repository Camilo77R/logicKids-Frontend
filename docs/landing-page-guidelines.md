# Landing Page Guidelines

## Objetivo

Guiar la implementación de la landing para que quede alineada con la dirección visual y funcional del proyecto sin romper Sprint 1.

## La landing debe comunicar esto

LogicKids no es una página genérica para "aprender jugando".

Debe comunicar:

- observación;
- diagnóstico;
- seguimiento del tutor;
- acceso ordenado a la plataforma.

## Tono visual recomendado

- oscuro profesional con acento índigo;
- apariencia tecnológica y seria;
- nada de estilo infantil exagerado;
- nada de plantilla genérica de Vite;
- nada de landing “startup random” sin relación con el producto.

## Elementos mínimos

### 1. Navbar

- logo de LogicKids;
- acceso a `login`;
- acceso a `register`.

### 2. Hero principal

Debe responder:

- qué es LogicKids;
- para quién sirve;
- qué valor aporta.

### 3. Mensaje correcto

La narrativa debe priorizar:

- diagnóstico;
- evidencia de desempeño;
- apoyo al tutor.

No priorizar:

- “clases mágicas”;
- “aprender todo jugando”;
- promesas que el sistema no cumple todavía.

### 4. CTA claros

Mínimo:

- `Iniciar sesión`
- `Crear cuenta`

### 5. Entrada por actor

La landing debería dejar claro que existe más de un actor.

Si el flujo del niño todavía no está listo en esta rama:

- se puede mostrar la entrada como informativa;
- o dejarla visualmente presente sin enlazar a una ruta inexistente.

Lo que no debe pasar:

- dejar una ruta rota;
- ocultar por completo que el niño entra distinto.

## Reglas de implementación

- reutilizar tokens y colores ya definidos en `index.css`;
- reutilizar `LogicKidsLogo` cuando aplique;
- respetar modo oscuro y claro;
- evitar estilos inline gigantes si el componente empieza a crecer;
- mantener la landing separada del flujo de auth ya cerrado.

## Criterio de calidad

Una buena landing aquí debe sentirse:

- coherente con login/register;
- más cercana a un portal serio que a una demo escolar;
- clara para tutor y jurado;
- alineada con el backlog master de Sprint 1.
