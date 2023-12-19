import { usePageContext } from '../../hooks/usePageContext'
import './code.scss'

// TODO: Update to explain this project, what it is trying to show, how it is built, credits.

export function Page() {
  const context = usePageContext()

  if (context.pageProps) { console.log('We have data from the server:', context.pageProps.data) }

  return (
    <>
      <h1>About</h1>
      <p>Example of using Vike.</p>
    </>
  )
}
