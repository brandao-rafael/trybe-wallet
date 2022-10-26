import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  render() {
    const { wallet } = this.props;
    const { editor } = wallet;
    return (
      <div>
        <Header />
        {editor ? <EditForm /> : <WalletForm />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

Wallet.propTypes = {
  wallet: PropTypes.shape({
    editor: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
