import { Score } from './score';
import { render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe('User Form', () => {

  it('Inputing text enables the button', async () => {
    const mockStore = configureStore();

    const store = mockStore({
      user: { name: 'test user', id: 400 },
      score: { value: 50 },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Score />
        </BrowserRouter>
      </Provider>
    );

    const congrats = screen.getByTestId('congrats');
    expect(congrats).toHaveTextContent('Congratulations: test user');
    
    const score = screen.getByTestId('score');
    expect(score).toHaveTextContent('Score: 50');
  });
});
