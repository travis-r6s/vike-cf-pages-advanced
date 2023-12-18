// import { faker } from '@faker-js/faker'
import type { Function } from '../../utils'
import { createResponse } from '../../utils'

export const onRequest: Function = (ctx) => {
  const { respond } = createResponse(ctx)
  const posts = Array.from({ length: 20 }).map(() => ({
    id: 'faker.string.nanoid()',
    title: 'faker.lorem.sentence()',
    image: 'faker.image.url()',
    content: 'faker.lorem.paragraphs({ min: 2, max: 8 })',
  }))

  return respond(200, posts)
}
