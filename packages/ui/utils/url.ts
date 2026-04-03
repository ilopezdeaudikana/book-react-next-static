type ProcessLike = {
  env?: {
    NODE_ENV?: string
  }
}

const nodeEnv = (globalThis as typeof globalThis & { process?: ProcessLike }).process?.env?.NODE_ENV

export const url = nodeEnv === 'production' ? 'https://book-react-next-static.vercel.app' : 'http://localhost:3001'
