import React from "react";
import PropTypes from "prop-types";

const FormErrors = ({ formErrors }) => (
  <div className="form-input__error-message">
    {Object.keys(formErrors).map((fieldName, index) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p className="form-input__error-message__individual" key={index}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </div>
);

FormErrors.propTypes = {
  formErrors: PropTypes.shape({
    payee: PropTypes.string,
    amount: PropTypes.string,
    date: PropTypes.string
  })
};

export default FormErrors;
