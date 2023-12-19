import type { Function } from '../utils'
import { createResponse } from '../utils'

/** A proxy example - fetching data from a remote API, and sending it back. */
export const onRequest: Function = async (ctx) => {
  const { respond } = createResponse(ctx)

  const response = await fetch('https://jsonplaceholder.typicode.com/todos')

  if (!response.ok) { throw new Error('Failed to fetch data from API.') }

  const json = await response.json()

  return respond(200, json)
}
