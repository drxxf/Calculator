export enum CalculatorActionType {
  ADD_DIGIT = 'ADD_DIGIT',
  SET_OPERATION = 'SET_OPERATION',
  CALCULATE = 'CALCULATE',
  CLEAR = 'CLEAR',
  TOGGLE_SIGN = 'TOGGLE_SIGN',
  PERCENTAGE = 'PERCENTAGE',
  ADD_DECIMAL = 'ADD_DECIMAL'
}

export enum Operation {
  ADD = '+',
  SUBTRACT = '−',
  MULTIPLY = '×',
  DIVIDE = '÷'
}

export interface CalculatorState {
  displayValue: string;
  previousValue: string | null;
  operation: Operation | null;
  waitingForNewValue: boolean;
}