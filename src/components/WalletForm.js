import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAction, addExpense } from '../redux/actions';
import fetchCurrency from '../services/fetchCurrency';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAction());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const valueCurrency = await fetchCurrency();
    this.setState({
      exchangeRates: valueCurrency,
    });

    dispatch(addExpense(this.state));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: '',
    });
  };

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="expense-form">
        <label htmlFor="expense-input">
          Despesa
          <input
            type="number"
            data-testid="value-input"
            id="expense-input"
            onChange={ this.handleChange }
            name="value"
            value={ value }
            required
          />
        </label>
        <label htmlFor="expense-description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            id="expense-description"
            onChange={ this.handleChange }
            name="description"
            value={ description }
            required
          />
        </label>
        <label htmlFor="select-currencie">
          Moeda
          <select
            id="select-currencie"
            data-testid="currency-input"
            onChange={ this.handleChange }
            name="currency"
            value={ currency }
          >
            {currencies.map((ActCurrency, i) => (
              <option
                key={ i }
                value={ ActCurrency }
              >
                { ActCurrency }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="pay-method">
          Forma de pagamento
          <select
            id="pay-method"
            data-testid="method-input"
            onChange={ this.handleChange }
            name="method"
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape().isRequired,

};

export default connect(mapStateToProps)(WalletForm);
