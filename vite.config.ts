import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) {
            return 'three'
          }
        },
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
