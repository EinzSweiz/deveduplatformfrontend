'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import apiService from '@/app/services/apiService';
import { handleLogin } from '@/app/lib/actions';
import ErrorMessage from '@/app/components/messages/ErrorMessage';
import SuccessMessage from '@/app/components/messages/SuccessMessage';
import Button from '@/app/components/auth/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = () => {
    router.push('/auth/password-reset'); // Redirect to password reset page
  };

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
      console.log('Response:', response);

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

        <Button
          label={isLoading ? 'Processing...' : 'Login'}
          onClick={handleSubmit} // Pass the handler
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          color="green"
        />
      </form>

      {/* Add Reset Password Button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handlePasswordReset}
          className="text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>
      {/* Add Register Button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => { router.push('/auth/register')}}
          className="text-blue-500 hover:underline"
        >
          Register
        </button>
      </div>
    </AuthForm>
  );
};

export default Login;
