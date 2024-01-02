import type { OnBeforeRenderAsync } from 'vike/types'
import { logger } from 'utils'

/**
 * This hook only runs server-side, so it's safe to directly your database, API etc. here, with any secret keys.
 * You'd want to add your secrets as ENV's to cloudflare pages first, though, and then you can use process.env as per usual.
 */
export const onBeforeRender: OnBeforeRenderAsync = async () => {
  logger.info('Running onBeforeRender on the server!')

  const response = await fetch('https://restcountries.com/v3.1/all')

  return {
    pageContext: {
      pageProps: {
        data: await response.json(),
      },
    },
  }
}
