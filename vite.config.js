import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components/ui': path.resolve(__dirname, 'Componants/ui'),
      '@/components': path.resolve(__dirname, 'Componants'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@': path.resolve(__dirname, './'),
    },
  },
})
