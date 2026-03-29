import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Game, Score, Home } from './views';
import { store } from './store/store';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/memory">
        <div data-testid='App' className='page'>
          <Routes>
            <Route path='/game' element={<Game />} />
            <Route path='/score' element={<Score />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
