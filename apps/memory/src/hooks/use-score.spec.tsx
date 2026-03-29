import { useScore } from './use-score'
import { render, cleanup, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as reactRedux from 'react-redux'
import { vi } from 'vitest'
import { setupStore } from '../store/store'

const TestComponent = () => {
  useScore()
  return <div></div>
}

afterEach(cleanup)

describe('useScore hook', () => {

  it('should dispatch', async () => {
    const store = setupStore({
      cards: {
        visible: [],
        isAnimationOn: false,
        paired: [
          { id: 1, value: 12 },
          { id: 10, value: 12 }
        ],
        list: [
          { id: 1, value: 12 },
          { id: 10, value: 12 }
        ]
      },
      user: {
        id: 1,
        name: "John Doe"
      },
      score: { value: 0 }
    })

    vi.spyOn(store, 'dispatch')

    render(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <TestComponent />
        </BrowserRouter>
      </reactRedux.Provider>
    )
    //await waitFor(() => expect(useSelectorMock).toHaveBeenCalledTimes(1))
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

    render(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <TestComponent />
        </BrowserRouter>
      </reactRedux.Provider>
    )
    await waitFor(() => expect(store.dispatch).not.toHaveBeenCalled())
  })


  it("should also not dispatch", async () => {
    const store = setupStore({
      cards: {
        visible: [],
        isAnimationOn: false,
        paired: [
          { id: 1, value: 12 },
          { id: 10, value: 12 }
        ],
        list: [
          { id: 1, value: 12 },
          { id: 10, value: 12 },
          { id: 14, value: 16 },
          { id: 15, value: 8 }
        ]
      },
      user: {
        id: 1,
        name: "John Doe"
      },
      score: { value: 0 }
    }
    )
    vi.spyOn(store, 'dispatch')

    // store.dispatch(addTodo("Use Redux"))

    // expect(store.getState()).toEqual([{ text: "Use Redux", completed: false }])
    render(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <TestComponent />
        </BrowserRouter>
      </reactRedux.Provider>
    )
    await waitFor(() => expect(store.dispatch).not.toHaveBeenCalled())
  })
})
