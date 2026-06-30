export interface Action {
  type: string
  payload: unknown
}

export interface Card {
  id: number
  value: number
}

export interface User {
  id: number
  name: string
}

export interface Score {
  value: number,
  moves: number
}


export interface IntervalRef {
  current: ReturnType<typeof setInterval> | null
}
