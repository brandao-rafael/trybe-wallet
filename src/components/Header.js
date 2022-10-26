import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  componentDidMount() {
    this.finalValue();
  }

  componentDidUpdate() {
    this.finalValue();
  }

  finalValue = () => {
    const { expenses } = this.props;
    let valueToShow = 0;
    if (expenses.length !== 0) {
      valueToShow = expenses.reduce((acc, { value, currency, exchangeRates }) => {
        const totalValue = acc + (Number(value) * Number(exchangeRates[currency].ask));
        return totalValue;
      }, 0);
      return valueToShow;
    }
    return valueToShow;
  };

  render() {
    const { email } = this.props;

    return (
      <div className="header-container">
        <p data-testid="email-field">{ email }</p>
        <h1 className="header-title">Trybe Wallet</h1>
        <div className="header-value">
          <p data-testid="total-field">
            { this.finalValue().toFixed(2) }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
