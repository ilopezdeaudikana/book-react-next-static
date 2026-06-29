import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv, PluginOption } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __API_URL__: JSON.stringify(env.API_URL),
    },
    plugins: [react() as PluginOption] ,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./setupTests.ts'],
      css: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})