import { create } from 'zustand'

import type { User } from '../types/models'

interface UserStore {
  id: number,
  name: string,
  setUser: (user: User) => void
}
export const useUser = create<UserStore>((set) => ({
  id: 0,
  name: '',
  setUser: (user: User) => set((state: User) => {
    return {
      ...state,
      ...user
    }
  })

}))