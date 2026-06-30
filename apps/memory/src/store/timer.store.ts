import { create } from 'zustand'

interface TimerStore {
  seconds: number,
  intervalId: ReturnType<typeof setTimeout> | null,
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
}

export const useTimer = create<TimerStore>((set, get) => ({
  seconds: 0,
  intervalId: null,

  startTimer: () => {
    // Prevent duplicate intervals
    if (get().intervalId) return

    const id = setInterval(() => {
      set((state) => ({ seconds: state.seconds + 1 }))
    }, 1000)

    set({ intervalId: id })
  },

  stopTimer: () => {
    const id = get().intervalId
    if (id) {
      clearInterval(id)
      set({ intervalId: null })
    }
  },

  resetTimer: () => {
    get().stopTimer()
    set({ seconds: 0 })
  }
}))