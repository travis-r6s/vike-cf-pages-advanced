import type { FC } from 'react'

const HugeComponent: FC = () => {
  return (
    <div>
      <h2>Heavy Component</h2>
      <p>I import some huge library, that shouldn't be included in the main bundle.</p>
    </div>
  )
}

export default HugeComponent
