import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { wallet, removeExpense, editTheExpense } = this.props;
    return (
      <table className="table">
        <thead>
          <tr className="table-head">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {wallet.length > 0
          && wallet.map((expense) => {
            const value = Number(expense.value);
            const exchangeUsed = Number(expense.exchangeRates[expense.currency].ask);
            const convertedValue = Number((Number(expense.value) * Number(expense
              .exchangeRates[expense.currency].ask)));
            return (
              <tr className="table-body" key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{value.toFixed(2)}</td>
                <td>
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td>{exchangeUsed.toFixed(2)}</td>
                <td>
                  {convertedValue.toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="delete-btn"
                    data-testid="delete-btn"
                    onClick={ () => removeExpense(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="edit-btn"
                    onClick={ () => editTheExpense(expense.id) }
                  >
                    Editar despesa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
  editTheExpense: (id) => dispatch(editExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  wallet: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editTheExpense: PropTypes.func.isRequired,
};
