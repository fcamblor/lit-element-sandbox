import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'app',
  build: {
    lib: {
      entry: 'app/my-element.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit-element/
    }
  }
})
