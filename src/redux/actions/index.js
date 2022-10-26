import fetchCurrency from '../../services/fetchCurrency';

export const USER_ACTION = 'USER_ACTION';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILURE_CURRENCY = 'FAILURE_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const userLoginAction = (state) => ({
  type: USER_ACTION,
  state,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

export const receiveCurrency = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const failureCurrency = (error) => ({
  type: FAILURE_CURRENCY,
  error,
});

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const updateExpense = (editedExpense) => ({
  type: UPDATE_EXPENSE,
  editedExpense,
});

export const fetchCurrencyAction = () => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const response = await fetchCurrency();
    dispatch(receiveCurrency(response));
  } catch (error) {
    dispatch(failureCurrency(error));
  }
};
