import react from '@vitejs/plugin-react';
// import eslintPlugin from 'vite-plugin-eslint';

import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/scss'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@router': path.resolve(__dirname, 'src/app/router'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@user': path.resolve(__dirname, 'src/user'),
      '@admin': path.resolve(__dirname, 'src/admin'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@app/styles/_variables.scss";@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");',
      },
    },
  },
});
