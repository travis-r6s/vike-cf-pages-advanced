import { Counter } from './Counter'

// TODO: This should be an overview page, with links to each data type, and a brief explanation of each.

export function Page() {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive.
          {' '}
          <Counter />
        </li>
      </ul>
    </>
  )
}
