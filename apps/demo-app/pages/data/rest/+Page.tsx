import type { FC } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

/**
 * You'll likely want to create the client and add the provider in a parent wrapper component,
 * so you don't need to instantiate it in every page.
 */
const queryClient = new QueryClient()

interface Post {
  id: string
  title: string
  image: string
  content: string
}

const DataComponent: FC = () => {
  const { data, error, isLoading, isError, refetch, status } = useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch(`/api/posts`)
      if (!response.ok) {
        throw new Error('Network response was not ok :(')
      }
      return response.json()
    },
  })

  const handleRefresh = useCallback(() => refetch(), [])

  return (
    <div>
      <h2>Some posts for you to read:</h2>
      <p>
        Status:
        {' '}
        {status}
      </p>
      <small>Status not changing? The API is just too dang fast. Check your network console...</small>
      <br />
      {isLoading && (
        <p>Loading...</p>
      )}
      {isError && error instanceof Error && (
        <p>{error.message}</p>
      )}
      {!!data && (
        <>
          <br />
          <button onClick={handleRefresh}>
            Looking for something else?
          </button>
          <br />

          <ul>
            {data.map((post, i) => (
              <li key={i}>
                {post.title}
              </li>
            ))}
          </ul>
        </>
      )}
      <br />
      {!!data?.length && (
        <p>
          <small>
            Note: These are not actually
            {' '}
            <em>real</em>
            {' '}
            posts - sorry.
          </small>
        </p>
      )}
    </div>
  )
}

// TODO: Probably just list posts here, filter by page size, and allow fetching more.

export function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Data: HTTP</h1>
      <p>An example of fetching data clientside from an HTTP API, which is in turn hosted on the same worker rendering this page.</p>
      <p>
        This example uses
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
