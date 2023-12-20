// import { faker } from '@faker-js/faker'
import type { Function } from '../../utils'
import { createResponse } from '../../utils'

export const onRequest: Function = async (ctx) => {
  const { respond } = createResponse(ctx)

  const transaction = ctx.data.sentry.startTransaction({ name: 'REST' })
  const span = transaction.startChild({ op: ctx.functionPath, description: 'Fetching Posts' })

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
      throw new Error(await response.text())
    }

    const json = await response.json()

    return respond(200, json)
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
