/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VISITOR_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.md?raw' {
  const content: string
  export default content
}
