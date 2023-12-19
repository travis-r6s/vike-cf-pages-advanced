import type { FC } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../functions/api/trpc/router'

/**
 * You'll likely want to create the client and add the provider in a parent wrapper component,
 * so you don't need to instantiate it in every page. We also instantiate outside of the component
 * as we are in SPA mode, but if you want SSR you should follow the TRPC guide here: https://trpc.io/docs/client/react/setup#4-add-trpc-providers
 */
const queryClient = new QueryClient()
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
})

const DataComponent: FC = () => {
  const { data, error, isLoading, isError, status } = useQuery('users', async () => trpc.userList.query())

  return (
    <div>
      <h2>A list of current users:</h2>
      <small>
        Status:
        {' '}
        {status}
      </small>
      <br />
      {isLoading && (
        <p>Loading...</p>
      )}
      {isError && error instanceof Error && (
        <p>{error.message}</p>
      )}
      {!!data && (
        <ul>
          {data.map((user, i) => (
            <li key={i}>
              {user.id}
              :
              {' '}
              {user.name}
              {' '}
              (
              {user.username}
              )
            </li>
          ))}
        </ul>
      )}
      <br />
      {!!data?.length && (
        <p>
          <small>
            Note: Again, these are not actually
            {' '}
            <em>real</em>
            {' '}
            users.
          </small>
        </p>
      )}
    </div>
  )
}

export function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Data: TRPC</h1>
      <p>An example of fetching data clientside using TRPC, the server of which is hosted on the same worker rendering this page.</p>
      <p>
        This example users
        {' '}
        <a href="https://tanstack.com/query/v3/docs/react/overview">react-query</a>
        {' '}
        to handle data fetching.
      </p>
      <br />
      <DataComponent />
    </QueryClientProvider>
  )
}
