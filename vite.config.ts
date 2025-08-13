import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { intlayerPlugin } from 'vite-intlayer'
import path from 'path'
import fs from 'fs'

// 创建虚拟模块插件
function intlayerVirtualModulePlugin() {
  const virtualModuleId = '@intlayer/dictionary'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-intlayer-virtual',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        try {
          const jsonPath = path.resolve(__dirname, '.intlayer/dictionary/app.json')
          const content = fs.readFileSync(jsonPath, 'utf-8')
          return `export default ${content}`
        } catch (error) {
          console.error('Failed to load dictionary:', error)
          return 'export default { key: "app", content: {} }'
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    intlayerVirtualModulePlugin()
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