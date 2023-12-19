import type { FC, FormEvent } from 'react'
import { Client, Provider, fetchExchange, useQuery } from 'urql'

/**
 * If you are using GraphQL, you'll want to create the client and add the provider in a parent wrapper component,
 * so you don't need to instantiate it in every page.
 */
const client = new Client({
  url: '/api/graphql',
  exchanges: [fetchExchange],
})

const DataComponent: FC = () => {
  const [name, setName] = useState<string>()
  const [variables, setVariables] = useState<{ name?: string | undefined }>({})

  const [{ fetching, data, error }] = useQuery({
    // Please also use graphql-code-generator for your queries!
    query: `query Hello ($name: String) { hello (name: $name) }`,
    /**
     * If you want, you can update this to pass the name variable directly (so variables: { name }),
     * which will run a GraphQL request each keystroke. Super impractical in real-life, but impressive to see how fast it is.
     */
    variables,
  })

  const handleNameUpdate = useCallback((event: FormEvent<HTMLInputElement>) => setName(event.currentTarget.value), [name])
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()

    setVariables({ name })
  }, [name])

  return (
    <div>
      <h2>Friendly message:</h2>
      {fetching && (
        <p>Loading...</p>
      )}
      {!!error && (
        <p>{error.message}</p>
      )}
      {!!data && (
        <>
          <p>{data.hello}</p>
          <br />
          <form onSubmit={handleSubmit}>
            <label htmlFor="">
              <input type="text" placeholder="Your name" value={name} onInput={handleNameUpdate} />
            </label>
            <button type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}

// TODO: I want a bit more full-featured tech here, so thinking a CRUD, maybe for the TODO's?

export function Page() {
  return (
    <Provider value={client}>
      <h1>Data: GraphQL</h1>
      <p>An example of fetching data clientside from a GraphQL API, which is in turn hosted on the same worker rendering this page.</p>
      <br />
      <DataComponent />
    </Provider>
  )
}
