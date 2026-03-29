import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __API_URL__: JSON.stringify(env.API_URL),
    },
    plugins: [react(
      {
        babel: {
          plugins: [
            'babel-plugin-react-compiler'
          ]
        }
      }
    ),
    tailwindcss()
    ],
    base: '/memory-assets/',
    build: {
      outDir: 'dist',
    },
    server: {
      // Ensure the port matches what turbo get-mfe-port provides
      port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  }
})
