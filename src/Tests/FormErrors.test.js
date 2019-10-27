import React from "react";
import FormErrors from "../Components/FormErrors";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const formErrors = {
    payee: "mockpayee error",
    amount: "mockamount error",
    date: "mockdate error"
  };
  const tree = renderer
    .create(<FormErrors formErrors={formErrors}></FormErrors>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
