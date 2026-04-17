import { Menu } from '../components/menu/menu'
import { BackPathProvider } from './back-path.provider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import 'antd/dist/reset.css'
import '../styles/globals.scss'
import { Flex, InfoPanel, Typography } from '@repo/ui'

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
          <InfoPanel title="Personal portfolio">
            <Flex vertical gap="18">
              <Typography variant="text">Stack: Next, TypeScript and Antd</Typography>
              <Typography variant="link"
                href="https://github.com/ilopezdeaudikana/book-react-next-static"
                target="_blank"
              >
                See on Github
              </Typography>
            </Flex>
          </InfoPanel>
        </AntdRegistry>
      </body>
    </html>
  )
}



