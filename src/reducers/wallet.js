import { RESPONSE, ADD_EXPENSE, DEL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  case RESPONSE:
    return { ...state, currencies: action.prices };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses,
        { ...action.expense, exchangeRates: action.exchangeRates }],
    };
  case DEL_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((item) => (item.id !== action.id)),
    };
  default:
    return state;
  }
}

export default wallet;
