/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string
  // Add your ENV's here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
