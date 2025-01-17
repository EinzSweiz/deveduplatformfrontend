import React from 'react';

interface ErrorMessageProps {
  message?: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-sm mb-2 p-1 text-center">{message}</p>;
};

export default ErrorMessage;
