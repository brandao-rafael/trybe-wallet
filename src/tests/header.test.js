import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('check the header component', () => {
  const EMAIL = 'tryber@test.com';

  it('check if elements are in the screen', () => {
    renderWithRouterAndRedux(<App />, { initialState: { user: { email: EMAIL } }, initialEntries: ['/carteira'] });
    const headerTitle = screen.getByRole('heading', { level: 1, name: /trybe wallet/i });
    const email = screen.getByTestId('email-field');
    expect(email).toHaveTextContent(EMAIL);
    expect(headerTitle).toBeInTheDocument();
  });

  it('check if wallet form save expenses in store', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    const { store } = renderWithRouterAndRedux(<App />, { initialState: { user: { email: EMAIL } }, initialEntries: ['/carteira'] });

    const expenseValueInput = screen.getByLabelText(/despesa/i);
    const expenseDescriptionInput = screen.getByLabelText(/descrição/i);
    const expenseCoinSelect = await screen.getByLabelText(/moeda/i);
    const expenseMethodSelect = screen.getByLabelText(/forma de pagamento/i);
    const expenseTagSelect = screen.getByLabelText(/categoria/i);
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(expenseValueInput, '250');
    userEvent.type(expenseDescriptionInput, 'hotel');
    await waitFor(() => {
      userEvent.selectOptions(expenseCoinSelect, 'USD');
    });
    userEvent.selectOptions(expenseMethodSelect, 'Cartão de crédito');
    userEvent.selectOptions(expenseTagSelect, 'Lazer');
    userEvent.click(addExpenseButton);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const { wallet } = store.getState();
    expect(wallet.expenses).toHaveLength(1);

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent('1188.27');
  });
});
