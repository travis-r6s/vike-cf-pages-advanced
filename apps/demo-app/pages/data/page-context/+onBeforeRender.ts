import type { OnBeforeRenderAsync } from 'vike/types'

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
