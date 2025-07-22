import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
server: {
proxy: {
'/api': 'http://localhost:8080', // Cambia a tu puerto del backend si es diferente
},
},
});