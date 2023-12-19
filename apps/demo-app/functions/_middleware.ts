import sentryPlugin from '@cloudflare/pages-plugin-sentry'
import type { Function } from './utils'

export const sentryMiddleware: Function = (context) => {
  return sentryPlugin({
    dsn: context.env.SENTRY_DSN,
    debug: context.env.ENVIRONMENT === 'development',
    enabled: context.env.ENVIRONMENT !== 'development',
    enableTracing: true,
    tracesSampleRate: 0.2,
    environment: context.env.ENVIRONMENT,
  })(context)
}

/** If you have other functions that are NOT under the /api folder, add them here so they aren't handled by Vike. */
const excludedPaths = [
  '/api',
  '/assets',
]

// TODO: Check if this is the best way to handle Vike in dev?

export const renderMiddleware: Function = async (context) => {
  const url = new URL(context.request.url)

  context.data.sentry.addBreadcrumb({
    message: `[Middleware] Handling ${url.pathname}`,
    level: 'info',
  })

  try {
    if (excludedPaths.some(path => url.pathname.startsWith(path))) {
      return context.next()
    }

    if (context.env.ENVIRONMENT === 'development') {
      return context.next()
    }

    context.data.sentry.addBreadcrumb({
      message: `[Middleware](Renderer) Handling ${url.pathname}`,
      category: 'Renderer',
      level: 'info',
    })

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
    // This should capture any (unhandled) exceptions thrown in any of the functions.
    // If a function handles the error it self, it should use Sentry to capture the error, and return a usual Response object.
    context.data.sentry.captureException(error)
    return new Response(`${error.message}\n${error.stack}`, { status: 500 })
  }
}

/**
 * We can chain multiple middlewares - just make sure that our render middleware
 * is the last in the array, so it can handle all non-api and asset requests, and handles 404 etc.
 */
export const onRequest = [sentryMiddleware, renderMiddleware]
