declare module '*.md' {
  const Component: React.ComponentType<{ children?: never }>
  export default Component
}

declare module 'rehype-urls' {
  import { Plugin } from 'rehype'

  export default Plugin
}
