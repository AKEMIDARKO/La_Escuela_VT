# La Escuela VT — código fuente original

Exportación del proyecto real de ChatGPT Sites, preparada para GitHub y auditoría. **No es una reconstrucción, maqueta ni un paquete compuesto solo por instrucciones.**

- Versión publicada: **3**.
- Commit original: `ddae08934bca7de3ddfe6f1de8a3d9435bc761e9`.
- **132 archivos originales** recuperados del repositorio; 3.473.711 bytes antes de comprimir.
- La aplicación, sus configuraciones, `package.json`, `pnpm-lock.yaml`, recursos y scripts originales conservan sus bytes. El README y el `.gitignore` de origen se conservan completos en `EXPORTACION/ORIGINALES/`; sus versiones de la raíz añaden documentación y exclusiones para GitHub.
- No se ha modificado, publicado ni desplegado el sitio durante esta exportación.

## Empezar

Descomprime el ZIP y abre **esta carpeta**, que contiene `package.json`, `app/`, `public/` y `pnpm-lock.yaml`. Puedes subir su contenido directamente a un repositorio nuevo; no es necesario reorganizar los archivos.

Requisitos declarados por el proyecto: Node.js **>=22.13.0**, gestor **pnpm 11.25.0**. Comprobado en Linux x64 con Node.js **24.19.0** y pnpm **11.25.0**. Otros sistemas operativos no se han probado en esta exportación.

Con pnpm 11.25.0 ya instalado:

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Si usas Corepack, `corepack pnpm ...` permite usar la versión declarada en `packageManager`. Si no tienes pnpm, puedes instalar la versión fijada con `npm install --global pnpm@11.25.0`. **No utilices `npm install` para reemplazar el lockfile del proyecto ni actualices dependencias como parte de la exportación.**

En un clon limpio se selecciona el perfil `portable` y el script original de desarrollo usa el puerto 5173. La URL efectiva se imprime al arrancar. El perfil de Sites gestionado es configuración local ignorada y no se incluye.

La portada actual no necesita un `.env` con secretos. `.env.example` explica las opciones de herramientas que sí aparecen en el código. Las opciones comentadas no son requisitos de la aplicación.

## Comprobar y compilar

```sh
pnpm exec tsc --noEmit --incremental false
pnpm run lint
node EXPORTACION/verificaciones.mjs .
pnpm run build
```

La utilidad nueva de `EXPORTACION/` comprueba los originales con su manifiesto, imports locales, recursos, traducciones y preferencias. No sustituye una suite E2E ni procede del sitio original.

Para comprobar los hashes del paquete sin instalar dependencias:

```sh
python3 EXPORTACION/verificar_integridad.py
```

En Windows puedes utilizar `py` en lugar de `python3`.

El proyecto no declara un script `test` ni contiene una suite propia de tests. Esa comprobación se registra como **NO EJECUTADA**; sí se han ejecutado las comprobaciones suplementarias descritas en `ESTADO_EXPORTACION.md`.

## Arquitectura real

| Ruta | Contenido |
| --- | --- |
| `app/page.tsx` | Página principal cliente y navegación por anclas; única página de aplicación encontrada. |
| `app/layout.tsx` | HTML raíz, metadatos, favicon y tema antes de pintar. |
| `app/content.ts` | Textos de los siete idiomas y alternativas de la imagen principal. |
| `app/preferences.ts` | Lectura de idioma, tema y movimiento de almacenamiento local. |
| `app/globals.css` | Diseño, responsive, temas, tipografías y efectos. |
| `components/ui/` | Biblioteca de componentes originales; se conservan también los no usados por la portada. |
| `build/` | Adaptador Worker, plugins de Sites y soporte de conectores/preview. Es código fuente, no se ha eliminado por llamarse `build`. |
| `lib/`, `hooks/` | Utilidades, contexto de conectores y hook de móvil. |
| `db/`, `drizzle/`, `examples/d1/` | Soporte opcional y ejemplo D1. El esquema activo está vacío y no hay migraciones SQL. |
| `public/` | Todos los recursos locales versionados: imágenes, favicon, tres fuentes y su licencia. |
| `scripts/` | Scripts originales de instalación, entorno y compilación. |
| `.openai/hosting.json` | Identidad del Site y bindings; se conserva. El ID de proyecto no es una clave de acceso. |
| `EXPORTACION/` | Documentos originales preservados, trazabilidad, registros y herramientas nuevas para verificar esta entrega. |

Framework efectivo: **Vinext 1.0.0-beta.5 sobre Vite 8.0.13**, API compatible con el árbol `app` de Next.js, React/React DOM 19.2.6, TypeScript 5.9.3 y Tailwind CSS 4.2.1. Next.js 16.3.4 figura como dependencia; el script ejecutado no es `next build`.

## Funciones conservadas

- Secciones de inicio, grupo, universo, profesores/alumnos de honor y comunidad, con anclas y menú móvil.
- Siete idiomas: español, inglés, japonés, indonesio, coreano, chino tradicional y tailandés.
- Tema claro/oscuro y preferencias guardadas en el navegador.
- Parallax con el cursor, pausa del movimiento y respeto a movimiento reducido.
- Pestañas de aulas y de profesores/alumnos de honor, componentes accesibles y diseño responsive.
- Arte y escudo del grupo, imágenes responsive y fuentes locales.

Los perfiles concretos de profesores y alumnos de honor aún no estaban implementados en la versión publicada. Se conserva el aviso original de próxima disponibilidad; no se han fabricado perfiles para la exportación.

## Backend e infraestructura

`build/sites-worker.ts` delega las peticiones en el manejador de Vinext y conserva el contexto de conectores. La compilación genera `dist/server/index.js`, `dist/server/wrangler.json` y `dist/client/`. El destino es Cloudflare Workers con `nodejs_compat` y fecha de compatibilidad `2026-05-15`.

La configuración actual declara D1 y R2 como `null`: no hay base de datos de aplicación configurada, datos de usuarios ni migraciones SQL que exportar. `examples/d1/app/api/notes/route.ts` es un ejemplo fuera de `app/`, no una API activa del sitio.

La privacidad y el inicio de sesión de producción los aplica **Sites fuera del repositorio**. Se conserva el helper original `app/chatgpt-auth.ts`, pero no se exportan cookies, secretos OAuth, identidades ni políticas privadas de la plataforma. El mock local de autenticación es código original de desarrollo. Una web compilada y alojada fuera de Sites **no adquiere automáticamente** la restricción privada del Site.

## Ejecución del resultado y despliegue futuro

Después del build, `pnpm start` ejecuta el Worker localmente mediante Wrangler; no despliega. No se ha arrancado esa previsualización ni se ha ejecutado una prueba HTTP/E2E en esta exportación.

Para publicar en Sites en el futuro, se debe seguir su flujo autorizado con este mismo proyecto, una compilación y credenciales nuevas. Para otro despliegue en Workers hay que configurar en la cuenta de destino los recursos y el control de acceso necesarios y revisar la configuración generada. El repositorio incluye el código del Worker y la configuración que lo genera, pero no reproduce el servicio cerrado de autenticación/control de acceso de Sites. Esta entrega **no activa ningún despliegue automático**.

## Resultados y avisos

Typecheck y build han pasado. Lint: 0 errores y 6 advertencias sobre etiquetas `img`. La auditoría de dependencias ha devuelto **62 avisos: 1 crítico, 30 altos, 23 moderados y 8 bajos**. Son coincidencias del árbol de dependencias con la base de avisos consultada; la exposición real de la aplicación no está demostrada por ese conteo. Se conserva el lockfile y no se aplicó `audit fix`.

Lee `ESTADO_EXPORTACION.md`, `EXPORTACION/DEPENDENCIAS_ALERTAS.md` y los registros completos antes de planificar cambios. La revisión visual, WCAG, navegadores y Core Web Vitals están **NO EJECUTADAS**.

## Documentos y licencias

- `INVENTARIO_ARCHIVOS.md`: rutas y tamaños de todo el paquete.
- `SHA256SUMS.txt`: hashes de todos los archivos del paquete excepto el propio listado.
- `ESTADO_EXPORTACION.md`: hechos, pruebas, exclusiones y límites.
- `GUIA_GITHUB.md`: creación de un repositorio con esta estructura.
- `AUDITORIA_GEMINI_ARGON.md`: encargo de auditoría con evidencias y prioridades.
- `EXPORTACION/ARCHIVOS_ORIGINALES.json`: tamaños y hashes del commit original.
- `EXPORTACION/ORIGEN.json`: identidad del origen y versión exportada.
- `EXPORTACION/LICENCIAS_Y_RECURSOS.md`: avisos originales de terceros y límites sobre los recursos gráficos.

No se asigna una licencia pública global al proyecto. Se conservan los avisos originales; la exportación de los recursos del sitio no concede derechos nuevos sobre la marca o ilustraciones.
