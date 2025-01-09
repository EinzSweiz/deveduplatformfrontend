'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import apiService from '@/app/services/apiService';
import { handleLogin } from '@/app/lib/actions';
import ErrorMessage from '@/app/components/messages/ErrorMessage';
import SuccessMessage from '@/app/components/messages/SuccessMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.postWithoutToken(
        '/api/user/accounts/password/reset/',
        { email }
      );
      console.log('Response:', response);

      if (response.status === 200) {
        setSuccess('Redirecting for next steps...');
        setTimeout(() => router.push('/password_change_message'), 2000);
      } else if (response.errors) {
        setError(Object.values(response.errors).join(' '));
      } else {
        setError('Email is incorrect.');
      }
    } catch (err: any) {
      if (err.errors) {
        const errorMessages = Object.entries(err.errors || {})
          .map(([_, value]) => Array.isArray(value) ? value.join(' ') : value)
          .join(' ');
        setError(errorMessages || 'Email is incorrect.');
      } else {
        setError(err.message || 'Email is incorrect.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm title="Password Reset">
      {/* Show errors or success messages */}
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}

      {/* The actual login form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`relative w-full p-2 rounded font-semibold transition-all duration-200
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
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
          <span className={`${isLoading ? 'opacity-50' : ''}`}>{isLoading ? 'Processing...' : 'Reset'}</span>
        </button>
      </form>

      {/* Add Reset Password Button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => { router.push('/auth/login')}}
          className="text-blue-500 hover:underline"
        >
          Back to Login?
        </button>
      </div>
    </AuthForm>
  );
};

export default Login;
