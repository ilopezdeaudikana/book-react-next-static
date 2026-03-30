import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Game, Score, Home } from './views'
import { store } from './store/store'
import { Header, navigateTo } from '@repo/ui'
import './App.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/memory">
        <div data-testid='App' className='page'>
          <Header onNavigate={(path: string) => navigateTo(path, true)} />
          <Routes>
            <Route path='/game' element={<Game />} />
            <Route path='/score' element={<Score />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
