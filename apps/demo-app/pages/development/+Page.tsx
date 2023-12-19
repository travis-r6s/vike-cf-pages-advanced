/** This is an example of a page that will only be rendered in development - see the guard file for more information. */
export function Page() {
  // TODO: We could lazy load? But think Vike does this anyway?
  return (
    <div>
      <h1>Development Only Page</h1>
      <p>This page is only available in development mode.</p>
      <div>
        <p>Some internal tool.</p>
      </div>
    </div>
  )
}
