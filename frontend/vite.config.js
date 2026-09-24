import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Code splitting - breaks 740KB bundle into smaller lazy-loaded chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI & icons
          'vendor-ui': ['lucide-react'],
          // Map & SEO
          'vendor-map': ['leaflet', 'react-leaflet'],
          'vendor-seo': ['react-helmet-async'],
          // Admin pages (lazy loaded)
          'admin': [
            './src/pages/admin/DashboardPage.jsx',
            './src/pages/admin/AdminProjectsPage.jsx',
            './src/pages/admin/AdminLeadsPage.jsx',
            './src/pages/admin/AdminSiteVisitsPage.jsx',
            './src/pages/admin/AdminFutureDevPage.jsx',
            './src/pages/admin/AdminBlogPage.jsx',
          ],
          // Calculator
          'calculator': ['./src/pages/CalculatorPage.jsx'],
          // Less-visited pages
          'pages-secondary': [
            './src/pages/FAQPage.jsx',
            './src/pages/PrivacyPage.jsx',
            './src/pages/TrackEnquiryPage.jsx',
            './src/pages/NotFoundPage.jsx',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
