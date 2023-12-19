// https://vike.dev/onRenderClient

import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import type { OnRenderClientAsync } from 'vike/types'
import { PageShell } from '@/components/PageShell'

// As we are only using the SPA rendering mode, we create the root once on initial load, then re-use it when the route changes
let root: Root

export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext
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

  root.render(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
  )
}
