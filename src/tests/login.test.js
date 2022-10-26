import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('test the login page', () => {
  it('should the elements are in screen', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /email/i });
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  it('check the behavior of the page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/password:/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'email@test.com');
    userEvent.type(passwordInput, 'passphrasse');
    expect(enterButton).toBeEnabled();
    userEvent.click(enterButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});
