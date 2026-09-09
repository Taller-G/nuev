# architecture

How the system is put together — layers, boundaries, and how data flows.

## nuev tiene cuatro capas Clean Architecture (`domain/`, `application/`, `infrastructure/`,…

What: nuev tiene cuatro capas Clean Architecture (`domain/`, `application/`, `infrastructure/`, `interfaces/`) más un composition root en `src/index.js` que vive fuera de esas capas. · Why: `src/index.js` es el único lugar que puede importar `infrastructure/` directamente; controllers y use cases reciben dependencias por constructor. · Where: nuev/src/index.js · Learned: Cualquier nuevo feature que conecte capas debe cablearse en el composition root, nunca en controllers. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-1 -->

## El canal del CLI en tiempo de ejecución se lee del archivo `${CHIRON_HOME:-~/.chiron}/cli…

What: El canal del CLI en tiempo de ejecución se lee del archivo `${CHIRON_HOME:-~/.chiron}/cli/channel`, no de una variable de entorno. · Why: ese archivo es escrito por `install.sh`/`install.ps1` y es la fuente canónica del canal instalado. · Where: chiron-cli-releases/install.sh, nuev/src/infrastructure/ChironCliDetector.js <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-10 -->

## El puerto de detección del CLI (`ChironCliGateway.js`) vive en `application/`, no en `dom…

What: El puerto de detección del CLI (`ChironCliGateway.js`) vive en `application/`, no en `domain/`. Domain no tiene conocimiento de la detección del CLI. · Why: la detección es un detalle de infraestructura de la app, no un concepto del dominio del negocio; domain solo modela entidades de usuario. · Where: nuev/src/application/ChironCliGateway.js · Learned: Futuros puertos de infraestructura que no sean conceptos de dominio deben seguir el mismo patrón y ubicarse en application/, no en domain/. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-11 -->

## `ChironCliDetector` (infrastructure) detecta el CLI con una cascada de tres pasos: (1) le…

What: `ChironCliDetector` (infrastructure) detecta el CLI con una cascada de tres pasos: (1) leer `~/.chiron/manifest.json`, (2) ejecutar `chiron --version` + leer `~/.chiron/cli/channel`, (3) devolver `not_installed`. Nunca lanza excepciones. · Why: — · Where: nuev/src/infrastructure/ChironCliDetector.js · Learned: Cualquier extensión de la detección debe respetar la cascada y el invariante de no-throw. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-3 -->
