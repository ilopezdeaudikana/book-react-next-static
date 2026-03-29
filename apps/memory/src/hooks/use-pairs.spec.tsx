import { usePairs } from './use-pairs'
import { render, cleanup, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { setupStore } from '../store/store'
import * as reactRedux from 'react-redux'

const TestComponent = () => {
  usePairs()
  return <div></div>
}

afterEach(cleanup)

describe('UsePairs hook', () => {

  it('should dispatch', async () => {
    const store = setupStore({
      cards: {
        visible: [{ id: 1, value: 12 }, { id: 10, value: 11 }],
        isAnimationOn: false,
        paired: [],
        list: []
      },
      user: {
        id: 1,
        name: "John Doe"
      },
      score: { value: 0 }
    })
    vi.spyOn(store, 'dispatch')

    render(<reactRedux.Provider store={store}>
      <TestComponent />
    </reactRedux.Provider>)
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1))
  })

  it('should not dispatch', async () => {
    const store = setupStore({
      cards: {
        visible: [],
        isAnimationOn: false,
        paired: [],
        list: []
      },
      user: {
        id: 1,
        name: "John Doe"
      },
      score: { value: 0 }
    })
    vi.spyOn(store, 'dispatch')

    render(<reactRedux.Provider store={store}>
      <TestComponent />
    </reactRedux.Provider>)
    await waitFor(() => expect(store.dispatch).not.toHaveBeenCalled())
  })
})
