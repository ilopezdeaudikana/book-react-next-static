import Head from 'next/head'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Menu } from './components/menu'
import { InfoPanel, Flex, Typography } from '@repo/ui'
import '../styles/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Head>
          <title>Github repository fetcher</title>
          <meta
            name="description"
            content="App that fetches repositories from Github"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AntdRegistry>
          <Menu />
          <div className="flex flex-col items-center h-[calc(100vh-46px)]">
            <div className="w-[90%] flex flex-col">
              {children}
            </div>
          </div>
          <InfoPanel title="Github repository fetcher agent">
            <Flex vertical gap="18">
              <Typography variant="text">
                Stack: Next, Typescript, Antd, Mastra, Github graphql API
              </Typography>
              <Typography
                variant="link"
                href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/main/apps/github-repos"
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
