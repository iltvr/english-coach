import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    build: {
      sourcemap: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          // manualChunks only applies to the client build; SSR treats react as external
          manualChunks: isSsrBuild ? undefined : {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@heroui/react', 'framer-motion'],
            i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
          }
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8788',  // Pages Functions local dev port
          changeOrigin: true,
          secure: false
        }
      }
    },
    ssgOptions: {
      dirStyle: 'nested',
    },
    optimizeDeps: {
      include: ['react-router-dom']
    }
  }
})

