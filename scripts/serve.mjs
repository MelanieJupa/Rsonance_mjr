import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const port = Number(process.env.PORT || process.argv[2] || 4173);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Puerto inválido.');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.ttf':'font/ttf','.svg':'image/svg+xml','.ico':'image/x-icon'};

export const server = createServer(async (req, res) => {
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405, {'Allow':'GET, HEAD'});res.end();return;}
  try {
    let route = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (route.includes('\0') || route.includes('\\') || route.split('/').some(s => s.startsWith('.'))) {res.writeHead(403);res.end('Forbidden');return;}
    if (route.endsWith('/')) route += 'index.html';
    if (!path.extname(route)) route += '.html';
    const target = path.resolve(root, '.' + route);
    if ((target !== root && !target.startsWith(root + path.sep)) || !types[path.extname(target)]) {res.writeHead(404);res.end('Not found');return;}
    const info = await stat(target);
    if (!info.isFile()) {res.writeHead(404);res.end('Not found');return;}
    const data = await readFile(target);
    res.writeHead(200, {'Content-Type':types[path.extname(target)],'Content-Length':data.length,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) {res.writeHead(error instanceof URIError ? 400 : 404);res.end('Not found');}
});
server.listen(port, '127.0.0.1', () => console.log(`RESONANCE: http://127.0.0.1:${server.address().port}`));
