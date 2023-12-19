import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { Function } from '../../utils'
import { appRouter } from './router'

export function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
  // You can add other context here, like the current authenticated user
  return { req, resHeaders }
}

export type Context = Awaited<ReturnType<typeof createContext>>

/**
 * An example function that uses TRPC as a server. As TRPC uses different paths for each endpoint
 * (i.e. `/api/trpc/user-list`) we use a functions catchall route to handle every path.
 */
export const onRequest: Function = async (context) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: context.request,
    router: appRouter,
    createContext,
  })
}
