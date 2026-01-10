import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Only alias convex/_generated paths to root convex folder
      // This allows imports like: import { api } from 'convex/_generated/api'
      'convex/_generated/api': path.resolve(__dirname, '../convex/_generated/api'),
      'convex/_generated/server': path.resolve(__dirname, '../convex/_generated/server'),
    },
  },
})
