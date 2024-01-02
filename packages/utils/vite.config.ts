import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: 'utils',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
  },
  plugins: [dts()],
})
