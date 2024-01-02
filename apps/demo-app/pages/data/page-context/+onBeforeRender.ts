import type { OnBeforeRenderAsync } from 'vike/types'
import { logger } from 'utils'

/**
 * This hook is for more advanced usecases - if you are just fetching data, you likely want the `data` hook (see the `+data.ts` file in this folder).
 *
 * This hook only runs server-side, so it's safe to directly your database, API etc. here, with any secret keys.
 * You'd want to add your secrets as ENV's to cloudflare pages first, though, and then you can use process.env as per usual.
 *
 * Reference: https://vike.dev/onBeforeRender
 */
export const onBeforeRender: OnBeforeRenderAsync = async () => {
  logger.info('Running onBeforeRender hook on the server!')

  return {
    pageContext: {
      pageProps: {
        some: 'custom data',
      },
    },
  }
}
