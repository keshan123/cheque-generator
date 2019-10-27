import React from "react";
import PropTypes from "prop-types";

const Cheque = props => (
  <div className="cheque">
    <div className="cheque__payee-and-date-container">
      <div className="cheque__payee">{props.payee}</div>
      <div className="cheque__date-container">
        DATE:
        <div className="cheque__date">
          {props.date.map((number, index) => (
            <div className="cheque__date-individual" key={index}>
              {number}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="cheque__text-and-amount-container">
      <div className="cheque__value-text">{props.valueInString}</div>
      {centsDisplay(props.amount) && (
        <div className="cheque__value-cents">{centsDisplay(props.amount)}</div>
      )}
      <div className="cheque__amount">{`$ ${props.amount}`}</div>
    </div>
    <div className="cheque__barcode-and-signature">
      <div className="cheque__bottom-numbers">
        1234:-5678:--..9010::123..-123-522-42
      </div>
      <div className="cheque__signature">Keshan Peiris</div>
    </div>
  </div>
);

const centsDisplay = value => {
  const centsDividable = value.includes(".");
  if (centsDividable) {
    const centsSplit = value.split(".");
    return `${centsSplit[1]} /100`;
  } else {
    return false;
  }
};

Cheque.propTypes = {
  payee: PropTypes.string,
  amount: PropTypes.string,
  date: PropTypes.array,
  valueInString: PropTypes.string
};

export default Cheque;
