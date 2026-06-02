import { dbConnect } from '@/server/db.server';
import { PatientModel } from '@/server/models/patient';
import { useAppSession } from '@/server/session';
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { Activity, CalendarDays, ClipboardList, Home, LogOut, MessageSquare, Pill, Receipt, Settings, User, X } from 'lucide-react';
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

        console.log(patient)

        return { patient }
    },
})

function PatientLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeNav, setActiveNav] = useState('dashboard')

    const navigationItems = [
        { id: 'dashboard', path: "/patient", label: 'Dashboard', icon: Home },
        { id: 'appointments', path: "/patient/appointments", label: 'Appointments', icon: CalendarDays },
        { id: 'medical-records', path: "/patient/medical-records", label: 'Medical Records', icon: ClipboardList },
        { id: 'prescriptions', path: "/patient/prescriptions", label: 'Prescriptions', icon: Pill },
        // { id: 'billing', path: "/patient/billing", label: 'Billing & Payments', icon: Receipt },
        // { id: 'messages', path: "/patient/messages", label: 'Messages', icon: MessageSquare },
        { id: 'settings', path: "/patient/settings", label: 'Settings', icon: Settings },
    ]

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
                fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-200">
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
                        const isActive = activeNav === item.id
                        return (
                            <Link
                                to={item.path}
                                key={item.id}
                                onClick={() => {
                                    setActiveNav(item.id)
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
                                {item.id === 'appointments' && (
                                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">2</span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
            <Outlet />  
        </div>
    )
}
