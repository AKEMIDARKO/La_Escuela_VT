// Utilidad nueva de la exportación. No pertenece al código original del sitio.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const root = path.resolve(process.argv[2] || '.');
const manifestPath = process.argv[3] || path.join(root, 'EXPORTACION', 'ARCHIVOS_ORIGINALES.json');
const require = createRequire(path.join(root, 'package.json'));
const ts = require('typescript');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const report = { sourceFiles: manifest.length, syntaxErrors: [], missingImports: [], missingAssets: [], credentialPatterns: [], differentSourceFiles: [], localImports: 0, assets: [], preferenceAssertions: 0 };
const assets = new Set();
const textExtensions = new Set(['.ts','.tsx','.mts','.cts','.js','.jsx','.mjs','.cjs','.json','.yaml','.yml','.md','.txt','.css','.sh','.tsbuildinfo','.LICENSE']);
function existingModule(file) {
  const variants = [file, ...['.ts','.tsx','.mts','.cts','.js','.jsx','.mjs','.cjs','.json','.d.ts'].map(ext=>file+ext), ...['.ts','.tsx','.js','.mjs'].map(ext=>path.join(file,'index'+ext))];
  if (file.endsWith('.mjs')) variants.push(file.slice(0,-4)+'.mts',file.slice(0,-4)+'.d.mts');
  if (file.endsWith('.js')) variants.push(file.slice(0,-3)+'.ts',file.slice(0,-3)+'.tsx');
  return variants.some(candidate=>fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}
for (const file of manifest) {
  const full = path.join(root,file.path);
  const bytes = fs.readFileSync(full);
  const originalCopy=path.join(root,'EXPORTACION','ORIGINALES',file.path);
  const fidelityBytes=['README.md','.gitignore'].includes(file.path)&&fs.existsSync(originalCopy)?fs.readFileSync(originalCopy):bytes;
  if (crypto.createHash('sha256').update(fidelityBytes).digest('hex') !== file.sha256) report.differentSourceFiles.push(file.path);
  const ext = path.extname(file.path);
  if (!textExtensions.has(ext) && !['.npmrc','.gitignore'].includes(file.path)) continue;
  const text = bytes.toString('utf8');
  const secretPatterns = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    /\b(?:ghp_|github_pat_)[A-Za-z0-9_]{25,}\b/g,
    /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}\b/g,
    /\bAKIA[0-9A-Z]{16}\b/g,
    /https?:\/\/[^\s/:@]+:[^\s/@]+@/g,
    /(?:_authToken|client_secret|api_key|access_token|refresh_token|password)\s*[:=]\s*["'][A-Za-z0-9_./+-]{20,}["']/gi,
  ];
  for (const [index,pattern] of secretPatterns.entries()) for (const match of text.matchAll(pattern)) report.credentialPatterns.push({file:file.path,line:text.slice(0,match.index).split('\n').length,pattern:index+1});
  if (file.path.startsWith('app/') || ext==='.css') {
    for (const match of text.matchAll(/\/(?:assets|fonts)\/[A-Za-z0-9_./-]+|\/favicon\.(?:png|svg)/g)) assets.add(match[0]);
  }
  if (!['.ts','.tsx','.mts','.cts','.js','.jsx','.mjs','.cjs'].includes(ext)) continue;
  const source = ts.createSourceFile(full,text,ts.ScriptTarget.Latest,true,ext.endsWith('x')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  for(const diagnostic of source.parseDiagnostics) report.syntaxErrors.push({file:file.path,message:ts.flattenDiagnosticMessageText(diagnostic.messageText,' ')});
  function inspect(node) {
    let specifier;
    if ((ts.isImportDeclaration(node)||ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) specifier=node.moduleSpecifier.text;
    if (ts.isCallExpression(node)&&node.expression.kind===ts.SyntaxKind.ImportKeyword&&node.arguments.length===1&&ts.isStringLiteral(node.arguments[0])) specifier=node.arguments[0].text;
    if (specifier && (specifier.startsWith('.')||specifier.startsWith('@/'))) {
      report.localImports++;
      const candidate=specifier.startsWith('@/')?path.join(root,specifier.slice(2)):path.resolve(path.dirname(full),specifier);
      if (!existingModule(candidate)) report.missingImports.push({file:file.path,specifier});
    }
    ts.forEachChild(node,inspect);
  }
  inspect(source);
}
for(const asset of assets) if(!fs.existsSync(path.join(root,'public',asset.slice(1)))) report.missingAssets.push(asset);
report.assets=[...assets].sort();
const transpile = file => ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const uri = source => 'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const contentUri=uri(transpile('app/content.ts'));
const {languages,content,isLocale,groupArtworkAlt}=await import(contentUri);
assert.equal(languages.length,7); report.preferenceAssertions++;
for(const {code} of languages) {
  assert.ok(isLocale(code)); assert.ok(groupArtworkAlt[code]);
  assert.equal(content[code].worlds.length,3);
  assert.equal(content[code].hero.lines.length,3);
  assert.equal(content[code].people.title.length,2);
  for(const value of Object.values(content[code].ui)) assert.ok(value.trim());
  report.preferenceAssertions++;
}
assert.equal(isLocale('invalid'),false); assert.equal(isLocale(null),false);
const {readPreferences}=await import(uri(transpile('app/preferences.ts').replace(/from\s+["']\.\/content["']/g,'from "'+contentUri+'"')));
assert.deepEqual(readPreferences(),{locale:'es',theme:'light',motionEnabled:true}); report.preferenceAssertions++;
let saved=new Map([['escuela-locale','ja'],['escuela-theme','dark'],['escuela-motion','off']]);
globalThis.window={matchMedia:()=>({matches:false}),localStorage:{getItem:key=>saved.get(key)??null}};
try {
  assert.deepEqual(readPreferences(),{locale:'ja',theme:'dark',motionEnabled:false}); report.preferenceAssertions++;
  window.matchMedia=()=>({matches:true}); saved=new Map([['escuela-locale','id'],['escuela-theme','light']]);
  assert.deepEqual(readPreferences(),{locale:'id',theme:'light',motionEnabled:true}); report.preferenceAssertions++;
  saved=new Map([['escuela-locale','invalid'],['escuela-theme','invalid']]);
  assert.deepEqual(readPreferences(),{locale:'es',theme:'dark',motionEnabled:true}); report.preferenceAssertions++;
  Object.defineProperty(window,'localStorage',{get(){throw new Error('Almacenamiento bloqueado');}});
  assert.deepEqual(readPreferences(),{locale:'es',theme:'dark',motionEnabled:true}); report.preferenceAssertions++;
} finally { delete globalThis.window; }
report.ok=['syntaxErrors','missingImports','missingAssets','credentialPatterns','differentSourceFiles'].every(key=>report[key].length===0);
console.log(JSON.stringify(report,null,2));
if(!report.ok)process.exitCode=1;
