import { MenuComponent } from '../components/menu/menu'
import StoreProvider from './store-provider'
import 'antd/dist/reset.css'
import '../styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MenuComponent />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}



