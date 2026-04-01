import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ethycunts',

  server: {
    // Ensure the port matches what turbo get-mfe-port provides
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
  },
  plugins: [react({
    babel: {
      plugins: ['babel-plugin-react-compiler'],
    }
  })],
})
