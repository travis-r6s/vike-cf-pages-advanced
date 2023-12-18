import { usePageContext } from './usePageContext'

export function Link(props: { href: string, className?: string, children: React.ReactNode }) {
  const pageContext = usePageContext()
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')

  // As we are in SPA mode, Vike adds an event listener to <a> tags that updates the current route instead of doing a new page visit.
  return <a {...props} className={className} />
}
