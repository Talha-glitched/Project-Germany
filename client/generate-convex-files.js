#!/usr/bin/env node

/**
 * Script to generate/copy Convex generated files to client/src/convex/_generated
 * This is needed because Vercel builds from the client directory,
 * so we need the generated files to be accessible from there.
 */

import { mkdir, copyFile, access, constants, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_GENERATED_DIR = join(__dirname, '..', 'convex', '_generated');
const CLIENT_GENERATED_DIR = join(__dirname, 'src', 'convex', '_generated');

async function fileExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function generateConvexFiles() {
  try {
    // Create the client generated directory if it doesn't exist
    await mkdir(CLIENT_GENERATED_DIR, { recursive: true });

    // Check if root generated files exist
    const apiJsExists = await fileExists(join(ROOT_GENERATED_DIR, 'api.js'));
    const apiTsExists = await fileExists(join(ROOT_GENERATED_DIR, 'api.d.ts'));

    if (!apiJsExists || !apiTsExists) {
      console.warn('⚠️  Convex generated files not found at root. Attempting to generate...');
      
      // Try to run convex codegen from the root
      try {
        const { execSync } = await import('child_process');
        // Try to generate files in client/src/convex/_generated
        const codegenOutput = 'client/src/convex/_generated';
        execSync(`npx convex codegen --output ${codegenOutput}`, {
          cwd: join(__dirname, '..'),
          stdio: 'inherit',
          env: { ...process.env },
        });
        console.log('✅ Convex files generated successfully');
        
        // Verify files were created
        const generatedApiJs = await fileExists(join(CLIENT_GENERATED_DIR, 'api.js'));
        if (generatedApiJs) {
          return; // Success!
        }
      } catch (error) {
        console.warn('⚠️  Could not run convex codegen:', error.message);
      }
      
      // If generation failed, check if we can use existing files from root
      console.log('⚠️  Attempting to copy from root directory...');
      
      // If root files don't exist, create stubs
      if (!apiJsExists && !apiTsExists) {
        await createStubFiles();
        return;
      }
    }

    // Copy files from root to client directory
    const filesToCopy = [
      'api.js',
      'api.d.ts',
      'server.js',
      'server.d.ts',
      'dataModel.d.ts',
    ];

    let copiedCount = 0;
    for (const file of filesToCopy) {
      const srcPath = join(ROOT_GENERATED_DIR, file);
      const destPath = join(CLIENT_GENERATED_DIR, file);
      
      if (await fileExists(srcPath)) {
        await copyFile(srcPath, destPath);
        console.log(`✅ Copied ${file}`);
        copiedCount++;
      } else {
        console.warn(`⚠️  File ${file} not found at ${srcPath}, skipping...`);
      }
    }

    if (copiedCount === 0) {
      console.warn('⚠️  No files were copied. Creating stub files...');
      await createStubFiles();
      return;
    }

    console.log('✅ Convex generated files copied successfully');
  } catch (error) {
    console.error('❌ Error generating Convex files:', error.message);
    console.log('Creating minimal stub files to prevent build errors...');
    await createStubFiles();
  }
}

async function createStubFiles() {
  // Create minimal stub files to prevent import errors during build
  const stubApiJs = `/* eslint-disable */
/**
 * Generated API stub - Generated files should be created by running:
 * npx convex codegen --output src/convex/_generated
 * from the root directory
 */
export const api = {};
export const internal = {};
export const components = {};
`;

  const stubApiTs = `/* eslint-disable */
/**
 * Generated API stub - Generated files should be created by running:
 * npx convex codegen --output src/convex/_generated
 * from the root directory
 */
export declare const api: any;
export declare const internal: any;
`;

  const { writeFile } = await import('fs/promises');
  
  await mkdir(CLIENT_GENERATED_DIR, { recursive: true });
  await writeFile(join(CLIENT_GENERATED_DIR, 'api.js'), stubApiJs);
  await writeFile(join(CLIENT_GENERATED_DIR, 'api.d.ts'), stubApiTs);
  
  console.log('⚠️  Created stub files. Build may succeed but runtime errors may occur if Convex is not properly configured.');
}

generateConvexFiles().catch(console.error);

