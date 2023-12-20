import path from 'node:path'
import React from '@vitejs/plugin-react'
import Vike from 'vike/plugin'
import type { UserConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

import dotenv from 'dotenv'

// We are using the Workers .dev.vars env file, to keep things simple and have a single env file.
dotenv.config({ path: './.dev.vars' })

const config: UserConfig = {
  server: {
    port: 3000,
  },
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
