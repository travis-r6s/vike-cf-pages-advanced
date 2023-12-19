import type { FC } from 'react'
import { Suspense } from 'react'

interface Props {
  fallback: FC
  component: () => Promise<{ default: FC }>
}

function LoadingFallback() {
  return <p>Loading...</p>
}

/**
 * This is called client only, but can be used to lazy load parts of a page (in essence the same thing).
 * See: https://react.dev/reference/react/lazy
 *
 * It accepts a component to lazy load, and an optional fallback.
 */
export const ClientOnly: FC<Props> = ({ fallback = LoadingFallback, component }) => {
  const [Component, setComponent] = useState<FC>(() => fallback)

  useEffect(() => {
    setComponent(() => lazy(component))
  }, [])

  return (
    <Suspense fallback={fallback({})}>
      <Component />
    </Suspense>
  )
}
