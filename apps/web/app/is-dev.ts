type ProcessLike = {
  env?: {
    NODE_ENV?: string
  }
}

const nodeEnv = (globalThis as typeof globalThis & { process?: ProcessLike }).process?.env?.NODE_ENV

export const isDev = nodeEnv === 'development'
