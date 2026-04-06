declare const process: {
  env: {
    NODE_ENV?: string
  }
}

export const nodeEnv = process.env.NODE_ENV
