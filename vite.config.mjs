import { resolve } from 'path'
import { defineConfig } from 'vite'
import fg from 'fast-glob'
import kirby from 'vite-plugin-kirby'
import tailwindcss from '@tailwindcss/vite'

const jsInputs = fg.sync('src/js/templates/*.js').map(file => resolve(process.cwd(), file))

export default defineConfig(({ mode }) => ({
  root: 'src',
  base: mode === 'development' ? '/' : 'assets/dist/',

  build: {
    outDir: resolve(process.cwd(), 'assets/dist'),
    emptyOutDir: true,
    rollupOptions: { 
    input: [
      ...jsInputs,
      resolve(process.cwd(), 'src/css/main.css')] 
    },
  },

  plugins: [
    tailwindcss(),
    kirby(),
  ],

  server: {
    cors: true,
    hostname: 'boilerplate.test',
    watch: {
      usePolling: true
    }
  }
}))
