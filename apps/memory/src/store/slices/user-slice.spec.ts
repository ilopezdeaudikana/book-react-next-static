import { User } from '../../types/models';
import userReducer, {
  setUser,
} from './user-slice'

const user: User = { id: 14, name: 'User name' };

describe('userReducer', () => {

  it('should set a user', () => {
    const state = userReducer({} as User, setUser(user));
    expect(state).toEqual(user);
  });

  it('should do nothing', () => {
    const state = userReducer({} as User, {
      type: 'DUMMY_ACTION',
      payload: user,
    });
    expect(state.name).not.toBeDefined();
  });
});

