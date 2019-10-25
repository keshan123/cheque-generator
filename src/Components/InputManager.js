import React from 'react';
import Input from './Input';

class InputManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payee: '',
      amount: '',
      date: '',
      errorFound: false,
      textError: '',
      numberError: '',
      dateError: '',
    }
  }

  handleSubmit = () => {
    this.checkForErrors();
  }

  checkForErrors = () => {
    let errorsArray = [];
    Object.values(this.state).forEach((value, index) => {
      if (!value && index < 3) {
        errorsArray.push(index)
      }
    })
    this.clearErrors()
    for (var i = 0; i < errorsArray.length; i++) {
      switch (errorsArray[i]) {
        case 0:
          this.setState({ textError: 'Please enter a valid payee'})
          break;
        case 1:
          this.setState({ numberError: 'Please enter a valid amount'})
          break;
        case 2:
          this.setState({ dateError: 'Please enter a valid date'})
          break;
        default:
      }
    }

    console.log(this.state)
  }

  clearErrors = () => {
    this.setState({ dateError: '', numberError: '', textError: ''})
  }

  provideValue = (inputIndex, value) => {
    console.log(inputIndex, value)
    switch (inputIndex) {
      case 0:
        this.setState({ payee: value})
        break;
      case 1:
        this.setState({ amount: value})
        break;
      case 2:
        this.setState({ date: value})
        break;
      default:
    }
  }

  render() {
    return (
        <div className="details-container">
          <Input
            checkForErrors={this.checkForErrors}
            errorSubmitMessage={this.state.textError}
            provideValue={this.provideValue}
            title="Payee"
            inputType="text"
            inputName="payee"
          />
          <Input
            checkForErrors={this.checkForErrors}
            errorSubmitMessage={this.state.numberError}
            provideValue={this.provideValue}
            title="Amount in $"
            inputType="number"
            inputName="amount"
          />
          <Input
            checkForErrors={this.checkForErrors}
            errorSubmitMessage={this.state.dateError}
            provideValue={this.provideValue}
            title="Date"
            inputType="date"
            inputName="date"
          />
          <div onClick={this.handleSubmit}> Submit </div>
        </div>
    );
  }
}

export default InputManager;
