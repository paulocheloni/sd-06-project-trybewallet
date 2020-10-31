import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseThunk, thunkCurrency } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

  sendData(event) {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value, description, currency, method, tag,
    };
    const { savingExpense } = this.props;
    savingExpense(expense);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { emailUser, importedCurrencies } = this.props;
    const { value } = this.state;
    return (
      <div>
        <header>
          Email:
          <span> </span>
          <span data-testid="email-field">{ emailUser.email }</span>
          <span> </span>
          Despesa total: R$
          <span> </span>
          <span data-testid="total-field">
            { importedCurrencies.expenses.length !== 0
              ? Math.round(importedCurrencies.expenses.reduce((sum, expense) => (
                Number(sum) + Number(expense.value)
              ), 0) * 100) / 100 : 0.00}
          </span>
          <span> </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form onSubmit={ this.sendData }>
          <label htmlFor="expenseValue">
            Valor:
            <input
              value={ value }
              name="value"
              data-testid="value-input"
              id="expenseValue"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              data-testid="description-input"
              id="description"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <select
            name="currency"
            data-testid="currency-input"
            id="currencies"
            onChange={ this.handleChange }
          >
            {importedCurrencies.currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
                data-testid={ currency }
              >
                {currency}
              </option>
            ))}
          </select>
          <select
            name="method"
            data-testid="method-input"
            id="payment"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            id="typeExpense"
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="submit">Adicionar despesa</button>
        </form>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user,
  importedCurrencies: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesFetch: () => dispatch(thunkCurrency()),
  savingExpense: (expense) => dispatch(addExpenseThunk(expense)),
});

Wallet.propTypes = {
  emailUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  importedCurrencies: PropTypes.shape({
    currencies: PropTypes.arrayOf.isRequired,
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
  currenciesFetch: PropTypes.func.isRequired,
  savingExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
