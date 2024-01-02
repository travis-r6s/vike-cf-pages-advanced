import type { DataAsync } from 'vike/types'
import { logger } from 'utils'
import { ofetch } from 'ofetch'

export interface Country {
  flags: {
    png: string
  }
  name: {
    common: string
  }
}

export interface Data {
  countries: Country[]
}

/**
 * Data hook, used to provide data to send clientside
 *
 * This hook only runs server-side, so it's safe to directly your database, API etc. here, with any secret keys.
 * You'd want to add your secrets as ENV's to cloudflare pages first, though, and then you can use process.env as per usual.
 *
 * Reference: https://vike.dev/data-fetching
 */
export const data: DataAsync<Data> = async () => {
  logger.info('Running data hook on the server!')

  const countries = await ofetch<Country[]>('https://restcountries.com/v3.1/all')

  return { countries }
}
