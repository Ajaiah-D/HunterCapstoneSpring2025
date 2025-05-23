import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({  }) => {
  return {
    plugins: [
    react(),
    tailwindcss(),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "/src")
        }
    ],
    },
    server: {
      middlewareMode: false,
      watch: {
        usePolling: true,
      }
    }
    // Other configurations can go here...
  };
});
