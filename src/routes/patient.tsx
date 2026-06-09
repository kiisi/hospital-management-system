import { LogoutModal } from '@/components/modals/LogoutModal';
import { dbConnect } from '@/server/db';
import { PatientModel } from '@/server/models/patient';
import { useAppSession } from '@/server/session';
import { createFileRoute, Link, Outlet, redirect, useLocation, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import {
    Pill,
    Bell,
    User,
    Menu,
    X,
    Plus,
    Activity,
    Home,
    CalendarDays,
    ClipboardList,
    Settings,
    LogOut,
    Search
} from 'lucide-react'
import { useState } from 'react';

const getPatientSession = createServerFn({ method: 'GET' })
    .handler(async () => {
        const session = await useAppSession()
        const userId = session.data.userId

        if (!userId) {
            throw redirect({ to: '/login' })
        }

        await dbConnect();

        let patient = await PatientModel
            .findOne({ userId })
            .populate('userId')

        if (!patient) {
            throw redirect({ to: '/login' })
        }

        patient = JSON.parse(JSON.stringify(patient))

        return { patient }
    })

export const Route = createFileRoute('/patient')({
    component: PatientLayout,
    beforeLoad: async () => {

        const { patient } = await getPatientSession()

        return { patient }
    },
})

function PatientLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation();

    const [isLogoutModelOpen, setLogoutModalOpen] = useState(false)

    const navigationItems = [
        { id: 'dashboard', path: "/patient", label: 'Dashboard', icon: Home },
        { id: 'appointments', path: "/patient/appointments", label: 'Appointments', icon: CalendarDays },
        { id: 'medical-records', path: "/patient/medical-records", label: 'Medical Records', icon: ClipboardList },
        { id: 'prescriptions', path: "/patient/prescriptions", label: 'Prescriptions', icon: Pill },
        { id: 'settings', path: "/patient/settings", label: 'Settings', icon: Settings },
    ]

    console.log(sidebarOpen)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside className={`
                fixed flex flex-col top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                {/* Sidebar Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#346ED6] rounded-lg flex items-center justify-center">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">BlueCare</h1>
                                <p className="text-xs text-gray-500">Patient Portal</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                to={item.path}
                                key={item.id}
                                onClick={() => {
                                    setSidebarOpen(false)
                                }}
                                className={`
                                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                                    ${isActive
                                        ? 'bg-[#346ED6] text-white'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                `}
                            >
                                <Icon size={20} />
                                <span className="text-sm font-medium">{item.label}</span>
                                {/* {item.id === 'appointments' && (
                                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">2</span>
                                )} */}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200 mt-auto">
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
            <div className="lg:pl-72">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            >
                                <Menu size={24} />
                            </button>

                            {/* Search Bar */}
                            <div className="flex-1 max-w-md ml-4 hidden sm:block">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search appointments, records..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Right side icons */}
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                    <Bell size={20} />
                                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                                </button>

                                {/* Quick Actions */}
                                <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    <Plus size={16} />
                                    <span>Book Appointment</span>
                                </button>

                                {/* Mobile Profile */}
                                <button className="lg:hidden p-1">
                                    <div className="w-8 h-8 bg-[#346ED6] rounded-full flex items-center justify-center">
                                        <User size={16} className="text-white" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <Outlet />
            </div>

            <LogoutModal
                isLogoutModalOpen={isLogoutModelOpen}
                setLogoutModalOpen={setLogoutModalOpen}
            />
        </div>
    )
}
