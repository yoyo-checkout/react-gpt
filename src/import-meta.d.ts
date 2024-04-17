interface ImportMetaEnv {
  [key: string]: any
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean

  // custom properties
  VITE_DEPLOY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
