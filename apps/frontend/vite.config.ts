import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/account': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/post': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/comment': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/notif': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
