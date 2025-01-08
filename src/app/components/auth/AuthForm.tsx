import React from 'react';

interface AuthFormProps {
  title: string;
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthForm;
