import { LogOut, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Modal } from '../ui/Modal'

export function LogoutModal({
    isLogoutModalOpen,
    setLogoutModalOpen
}: {
    isLogoutModalOpen: boolean;
    setLogoutModalOpen: (isOpen: boolean) => void;
}) {
    const isOpen = isLogoutModalOpen
    const setIsOpen = setLogoutModalOpen

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                // Redirect to login page
                navigate({ to: '/login' })
            } else {
                console.error('Logout failed')
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Logout error:', error)
            setIsLoading(false)
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                className="bg-white rounded-[16px] p-[32px] max-w-[600px]"
            >
                <div className="text-center">
                    {/* Icon */}
                    <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle size={24} className="text-red-600" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Sign Out
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Are you sure you want to sign out? You'll need to login again to access your account.
                    </p>

                    {/* Actions */}
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <LogOut size={16} />
                            )}
                            <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}