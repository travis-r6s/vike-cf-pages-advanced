import { Counter } from './Counter'

// TODO: This should be an overview page, with links to each data type, and a brief explanation of each.

export function Page() {
  return (
    <div className="page">
      <PageHeader title="Welcome" />
      <p className="tp-body-1">This page is:</p>
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive.
          {' '}
          <Counter />
        </li>
      </ul>
    </div>
  )
}
