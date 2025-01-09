'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import apiService from "@/app/services/apiService"
import { data } from "autoprefixer"
import AuthForm from "@/app/components/auth/AuthForm"
import SuccessMessage from "@/app/components/messages/SuccessMessage"
import ErrorMessage from "@/app/components/messages/ErrorMessage"

type Params = Promise<{uid: string, token: string}>

const PasswordReset = ({params}: {params: Params}) => {
    const [uid, setUid] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setErrors] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    useEffect(() => {
        const getParams = async () => {
            const handleParams = await params
            setUid(handleParams.uid)
            setToken(handleParams.token)
        }
        getParams()
    }, [params])

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setErrors('Passwords do not match.')
            return
        }

        // Prepare form data
        const formData = {
            new_password1: newPassword,
            new_password2: confirmPassword,
        }

        try {
            const response = await apiService.postWithoutToken(
            `/api/user/accounts/password/reset/confirm/${uid}/${token}/`,
            formData
            )

            if (response.status === 200) {
                setSuccess(response.message)
                setErrors('')
                setTimeout(() => {router.push('/auth/login')}, 2000)
            } else {
                setErrors(response.error || 'Failed to reset the password.')
            }
        } catch (err) {
            console.error('Error during password reset:', err)
            setErrors('An error occurred while resetting your password.')
            } finally {
                setIsLoading(false);
            }
        }

        return (
            <AuthForm title="Password Reset">
                {/* Show errors or success messages */}
                {error && <ErrorMessage message={error} />}
                {success && <SuccessMessage message={success} />}

                {/* The actual login form */}
                <form onSubmit={handlePasswordChange}>
                    <div className="mb-4">
                    <label className="block mb-1 text-gray-700">New password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                    <label className="block mb-1 text-gray-700">Confirm new password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
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
                </AuthForm>
            );
    }
export default PasswordReset
