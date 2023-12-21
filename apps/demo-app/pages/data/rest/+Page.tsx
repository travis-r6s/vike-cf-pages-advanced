import type { FC } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ofetch } from 'ofetch'

import '@thumbtack/thumbprint-scss/button.css'
import '@thumbtack/thumbprint-scss/list.css'

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
  const { data, error, status, isError } = useQuery({
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
    queryKey: ['posts'],
    queryFn: async () => await ofetch<Post[]>(`/api/posts`),
  })

  return (
    <div>
      <h2 className="tp-title-3">Example</h2>
      <p className="tp-body-1">
        Status:
        {' '}
        {status}
      </p>
      {isError && error instanceof Error && (
        <p className="tp-body-1">{error.message}</p>
      )}
      <br />
      {!!data && (
        <ul className="tp-list tp-list--decimal">
          {data.map((post, i) => (
            <li key={i} className="tp-body-1">
              {post.title}
            </li>
          ))}
        </ul>
      )}
      <br />
      {!!data?.length && (
        <p className="tp-body-3">
          Note: These are not actually
          {' '}
          <em>real</em>
          {' '}
          posts - sorry.
        </p>
      )}
    </div>
  )
}

export function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="page">
        <PageHeader title="REST" />
        <p>
          An example of using
          {' '}
          <code>fetch</code>
          {' '}
          fetching data clientside from an HTTP API, which is in turn hosted on the same worker rendering this page.
        </p>
        <p>
          This example uses
          {' '}
          <a href="https://tanstack.com/query/v3/docs/react/overview">react-query</a>
          {' '}
          to handle data fetching.
        </p>
        <br />
        <p className="tp-body-3">
          Lets be honest, pretty much everything is built on top of
          {' '}
          <code>fetch</code>
          {' '}
          now anyway, so why not keep to the basics?
        </p>
        <br />
        <DataComponent />
      </div>
    </QueryClientProvider>
  )
}
