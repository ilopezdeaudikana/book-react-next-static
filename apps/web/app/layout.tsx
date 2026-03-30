import { Menu } from '../components/menu/menu'
import StoreProvider from './store.provider'
import { BackPathProvider } from './back-path.provider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import 'antd/dist/reset.css'
import '../styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Menu />
        <BackPathProvider>
          <StoreProvider>{children}</StoreProvider>
        </BackPathProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}



