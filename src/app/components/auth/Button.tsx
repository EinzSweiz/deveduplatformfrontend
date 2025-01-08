import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  color?: "blue" | "green" | "red" | "gray"; // Add color customization
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  isLoading = false,
  disabled = false,
  color = "blue", // Default color is blue
}) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    gray: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`relative w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ease-in-out ${
        colorClasses[color]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}

      {/* Label */}
      <span className={`${isLoading ? "opacity-0" : ""}`}>{label}</span>
    </button>
  );
};

export default Button;
