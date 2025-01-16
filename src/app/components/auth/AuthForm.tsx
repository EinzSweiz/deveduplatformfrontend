'use client';

import React from 'react';
import { motion } from "framer-motion";

interface AuthFormProps {
  title: string;
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="flex backdrop-blur-md p-8 rounded-lg shadow-lg">
        
        {/* Left Side - Bouncing Ball Animation */}
        <div className="hidden md:flex flex-col items-center justify-center p-6 bg-green-700 rounded-l-lg shadow-md">
          <motion.div
            className="w-16 h-16 bg-lime-400 rounded-full"
            animate={{
              y: ["0%", "30%", "0%"], // Move up and down
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <span className="text-gray-700 font-semibold mt-4">Secure Login</span>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-6 bg-gray-800 rounded-r-lg shadow-md w-96">
          <h2 className="text-2xl text-blue-400 font-semibold mb-4 text-center">{title}</h2>

          {/* OAuth Login Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <button className="flex items-center justify-center w-full p-2 bg-white text-gray-800 font-medium rounded hover:bg-gray-200 transition">
              Sign in with Google
            </button>
            <button className="flex items-center justify-center w-full p-2 bg-gray-700 text-white font-medium rounded hover:bg-gray-600 transition">
              Sign in with GitHub
            </button>
          </div>

          {/* Form Fields */}
          {children}

          {/* Divider */}
          <div className="flex items-center justify-center mt-4">
            <hr className="w-full border-gray-600" />
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <hr className="w-full border-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
