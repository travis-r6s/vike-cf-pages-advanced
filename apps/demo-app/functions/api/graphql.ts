import { createGraphQLError, createYoga } from 'graphql-yoga'
import SchemaBuilder from '@pothos/core'
import { ofetch } from 'ofetch'
import type { Toucan } from 'toucan-js'
import type { Env, Function } from '../utils'

interface Context {
  Sentry: Toucan
  env: Env
}

// Pothos is out of scope for this example project, but check it out here: https://pothos-graphql.dev
const builder = new SchemaBuilder<{ Context: Context }>({})

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const TodoType = builder.objectRef<Todo>('Todo').implement({
  fields: t => ({
    id: t.exposeID('id'),
    userId: t.exposeID('userId'),
    title: t.exposeString('title'),
    completed: t.exposeBoolean('completed'),
  }),
})

builder.queryType({
  fields: t => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
    todos: t.field({
      type: [TodoType],
      nullable: false,
      resolve: async (_, __, { Sentry }) => {
        try {
          const todos = await ofetch<Todo[]>('https://jsonplaceholder.typicode.com/todos')

          // It's just too many todos! Lets break it down a bit
          return todos.slice(0, 20)
        }
        catch (err) {
          const error = err as Error
          Sentry.captureException(error)
          throw createGraphQLError(error.message)
        }
      },
    }),
    todo: t.field({
      type: TodoType,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, { id }, { Sentry }) => {
        try {
          const todo = await ofetch<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)

          return todo.id ? todo : null
        }
        catch (err) {
          const error = err as Error
          Sentry.captureException(error)
          throw createGraphQLError(error.message)
        }
      },
    }),
  }),
})

builder.mutationType({
  fields: t => ({
    createTodo: t.field({
      type: TodoType,
      nullable: false,
      args: {
        title: t.arg.string({ required: true }),
        userId: t.arg.id({ required: false, defaultValue: 1 }),
      },
      resolve: async (_, { title, userId = 1 }, { Sentry }) => {
        try {
          const todo = await ofetch<Todo>(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'POST',
            body: { title, userId },
          })

          return {
            ...todo,
            completed: false,
          }
        }
        catch (err) {
          const error = err as Error
          Sentry.captureException(error)
          throw createGraphQLError(error.message)
        }
      },
    }),
    completeTodo: t.field({
      type: TodoType,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, { id }, { Sentry }) => {
        try {
          const todo = await ofetch<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)

          if (!todo) { return null }

          const { completed } = await ofetch<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: { completed: true },
          })

          return {
            ...todo,
            completed,
          }
        }
        catch (err) {
          const error = err as Error
          Sentry.captureException(error)
          throw createGraphQLError(error.message)
        }
      },
    }),
  }),
})

const yoga = createYoga<Context>({
  graphqlEndpoint: '/api/graphql',
  graphiql: {
    defaultQuery: `query Hello {\n  hello(name: "explorer")\n}`,
  },
  schema: builder.toSchema(),
})

/** You probably don't want to be running a full-featured GraphQL server here, but it's cool that you can if you want to 🤷 */
export const onRequest: Function = async ctx => await yoga.fetch(ctx.request, {
  env: ctx.env,
  Sentry: ctx.data.sentry,
})
