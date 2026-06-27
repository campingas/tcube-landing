import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        build: fileURLToPath(new URL('./build/index.html', import.meta.url)),
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
    },
    sourcemap: true,
    target: 'es2022',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
