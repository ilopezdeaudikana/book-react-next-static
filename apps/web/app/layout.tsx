import { Menu } from '../components/menu/menu'
import { BackPathProvider } from './back-path.provider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
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
        <AntdRegistry>
          <Menu />
          <BackPathProvider>
            {children}
          </BackPathProvider>
          <Analytics />
          <SpeedInsights />
        </AntdRegistry>
      </body>
    </html>
  )
}



