import { fileURLToPath, URL } from 'node:url';
;
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: process.env.VITE_NODE_ENV !== 'PROD',
  },
  plugins: [
    vue(),
  ],
  test: {
    css: true,
		globals: true,
		environment: 'jsdom',
    clearMocks: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
