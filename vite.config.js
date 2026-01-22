import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Hotel Galaxy Billing',
        short_name: 'Hotel Galaxy',
        description: 'Hotel Billing & Inventory Application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo.jpg.png',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/png'
          },
          {
            src: 'logo.jpg.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.jpg.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
