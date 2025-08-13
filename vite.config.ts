import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { intlayerPlugin } from 'vite-intlayer'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin()
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@intlayer': path.resolve(__dirname, './.intlayer')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['intlayer', 'react-intlayer']
  },
  json: {
    stringify: true
  }
}); 