import { Home } from './home';
import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { Mock, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: (): Mock<any> => vi.fn(),
}))

afterEach(cleanup);

describe('User Form', () => {
  it('Inputing text enables the button', async () => {
    const mockStore = configureStore();
    
    const store = mockStore({});
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const { getByRole } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const input = getByRole('textbox');
    userEvent.type(input, 'a')
    const submit = getByRole('button');
    await waitFor(() => expect(submit).not.toBeDisabled());
    userEvent.click(submit);
    await waitFor(() => expect(dispatchSpy).toHaveBeenCalled());
  });

  it('Submit button should be disabled', async () => {
    const mockStore = configureStore();
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const submit = getByRole('button');
    expect(submit).toBeDisabled();
  });
});