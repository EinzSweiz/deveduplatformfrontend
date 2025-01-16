'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import InputField from '../../components/auth/InputField';
import Button from '../../components/auth/Button';
import ErrorMessage from '@/app/components/messages/ErrorMessage';
import SuccessMessage from '@/app/components/messages/SuccessMessage';
import apiService from '@/app/services/apiService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false); // To show button loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true); // Start loading
    setError(''); // Clear previous errors
    setSuccess('');
    try {
      const response = await apiService.postWithoutToken(
        '/api/user/accounts/register/',
        {email, password1, password2, name } // Ensure data is serialized properly
      );
      console.log(response)

      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to next step...');
        setTimeout(() => router.push('/thankyou'), 2000)
      } else if (response.errors) {
        // Display specific validation errors
        setError(Object.values(response.errors).join(' '));
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Caught Error:', err);
      if (err.errors) {
        const errorMessages = Object.entries(err.errors)
          .map(([_, value]: [any, any]) => 
            Array.isArray(value) ? value.join(' ') : value
          )
          .join(' ');
        setError(errorMessages);
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }    
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthForm title="Register">
      {/* Show errors or success messages */}
      {error && <ErrorMessage message={error}/>}
      {success && <SuccessMessage message={success}/>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-gray-300">Name</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-300">Password</label>
          <input
            type="password"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-300">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`relative w-full p-2 rounded font-semibold transition-all duration-200
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        >
          {isLoading && (
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 animate-spin h-5 w-5 text-white"
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
          )}
          <span className={`${isLoading ? 'opacity-50' : ''}`}>
            {isLoading ? 'Processing...' : 'Register'}
          </span>
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => { router.push('/auth/login') }}
          className="text-blue-400 hover:text-blue-500 hover:underline transition"
        >
          Already have an account? Login
        </button>
      </div>
    </AuthForm>

  );
};

export default Register;
