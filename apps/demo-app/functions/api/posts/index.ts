import { ofetch } from 'ofetch'
import type { Function } from '../../utils'
import { createResponse } from '../../utils'

export const onRequest: Function = async (ctx) => {
  const { respond } = createResponse(ctx)

  const transaction = ctx.data.sentry.startTransaction({ name: 'REST' })
  const span = transaction.startChild({ op: ctx.functionPath, description: 'Fetching Posts' })

  try {
    const { posts } = await ofetch('https://dummyjson.com/posts?limit=20')

    return respond(200, posts)
  }
  catch (err) {
    const error = err as Error
    ctx.data.sentry.captureException(error)
    return respond(500, error.message)
  }
  finally {
    span.finish()
  }
}
