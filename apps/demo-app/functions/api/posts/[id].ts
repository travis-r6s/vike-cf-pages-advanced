// import { faker } from '@faker-js/faker'
import type { Function } from '../../utils'
import { createResponse } from '../../utils'

export const onRequest: Function = (ctx) => {
  const { respond } = createResponse(ctx)

  const post = {
    id: ctx.params.id,
    title: 'faker.lorem.sentence()',
    image: 'faker.image.url()',
    content: 'faker.lorem.paragraphs({ min: 2, max: 8 })',
  }

  return respond(200, post)
}
