import { USER_ACTION } from '../actions';

const INITIAL_STATE = {
  user: {},
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_ACTION:
    return {
      ...state,
      email: action.state.email,
    };
  default: return state;
  }
};

export default user;
