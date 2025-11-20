import { useState, useCallback } from 'react';
import { Operation, CalculatorState } from '../types';

const INITIAL_STATE: CalculatorState = {
  displayValue: '0',
  previousValue: null,
  operation: null,
  waitingForNewValue: false,
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);

  const calculate = (a: number, b: number, op: Operation): number => {
    switch (op) {
      case Operation.ADD: return a + b;
      case Operation.SUBTRACT: return a - b;
      case Operation.MULTIPLY: return a * b;
      case Operation.DIVIDE: return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleDigit = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          displayValue: digit,
          waitingForNewValue: false,
        };
      }

      const newValue = prev.displayValue === '0' ? digit : prev.displayValue + digit;
      // Limit display length roughly
      if (newValue.length > 10) return prev; 
      
      return {
        ...prev,
        displayValue: newValue,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          displayValue: '0.',
          waitingForNewValue: false,
        };
      }

      if (prev.displayValue.includes('.')) return prev;

      return {
        ...prev,
        displayValue: prev.displayValue + '.',
      };
    });
  }, []);

  const handleClear = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const handleOperation = useCallback((op: Operation) => {
    setState((prev) => {
      // If we already have an operation and are waiting, just switch the operation
      if (prev.operation && prev.waitingForNewValue) {
        return { ...prev, operation: op };
      }

      // If we have a previous value and an operation, calculate intermediate result
      if (prev.previousValue && prev.operation) {
        const result = calculate(
          parseFloat(prev.previousValue),
          parseFloat(prev.displayValue),
          prev.operation
        );
        
        // Format result to avoid long decimals
        const formattedResult = String(parseFloat(result.toPrecision(12)));

        return {
          displayValue: formattedResult,
          previousValue: formattedResult,
          operation: op,
          waitingForNewValue: true,
        };
      }

      // First operation
      return {
        ...prev,
        previousValue: prev.displayValue,
        operation: op,
        waitingForNewValue: true,
      };
    });
  }, []);

  const handleEqual = useCallback(() => {
    setState((prev) => {
      if (!prev.operation || !prev.previousValue) return prev;

      const result = calculate(
        parseFloat(prev.previousValue),
        parseFloat(prev.displayValue),
        prev.operation
      );

      const formattedResult = String(parseFloat(result.toPrecision(12)));

      return {
        displayValue: formattedResult,
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
      };
    });
  }, []);

  const handleToggleSign = useCallback(() => {
    setState((prev) => {
      const val = parseFloat(prev.displayValue);
      if (val === 0) return prev;
      return {
        ...prev,
        displayValue: String(val * -1),
      };
    });
  }, []);

  const handlePercentage = useCallback(() => {
    setState((prev) => {
      const val = parseFloat(prev.displayValue);
      return {
        ...prev,
        displayValue: String(val / 100),
      };
    });
  }, []);

  const handleSqrt = useCallback(() => {
    setState((prev) => {
      const val = parseFloat(prev.displayValue);
      if (val < 0) return prev; // Basic error handling
      const res = Math.sqrt(val);
      return {
        ...prev,
        displayValue: String(parseFloat(res.toPrecision(12))),
        waitingForNewValue: true,
      };
    });
  }, []);

  return {
    state,
    handleDigit,
    handleDecimal,
    handleClear,
    handleOperation,
    handleEqual,
    handleToggleSign,
    handlePercentage,
    handleSqrt
  };
};