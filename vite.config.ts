import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
    },
    chunkSizeWarningLimit: 200,
  },
  css: { devSourcemap: true },
  server: { port: 5173, strictPort: true, open: false },
  preview: { port: 4173, strictPort: true },
})
