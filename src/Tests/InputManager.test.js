import React from 'react';

import InputManager from '../Components/InputManager';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<InputManager />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('<InputManager />', () => {
  let inputManager;
  beforeEach(() => {
    inputManager = new InputManager({});
  });

  describe('handleUserInput()', () => {
    it('should call setState once in with correct value', () => {
      inputManager.setState = jest.fn();
      const mockValue = 'mockValue'
      const mockEvent = { target: { value: mockValue, name: 'mockname'}}
      inputManager.handleUserInput(mockEvent);

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].mockname).toBe('mockValue');
    });

  });

  describe('validateField()', () => {
    it('should set payeeValid to false when no payee value given', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('payee', '');

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formErrors.payee).toBe(' cannot be empty');
      expect(inputManager.setState.mock.calls[0][0].payeeValid).toBe(false);
    });

    it('should set payeeValid to true when a payee value given', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('payee', 'mockValue');

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formErrors.payee).toBe('');
      expect(inputManager.setState.mock.calls[0][0].payeeValid).toBe(true);
    });

    it('should set amountValid to true when a amount value given that is less that 1 but greater than 0', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('amount', 0.5);

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formErrors.amount).toBe('');
      expect(inputManager.setState.mock.calls[0][0].amountValid).toBe(true);
    });

    it('should set amountValid to false when a amount value given that is less that 1 and less than 0', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('amount', 0);

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formErrors.amount).toBe(' must be greater than $ 0');
      expect(inputManager.setState.mock.calls[0][0].amountValid).toBe(false);
    });

    it('should set amountValid to false when a amount value given exceeds 10000000000000', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('amount', 10000000000001);

      expect(inputManager.setState.mock.calls.length).toBe(2);
      expect(inputManager.setState.mock.calls[0][0].amount).toBe(10000000000000);
      expect(inputManager.setState.mock.calls[1][0].formErrors.amount).toBe(' must be less that $ 10000000000000');
      expect(inputManager.setState.mock.calls[1][0].amountValid).toBe(false);
    });

    it('should set amountValid to true when a amount value given is valid', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('amount', 123);

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formErrors.amount).toBe('');
      expect(inputManager.setState.mock.calls[0][0].amountValid).toBe(true);
    });

    it('should set dateValid to false when a date value given is empty (invalid)', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('date');

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formErrors.date).toBe(' invalid date');
      expect(inputManager.setState.mock.calls[0][0].dateValid).toBe(false);
    });

    it('should set dateValid to true when a date value given valid', () => {
      inputManager.setState = jest.fn();
      inputManager.validateField('date', '2020-10-10');

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formErrors.date).toBe('');
      expect(inputManager.setState.mock.calls[0][0].dateValid).toBe(true);
    });
  });

  describe('validateForm()', () => {
    it('should call setState once', () => {
      inputManager.state.payeeValid = true;
      inputManager.state.amountValid = true;
      inputManager.state.dateValid = true;
      inputManager.setState = jest.fn();

      inputManager.validateForm();

      expect(inputManager.setState.mock.calls.length).toBe(1);
      expect(inputManager.setState.mock.calls[0][0].formValid).toBe(true);
    });
  });
});
