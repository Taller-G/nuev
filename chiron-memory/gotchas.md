# gotcha

A non-obvious pitfall or trap, learned the hard way.

## El script `start` de `package.json` en nuev apuntaba a `src/interfaces/index.js`, un arch…

What: El script `start` de `package.json` en nuev apuntaba a `src/interfaces/index.js`, un archivo que no existía — la app nunca había arrancado antes de este work order. · Why: — · Where: nuev/package.json · Learned: Antes de asumir que nuev corre, verificar que el entry point declarado exista en disco. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-0 -->

## Los installers de canal (`install-dev.sh`, `install-beta.sh`, `install-dev.ps1`, `install…

What: Los installers de canal (`install-dev.sh`, `install-beta.sh`, `install-dev.ps1`, `install-beta.ps1`) solo setean `CHIRON_CHANNEL` y delegan en el `install.sh`/`install.ps1` publicado — no contienen lógica propia. · Why: un fork derivado divergiría; hay un único installer. · Where: chiron-cli-releases/ · Learned: Cualquier cambio de lógica de instalación va exclusivamente en `install.sh` e `install.ps1`; editar los wrappers de canal es trabajo muerto. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-7 -->

## `UserController.js` en nuev instancia `InMemoryUserRepository` directamente — una violaci…

What: `UserController.js` en nuev instancia `InMemoryUserRepository` directamente — una violación preexistente de Clean Architecture que fue dejada fuera de alcance intencionalmente. · Why: — · Where: nuev/src/interfaces/UserController.js · Learned: Si en el futuro se conecta `UserController` al servidor HTTP, habrá que refactorizarlo para recibir el repositorio por DI desde el composition root. <!-- id: ce33dccf-6e87-4bbb-90c1-8b6f2d221977-9 -->
