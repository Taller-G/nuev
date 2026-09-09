# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## nuev usa `node:http` nativo para servir el endpoint — sin Express ni ninguna dependencia…

What: nuev usa `node:http` nativo para servir el endpoint — sin Express ni ninguna dependencia npm. · Why: el proyecto tenía `dependencies: {}` vacío y añadir Express para una sola ruta se consideró innecesario. · Where: nuev/src/index.js · Learned: Si se necesita routing más complejo en el futuro habrá que debatir incorporar Express; hoy la app tiene un único endpoint. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-2 -->
