import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve('src/module_bindings/index.ts');

if (!fs.existsSync(target)) {
  console.log('[patch-spacetimedb-bindings] No generated bindings file found, skipping.');
  process.exit(0);
}

const source = fs.readFileSync(target, 'utf8');
const lines = source.split('\n');

let inIndexes = false;
let bracketDepth = 0;
let changed = false;

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];

  if (!inIndexes && line.includes('indexes: [')) {
    inIndexes = true;
    bracketDepth = 1;
    continue;
  }

  if (inIndexes) {
    const opens = (line.match(/\[/g) || []).length;
    const closes = (line.match(/\]/g) || []).length;

    if (line.includes('{ name:')) {
      lines[i] = line.replace('{ name:', '{ accessor:');
      changed = true;
    }

    bracketDepth += opens - closes;
    if (bracketDepth <= 0) {
      inIndexes = false;
      bracketDepth = 0;
    }
  }
}

if (!changed) {
  console.log('[patch-spacetimedb-bindings] No index name fields needed patching.');
  process.exit(0);
}

fs.writeFileSync(target, `${lines.join('\n')}\n`, 'utf8');
console.log('[patch-spacetimedb-bindings] Patched index name -> accessor in generated bindings.');
