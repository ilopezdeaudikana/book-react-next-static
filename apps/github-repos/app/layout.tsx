import Head from 'next/head'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Menu } from './components/menu'
import { InfoPanel, Flex } from '@repo/ui'

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
            <div style={contentStyle}>
              {children}
            </div>
          </Flex>
          <InfoPanel title="Github repository fetcher">
            <p>Stack: Next, Typescript, Antd Github graphql API</p>
            <a
              href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/main/apps/github-repos"
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
