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
      errorIndexs: [],
    }
  }

  handleSubmit = () => {
    console.log(this.state)
    let errors = [];
    Object.values(this.state).forEach((value, index) => {
      if (!value && index < 3) {
        errors.push(index)
      } else {
        console.log(index, value, 'not empty')
      }
    })
    this.setState({ errorIndexs: errors})
  }

  provideValue = (input, value) => {
    console.log(input, value)
    switch (input) {
      case 'text':
        this.setState({ payee: value})
        break;
      case 'number':
        this.setState({ amount: value})
        break;
      case 'date':
        this.setState({ date: value})
        break;
      default:
    }
  }

  render() {
    return (
        <div className="details-container">
          <Input provideValue={this.provideValue} title="Payee" inputType="text" inputName="payee" />
          <Input provideValue={this.provideValue} title="Amount in $" inputType="number" inputName="amount" />
          <Input provideValue={this.provideValue} title="Date" inputType="date" inputName="date" />
          <div onClick={this.handleSubmit}> Submit </div>
        </div>
    );
  }
}

export default InputManager;
