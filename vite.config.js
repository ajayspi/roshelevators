import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { promises as fs } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Plain <script src> (no type=module) because external ES modules with
      // import.meta don't auto-execute reliably under some browser tooling; the
      // classic script gets a `defer` so it runs after DOM parse (#root exists).
      name: 'fix-script-tag',
      closeBundle: {
        order: 'post',
        async handler() {
          const htmlPath = resolve(__dirname, 'dist/index.html')
          let html = await fs.readFile(htmlPath, 'utf-8')
          html = html.replace(
            '<script type="module" crossorigin src="/assets/index-',
            '<script defer src="/assets/index-'
          )
          await fs.writeFile(htmlPath, html)
        },
      },
    },
  ],
  build: {
    target: 'es2015',
    modulePreload: {
      polyfill: false,
    },
    // rolldown: false,  -> REMOVED: use Vite 8 native Rust bundler (faster)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'RosheApp',
      },
    },
  },
})