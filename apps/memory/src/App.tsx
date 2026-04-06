import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Game, Score, Home } from './views'
import { store } from './store/store'
import { Header, InfoPanel } from '@repo/ui'
import { navigateTo } from '@repo/utils'

import './App.scss'

function App() {
  const handleNavigation = (path: string) => {
    navigateTo(path, true)
  }
  
  return (
    <Provider store={store}>
      <div data-testid='App' className='page'>
        <Header onNavigate={handleNavigation} />
        <BrowserRouter basename="/memory">

          <Routes>
            <Route path='/game' element={<Game />} />
            <Route path='/score' element={<Score />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>

      </div>
      <InfoPanel title="Memory game">
        <p>Stack: React, Typescript, React hooks, Redux, Jest and Scss modules</p>
        <a
          href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/main/apps/memory"
          target="_blank"
          rel="noopener noreferrer"
        >
          See on Github
        </a>
      </InfoPanel>
    </Provider>
  )
}

export default App
