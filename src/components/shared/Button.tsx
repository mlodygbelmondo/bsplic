import React from "react";

export interface ButtonInterface {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "warning";
  disabled?: boolean;
}

export const Button: React.FC<ButtonInterface> = ({
  onClick,
  children,
  variant = "primary",
  disabled = false,
}) => {
  const variants = {
    primary:
      "bg-red-500 text-white border-red-500 hover:border-red-600 hover:bg-red-600",
    secondary: "text-black bg-white border-text100 hover:bg-gray-50",
    warning: "text-error500 bg-white border-error500 hover:bg-gray-50",
    disabled:
      "border-gray-300 bg-gray-300 text-gray-400 hover:border-gray-300 hover:bg-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-12 w-full rounded border-2 ${
        disabled ? variants.disabled : variants[variant]
      }`}
    >
      {children}
    </button>
  );
};
