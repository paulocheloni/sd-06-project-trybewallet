import { SAVE_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_WALLET:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
