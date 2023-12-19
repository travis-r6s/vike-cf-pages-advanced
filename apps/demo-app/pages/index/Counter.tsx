import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <Button onClick={() => setCount(count => count + 1)}>
      Counter
      {' '}
      {count}
    </Button>
  )
}
