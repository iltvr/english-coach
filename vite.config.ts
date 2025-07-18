import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '')
  // Set process.env variables for use in the application
  for (const key in env) {
    if (key.startsWith('VITE_')) {
      process.env[key] = env[key]
    }
  }

  return {
    define: {
      'process.env': process.env
    },
    plugins: [react(), tsconfigPaths()],
    build: {
      sourcemap: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@heroui/react', 'framer-motion'],
            i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
          }
        }
      }
    },
   server: {
      proxy: {
        // local dev: /api/* → your local backend on :3000
        '/api': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          // ensure Vite also handles preflight locally
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react-router-dom']
    }
  }
})

