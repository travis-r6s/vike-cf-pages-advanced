import { logger } from 'utils'

import './page.scss'
import '@thumbtack/thumbprint-scss/label.css'
import '@thumbtack/thumbprint-scss/select.css'
import type { FC } from 'react'
import type { Country } from './+data'

/** Type of the data from the `onBeforeRender` hook */
interface PageContext {
  data: string
}

/** Type of the data from the `data` hook */
interface Props {
  data: {
    countries: Country[]
  }
}

export const Page: FC<Props> = ({ data }) => {
  // We pass in the PageProps type here, which updates our context to add the correct types.
  const context = usePageContext<PageContext>()

  if (context.pageProps) {
    logger.success('We have pageContext data from the server:', context.pageProps.data)
  }

  const countries = useMemo(() => {
    if (!data.countries) {
      return []
    }

    return data.countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
  }, [])

  return (
    <div className="page">
      <PageHeader title="Page Context" />
      <p className="tp-body-1">
        Example of fetching data server-side, and adding it to the page context (i.e. inline JSON in the HTML page) using the
        {' '}
        <a href="https://vike.dev/data-fetching" target="_blank">
          <code>data</code>
          {' '}
          hook
        </a>
        .
        {' '}
        If you are familiar with Next, this is the same as
        {' '}
        <code>getServerSideProps</code>
        . As this is run server-side, you can fetch data
        {' '}
        directly from a database, or query an authenticated API directly as the function will never be run on the client and therefore no secrets will be exposed.
        It is useful for fetching data that will be immediately used in the page, without the client needing to run and wait for an API request to fetch this data.
      </p>
      <br />
      <h2 className="tp-title-3">Example</h2>
      <p className="tp-body-1">
        You could use this method to fetch some data for use in form fields - below, we fetch a list of countries
        {' '}
        <br />
        from a remote API, and use that list to populate a select field.
      </p>
      <br />
      {context.pageProps && (
        <form>
          <label
            className="tp-label"
            htmlFor="country-select"
          >
            Select a country

          </label>
          <select
            id="country-select"
            className="tp-select"
          >
            {countries.map((country, i) => (
              <option
                key={i}
                value={country.name.common}
              >
                {country.name.common}

              </option>
            ))}
          </select>
        </form>
      )}
    </div>
  )
}
