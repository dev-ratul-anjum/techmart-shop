import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Map all react-icons subdirectories for proper resolution
const getReactIconsAliases = () => {
  const iconFolders = fs.readdirSync(
    resolve(__dirname, 'node_modules/react-icons')
  ).filter(dir => 
    fs.statSync(resolve(__dirname, 'node_modules/react-icons', dir)).isDirectory() &&
    fs.existsSync(resolve(__dirname, 'node_modules/react-icons', dir, 'index.mjs'))
  );
  
  return Object.fromEntries(
    iconFolders.map(folder => [
      `react-icons/${folder}`,
      resolve(__dirname, 'node_modules/react-icons', folder, 'index.mjs')
    ])
  );
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      ...getReactIconsAliases()
    },
  },
  optimizeDeps: {
    include: ['react-icons/fa', 'react-icons/bs'],
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.mjs': 'jsx',
      },
    },
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    hmr: true,
    port: 5173,
    fs: {
      strict: false,
    }
  }
})
