import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const pages = ['index.html','experiencia.html','reflexion.html'];
const scripts = ['welcome.js','script.js','resonance.js','reflection.js','scripts/serve.mjs','scripts/check.mjs'];
let references = 0;
const errors = [];
function verify(relative, from) {
  if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(relative)) return;
  relative = decodeURIComponent(relative.split(/[?#]/)[0]);
  const target = path.resolve(path.dirname(path.join(root, from)), relative || '.');
  if ((target !== root && !target.startsWith(root + path.sep))) {errors.push(`${from}: ruta fuera del proyecto: ${relative}`);return;}
  const local = path.relative(root, target);
  let current = root;
  for (const part of local.split(path.sep).filter(Boolean)) {
    if (!existsSync(current) || !readdirSync(current).includes(part)) {errors.push(`${from}: falta el archivo o no coincide su nombre: ${relative}`);return;}
    current = path.join(current, part);
  }
  if (relative.endsWith('/') && !existsSync(path.join(target,'index.html'))) {errors.push(`${from}: no hay index.html en ${relative}`);return;}
  references++;
}
for (const page of pages) {
  const content = readFileSync(path.join(root,page),'utf8');
  for (const match of content.matchAll(/(?:src|href)=["']([^"']+)["']/g)) verify(match[1],page);
}
for (const css of ['welcome.css','styles.css','reflection.css']) {
  const content = readFileSync(path.join(root,css),'utf8');
  for (const match of content.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)) verify(match[1],css);
}
for (const script of scripts) {
  const result = spawnSync(process.execPath,['--check',path.join(root,script)],{encoding:'utf8'});
  if (result.status !== 0) errors.push(result.stderr || `Error de sintaxis: ${script}`);
}
if (errors.length) {console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`Correcto: ${pages.length} pantallas, ${scripts.length} scripts y ${references} referencias locales verificadas.`);
