import type { FC } from 'react'

import './PageHeader.scss'

interface Props {
  title: string
}

export const PageHeader: FC<Props> = ({ title }) => {
  return (
    <div className="page-header">
      <h1 className="tp-title-1">{title}</h1>
      <hr className="tp-rule" />
    </div>
  )
}
