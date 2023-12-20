import { Client, Provider, fetchExchange } from 'urql'
import { SimpleExample } from './SimpleExample'

import './Page.scss'
import '@thumbtack/thumbprint-scss/input-row.css'
import '@thumbtack/thumbprint-scss/input.css'
import '@thumbtack/thumbprint-scss/button.css'
import { AdvancedExample } from './AdvancedExample'

/**
 * If you are using GraphQL, you'll want to create the client and add the provider in a parent wrapper component,
 * so you don't need to instantiate it in every page.
 */
const client = new Client({
  url: '/api/graphql',
  exchanges: [fetchExchange],
})

// TODO: I want a bit more full-featured tech here, so thinking a CRUD, maybe for the TODO's?

export function Page() {
  return (
    <Provider value={client}>
      <div className="page">
        <PageHeader title="GraphQL" />
        <p className="tp-body-1">An example of fetching data clientside from a GraphQL API, which is in turn hosted on the same worker rendering this page.</p>
        <p className="tp-body-1">
          This is a pretty atypical GraphQL setup -
          {' '}
          <a href="https://the-guild.dev/graphql/yoga-server" target="_blank">GraphQL Yoga</a>
          {' '}
          is used in the Cloudflare Pages Function, and
          {' '}
          <a href="https://formidable.com/open-source/urql/" target="_blank">URQL</a>
          {' '}
          is used clientside.
          <a href="https://pothos-graphql.dev" target="_blank">Pothos</a>
          {' '}
          (an
          {' '}
          <em>excellent tool</em>
          ) is used to create the GraphQL Schema, but this could be replaced with any other similar tool. You could also use the
          {' '}
          <a href="https://the-guild.dev/graphql/codegen" target="_blank">GraphQL Code Generator</a>
          {' '}
          to create automatic clientside types for your schema.
        </p>
        <br />
        <SimpleExample />
        <br />
        <AdvancedExample />
      </div>
    </Provider>
  )
}
