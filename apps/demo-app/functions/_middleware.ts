import { renderPage } from 'vike/server'
import type { Function } from './utils'

/** If you have other functions that are NOT under the /api folder, add them here so they aren't handled by Vike. */
const excludedPaths = [
  '/api',
  '/assets',
]

export const onRequest: Function = async (context) => {
  const url = new URL(context.request.url)
  try {
    if (excludedPaths.some(path => url.pathname.startsWith(path))) { return context.next() }

    const { httpResponse } = await renderPage({ urlOriginal: context.request.url })

    if (!httpResponse) { return context.next() }

    return new Response(httpResponse.body, {
      status: httpResponse.statusCode,
      headers: httpResponse.headers,
    })
  }
  catch (err) {
    const error = err as Error
    return new Response(`${error.message}\n${error.stack}`, { status: 500 })
  }
}
