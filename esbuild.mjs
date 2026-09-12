import { build } from 'esbuild';
import {
  readFileSync,
  cpSync,
  rmSync,
  mkdirSync,
  existsSync,
} from 'fs';
import { join, dirname } from 'path';

await build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outfile: 'dist/server.js',
  banner: { js: '#!/usr/bin/env node' },
  mainFields: ['module', 'main'],
  alias: {
    'jsonc-parser': 'jsonc-parser/lib/esm/main.js'
  },
});

const src = 'node_modules/minecraft-bedrock-schemas';
const dest = 'dist/schemas';
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
const settings = JSON.parse(
  readFileSync(join(src, 'vscode-settings.json'), 'utf-8')
);
const files = settings['json.schemas'].map(
  (s) => s.url.split('/main/')[1]
);
cpSync(
  join(src, 'vscode-settings.json'),
  join(dest, 'vscode-settings.json'),
  { force: true }
);
for (const file of files) {
  const from = join(src, file);
  const to = join(dest, file);
  if (!existsSync(from)) continue;
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { force: true });
}
