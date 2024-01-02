import { logger } from 'utils'
import { Counter } from 'components'

export function Page() {
  logger.log(`I'm a logger imported from 'utils:workspace*'`)

  return (
    <div className="page">
      <PageHeader title="Workspace" />
      <p className="tp-body-1">This page showcases how you can use other packages in your monorepo, using PNPM workspaces.</p>
      <br />
      <p className="tp-body-1">
        Below, we show a component imported from
        {' '}
        <code>`/packages/components/lib/components/Counter.tsx`</code>
        , and if you check the browser console, you'll see a message from the logger imported from
        {' '}
        <code>/packages/utils</code>
        .
      </p>
      <br />
      <h2 className="tp-title-3">Example</h2>
      <br />
      <Counter />
    </div>
  )
}
