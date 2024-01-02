import type { FC } from 'react'
import { useState } from 'react'

import styles from './Counter.module.css'

export const Counter: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <button
      onClick={() => setCount(count => count + 1)}
      className={styles.button}
    >
      count is
      {' '}
      {count}
    </button>
  )
}
