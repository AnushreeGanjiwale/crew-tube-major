import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // You can change the port number if needed
  },
  build: {
    outDir: 'dist', // Output directory for the build
    sourcemap: true, // Enable source maps for easier debugging
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Example alias for the src directory
    },
  },
  optimizeDeps: {
    include: ['@headlessui/react'],
  },
});
