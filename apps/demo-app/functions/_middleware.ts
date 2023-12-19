import type { Function } from './utils'

/** If you have other functions that are NOT under the /api folder, add them here so they aren't handled by Vike. */
const excludedPaths = [
  '/api',
  '/assets',
]

// TODO: Check if this is the best way to handle Vike in dev?

// TODO: Chain middleware to capture errors with Sentry
// Thinking we can do tracing? And capture any errors directly, unless otherwise handled
// https://developers.cloudflare.com/pages/functions/plugins/sentry/

export const onRequest: Function = async (context) => {
  const url = new URL(context.request.url)
  console.log('[Middleware] Handling', url.pathname)

  try {
    if (excludedPaths.some(path => url.pathname.startsWith(path))) { return context.next() }

    if (context.env.ENVIRONMENT === 'development') {
      return context.next()
    }

    console.log('[Middleware](Renderer) Handling', url.pathname)

    // We only want to run this in production - in development, these requests get forwarded to the Vite dev server.
    const { renderPage } = await import('vike/server')
    const { httpResponse } = await renderPage({ urlOriginal: context.request.url })

    if (!httpResponse) {
      return context.next()
    }

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
