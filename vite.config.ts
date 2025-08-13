import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { intlayerPlugin } from 'vite-intlayer'

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin()
  ],
  base: '/',
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
  // 将Markdown文件作为原始文本处理
  assetsInclude: ['**/*.md']
}) 