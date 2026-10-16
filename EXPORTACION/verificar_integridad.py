"""Comprueba el manifiesto de esta entrega sin instalar dependencias."""
from pathlib import Path
import hashlib,json,sys

root=Path(__file__).resolve().parent.parent
errors=[]
listed=set()
checksum_file=root/'SHA256SUMS.txt'
if not checksum_file.is_file():
 print('ERROR: falta SHA256SUMS.txt');sys.exit(1)
for line in checksum_file.read_text(encoding='utf-8').splitlines():
 if not line:continue
 try:expected,name=line.split('  ',1)
 except ValueError:
  errors.append('Línea de manifiesto no válida');continue
 relative=Path(name)
 if relative.is_absolute() or '..' in relative.parts:
  errors.append('Ruta no permitida en el manifiesto');continue
 target=root/relative
 listed.add(relative.as_posix())
 if not target.is_file():
  errors.append('Falta: '+name);continue
 if hashlib.sha256(target.read_bytes()).hexdigest()!=expected:
  errors.append('Hash distinto: '+name)
actual={p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file() and '.git' not in p.relative_to(root).parts and 'node_modules' not in p.relative_to(root).parts and '.sites-runtime' not in p.relative_to(root).parts and '.wrangler' not in p.relative_to(root).parts and 'dist' not in p.relative_to(root).parts and '__pycache__' not in p.relative_to(root).parts}
# Se avisa de adiciones posteriores; no son una falta de integridad del original.
extras=sorted(actual-listed-{'SHA256SUMS.txt'})
manifest=json.loads((root/'EXPORTACION/ARCHIVOS_ORIGINALES.json').read_text(encoding='utf-8'))
mapping={'README.md':'EXPORTACION/ORIGINALES/README.md','.gitignore':'EXPORTACION/ORIGINALES/.gitignore'}
for item in manifest:
 target=root/mapping.get(item['path'],item['path'])
 if not target.is_file() or hashlib.sha256(target.read_bytes()).hexdigest()!=item['sha256']:
  errors.append('Original distinto o ausente: '+item['path'])
if errors:
 print('\n'.join(errors));sys.exit(1)
print(f'CORRECTO: {len(listed)} archivos de la entrega y {len(manifest)} originales verificados.')
if extras:print('Archivos adicionales posteriores al manifiesto: '+', '.join(extras))
print('SHA256SUMS.txt no se incluye a sí mismo; el ZIP completo se verifica con su hash externo.')
