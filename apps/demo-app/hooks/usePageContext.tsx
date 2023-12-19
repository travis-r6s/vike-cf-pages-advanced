// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vike.dev/pageContext-anywhere

import React, { useContext } from 'react'
import type { PageContext } from 'vike/types'

type PageContextExtended<P = Record<string, unknown>> = PageContext & {
  pageProps?: P | undefined
}

const Context = React.createContext<PageContextExtended>(undefined as unknown as PageContextExtended)

export function PageContextProvider({ pageContext, children }: { pageContext: PageContext, children: React.ReactNode }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

export function usePageContext<P>() {
  // TODO: Should probably fix this any
  const pageContext = useContext<PageContextExtended<P>>(Context as any)
  return pageContext
}
