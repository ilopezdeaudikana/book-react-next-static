import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Game, Score, Home } from "./views"
import { store } from "./store/store"
import { Flex, Header, InfoPanel, Typography } from "@repo/ui"
import { navigateTo } from "@repo/utils"

import "./App.scss"

function App() {
  const handleNavigation = (path: string) => {
    navigateTo(path, true)
  }

  return (
    <Provider store={store}>
      <div data-testid="App" className="page">
        <Header onNavigate={handleNavigation} />
        <BrowserRouter basename="/memory">
          <Routes>
            <Route path="/game" element={<Game />} />
            <Route path="/score" element={<Score />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
      <InfoPanel title="Memory game">
        <Flex vertical gap="18">
          <Typography variant="text">
            Stack: React, Typescript, React hooks, Redux, Jest and Scss modules
          </Typography>
          <Typography
            variant="link"
            href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/main/apps/memory"
            target="_blank"
          >
            See on Github
          </Typography>
        </Flex>
      </InfoPanel>
    </Provider>
  )
}

export default App
