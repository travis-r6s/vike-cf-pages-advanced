/** As we don't export an onRequest handler here, Pages won't add this as a function route. */

export interface Env {
  KV: KVNamespace
  ENVIRONMENT?: 'development' | 'production'
}

export type Function = PagesFunction<Env>

export function createResponse(context: EventContext<Env, any, Record<string, unknown>>) {
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
