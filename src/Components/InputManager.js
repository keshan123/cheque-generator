import React from "react";
import FormErrors from "./FormErrors";
import Cheque from "./Cheque";
import moment from 'moment';

class InputManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: "",
      amount: "",
      date: "",
      formErrors: { payee: "", amount: "", date: "" },
      payeeValid: false,
      amountValid: false,
      dateValid: false,
      formValid: false,
      error: "",
      isLoaded: false,
      valueInString: "",
      reformattedDate: [],
      buttonText: "Submit",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  async handleSubmit() {
    this.setState({ buttonText: 'Loading'})
    await fetch(
      `https://te5299oebg.execute-api.us-west-2.amazonaws.com/prod/${this.state.amount}`
    )
      .then(response => response.text())
      .then(response =>
        this.setState({ isLoaded: true, valueInString: response })
      );
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let payeeValid = this.state.payeeValid;
    let amountValid = this.state.amountValid;
    let dateValid = this.state.dateValid;

    switch (fieldName) {
      case "payee":
        if (value === "") {
          payeeValid = false;
          fieldValidationErrors.payee = payeeValid ? "" : " cannot be empty";
        } else {
          payeeValid = true;
          fieldValidationErrors.payee = "";
        }
        break;
      case "amount":
        if (value < 1) {
          if (value > 0) {
            amountValid = true;
            fieldValidationErrors.amount = "";
          } else {
            amountValid = false;
            fieldValidationErrors.amount = amountValid
              ? ""
              : " invalid - (must be greater than $0 and contain no special characters)";
          }
        } else if (value > 10000000000000) {
          amountValid = false;
          this.setState({ amount: 10000000000000 });
          fieldValidationErrors.amount = amountValid
            ? ""
            : " must be less that $ 10000000000000";
        } else {
          amountValid = true;
          fieldValidationErrors.amount = "";
        }
        break;
      case "date":
        if (!value) {
          dateValid = false;
          fieldValidationErrors.date = dateValid ? "" : " cannot be empty";
        } else {
          if (/[a-zA-Z]/.test(value)) {
            dateValid = false;
            fieldValidationErrors.date = dateValid ? "" : " invalid format";
          } else {
            const momentDate = moment(value, 'DD/MM/YYYY', true)
            let reformatDate = momentDate.format('YYYYMMDD');
            const validatedMoment = momentDate.isValid();
            if (!validatedMoment) {
              dateValid = false;
              fieldValidationErrors.date = dateValid ? "" : " not valid";
            } else {
                const splitDate = reformatDate.split('');
                this.setState({ reformattedDate: splitDate})
                dateValid = true;
                fieldValidationErrors.date = "";
            }
          }
        }
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        payeeValid: payeeValid,
        amountValid: amountValid,
        dateValid: dateValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid:
        this.state.payeeValid && this.state.amountValid && this.state.dateValid
    });
  };

  render() {
    return (
      <>
        {!this.state.isLoaded ? (
          <div className="details-container">
            <label className="form-input__label">Payee</label>
            <input
              className={`form-input ${this.state.formErrors.payee &&
                "invalid"}`}
              type="text"
              value={this.state.payee}
              onChange={event => this.handleUserInput(event)}
              name="payee"
            ></input>
            <label className="form-input__label">Amount in $</label>
            <input
              className={`form-input ${this.state.formErrors.amount &&
                "invalid"}`}
              type="number"
              value={this.state.amount}
              onChange={event => this.handleUserInput(event)}
              name="amount"
            ></input>
            <label className="form-input__label">Date</label>
            <input
              className={`form-input ${this.state.formErrors.date &&
                "invalid"}`}
              value={this.state.date}
              placeholder="DD/MM/YYYY"
              onChange={event => this.handleUserInput(event)}
              name="date"
            ></input>
            <div>
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <button
              type="submit"
              disabled={!this.state.formValid}
              onClick={this.handleSubmit}
              className={`form-input__submit-button outline ${
                this.state.formValid ? "white-green" : "white-grey"
              }`}
            >
              {this.state.buttonText}
            </button>
          </div>
        ) : (
          <Cheque
            payee={this.state.payee}
            amount={this.state.amount}
            valueInString={this.state.valueInString}
            date={this.state.reformattedDate}
          />
        )}
      </>
    );
  }
}

export default InputManager;
