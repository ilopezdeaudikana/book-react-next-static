import { nodeEnv } from './node-env'

export const url = nodeEnv === 'production' ? 'https://book-react-next-static.vercel.app' : 'http://localhost:3001'
