import React from 'react';
import FormErrors from './FormErrors';

class InputManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payee: '',
      amount: '',
      date: '',
      formErrors: {payee: '', amount: '', date: ''},
      payeeValid: false,
      amountValid: false,
      dateValid: false,
      formValid: false,
      error: '',
      isLoaded: '',
      valueInString: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.validateField(name, value) });
}

async handleSubmit() {
    let response = await fetch(`https://te5299oebg.execute-api.us-west-2.amazonaws.com/prod/${this.state.amount}`);
    console.log(response);
}



  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let payeeValid = this.state.payeeValid;
    let amountValid = this.state.amountValid;
    let dateValid = this.state.dateValid

    switch(fieldName) {
      case 'payee':
        if (value === '') {
          payeeValid = false
          fieldValidationErrors.payee = payeeValid ? '' : ' cannot be empty';
        } else {
          payeeValid = true
          fieldValidationErrors.payee = '';
        }
        break;
      case 'amount':
        if (value < 1) {
          if (value > 0) {
            amountValid = true
            fieldValidationErrors.amount = ''
          } else {
            amountValid = false;
            fieldValidationErrors.amount = amountValid ? '': ' must be greater than $ 0';
          }
        } else if (value > 10000000000000) {
          amountValid = false;
          this.setState({ amount: 10000000000000})
          fieldValidationErrors.amount = amountValid ? '': ' must be less that $ 10000000000000';
        } else {
          amountValid = true;
          fieldValidationErrors.amount = '';
        }
        break;
      case 'date':
        if (!value) {
          dateValid = false
          fieldValidationErrors.date = dateValid ? '': ' invalid date';
        } else {
          dateValid = true
          fieldValidationErrors.date = '';
        }
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    payeeValid: payeeValid,
                    amountValid: amountValid,
                    dateValid: dateValid,
                  }, this.validateForm);
  }

  validateForm = () => {
    this.setState({formValid: this.state.payeeValid && this.state.amountValid && this.state.dateValid});
  }

  render() {
    return (
        <div className="details-container">
          <label className="form-input__label">Payee</label>
          <input
            className="form-input"
            type="text"
            value={this.state.payee}
            onChange={(event) => this.handleUserInput(event)}
            name="payee">
          </input>
          <label className="form-input__label">Amount in $</label>
          <input
            className="form-input"
            type="number"
            value={this.state.amount}
            onChange={(event) => this.handleUserInput(event)}
            name="amount">
          </input>
          <label className="form-input__label">Date</label>
          <input
            className="form-input"
            type="date"
            value={this.state.date}
            onChange={(event) => this.handleUserInput(event)}
            name="date">
          </input>
          <div>
           <FormErrors formErrors={this.state.formErrors} />
          </div>
            <button type="submit" disabled={!this.state.formValid} onClick={this.handleSubmit}> Submit </button>
        </div>
    );
  }
}

export default InputManager;
