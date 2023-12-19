import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import './Button.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'secondary' | 'tertiary' | 'caution'
}

export const Button: FC<PropsWithChildren<Props>> = ({ children, variant, ...props }) => {
  return (
    <button {...props} className={`tp-button ${variant ? `tp-button--${variant}` : ''}`}>
      {children}
    </button>
  )
}
