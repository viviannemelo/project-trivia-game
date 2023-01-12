import { combineReducers } from 'redux';
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
