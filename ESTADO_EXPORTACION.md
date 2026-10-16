# Estado de la exportación — La Escuela VT

Fecha UTC: `2026-10-16T22:27:42.475240+00:00`. Fecha local correspondiente: 17 de octubre de 2026, Europe/Madrid.

## Resultado

**RECUPERADA LA FUENTE ORIGINAL COMPLETA DEL REPOSITORIO IDENTIFICADO.** Se exportan los **132 archivos** del commit `ddae08934bca7de3ddfe6f1de8a3d9435bc761e9`, con 3,473,711 bytes originales. El commit coincide con el de la versión 3 publicada y su despliegue se consultó en estado `succeeded`. No se ha reconstruido la web ni se ha obtenido el código a partir de HTML servido o capturas.

Origen: proyecto `appgprj_6ac727aaf50c8191a4811c0378a1c83f`, versión guardada `appgprj_6ac727aaf50c8191a4811c0378a1c83f~appgver_26cb171e37ec8191b8eb1287964a1fec`. Se recuperó mediante el acceso oficial al repositorio Git de Sites después de que el mantenimiento del entorno retirase la copia temporal anterior.

## Fidelidad

- Se incluyen todos los archivos versionados de esa revisión, también componentes reutilizables no utilizados, ejemplos opcionales y scripts de soporte.
- Los archivos de aplicación, estilos, recursos, configuraciones, `package.json` y `pnpm-lock.yaml` no se han editado.
- Solo se reemplazaron en la copia de entrega `README.md` y `.gitignore`, para incorporar la preparación solicitada. Sus versiones originales íntegras están en `EXPORTACION/ORIGINALES/`, con hashes que permiten recuperarlas exactamente.
- Se añadieron los documentos de exportación, `.env.example`, registros y verificadores de `EXPORTACION/`. No son código original del sitio y están identificados como nuevos.
- Se conserva `tsconfig.tsbuildinfo` porque existía en la revisión original; es una caché innecesaria y el `.gitignore` ampliado la excluye de un repositorio nuevo.
- No se realizaron commits, pushes, cambios de configuración del Site ni despliegues. El repositorio recuperado siguió sin modificaciones de sus archivos versionados tras las comprobaciones.

## Tecnologías y estructura verificadas

| Elemento | Evidencia |
| --- | --- |
| React 19.2.6 / React DOM 19.2.6 | `package.json` y lockfile originales. |
| Vinext 1.0.0-beta.5 / Vite 8.0.13 | Configuración, dependencias y salida del build ejecutado. |
| Next.js 16.3.4 | Dependencia y APIs compatibles importadas; no se usa su CLI para el build. |
| TypeScript 5.9.3 / Tailwind CSS 4.2.1 | Dependencias, `.ts`/`.tsx`, CSS y configuración PostCSS. |
| Radix UI / shadcn / Lucide | Imports y componentes conservados en `components/`. |
| Cloudflare Worker | `build/sites-worker.ts`, plugin y artefacto generado. |
| D1 / R2 | Soporte opcional disponible; bindings desactivados en el manifiesto actual. |
| Página de aplicación | Una, `app/page.tsx`; layout raíz `app/layout.tsx`. |
| API de aplicación | Ninguna ruta `app/**/route.*` encontrada. El ejemplo de notas está fuera del árbol activo. |
| Esquema / migraciones | `db/schema.ts` vacío de tablas; diario Drizzle sin entradas y ningún `.sql`. |
| Recursos locales | 16 archivos en `public/`, 2,088,754 bytes, incluidos los avisos de fuentes. |
| Lenguajes de archivos | TS, TSX, MTS, MJS, CSS, JSON, YAML y shell; recursos WebP/PNG/SVG/OTF. No hay páginas HTML independientes en el origen. |

La navegación usa anclas `#inicio`, `#grupo`, `#universo`, `#personas`, `#comunidad`, enlace de salto `#contenido`, menú móvil y pestañas. El CSS contiene reglas responsive y para movimiento reducido; su presencia en el código se comprobó, su resultado visual no se midió en navegador.

## Comprobaciones ejecutadas

Entorno: Linux x64, Node.js 24.19.0, pnpm 11.25.0 y Python 3.12.14. Las pruebas se ejecutaron sobre la revisión original recuperada; el código del sitio empaquetado coincide con esa revisión. El README, `.gitignore` y herramientas nuevas de exportación se tratan por separado.

| Comprobación | Estado | Resultado |
| --- | --- | --- |
| Recuperación de Git y coincidencia con versión publicada | EJECUTADA / PASADA | Commit `ddae08934bca7de3ddfe6f1de8a3d9435bc761e9`. |
| Inventario y hashes del árbol original | EJECUTADA / PASADA | 132 archivos recuperados. |
| Instalación con las dependencias fijadas | EJECUTADA / PASADA | 640 paquetes reutilizados, 0 descargados según el instalador; sin alterar el lockfile. |
| Parseo de TS/JS e imports relativos/alias | EJECUTADA / PASADA | 112 imports locales, sin referencias locales rotas encontradas. |
| Rutas de recursos locales literales | EJECUTADA / PASADA | 13 referencias, sin recursos referenciados ausentes. |
| Comprobaciones suplementarias de traducciones y preferencias | EJECUTADA / PASADA | 13 grupos de aserciones; idioma/tema/movimiento, valores inválidos y almacenamiento bloqueado. |
| Typecheck | EJECUTADA / PASADA | `tsc --noEmit --incremental false`, salida 0. |
| Lint | EJECUTADA / CON ADVERTENCIAS | Salida 0, 0 errores, 6 advertencias `@next/next/no-img-element`. |
| Build original | EJECUTADA / PASADA | `node scripts/run-framework.mjs build`, salida 0; Worker y cliente generados. |
| Auditoría de dependencias | EJECUTADA / CON ALERTAS | Salida 1 por 62 avisos; consulta finalizada. No equivale a demostrar explotabilidad. |
| Escaneo de patrones de credenciales | EJECUTADA / SIN COINCIDENCIAS en el alcance registrado | Claves privadas y formatos habituales; no es garantía absoluta de ausencia de secretos. |
| Comparación final de fuente / ZIP / hashes / apertura Git | EJECUTADA al cerrar el paquete | Véase el procedimiento y los contadores de la entrega. El ZIP se vuelve a abrir y se validan sus archivos. |

Registros íntegros: `EXPORTACION/COMPROBACIONES/`. Metadatos y códigos de salida: `RESULTADOS.json` y archivos `*.resultado.json`. Los avisos de plataforma incompatibles durante la instalación corresponden a dependencias opcionales de otros sistemas y el instalador terminó con código 0.

La salida de Vinext incluye una advertencia de clasificación estática de la ruta `/` como `Unknown`. El build terminó con código 0. Esa advertencia no se ha convertido en una afirmación de fallo de navegación.

## Seguridad: resultados sin ocultar

La consulta `pnpm audit --json` registró **62 avisos**: **1 crítico, 30 altos, 23 moderados y 8 bajos**. El aviso crítico devuelto es `GHSA-vcvr-r3jv-pc5j`, asociado a `next` 16.3.4 y titulado por la fuente «Next.js: Remote Code Execution in next/og ImageResponse».

Está demostrado que el gestor de paquetes devuelve esos avisos para este árbol. **No se ha demostrado que el punto vulnerable forme parte de un recorrido accesible del Worker generado o de la web publicada.** La aplicación se ejecuta mediante Vinext; una coincidencia de dependencia no prueba que se utilice cada API de Next.js. Gemini debe comprobar condiciones de exposición, versiones y vigencia de los avisos antes de atribuir una vulnerabilidad explotable a producción.

La salida completa se conserva; las rutas transitivas, versiones y enlaces de cada aviso están resumidos en `EXPORTACION/DEPENDENCIAS_ALERTAS.md`. No se aplicó ninguna actualización ni `audit fix`.

## Comprobaciones NO EJECUTADAS

| Comprobación | Motivo |
| --- | --- |
| Suite propia `test` de la aplicación | No hay script `test` ni una suite original declarada. No se ha inventado una. |
| Navegador / E2E / interacción real por ratón o teclado | El control de navegador requerido por el entorno no está disponible. |
| Revisión responsive visual, 200 % de texto y WCAG | Necesitan navegador, inspección y mediciones que no se ejecutaron. |
| LCP / INP / CLS / Lighthouse / memoria | No se ha ejecutado instrumentación de navegador ni una medición de rendimiento. |
| Peticiones HTTP al Worker local / pruebas de autenticación de Sites | No se arrancó un servidor de preview ni se probaron sesiones reales. |
| Explotabilidad de avisos de seguridad | No se realizaron pruebas de explotación ni una auditoría de alcance de cada API. |
| Paridad en Windows/macOS | Solo se ejecutaron comandos en Linux x64. |
| Despliegue en GitHub/Workers/Sites | No realizado por instrucción expresa; no forma parte de la validación de esta entrega. |

## Exclusiones y elementos no accesibles como fuente del proyecto

- `.git/`, credenciales temporales de acceso al repositorio, cookies y sesiones: no incluidos.
- `node_modules/`, cachés, perfiles `.sites-runtime/`, estado `.wrangler/`, bases de datos locales y build generado `dist/`: no incluidos como fuente. Se regeneran con la instalación y el build; el inventario del build de prueba está en `EXPORTACION/ARTEFACTOS_BUILD.json`.
- No había archivos `.env` versionados en la revisión. Se añade exclusivamente un ejemplo sin secretos.
- El servicio cerrado de Sites, su control de acceso, OAuth, bases de datos de plataforma y secretos de infraestructura no son archivos del repositorio accesible. No se inventa una implementación para sustituirlos. El helper de autenticación original sí se incluye.
- Los PNG de trabajo y capturas con fondo verde enviados en el chat no forman parte de este árbol Git. Se incluyen todos los recursos reales ya incorporados al proyecto, incluidos los WebP optimizados y sus tamaños responsive. No se han reemplazado por capturas ni recreaciones.
- No hay datos de una base de datos de aplicación ni registros privados de profesores/alumnos que exportar: la versión actual no los contiene.

## Integridad y alcance

`EXPORTACION/ARCHIVOS_ORIGINALES.json` documenta los hashes y tamaños originales. `SHA256SUMS.txt` cubre cada archivo de la entrega excepto ese mismo listado. El hash del ZIP completo se proporciona junto al enlace de descarga; no puede incrustarse como hash del propio ZIP dentro del mismo ZIP sin una referencia circular.

El paquete contiene la aplicación real y los recursos necesarios para reproducir su compilación. No afirma que las funciones cerradas del servicio Sites puedan ejecutarse fuera de esa infraestructura sin configuración adicional. Mantener la privacidad original en otro proveedor requiere configurar allí el control de acceso, no copiar credenciales.
