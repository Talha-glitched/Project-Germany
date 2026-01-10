// Copy Convex generated files to client for Vercel build
import { cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootGenerated = join(__dirname, '../../convex/_generated');
const clientGenerated = join(__dirname, '../src/convex/_generated');

// Create directory if it doesn't exist
if (!existsSync(join(__dirname, '../src/convex'))) {
  mkdirSync(join(__dirname, '../src/convex'), { recursive: true });
}

if (existsSync(rootGenerated)) {
  cpSync(rootGenerated, clientGenerated, { recursive: true, force: true });
  console.log('✅ Copied Convex generated files for build');
} else {
  console.error('❌ Convex generated files not found at:', rootGenerated);
  console.error('   Run "npx convex dev" first to generate files');
  process.exit(1);
}

