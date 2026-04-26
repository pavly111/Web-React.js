import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Web-React.js/calculator-app/',  
  plugins: [react()],
})