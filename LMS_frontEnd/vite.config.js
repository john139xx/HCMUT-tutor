import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],

  // ⚙️ Cấu hình proxy để frontend gọi API backend
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Địa chỉ server backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
