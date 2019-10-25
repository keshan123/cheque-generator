import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      errorMessage: "",
    }
  }

  checkValue = (value) => {
    if (this.props.inputType === 'number') {
      this.handleNumberInput(value)
    }
    if (this.props.inputType === 'text') {
        this.setState({ value: value})
        this.props.provideValue(0, value)
        this.props.checkForErrors()
    }
    if (this.props.inputType === 'date') {
        this.setState({ value: value})
        this.props.provideValue(2, value)
        this.props.checkForErrors()
    }
  }

  handleNumberInput = (value) => {
    if (value > 10000000000000) {
        this.setState({ value: 10000000000000, errorMessage: 'maximum amount $ 10000000000000'})
    } else if (value == 0) { // eslint-disable-line
      this.setState({ value: value, errorMessage: 'cannot have $ 0 value'})
    } else if (value < 0) { // eslint-disable-line
      this.setState({ value: 0, errorMessage: 'cannot have negative value'})
    }else {
      this.setState({ value: value, errorMessage: ''})
    }
    this.props.provideValue(1, value)
    this.props.checkForErrors()
  }
  render() {
    return (
      <>
        <label className="form-input__label">{this.props.title}</label>
        <input
          className="form-input"
          type={this.props.inputType}
          value={this.state.value}
          onChange={(event) => this.checkValue(event.target.value)}
          name={this.props.inputName}>
        </input>
         {(this.state.errorMessage || this.props.errorSubmitMessage) && <div className="form-input__error-message">{this.state.errorMessage || this.props.errorSubmitMessage}</div>}
      </>
    );
  }
}

export default Input;
