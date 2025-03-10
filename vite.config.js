import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 80,
    strictPort: true,
    proxy: {
      // dev 설정, PRD는 nignx.conf에서 설정
      "/api": {
        target: "http://192.168.0.17:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
