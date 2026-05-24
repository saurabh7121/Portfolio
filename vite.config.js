import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GITHUB_TOKEN': JSON.stringify(env.GITHUB_TOKEN || ''),
      'process.env.GITHUB_USERNAME': JSON.stringify(env.GITHUB_USERNAME || 'saurabh7121'),
    },
    build: {
      rollupOptions: {
        output: {
          // Vite 8 / Rolldown requires manualChunks as a function
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'three-vendor';
              if (id.includes('@react-three')) return 'r3f-vendor';
              if (id.includes('framer-motion')) return 'framer';
              if (id.includes('react-icons')) return 'icons';
              if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor';
            }
          },
        },
      },
      // Target modern browsers for smaller output
      target: 'esnext',
      // Increase chunk size warning threshold (Three.js is inherently large)
      chunkSizeWarningLimit: 1000,
    },
  }
})
