# convention

A rule the codebase follows — naming, patterns, and where things live.

## `write_manifest` en `install.sh` se llama DESPUÉS del sanity check post-instalación (que…

What: `write_manifest` en `install.sh` se llama DESPUÉS del sanity check post-instalación (que confirma que el binario funciona), cubriendo todos los caminos de salida exitosa: fresh install, upgrade y update-only. · Why: escribir el manifiesto antes del sanity check podría dejar un manifiesto con una versión válida para un binario que en realidad está roto. · Where: chiron-cli-releases/install.sh · Learned: Si se agrega un nuevo camino de salida exitosa a install.sh, debe incluir una llamada a write_manifest antes del exit. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-13 -->

## El manifiesto Chiron vive en `${CHIRON_HOME:-~/.chiron}/manifest.json` con los campos `ve…

What: El manifiesto Chiron vive en `${CHIRON_HOME:-~/.chiron}/manifest.json` con los campos `version` (string), `channel` (string) e `installed_at` (ISO-8601 UTC). · Why: `CHIRON_HOME` es la variable canónica de base en los installers — el manifiesto la respeta para ser consistente. · Where: chiron-cli-releases/install.sh, nuev/src/infrastructure/ChironCliDetector.js <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-4 -->

## El campo `chiron_cli.source` en la respuesta de `GET /health` indica el origen de la dete…

What: El campo `chiron_cli.source` en la respuesta de `GET /health` indica el origen de la detección: `"manifest"`, `"cli_exec"` o `"none"`. · Why: — · Where: nuev/src/application/GetHealthStatus.js, nuev/src/infrastructure/ChironCliDetector.js <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-5 -->

## `GET /health` responde siempre HTTP 200 aunque el CLI de Chiron no esté disponible.

What: `GET /health` responde siempre HTTP 200 aunque el CLI de Chiron no esté disponible. · Why: la indisponibilidad del CLI no degrada el health de nuev misma; el bloque `chiron_cli` se marca `source: "none"` y `status` de nuev permanece `"ok"`. · Where: nuev/src/interfaces/HealthController.js <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-6 -->

## La función `write_manifest` en `install.sh` está guardada con `|| true`; su equivalente `…

What: La función `write_manifest` en `install.sh` está guardada con `|| true`; su equivalente `Write-Manifest` en `install.ps1` con `try/catch`. · Why: un fallo al escribir el manifiesto nunca debe romper la instalación del CLI. · Where: chiron-cli-releases/install.sh, chiron-cli-releases/install.ps1 <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-8 -->
