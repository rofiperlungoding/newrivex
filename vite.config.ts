import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core dependencies
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Map libraries (Leaflet is large ~140KB)
          'vendor-map': ['leaflet', 'react-leaflet'],
          // UI/Animation libraries
          'vendor-ui': ['framer-motion', '@phosphor-icons/react'],
          // Supabase client
          'vendor-supabase': ['@supabase/supabase-js'],
        }
      }
    },
    // Increase chunk size warning limit (we're splitting strategically)
    chunkSizeWarningLimit: 600,
  }
})
