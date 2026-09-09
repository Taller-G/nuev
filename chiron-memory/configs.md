# config

Setup and configuration — env vars, flags, how to run the project.

## El subprocess de `chiron --version` dentro de `ChironCliDetector` usa un timeout explícit…

What: El subprocess de `chiron --version` dentro de `ChironCliDetector` usa un timeout explícito de 5 segundos. · Why: sin timeout, una instalación de Chiron corrupta o un binario colgado bloquearía indefinidamente el endpoint GET /health. · Where: nuev/src/infrastructure/ChironCliDetector.js · Learned: Cualquier extensión que agregue otra llamada a proceso externo en el detector debe incluir también un timeout acotado. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-12 -->
