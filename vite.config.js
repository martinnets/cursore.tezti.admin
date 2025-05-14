/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // aquí se compilará el resultado de producción
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.cognifit.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    fs: {
       // Allow serving files from one level up to the project root
        allow: ['..'],
    },
    
  },
   
});
