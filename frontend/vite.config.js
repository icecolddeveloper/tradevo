import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // enable React support (JSX, fast refresh)

  server: {
    port: 5000,
    host: true, // allow access from network (e.g. phone, other devices)
  },

  css: {
    devSourcemap: true, // show original CSS file + line in DevTools instead of <style>
  },
});
