import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss({
    }),
  ],
  server: {
    port: 3000, // Changed port from default 5173 to 3000
    open: true, // Auto-opens browser when starting dev server
  },
})
