import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Use fileURLToPath and import.meta.url to correctly get __dirname in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // The alias should point to the 'src' directory (or wherever your code resides)
          // For simplicity, we'll keep it pointing to the current directory ('.') as you had it.
          '@': path.resolve(__dirname, './'), 
        }
      }
    };
});