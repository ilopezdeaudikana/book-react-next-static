import { CardsSlice } from '../store/slices/cards-slice';

export interface Action {
  type: string;
  payload: any;
}

export interface Card {
  id: number;
  value: number;
}

export interface User {
  id: number;
  name: string;
}

export interface Score {
  value: number;
}


export interface State {
  cards: CardsSlice
  user: User
  score: Score
}

export interface IntervalRef {
  current: ReturnType<typeof setInterval> | null;
}

export interface DurationRef {
  current: number;
}
