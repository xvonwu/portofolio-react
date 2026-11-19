import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' membuat hasil build bisa dibuka dari folder/subpath mana pun.
export default defineConfig({
  base: './',
  plugins: [react()],
})
