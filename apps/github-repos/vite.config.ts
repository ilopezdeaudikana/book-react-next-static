import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  base:'/github-repos',
  server: {
    // Ensure the port matches what turbo get-mfe-port provides
    port: process.env.PORT ? parseInt(process.env.PORT) : 5175,
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
