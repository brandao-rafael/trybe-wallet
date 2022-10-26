import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import INITIAL_STATE from './helpers/initialStateMock';

describe('test de table component', () => {
  const EMAIL = 'tryber@test.com';

  it('verify if elements have the expected behavior', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialState: { user: { email: EMAIL } }, initialEntries: ['/carteira'] });

    const expenseValueInput = screen.getByLabelText(/despesa/i);
    const expenseDescriptionInput = screen.getByLabelText(/descrição/i);
    const expenseCoinSelect = await screen.getByLabelText(/moeda/i);
    const expenseMethodSelect = screen.getByLabelText(/forma de pagamento/i);
    const expenseTagSelect = screen.getByLabelText(/categoria/i);
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(expenseValueInput, '150');
    userEvent.type(expenseDescriptionInput, 'hotel');
    await waitFor(() => {
      userEvent.selectOptions(expenseCoinSelect, 'USD');
    });
    userEvent.selectOptions(expenseMethodSelect, 'Dinheiro');
    userEvent.selectOptions(expenseTagSelect, 'Lazer');
    userEvent.click(addExpenseButton);

    await waitFor(() => {
      expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
      expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
    });

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const hotel = screen.getByText('hotel');
    const value = screen.getByText('150.00');

    expect(hotel).toBeInTheDocument();
    expect(screen.getAllByText('Lazer')).toHaveLength(2);
    expect(screen.getAllByText('Dinheiro')).toHaveLength(2);
    expect(value).toBeInTheDocument();

    const deleteBtn = screen.getByTestId('delete-btn');
    userEvent.click(deleteBtn);

    expect(hotel).not.toBeInTheDocument();
    expect(screen.getAllByText('Lazer')).toHaveLength(1);
    expect(screen.getAllByText('Dinheiro')).toHaveLength(1);
    expect(value).not.toBeInTheDocument();
  });

  it('is possible edit expense', async () => {
    renderWithRouterAndRedux(<App />, { initialState: INITIAL_STATE, initialEntries: ['/carteira'] });

    const editBtn = screen.getAllByRole('button', { name: /editar despesa/i });
    expect(editBtn).toHaveLength(2);
    userEvent.click(editBtn[1]);

    const expenseValueInput = screen.getByLabelText(/despesa/i);
    const expenseDescriptionInput = screen.getByLabelText(/descrição/i);
    const expenseCoinSelect = await screen.getByLabelText(/moeda/i);
    const expenseMethodSelect = screen.getByLabelText(/forma de pagamento/i);
    const expenseTagSelect = screen.getByLabelText(/categoria/i);
    const editExpenseButton = screen.getAllByRole('button', { name: /editar despesa/i });

    userEvent.type(expenseValueInput, '200');
    userEvent.type(expenseDescriptionInput, 'Restaurante');
    await waitFor(() => {
      userEvent.selectOptions(expenseCoinSelect, 'USD');
    });
    userEvent.selectOptions(expenseMethodSelect, 'Dinheiro');
    userEvent.selectOptions(expenseTagSelect, 'Alimentação');
    userEvent.click(editExpenseButton[0]);

    expect(screen.getByText('200.00')).toBeInTheDocument();
    expect(screen.getByText('Restaurante')).toBeInTheDocument();
  });
});
