import { Toucan } from 'toucan-js'

import type { Function } from './utils'
import '@sentry/tracing'

// We add Sentry to context here, so we can use it to capture errors, handle tracing etc. elsewhere in the app.
export const sentryMiddleware: Function = async (context) => {
  const sentry = new Toucan({
    context,
    dsn: context.env.SENTRY_DSN,
    enabled: context.env.ENVIRONMENT !== 'development',
    debug: context.env.ENVIRONMENT === 'development',
    environment: context.env.ENVIRONMENT,
    tracesSampleRate: 1.0,
  })

  context.data.sentry = sentry

  // TODO: Fix this tracing issue - probably best to handle manually?
  // const transaction = sentry.startTransaction({ name: 'Middleware Tracing' })

  // TODO: Check other examples to see how to get the client for this transaction, then add it to CTX, so we can name spans later, and use
  // that specific client?

  try {
    // TODO: We may want to capture errors in our renderer instead, as it is the final middleware?
    return await context.next()
  }
  catch (error) {
    // This should capture any (unhandled) exceptions thrown in any of the functions.
    // If a function handles the error it self, it should use Sentry to capture the error, and return a usual Response object.
    sentry.captureException(error)
    throw error
  }
  finally {
    // transaction.finish()
  }
}

/** If you have other functions that are NOT under the /api folder, add them here so they aren't handled by Vike. */
const excludedPaths = [
  '/api',
  '/assets',
]

// TODO: Check if this is the best way to handle Vike in dev?

/**
 * This is likely best handled in a `_worker.js` file, instead of using
 * a middleware function - however, I couldn't get the worker CLI to use
 * the `_worker.ts` file in dev, and I like using the platforms conventions
 * for the functions layout/routing. If we override using a `_worker.ts` file,
 * we would need to duplicate this ourselves with a custom router, and a folder structure.
 */
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

    // We only want to use the Vike renderer in production - in development, these requests get forwarded to the Vite dev server.
    if (context.env.ENVIRONMENT === 'development') {
      return context.next()
    }

    context.data.sentry.addBreadcrumb({
      message: `[Middleware](Renderer) Handling ${url.pathname}`,
      category: 'Renderer',
      level: 'info',
    })

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

/**
 * We can chain multiple middlewares - just make sure that our render middleware
 * is the last in the array, so it can handle all non-api and asset requests, and handles 404 etc.
 */
export const onRequest = [sentryMiddleware, renderMiddleware]
