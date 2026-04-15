import type { NextConfig } from 'next'
import { withMicrofrontends } from '@vercel/microfrontends/next/config'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/playground',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return [
      // {
      //   source: '/memory',
      //   destination: 'https://showcase-turborepo-memory.vercel.app/',
      // },
      // {
      //   source: '/memory/:path*',
      //   destination: 'https://showcase-turborepo-memory.vercel.app/:path*',
      // },
      // {
      //   source: '/crud19/:path*',
      //   destination: `https://showcase-turborepo-crud19.vercel.app/crud19/:path*`,
      // }
    ]
  }
}

export default withMicrofrontends(nextConfig, { debug: true })
