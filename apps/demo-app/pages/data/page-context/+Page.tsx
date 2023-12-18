import './code.scss'

interface PageProps {
  data: { title: string }[]
}

export function Page() {
  const context = usePageContext<PageProps>()

  if (context.pageProps) {
    console.log('We have data from the server:', context.pageProps.data)
  }

  return (
    <>
      <h1>Data: Page Context</h1>
      <p>Example of fetching data server-side, and adding it to the page context (i.e. inline JSON in the HTML page.)</p>
      <br />
      <h2>Posts</h2>
      {context.pageProps && (
        <ul>
          {context.pageProps.data.map((post, i) => (
            <li key={i}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  )
}
