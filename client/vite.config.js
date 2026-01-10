import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { cpSync, existsSync, mkdirSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Vite plugin to copy generated files before build
const copyConvexGenerated = () => {
  return {
    name: 'copy-convex-generated',
    buildStart() {
      const rootGenerated = path.resolve(__dirname, '../convex/_generated')
      const clientGenerated = path.resolve(__dirname, './src/convex/_generated')
      
      if (existsSync(rootGenerated)) {
        if (!existsSync(path.resolve(__dirname, './src/convex'))) {
          mkdirSync(path.resolve(__dirname, './src/convex'), { recursive: true })
        }
        cpSync(rootGenerated, clientGenerated, { recursive: true, force: true })
        console.log('✅ Copied Convex generated files')
      } else {
        console.warn('⚠️  Convex generated files not found at:', rootGenerated)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyConvexGenerated()],
  resolve: {
    // Ensure convex/* resolves from node_modules first
    dedupe: ['convex'],
  },
})
