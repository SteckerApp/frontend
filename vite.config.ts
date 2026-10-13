import { defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },
  preview: {
    port: parseInt(process.env.VITE_APP_PORT ?? `${process.env.VITE_APP_PORT}`, 10),
    strictPort: true,
  },
  server:  {
    port: parseInt(process.env.VITE_APP_PORT ?? `${process.env.VITE_APP_PORT}`, 10),
    strictPort: true,
    host: true,
    origin: process.env.VITE_APP_ORIGIN,
    proxy: {
      '/api': {
        target: process.env.VITE_APP_ONFLEEKQ_BASE_URL ?? '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});