import type { FC, PropsWithChildren } from 'react'
import { StrictMode } from 'react'
import type { PageContext } from 'vike/types'

import './PageShell.scss'
import '@fontsource-variable/urbanist'
import '@thumbtack/thumbprint-global-css'

interface Props {
  pageContext: PageContext
}

export const PageShell: FC<PropsWithChildren<Props>> = ({ children, pageContext }) => {
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <div className="layout">
          <Sidebar />
          <div className="content">
            {children}
          </div>
        </div>
      </PageContextProvider>
    </StrictMode>
  )
}
