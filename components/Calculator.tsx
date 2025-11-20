import React, { useEffect } from 'react';
import Button, { ButtonVariant } from './Button';
import Display from './Display';
import { useCalculator } from '../hooks/useCalculator';
import { Operation } from '../types';

const Calculator: React.FC = () => {
  const {
    state,
    handleDigit,
    handleDecimal,
    handleClear,
    handleOperation,
    handleEqual,
    handleToggleSign,
    handlePercentage,
    handleSqrt
  } = useCalculator();

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (/\d/.test(key)) {
        handleDigit(key);
      } else if (key === '.') {
        handleDecimal();
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEqual();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear();
      } else if (key === '+') {
        handleOperation(Operation.ADD);
      } else if (key === '-') {
        handleOperation(Operation.SUBTRACT);
      } else if (key === '*') {
        handleOperation(Operation.MULTIPLY);
      } else if (key === '/') {
        handleOperation(Operation.DIVIDE);
      } else if (key === '%') {
        handlePercentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDecimal, handleEqual, handleClear, handleOperation, handlePercentage]);

  const noOp = () => {};

  return (
    <div className="relative bg-[#1a1a1a] p-5 sm:p-6 rounded-[1.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.4)] w-full max-w-[360px] flex flex-col items-center select-none border-t border-white/10">
      
      {/* Top Section with Dots */}
      <div className="w-full flex justify-end items-center mb-4 px-2 space-x-3 absolute top-8 right-6 z-10">
         {/* Green Dot */}
         <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#4d7a56] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.1)]"></div>
            <div className="w-1 h-1 rounded-full bg-white/30"></div>
         </div>
         {/* Red Dot */}
         <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#a83e3e] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.1)]"></div>
            <div className="w-1 h-1 rounded-full bg-transparent border border-white/30"></div>
         </div>
      </div>

      <div className="mt-8 w-full">
        <Display value={state.displayValue} />
      </div>

      {/* 5 Column Keypad Grid */}
      <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-4 w-full mt-2">
        
        {/* Row 1: Memory & Sign */}
        <Button label="M+" onClick={noOp} variant="olive" className="text-sm sm:text-base" />
        <Button label="M-" onClick={noOp} variant="olive" className="text-sm sm:text-base" />
        <Button label="MR" onClick={noOp} variant="olive" className="text-sm sm:text-base" />
        <Button label="MC" onClick={noOp} variant="olive" className="text-sm sm:text-base" />
        <Button label="+/-" onClick={handleToggleSign} variant="olive" className="text-sm sm:text-base" />

        {/* Row 2 */}
        <Button label="Δ%" onClick={handlePercentage} variant="brown" className="text-sm sm:text-base" />
        <Button label="7" onClick={() => handleDigit('7')} variant="black" />
        <Button label="8" onClick={() => handleDigit('8')} variant="black" />
        <Button label="9" onClick={() => handleDigit('9')} variant="black" />
        <Button label="÷" onClick={() => handleOperation(Operation.DIVIDE)} variant="brown" />

        {/* Row 3 */}
        <Button label="√" onClick={handleSqrt} variant="brown" />
        <Button label="4" onClick={() => handleDigit('4')} variant="black" />
        <Button label="5" onClick={() => handleDigit('5')} variant="black" />
        <Button label="6" onClick={() => handleDigit('6')} variant="black" />
        <Button label="×" onClick={() => handleOperation(Operation.MULTIPLY)} variant="brown" />

        {/* Row 4 */}
        <Button label="%" onClick={handlePercentage} variant="brown" />
        <Button label="1" onClick={() => handleDigit('1')} variant="black" />
        <Button label="2" onClick={() => handleDigit('2')} variant="black" />
        <Button label="3" onClick={() => handleDigit('3')} variant="black" />
        <Button label="-" onClick={() => handleOperation(Operation.SUBTRACT)} variant="brown" />

        {/* Row 5 */}
        <Button label="CE C" onClick={handleClear} variant="brown" className="text-xs sm:text-sm font-bold leading-none" />
        <Button label="0" onClick={() => handleDigit('0')} variant="black" />
        <Button label="." onClick={handleDecimal} variant="brown" />
        <Button label="=" onClick={handleEqual} variant="yellow" />
        <Button label="+" onClick={() => handleOperation(Operation.ADD)} variant="brown" />

      </div>
      
    </div>
  );
};

export default Calculator;