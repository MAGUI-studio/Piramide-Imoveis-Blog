import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';

const IGNORED_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  '.gemini',
  'dist',
  'build',
  'coverage',
  '.husky'
]);

const TARGET_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css'
]);

function getFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry)) continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getFiles(fullPath, files);
    } else if (TARGET_EXTENSIONS.has(extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function stripComments(content) {
  let cleaned = content;

  // 1. Remove JSX comments: {/* ... */}
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // 2. Remove multi-line block comments: /* ... */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3. Remove single-line comments: // ... (ignoring URLs like http://, https://, file://)
  cleaned = cleaned.replace(/(?<!:|https:|http:|file:)\/\/.*$/gm, '');

  // 4. Remove leftover lines that contain only whitespace from stripped comments
  cleaned = cleaned.replace(/^\s*[\r\n]/gm, (match) => {
    return match;
  });

  return cleaned;
}

function run() {
  const rootDir = process.cwd();
  const targetDirs = [
    join(rootDir, 'src'),
    join(rootDir, 'web', 'src'),
    join(rootDir, 'web', 'sanity'),
    join(rootDir, 'studio', 'src'),
    join(rootDir, 'studio', 'schemaTypes'),
    join(rootDir, 'scripts'),
    join(rootDir, 'web', 'scripts')
  ];
  let processedCount = 0;
  let changedCount = 0;

  for (const dir of targetDirs) {
    const files = getFiles(dir);
    for (const file of files) {
      if (file.endsWith('strip-comments.js') || file.endsWith('google-apps-script.js')) continue;

      processedCount++;
      const content = readFileSync(file, 'utf8');
      const stripped = stripComments(content);

      if (content !== stripped) {
        writeFileSync(file, stripped, 'utf8');
        changedCount++;
      }
    }
  }

  console.log(`✓ Strip comments completed: ${changedCount} of ${processedCount} files cleaned.`);
}

run();
