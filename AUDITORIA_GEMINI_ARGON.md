# Encargo de auditoría técnica — Gemini Argon

## Objetivo y restricciones

Audita el código real de **La Escuela VT**, no una captura, maqueta ni una reconstrucción. La revisión de origen es `ddae08934bca7de3ddfe6f1de8a3d9435bc761e9`, versión publicada 3. Lee el proyecto completo que esté accesible y no afirmes haber inspeccionado archivos que no hayas podido abrir.

La tarea es analizar y proponer correcciones verificables. **No elimines funciones, no cambies la identidad visual, no simplifiques la aplicación para hacer pasar pruebas, no alteres el lockfile sin explicar el motivo y no modifiques ni despliegues producción sin autorización.** Los parches deben ser revisables y estar separados de la revisión original.

## 1. Confirmación de acceso y trazabilidad

1. Abre `ESTADO_EXPORTACION.md`, `EXPORTACION/ORIGEN.json` y el manifiesto `EXPORTACION/ARCHIVOS_ORIGINALES.json`.
2. Confirma que puedes leer código auténtico: `app/page.tsx`, `app/layout.tsx`, `app/content.ts`, `app/preferences.ts`, `app/globals.css`, `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `build/sites-worker.ts` y los componentes importados.
3. Revisa todos los directorios del inventario. Conserva y distingue los componentes no usados, código de infraestructura y ejemplos de una API activa.
4. Verifica `SHA256SUMS.txt`. README y `.gitignore` originales están preservados en `EXPORTACION/ORIGINALES/`; las herramientas y documentos de `EXPORTACION/` son adiciones explícitas de la exportación.
5. Publica un inventario de archivos leídos, no accesibles y comprobaciones ejecutadas. Si el acceso al ZIP/GitHub es incompleto, detente en ese punto y explica la limitación; no inventes una web equivalente.

## 2. Reproducir el estado sin modificarlo

Usa Node.js >=22.13.0 y pnpm 11.25.0, respetando el lockfile. Registra versiones reales, sistema operativo, fecha, comandos y códigos de salida.

```sh
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit --incremental false
pnpm run lint
node EXPORTACION/verificaciones.mjs .
pnpm run build
pnpm audit --json
```

No hay una suite original `test` declarada. Distingue las comprobaciones suplementarias de la exportación de tests originales. Cualquier prueba nueva debe identificar el caso, el riesgo que cubre y su procedencia.

La ejecución original registrada pasó typecheck y build. Lint: 0 errores, 6 advertencias sobre `img`. La consulta de dependencias devolvió 62 avisos: 1 crítico, 30 altos, 23 moderados, 8 bajos. Revisa la salida íntegra en `EXPORTACION/COMPROBACIONES/dependencias_audit.log` y el resumen `EXPORTACION/DEPENDENCIAS_ALERTAS.md`. No conviertas la mera presencia de un paquete vulnerable en una afirmación de explotación de producción.

El framework ejecutado es Vinext sobre Vite, aunque el paquete Next.js y su API compatible estén presentes. Analiza el Worker y los módulos que realmente se empaquetan antes de atribuir a la web fallos de APIs que no utiliza.

## A. Calidad del código y arquitectura

- Errores de sintaxis, tipos, ejecución y límites cliente/servidor; importaciones estáticas y dinámicas, alias, extensiones `.mts`/`.mjs` y módulos virtuales de Workers.
- Componentes excesivamente complejos, hooks, efectos, dependencias de efectos, limpieza de listeners, `requestAnimationFrame`, estado redundante y consistencia entre SSR e hidratación.
- Duplicaciones de estilos y reglas responsive, selectores que se sobrescriben, código obsoleto, componentes sin uso y oportunidades de separación de responsabilidades. No elimines la biblioteca completa por no estar usada hoy sin proponer un cambio acotado.
- Tipado y organización de las traducciones; cobertura de todos los idiomas y etiquetas accesibles; validación de valores guardados y comportamiento con `localStorage` bloqueado.
- Versiones y conflictos de dependencias, override de Sharp, compatibilidad React/RSC/Vite/Vinext y exactitud de scripts y documentación.
- Mantenibilidad, escalabilidad de rutas y perfiles futuros sin inventar funcionalidades existentes.

## B. Rendimiento y cuellos de botella

- Analiza el JavaScript/CSS que llega al navegador y los módulos realmente usados. Diferencia dependencias instaladas de bytes servidos al cliente.
- Evalúa renderizados, hidratación, listeners, cancelación de animaciones, uso de CPU/memoria y trabajo por movimiento del ratón.
- Inspecciona imagen principal, `srcset`, `sizes`, dimensiones intrínsecas, `fetchPriority`, lazy loading y compresión. Comprueba si el aviso de `img` corresponde a un problema medido; no sustituyas automáticamente imágenes ya optimizadas por una API incompatible con el runtime.
- Revisa fuentes locales, carga inicial, caché de recursos, solicitudes redundantes y posibilidades reales de división del código y carga diferida.
- Mide LCP, INP y CLS con una herramienta de navegador reproducible, indicando viewport, dispositivo, conexión y condiciones de caché. No inventes puntuaciones Lighthouse ni milisegundos.
- D1/R2 están desactivados. No atribuyas consultas lentas ni registros a una base de datos que esta versión no usa. Si se activan en una rama de auditoría, separa esa prueba del estado original.

## C. Seguridad

- Valida los avisos de dependencias contra fuentes primarias vigentes. Separa dependencias de desarrollo, bibliotecas de runtime y APIs alcanzables; confirma precondiciones y ámbito de cada aviso.
- Investiga primero la clasificación crítica reportada para `next/og ImageResponse`, comprobando si existe un recorrido de datos no confiables hacia esa API en este Worker. Indica cuando no se demuestra.
- Analiza XSS, contenido inyectado, el script inicial de tema, CSP y uso de datos externos. Un `dangerouslySetInnerHTML` con texto constante no prueba por sí solo una inyección explotable.
- Revisa validaciones, redirecciones, origen de headers, CSRF en acciones con estado, cookies y aislamiento de contexto entre peticiones cuando corresponda.
- Audita `app/chatgpt-auth.ts`, plugins de desarrollo y contexto de conectores. El mock de localhost no debe confundirse con autenticación de producción.
- La privacidad del Site es infraestructura externa. No afirmes que subir el código a otro host transfiere automáticamente su política de acceso. No aceptes headers de identidad del cliente como prueba de autenticación en un despliegue que no tenga una capa confiable que los genere.
- Inspecciona bindings, endpoints, secretos, permisos excesivos y posibles filtraciones. No incluyas tokens/cookies/contraseñas en evidencias; redacta sus valores si aparecen.
- No ejecutes ataques contra la publicación ni añadas autenticación o permisos nuevos sin autorización.

## D. Diseño, usabilidad y accesibilidad

- Comprueba escritorio, tableta y móvil en varios viewports; orientaciones y ampliación de texto al 200 %. Busca scroll horizontal, recortes, superposiciones, orden de lectura y estabilidad del layout.
- Prueba todos los idiomas, especialmente textos largos y escrituras japonesa, coreana, china tradicional y tailandesa. Inspecciona sustitución de fuentes, interlineado y separación de caracteres.
- Revisa los dos temas: contraste de texto, controles, foco, bordes, tarjetas y arte. Conserva escudo, ilustraciones, identidad y efecto de cursor solicitado.
- Prueba ratón, touch y teclado; menú, selector de idioma, pestañas, pausa del movimiento, enlaces de salto y navegación por anclas.
- Audita semántica, nombres accesibles, orden del foco, portales Radix, roles y estados ARIA; interpreta las imágenes decorativas frente a la ilustración principal con alternativa localizada.
- Comprueba `prefers-reduced-motion`, persistencia y comportamiento sin almacenamiento.
- Documenta la evidencia visual de cada defecto sin confundir un breakpoint declarado en CSS con una prueba visual ejecutada. No atribuyas cumplimiento WCAG sin comprobar criterios concretos.

## E. SEO y accesibilidad del contenido

- Revisa metadatos de servidor y actualizaciones del cliente, idioma del documento, headings, enlaces internos y texto alternativo.
- Determina el tratamiento real de idiomas para indexación y URLs; no des por existente un sistema de rutas traducidas que no está implementado.
- Busca `robots.txt`, sitemap, canonical, hreflang y datos estructurados; si faltan, indica el archivo buscado y cuándo tendría sentido incorporarlos.
- Distingue la política privada actual de una futura publicación pública antes de considerar una falta de indexación como defecto.
- Revisa compatibilidad de metadatos con Vinext/Workers y consistencia de favicon/recursos sin proponer cambios de identidad innecesarios.

## F. Informe, prioridades y parches

Entrega una tabla por hallazgo con estas columnas:

| ID | Estado de evidencia | Archivo y línea | Descripción técnica | Evidencia reproducible | Gravedad | Impacto | Solución | Parche | Prueba |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

- Gravedad: **crítica, alta, media o baja**. Justifica la gravedad aplicada a la aplicación; no la copies de una dependencia sin analizar su alcance.
- Estado: **DEMOSTRADO**, **HIPÓTESIS/PENDIENTE DE MEDICIÓN**, **NO REPRODUCIDO** o **NO APLICA**. Las limitaciones de acceso deben quedar aparte.
- Cita archivo, línea o función y comando/pasos para reproducir. Adjunta fragmento mínimo y salida real, evitando secretos.
- Prioriza por impacto en seguridad, disponibilidad, rendimiento, accesibilidad y UX; considera esfuerzo y riesgo de regresión.
- Da código corregido o un parche `diff` acotado sobre esta revisión. Si necesitas nuevos archivos o dependencias, explica por qué y cómo mantener la compatibilidad.
- Define pruebas antes/después para cada parche, incluyendo idiomas, temas, móvil, teclado, almacenamiento bloqueado y movimiento reducido cuando el cambio los afecte.
- No incluyas mejoras puramente subjetivas como fallos demostrados. Separa los asuntos de licencia que necesitan revisión de las vulnerabilidades técnicas.

Finaliza con: resumen de comprobaciones ejecutadas/no ejecutadas; hallazgos confirmados frente a hipótesis; propuestas por prioridad; archivos que cambiaría cada propuesta; riesgos pendientes; y decisión sobre si existe evidencia suficiente para aplicar cada parche. No publiques ni modifiques producción.
