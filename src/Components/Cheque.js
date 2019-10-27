import React from "react";
import PropTypes from "prop-types";

const Cheque = props => (
  <div className="cheque">
    <div className="cheque__payee-and-date-container">
      <div className="cheque__payee">{props.payee}</div>
      <div>
        DATE: <span className="cheque__date">{props.date}</span>
      </div>
    </div>
    <div className="cheque__text-and-amount-container">
      <div className="cheque__value-text">{props.valueInString}</div>
      <div>{`$ ${props.amount}`}</div>
    </div>
    <div className="cheque__barcode-and-signature">
      <div className="cheque__bottom-numbers">
        1234:-5678:--..9010::123..-123-522-42
      </div>
      <div className="cheque__signature">Keshan Peiris</div>
    </div>
  </div>
);

Cheque.propTypes = {
  payee: PropTypes.string,
  amount: PropTypes.string,
  date: PropTypes.string,
  valueInString: PropTypes.string
};

export default Cheque;
