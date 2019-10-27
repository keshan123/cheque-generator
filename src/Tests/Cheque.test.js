import React from "react";
import Cheque from "../Components/Cheque";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const mockPayee = "mockpayee";
  const mockDate = "2020-10-10";
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
