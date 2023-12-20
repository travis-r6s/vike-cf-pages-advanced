import type { OnRenderHtmlAsync } from 'vike/types'
import { escapeInject } from 'vike/server'
import logoUrl from './logo.svg'

// TODO: Add document head support

// If you are doing SSR, you could also add Sentry here, to capture any unhandled exceptions in any of the render hooks.

export const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  // See https://vike.dev/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vike + Cloudflare Pages'
  const desc = (documentProps && documentProps.description) || 'App using Vite + Vike + Cloudflare Pages'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root"></div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  }
}
