import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: 'spa',        // serves index.html for all unknown routes
  server: {
    port: 8080,          // keeps your existing port
  }
})