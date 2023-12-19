import path from 'node:path'
import React from '@vitejs/plugin-react'
import Vike from 'vike/plugin'
import type { UserConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '#': path.resolve('.'),
    },
  },
  plugins: [
    React(),
    Vike(),
    AutoImport({
      dirs: ['./hooks', './components'],
      imports: [
        'react',
      ],
    }),
  ],
}

export default config
