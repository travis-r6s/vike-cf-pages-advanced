import type { OnBeforeRenderSync } from 'vike/types'

export const onBeforeRender: OnBeforeRenderSync = () => {
  console.log('Running onBeforeRender on the server!')

  return {
    pageContext: {
      pageProps: {
        data: {
          some: ['demo', 'data'],
        },
      },
    },
  }
}
