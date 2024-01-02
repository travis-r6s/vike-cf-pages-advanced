import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import React from '@vitejs/plugin-react'
import RehypeAddClassNames from 'rehype-class-names'
import RehypeSlug from 'rehype-slug'
import RehypeURLs from 'rehype-urls'
import Vike from 'vike/plugin'
import dotenv from 'dotenv'
import type { UserConfig } from 'vite'
import { mdx as MDX } from '@cyco130/vite-plugin-mdx'

import RehypeExternalLinks from 'rehype-external-links'

// We are using the Workers .dev.vars env file, to keep things simple and have a single env file.
dotenv.config({ path: './.dev.vars' })

// Used specifically for this example project
const DEMO_SITE_HOST = 'vike-cf-pages.pages.dev'

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
    MDX({
      rehypePlugins: [
        RehypeSlug,
        [RehypeURLs, (url: URL) => {
          /**
           * We add the site hostname to all links so the GitHub readme links go to the right place.
           * When used for the website though, these links should be relative.
           */
          if (url.hostname === DEMO_SITE_HOST) {
            return url.pathname
          }
        }],
        [RehypeExternalLinks, {
          target: '_blank',
        }],
        // We are using a plugin to add class names to our markdown, as we are using an external design system for styling.
        // @ts-expect-error Not sure why this complains, but it works
        [RehypeAddClassNames, {
          h1: 'tp-title-1',
          h2: 'tp-title-2',
          h3: 'tp-title-3',
          h4: 'tp-title-4',
          hr: 'tp-rule',
          p: 'tp-body-1',
          blockquote: 'tp-alert tp-alert--note',
          ol: 'tp-list tp-list--decimal',
          ul: 'tp-list tp-list--disc',
          a: 'tp-link',
        }],
      ],
    }),
    React(),
    Vike(),
    AutoImport({
      dirs: ['./hooks', './components'],
      imports: [
        'react',
        {
          urql: ['useQuery', 'useMutation'],
        },
      ],
    }),
  ],
}

export default config
