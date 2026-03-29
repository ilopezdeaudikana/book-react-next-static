import { Card } from '../../types/models'
import cardsReducer, {
  setCards,
  selectCard,
  resetVisibleCards,
  resetCards,
  toggleAnimation,
  CardsSlice
} from './cards-slice'

const card: Card = { id: 5, value: 9 }

const initialState: CardsSlice = {
  list: [],
  isAnimationOn: false,
  visible: [],
  paired: []
}

describe('cardsReducer', () => {

  it('should set cards', () => {
    const state = cardsReducer(initialState, setCards([card]));
    expect(state.list).toEqual([card]);
  });

  it('should select a card', () => {
    const state = cardsReducer(initialState, selectCard(card));
    expect(state.visible).toEqual([card]);
  });

  it('should add cards to paired', () => {
    const newState = { ...initialState, visible: [card] };
    const state = cardsReducer(newState, selectCard({ ...card, id: 50 }));
    expect(state.paired).toEqual([card, { id: 50, value: 9 }]);
  });

  it('should toggle isAnimationOn', () => {
    const state = cardsReducer(initialState, toggleAnimation(true));
    expect(state.isAnimationOn).toBe(true);
  });

  it('should reset visible, paired and isAnimationOn', () => {
    const newState = { list: [], visible: [card], paired: [card], isAnimationOn: true };
    const state = cardsReducer(newState, resetCards());
    expect(state.isAnimationOn).toBe(false);
    expect(state.paired).toEqual([]);
    expect(state.visible).toEqual([]);
  });

  it('should reset visible', () => {
    const newState = { ...initialState, visible: [card] };
    const state = cardsReducer(newState, resetVisibleCards());
    expect(state.visible).toEqual([]);
  });

  it('should do nothing', () => {
    const state = cardsReducer(initialState, {
      type: 'DUMMY_ACTION',
      payload: [card],
    });
    expect(state.list).toEqual([]);
  });
});
