import React from 'react';

interface ButtonProps {
  onClick: () => void;
  isValid: boolean;
  isLoading: boolean;
  text: string;
  loadingText: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, isValid, isLoading, text, loadingText }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isValid ? "bg-[#00FFFF] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!isValid}
    >
      {isLoading ? loadingText : text}
    </button>
  );
};

export default Button;
