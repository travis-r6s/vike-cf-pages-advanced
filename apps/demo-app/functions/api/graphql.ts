import { createSchema, createYoga } from 'graphql-yoga'
import type { Function } from '../utils'

const yoga = createYoga({
  graphqlEndpoint: '/api/graphql',
  graphiql: {
    defaultQuery: `query Hello {\n  hello(name: "explorer")\n}`,
  },
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello(name: String): String!
      }
    `,
    resolvers: {
      Query: {
        hello: (_, args) => args.name ? `Hey, ${args.name}!` : 'Hello World!',
      },
    },
  }),
})

/** You probably don't want to be running a full-featured GraphQL server here, but it's cool that you can if you want to 🤷 */
export const onRequest: Function = async ctx => await yoga.fetch(ctx.request, ctx.env)
