// https://vike.dev/onRenderClient

import * as Sentry from '@sentry/react'
import type { OnRenderClientAsync } from 'vike/types'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { logger } from 'utils'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({}),
    new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 0.2,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  beforeSend: (event) => {
    // Optionally show a crash reporter dialog on an error
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id })
    }

    return event
  },
})

/**
 * This component will be shown when Sentry handles an uncaught exception in the app.
 * You'll likely want to move this to its own component, and import it here.
 */
function ErrorFallbackComponent() {
  // A bit of inline styling, just because we can - let's mix things up.
  return (
    <div style={{ margin: '2rem' }}>
      <p className="tp-title-2">An error has occurred!</p>
      <p className="tp-body-1">Rest assured, we have been notified, and are working on the issue.</p>
    </div>
  )
}

// As we are only using the SPA rendering mode, we create the root once on initial load, then re-use it when the route changes
let root: Root

export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  logger.info(`Running onRenderClient`)

  const { Page, pageProps } = pageContext

  try {
    if (!Page) {
      throw new Error('Client-side render() hook expects pageContext.Page to be defined')
    }

    const rootEl = document.getElementById('react-root')
    if (!rootEl) {
      throw new Error('DOM element #react-root not found')
    }

    if (pageContext.isHydration) {
      root = createRoot(rootEl)
    }

    // Want to track specific components with Sentry? https://docs.sentry.io/platforms/javascript/guides/react/features/component-tracking/
    root.render(
      <Sentry.ErrorBoundary fallback={ErrorFallbackComponent} showDialog>
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      </Sentry.ErrorBoundary>,
    )
  }
  catch (error) {
    Sentry.captureException(error)
    console.error(error)
  }
}
