import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/bus-time-app-ts/', // リポジトリ名に合わせる
  plugins: [
    tailwindcss(),
    react(),
  ],
})

