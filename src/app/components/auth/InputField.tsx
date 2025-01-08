import React from "react";


interface InputFieldProps {
    label?: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string
    error?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder, error }) => {
    return (
      <div className="mb-4">
        {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };
  
  export default InputField;