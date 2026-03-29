import { Score } from '../../types/models';
import scoreReducer, {
  setScore,
} from './score-slice'
const score: Score = { value: 80 };

describe('scoreReducer', () => {
  it('should set a user', () => {
    const state = scoreReducer({value: 0}, setScore(score));
    expect(state.value).toBe(80);
  });

  it('should do nothing', () => {
    const state = scoreReducer({value: 0}, {
      type: 'DUMMY_ACTION',
      payload: score,
    });
    expect(state.value).toBe(0);
  });
});
