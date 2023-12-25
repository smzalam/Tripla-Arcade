import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io/': {
        target: 'https://tripla-arcade.onrender.com/',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
