import React from 'react';

export type ButtonVariant = 'black' | 'brown' | 'olive' | 'yellow';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'black', 
  className = '',
  ariaLabel
}) => {
  
  // Base styles for the circular shape and 3D positioning
  const baseStyles = "relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-medium transition-transform duration-100 active:scale-95 select-none";
  
  // Color schemes based on the Braun ET66
  // Note: Using gradients to simulate the convex (domed) plastic look
  const variants = {
    black: "bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] text-white shadow-[0_3px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]",
    brown: "bg-gradient-to-br from-[#5c4d42] to-[#2e2621] text-white shadow-[0_3px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]",
    olive: "bg-gradient-to-br from-[#4a524a] to-[#252925] text-white shadow-[0_3px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]",
    yellow: "bg-gradient-to-br from-[#eebb44] to-[#cfa036] text-[#332200] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]",
  };

  // The "glare" effect to make it look domed
  const glare = "after:content-[''] after:absolute after:top-[5%] after:left-[15%] after:w-[30%] after:h-[20%] after:bg-gradient-to-b after:from-white/20 after:to-transparent after:rounded-full after:pointer-events-none";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${glare} ${className}`}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
};

export default Button;