import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Web-React.js/todo-app/',  
  plugins: [react()],
})