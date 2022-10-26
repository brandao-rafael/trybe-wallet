import {
  FAILURE_CURRENCY,
  RECEIVE_CURRENCIES,
  REQUEST_CURRENCY,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  // console.log(action);
  // console.log(state);
  switch (action.type) {
  case REQUEST_CURRENCY: return {
    ...state,
  };
  case RECEIVE_CURRENCIES: return {
    ...state,
    currencies: Object.keys(action.currencies).filter((currency) => currency !== 'USDT'),
  };
  case FAILURE_CURRENCY: return {
    ...state,
    error: action.error,
  };
  case ADD_EXPENSE: return {
    ...state,
    expenses: [...state.expenses.filter((obj) => obj.currency !== ''),
      { id: state.expenses.length, ...action.expenses }],
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: [...state.expenses.filter((obj) => obj.id !== action.id)],
  };
  case EDIT_EXPENSE: return {
    ...state,
    editor: true,
    idToEdit: action.id,
  };
  case UPDATE_EXPENSE: return {
    ...state,
    expenses: state.expenses.map((expense) => {
      if (expense.id === state.idToEdit) {
        return { ...expense,
          ...action.editedExpense };
      }
      return expense;
    }),
    editor: false,
    idToEdit: 0,
  };
  default: return state;
  }
};

export default wallet;
