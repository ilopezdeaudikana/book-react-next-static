import { Menu } from './components/menu'
import { InfoPanel, Flex, Typography } from '@repo/ui'
import ReposView from './repos.view'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Menu />
        <div className="flex flex-col items-center h-[calc(100vh-46px)]">
          <div className="w-[90%] flex flex-col">
            <ReposView />
          </div>
        </div>
        <InfoPanel title="Github repository fetcher agent">
          <Flex vertical gap="18">
            <Typography variant="text">
              Stack: React, Typescript, Antd, Mastra, Github API
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
      </BrowserRouter>
    </QueryClientProvider>
  )
}
