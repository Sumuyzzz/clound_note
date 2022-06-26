import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    script: {
      refSugar: true,
      refTransform: true,
    },
  })],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  base: '/note_vue3/'
})
