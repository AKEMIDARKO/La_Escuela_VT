# Llevar La Escuela VT a GitHub

## Carpeta correcta

Descomprime el ZIP y abre `La_Escuela_VT/`. En su raíz deben verse `package.json`, `pnpm-lock.yaml`, `app/`, `public/`, `.openai/` y los documentos de exportación. Esa es la carpeta que se versiona; no necesitas mover cientos de archivos ni crear otro proyecto.

El paquete contiene el código fuente real. Los 132 archivos originales se pueden comprobar con `EXPORTACION/ARCHIVOS_ORIGINALES.json`; los dos documentos originales reemplazados están en `EXPORTACION/ORIGINALES/`.

## Verificar antes de subir

```sh
python3 EXPORTACION/verificar_integridad.py
```

Opcionalmente, después de instalar pnpm 11.25.0 y las dependencias:

```sh
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit --incremental false
pnpm run lint
node EXPORTACION/verificaciones.mjs .
pnpm run build
```

El proyecto conserva avisos de dependencias. `pnpm audit --json` devuelve salida 1 por esos avisos; no ejecutes `audit fix` ni actualizaciones automáticas si lo que quieres es auditar la revisión original.

## Repositorio nuevo

Crea en tu cuenta un repositorio vacío llamado, por ejemplo, `la-escuela-vt`. No selecciones la creación de otro README, licencia o `.gitignore`, porque este paquete ya contiene los suyos. Puede empezar privado mientras se revisan las licencias de gráficos y los resultados de seguridad.

En una terminal dentro de `La_Escuela_VT/`:

```sh
git init --initial-branch=main
git add .
git status
git commit -m "Importar fuente original de La Escuela VT"
git remote add origin https://github.com/TU_USUARIO/la-escuela-vt.git
git push -u origin main
```

Sustituye únicamente `TU_USUARIO` y el nombre del repositorio por los tuyos. La autenticación se hace con tu herramienta Git/GitHub habitual; no pegues tokens en archivos, comandos compartidos ni URL del remoto.

No se incluye el historial Git de Sites ni sus credenciales. El primer commit de tu repositorio será nuevo; la revisión de origen queda trazada por `EXPORTACION/ORIGEN.json` y el manifiesto de hashes. El `.gitignore` excluye secretos, dependencias, artefactos y la caché TypeScript; permite `.env.example`.

## Para Gemini Argon

Facilita acceso al repositorio mediante una integración autorizada y pídele que lea primero `AUDITORIA_GEMINI_ARGON.md`, `ESTADO_EXPORTACION.md` y `EXPORTACION/ORIGEN.json`. Exige que confirme acceso a `app/page.tsx`, `app/globals.css`, `package.json`, lockfile, Worker y recursos; un listado de documentos no equivale a leer el proyecto.

Si Gemini no puede acceder al repositorio privado, indícale el impedimento y comparte el ZIP por un canal autorizado; no es necesario volver público el código para demostrar que existe.

## Producción

Crear el repositorio o subir sus archivos no actualiza el sitio de Sites. Esta entrega no contiene un workflow de despliegue ni se ha configurado ninguna publicación automática. Cualquier cambio de hosting, autenticación o despliegue debe realizarse después de revisar el resultado de la auditoría y con autorización para ese cambio.
