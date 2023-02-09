import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import dns from 'dns'
// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 8525,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/assets/styles/var.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.', 'src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 8000,
    rollupOptions: {
      output: {
        // 分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
})
