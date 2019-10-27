import React from "react";
import Cheque from "../Components/Cheque";
import renderer from "react-test-renderer";

it("renders correctly without cents", () => {
  const mockPayee = "mockpayee";
  const mockDate = ['1', '2'];
  const mockValueInString = "one hundred dollars";
  const mockAmount = "100";
  const tree = renderer
    .create(
      <Cheque
        payee={mockPayee}
        date={mockDate}
        valueInString={mockValueInString}
        amount={mockAmount}
      ></Cheque>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with cents", () => {
  const mockPayee = "mockpayee";
  const mockDate = ['1', '2'];
  const mockValueInString = "one hundred dollars";
  const mockAmount = "100.20";
  const tree = renderer
    .create(
      <Cheque
        payee={mockPayee}
        date={mockDate}
        valueInString={mockValueInString}
        amount={mockAmount}
      ></Cheque>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
