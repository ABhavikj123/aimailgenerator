declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_API_KEY: string
    NEXT_PUBLIC_OPENAI_API_KEY?: string
    NODE_ENV: 'development' | 'production' | 'test'
  }
} 