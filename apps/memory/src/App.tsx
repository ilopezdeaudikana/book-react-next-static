import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Game, Score, Home } from './views'
import { store } from './store/store'
import { Header, InfoPanel, navigateTo } from '@repo/ui'
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
          href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/184aaf5351fce2bedbb02c88c64814fe8c67c3b1/apps/memory"
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
