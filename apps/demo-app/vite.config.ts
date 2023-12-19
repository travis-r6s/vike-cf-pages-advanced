import React from '@vitejs/plugin-react'
import Vike from 'vike/plugin'
import type { UserConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

const config: UserConfig = {

  plugins: [
    React(),
    Vike(),
    AutoImport({
      dirs: ['./renderer', './components'],
      imports: [
        'react',
      ],
    }),
  ],
}

export default config
