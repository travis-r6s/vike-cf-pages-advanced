import type { OnBeforeRenderAsync } from 'vike/types'

/**
 * This hook only runs server-side, so it's safe to directly your database, API etc. here, with any secret keys.
 * You'd want to add your secrets as ENV's to cloudflare pages first, though, and then you can use process.env as per usual.
 */
export const onBeforeRender: OnBeforeRenderAsync = async () => {
  console.log('Running onBeforeRender on the server!')

  const response = await fetch('https://jsonplaceholder.typicode.com/todos')

  return {
    pageContext: {
      pageProps: {
        data: await response.json(),
      },
    },
  }
}
