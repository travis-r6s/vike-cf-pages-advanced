import type { FC, FormEvent } from 'react'

export const SimpleExample: FC = () => {
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
    <div className='name-example'>
      <h2 className="tp-title-3">Simple Example:</h2>
      {fetching && (
        <p className="tp-title-5">Loading...</p>
      )}
      {!!error && (
        <p className="tp-title-5">
          Error:
          {' '}
          {error.message}
        </p>
      )}
      {!!data && (
        <>
          <br />
          <p className="tp-body-1">
            <strong>Friendly message:</strong>
            {' '}
            {data.hello}
          </p>
          <br />
          <form
            onSubmit={handleSubmit}
            className="name-form tp-input-row tp-input-row--button-stretch"
          >
            <input
              className="tp-text-input"
              type="text"
              placeholder="Your name"
              value={name}
              onInput={handleNameUpdate}
            />
            <button
              type="submit"
              className="tp-button"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}
