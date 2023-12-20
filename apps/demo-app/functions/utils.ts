/** As we don't export an onRequest handler here, Pages won't add this as a function route. */

// We can import PluginData from our cloudflare plugin, but it actually currently exports the wrong type :(
import type { Toucan } from 'toucan-js'

interface Env {
  KV: KVNamespace
  ENVIRONMENT?: 'development' | 'production'
  SENTRY_DSN: string
}

interface Data extends Record<string, unknown> {
  sentry: Toucan
}

export type Function = PagesFunction<Env, any, Data>

export function createResponse(context: EventContext<Env, any, Data>) {
  context.data.sentry.setExtra('Function Path', context.functionPath)

  const respond = (status: number, body?: unknown, headers: Record<string, string> = {}): Response => {
    if (!body) { return new Response(null, { status, headers }) }

    return new Response(JSON.stringify(body), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  }

  return {
    respond,
    context,
  }
}
