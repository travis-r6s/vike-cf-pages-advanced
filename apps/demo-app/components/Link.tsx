import { usePageContext } from '../hooks/usePageContext'

// We can do direct CSS imports, if we don't need a seperate SCSS file
import '@thumbtack/thumbprint-scss/link.css'

export function Link(props: { href: string, className?: string, children: React.ReactNode }) {
  const pageContext = usePageContext()
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')

  // As we are in SPA mode, Vike adds an event listener to <a> tags that updates the current route (using the history API) instead of doing a new page visit.
  return <a {...props} className={className} />
}
