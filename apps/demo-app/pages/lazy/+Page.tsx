function Loading() {
  return <small>Loading a frankly ludicrous amount of code...</small>
}

// TODO: Add documentation to say look at network request.
// TODO: Add option to load a component on button click

export function Page() {
  return (
    <div>
      <h1>Lazy Loading</h1>
      <p>This page lazy loads a rather large component - for example a PDF rendering library.</p>
      <br />
      <ClientOnly
        fallback={Loading}
        component={async () => {
          const dep = await import('./HugeComponent')

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
