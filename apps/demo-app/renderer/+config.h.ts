import type { Config } from 'vike/types'

// https://vike.dev/config
export default {
  clientRouting: true,
  hydrationCanBeAborted: true,
  prefetchStaticAssets: 'viewport',

  // See https://vike.dev/data-fetching
  passToClient: ['pageProps'],

  meta: {
    Page: {
      env: { server: false, client: true },
    },
  },

} satisfies Config
