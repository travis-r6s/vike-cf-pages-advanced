import { redirect } from 'vike/abort'

/**
 * This is an example of development only routes.
 * As we have pages we only want to be available in development mode,
 * we have a custom route handler that checks the current env,
 * and either allows the visit, or redirects.
 *
 * Reference: https://vike.dev/auth#login-flow
 */

export function guard() {
  if (import.meta.env.PROD) {
    throw redirect('/')
  }
}
