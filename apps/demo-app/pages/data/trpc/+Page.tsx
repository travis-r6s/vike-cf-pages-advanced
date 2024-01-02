import type { FC } from 'react'
import { QueryClient, QueryClientProvider, keepPreviousData, useQuery } from '@tanstack/react-query'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../functions/api/trpc/router'

import '@thumbtack/thumbprint-scss/loader.css'
import '@thumbtack/thumbprint-scss/button.css'

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
  const [page, setPage] = useState(1)
  const { data, error, isLoading, isError, refetch, isPlaceholderData } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => trpc.productList.query({ page }),
    placeholderData: keepPreviousData,
  })

  const hasNextPage = useMemo(() => !!data?.length, [data])

  const handleNextPage = useCallback(() => {
    setPage(current => current + 1)
    refetch({ })
  }, [page])

  return (
    <div>
      <h2 className="tp-title-3">Example</h2>
      <br />
      {isLoading && (
        <p className="tp-body-1">Loading...</p>
      )}
      {isError && error instanceof Error && (
        <p className="tp-body-1">
          Error:
          {' '}
          {error.message}
        </p>
      )}
      <br />
      {!!data && (
        <div>
          <p className="tp-title-5">Top Products:</p>
          <br />
          <ul>
            {data.map((product, i) => (
              <li key={i} className="tp-body-1">
                {product.id}
                :
                {' '}
                {product.title}
                {' '}
                -
                $
                {product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!!data && !hasNextPage && (
        <p className="tp-body-1">That's it for today. Check back tomorrow for our updated list!</p>
      )}
      <br />
      {hasNextPage && (
        <button
          className="tp-button"
          onClick={handleNextPage}
          disabled={isPlaceholderData || isLoading}
        >
          {isPlaceholderData || isLoading
            ? (
              <ul className="tp-loader">
                <li></li>
                <li></li>
                <li></li>
              </ul>
              )
            : (
              <span>Next Page</span>
              )}
        </button>
      )}
    </div>
  )
}

export function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="page">
        <PageHeader title="TRPC" />
        <p className="tp-body-1">
          A simple example of fetching data clientside using
          {' '}
          <a href="https://trpc.io" target="_blank">TRPC</a>
          , the server of which is hosted on the same worker rendering this page.
          This example also uses
          {' '}
          <a href="https://tanstack.com/query/v3/docs/react/overview">react-query</a>
          {' '}
          to handle data fetching.
        </p>
        <br />
        <p className="tp-body-1">
          You would most likely only use this if you needed an API to handle mutations - if you are only fetching data to be used in the page, then you may be better served by using the
          {' '}
          <code>data</code>
          {' '}
          hook, and adding data to page context. See
          {' '}
          <Link href="/data/page-context">the example</Link>
          .
        </p>
        <br />
        <DataComponent />
      </div>
    </QueryClientProvider>
  )
}
