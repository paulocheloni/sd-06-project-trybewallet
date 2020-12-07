import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenseCurrencyInput from './FormExpenseCurrencyInput';
import FormExpenseDescriptionInput from './FormExpenseDescriptionInput';
import FormExpenseMethodInput from './FormExpenseMethodInput';
import FormExpenseTagInput from './FormExpenseTagInput';
import FormExpenseValueInput from './FormExpenseValueInput';
import TableExpense from './TableExpense';
import BtnEditState from './BtnEditState';
import { editExpense, fetchCurrenciesAction, ratesList } from '../actions';

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { expenseRegister } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    expenseRegister(expense);
    const newId = id + 1;

    this.setState({ id: newId });
  }

  componentDidUpdate(prevProps, prevState) {
    const { newExpense, edit } = this.props;
    if (prevState !== newExpense && newExpense !== null) {
      const temp = newExpense;
      edit(null);
      this.setState(temp);
    }
    const { btnEditState } = this.props;
    if (btnEditState !== prevProps.btnEditState && btnEditState) {
      this.loadElement();
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <form>
          <FormExpenseValueInput
            handleChange={ this.handleChange }
            value={ value }
          />
          <FormExpenseDescriptionInput handleChange={ this.handleChange } />
          <FormExpenseCurrencyInput handleChange={ this.handleChange } />
          <FormExpenseMethodInput handleChange={ this.handleChange } />
          <FormExpenseTagInput handleChange={ this.handleChange } />
          {/* <BtnEditState /> */}
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar Despesa
          </button>
        </form>
        <TableExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newExpense: state.wallet.editExpense,
  btnEditState: state.wallet.btnEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchCurrenciesAction()),
  expenseRegister: (expense) => dispatch(ratesList(expense)),
  edit: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

Expenses.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  expenseRegister: PropTypes.func.isRequired,
};
