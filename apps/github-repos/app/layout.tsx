import Head from 'next/head'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Content } from 'antd/es/layout/layout'
import { Flex } from 'antd'
import { Menu } from './components/menu'
import { InfoPanel } from '@repo/ui'

const contentStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  maxWidth: '80%',
  height: '100vh',
  padding: '2rem'
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Head>
          <title>Github repository fetcher</title>
          <meta name="description" content="App that fetches repositories from Github" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AntdRegistry>
          <Menu />
          <Flex justify="center" wrap>
            <Content style={contentStyle}>
              {children}
            </Content>
          </Flex>
          <InfoPanel title="Github repository fetcher">
            <p>Stack: Next, Typescript, Antd Github graphql API</p>
            <a
              href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/618b4e20b043b65dcf53add13899dca6e712e107/apps/github-repos"
              target="_blank"
              rel="noopener noreferrer"
            >
              See on Github
            </a>
          </InfoPanel>
        </AntdRegistry>
      </body>
    </html>
  )
}
