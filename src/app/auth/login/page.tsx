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
  const [password, setPassword] = useState('');
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
        '/api/user/accounts/login/',
        { email, password }
      );
      console.log('Response:', response)

      if (response.status === 200) {
        setSuccess('Login successful! Redirecting to main page...');
        const { access: accessToken, refresh: refreshToken, user } = response;
        const userId = user.pk;
        await handleLogin(userId, accessToken, refreshToken);
        setTimeout(() => router.push('/'), 2000);
      } else if (response.errors) {
        setError(Object.values(response.errors).join(' '));
      } else {
        setError('Login failed. Email or password is incorrect.');
      }
    } catch (err: any) {
      if (err.errors) {
        const errorMessages = Object.entries(err.errors || {})
          .map(([_, value]) => Array.isArray(value) ? value.join(' ') : value)
          .join(' ');
        setError(errorMessages || 'Login failed. Email or password is incorrect.');
      } else {
        setError(err.message || 'Login failed. Email or password is incorrect.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm title="Login">
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
        
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
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
          <span className={`${isLoading ? 'opacity-50' : ''}`}>{isLoading ? 'Processing...' : 'Login'}</span>
        </button>
      </form>
    </AuthForm>
  );
};

export default Login;
