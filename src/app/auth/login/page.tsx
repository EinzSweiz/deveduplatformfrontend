'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import apiService from '@/app/services/apiService';
import { handleLogin, resetCookies } from '@/app/lib/actions';
import ErrorMessage from '@/app/components/messages/ErrorMessage';
import { toast, ToastContainer } from 'react-toastify';
import ConfirmDialog from '@/app/components/profile/AlterDeleteConfirmDialog';
import SuccessMessage from '@/app/components/messages/SuccessMessage';
import Button from '@/app/components/auth/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"activation" | "deletion" | null>(null);
  const router = useRouter();


  const handlePasswordReset = () => {
    router.push('/auth/password-reset'); // Redirect to password reset page
  };

  const handleActivateAccount = async () => {

    try {
      setIsDialogOpen(false);
      setIsLoading(true);

      const response = await apiService.put(
        "/api/user/accounts/profile/detail/",
        {'is_deleted': false},
        false
      );
      console.log('Response:', response)
      console.log('Status:', response.status)
      if (response.status === 200) {
        toast.success(
          "Your account has been activated :), redirecting to main page...",
          { autoClose: 5000 }
        );
        setTimeout(() => router.push("/"), 5000);
      } else if (response && response.status >= 400) {
        await resetCookies()
        toast.error(
          "Your account has not been activated :(, contact customer service please",
          { autoClose: 5000 }
        );
        router.push("/");
      }
    } catch (err) {
      console.error("Failed to activate account:", err);
      toast.error("Failed to activate account.");
    } finally {
      setIsLoading(false);
    }
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
        const { access: accessToken, refresh: refreshToken, user } = response;
        const userId = user.pk;
        await handleLogin(userId, accessToken, refreshToken);
        if (response.is_deleted) {
          setIsDialogOpen(true)
          
        }else {
        setSuccess('Login successful! Redirecting to main page...');
        setTimeout(() => router.push('/'), 2000);
        }
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
    <>
      <section>
        <AuthForm title="Login">
          {/* Show errors or success messages */}
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Password</label>
              <input
                type="password"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <Button
              label={isLoading ? 'Processing...' : 'Login'}
              onClick={handleSubmit}
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              color="green"
            />
          </form>

          {/* Forgot Password */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-blue-400 hover:text-blue-500 hover:underline transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Register Button */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => { router.push('/auth/register') }}
              className="text-blue-400 hover:text-blue-500 hover:underline transition"
            >
              Register
            </button>
          </div>

          <ConfirmDialog
            isOpen={isDialogOpen}
            title={dialogType === "activation" ? "Account Deactivated?" : "Delete Account?"}
            description="Your account has been deactivated. Do you want to reactivate it?"
            onConfirm={handleActivateAccount}
            onCancel={async () => {
              await resetCookies(); // Ensure cookies are reset
              router.push("/auth/login"); // Redirect to login page
              setIsDialogOpen(false); // Close the dialog
            }}
            onOpenChange={() => setIsDialogOpen(false)}
          />

          <ToastContainer />
        </AuthForm>
      </section>

    </>
    
  );
};

export default Login;
