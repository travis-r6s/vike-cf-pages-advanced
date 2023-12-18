import { usePageContext } from '../../renderer/usePageContext'
import './code.scss'

export function Page() {
  const context = usePageContext()

  if(context.pageProps) console.log('We have data from the server:', context.pageProps.data)

  return (
    <>
      <h1>About</h1>
      <p>Example of using Vike.</p>
    </>
  )
}
