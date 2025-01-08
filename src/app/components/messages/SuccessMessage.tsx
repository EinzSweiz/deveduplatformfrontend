'use client';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="mb-2 p-1 text-sm text-green-700 text-center">
      {message}
    </div>
  );
};

export default SuccessMessage;