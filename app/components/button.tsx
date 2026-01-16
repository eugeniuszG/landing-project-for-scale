import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  width = 'w-auto', 
  height = 'h-10', 
  bgColor = 'bg-[#960019]',
  textColor = 'text-white',
  className = ''
}) => {
  return (
    <button
      style={{ transition: 'all 200ms ease-in-out', padding: '0.5rem 1rem' }}
      onClick={onClick}
      className={`
        ${width} ${height} ${bgColor} ${textColor}
        rounded-md font-semibold shadow-sm
        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
        transition-all duration-200 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;