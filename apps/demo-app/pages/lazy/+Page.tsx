import './Page.scss'

/**
 * This is the component that is shown while the lazy component is being loaded.
 * You could change this to a loading spinner for example.
 */
function Loading() {
  return <small>Loading a frankly ludicrous amount of code...</small>
}

export function Page() {
  return (
    <div className="page">
      <PageHeader title="Lazy Loading" />
      <p className="tp-body-1">This page demonstrates lazy loading large components. Vite + Vike do codesplit bundles & routes anyway, but you may want to use this to show the page content first with a loading indicator, then load the component.</p>
      <p className="tp-body-1">
        This uses Vite's built-in support for lazy loading components, with Reacts
        {' '}
        <a href="https://react.dev/reference/react/lazy" target="_blank"><code>lazy</code></a>
        {' '}
        function. It also makes use of Suspense to show the loading indicator.
      </p>
      <br />
      <p className="tp-body-1">
        There is actually a generic component named
        {' '}
        <code>ClientOnly.tsx</code>
        {' '}
        which we use for this - it takes a
        {' '}
        <code>component</code>
        {' '}
        function which we add our import to, and it makes sure that a) our component is only loaded client-side, and b) the component is lazy loaded.
      </p>
      <br />
      <h2 className="tp-title-3">Example</h2>
      <p className="tp-body-1">
        To check this is working, open your browser dev tools, go to the network tab, filter by
        {' '}
        <strong>JS</strong>
        , and reload the page. You should see a chunk that is loaded just after the file name
        {' '}
        <code>pages_lazy.*.js</code>
        . If you try loading another page, you should also see that this chunk is only loaded for this page.
      </p>
      <br />
      <ClientOnly
        fallback={Loading}
        component={async () => {
          const dep = await import('./HeavyComponent')

          // Faking a long load time. Otherwise, you can just directly return the import.
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve()
            }, 3000)
          })

          return dep
        }}
      />
    </div>
  )
}
