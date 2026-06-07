import { useState } from 'react'
import {
    Calendar,
    Clock,
    Search,
    ChevronRight,
    User,
    Video,
    Phone,
    CheckCircle2,
    Clock4,
    ArrowLeft
} from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/doctor/appointments')({
    component: RouteComponent,
})

interface AppointmentProps {
    id: number,
    patientName: string,
    time: string,
    type: string,
    status: string,
    reason: string,
    patientInfo: {
        age: number,
        bloodGroup: string,
        lastVisit: string,
    }
}

function RouteComponent() {
    const [viewMode, setViewMode] = useState('today')
    const [selectedAppointment, setSelectedAppointment] = useState({} as AppointmentProps);

    const todayAppointments: AppointmentProps[] = [
        {
            id: 1,
            patientName: 'Sarah Johnson',
            time: '09:00 AM',
            type: 'in-person',
            status: 'checked-in',
            reason: 'Blood pressure follow-up',
            patientInfo: {
                age: 45,
                bloodGroup: 'A+',
                lastVisit: 'Dec 2024'
            }
        },
        {
            id: 2,
            patientName: 'Michael Chen',
            time: '09:30 AM',
            type: 'video',
            status: 'scheduled',
            reason: 'Annual physical consultation',
            patientInfo: {
                age: 32,
                bloodGroup: 'B+',
                lastVisit: 'Nov 2024'
            }
        },
        {
            id: 3,
            patientName: 'Emily Davis',
            time: '10:15 AM',
            type: 'in-person',
            status: 'waiting',
            reason: 'Migraine follow-up',
            patientInfo: {
                age: 28,
                bloodGroup: 'O+',
                lastVisit: 'Jan 2025'
            }
        },
        {
            id: 4,
            patientName: 'James Wilson',
            time: '11:00 AM',
            type: 'phone',
            status: 'scheduled',
            reason: 'Diabetes management',
            patientInfo: {
                age: 55,
                bloodGroup: 'AB-',
                lastVisit: 'Oct 2024'
            }
        }
    ]

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'checked-in': return 'bg-green-50 text-green-700'
            case 'waiting': return 'bg-yellow-50 text-yellow-700'
            case 'in-progress': return 'bg-blue-50 text-blue-700'
            case 'completed': return 'bg-gray-50 text-gray-600'
            case 'scheduled': return 'bg-purple-50 text-purple-700'
            default: return 'bg-gray-50 text-gray-600'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'checked-in': return <CheckCircle2 size={14} />
            case 'waiting': return <Clock4 size={14} />
            case 'completed': return <CheckCircle2 size={14} />
            case 'scheduled': return <Clock size={14} />
            default: return null
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video size={14} />
            case 'phone': return <Phone size={14} />
            default: return <User size={14} />
        }
    }

    return (
        <div className="lg:ml-64 pt-16 lg:pt-0">
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your patient appointments</p>
                </div>

                {/* View Toggle */}
                <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
                    {[
                        { id: 'today', label: "Today's" },
                        { id: 'upcoming', label: 'Upcoming' },
                        { id: 'past', label: 'Past' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setViewMode(tab.id)}
                            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === tab.id
                                ? 'bg-[#346ED6] text-white'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search patient name..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent bg-white"
                    />
                </div>

                {/* Appointments List */}
                {Object.keys(selectedAppointment).length !== 0 ? (
                    // Appointment Detail View
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                            <button
                                onClick={() => setSelectedAppointment({} as AppointmentProps)}
                                className="p-1.5 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowLeft size={18} className="text-gray-600" />
                            </button>
                            <h3 className="font-semibold text-gray-900">Patient Details</h3>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-12 h-12 bg-[#346ED6] rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm font-medium">
                                        {selectedAppointment.patientName.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{selectedAppointment.patientName}</h4>
                                    <p className="text-sm text-gray-500">{selectedAppointment.reason}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Age</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedAppointment.patientInfo.age} years</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Blood Group</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedAppointment.patientInfo.bloodGroup}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Last Visit</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedAppointment.patientInfo.lastVisit}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Type</p>
                                    <div className="flex items-center space-x-1 mt-0.5">
                                        {getTypeIcon(selectedAppointment.type)}
                                        <span className="text-sm font-medium text-gray-900 capitalize">{selectedAppointment.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2 pt-2">
                                <button className="flex-1 py-2.5 bg-[#346ED6] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Start Consultation
                                </button>
                                <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Reschedule
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Appointments List
                    <div className="space-y-3">
                        {todayAppointments.map((appointment) => (
                            <button
                                key={appointment.id}
                                onClick={() => setSelectedAppointment(appointment)}
                                className="w-full bg-white rounded-lg border border-gray-200 hover:border-[#346ED6] transition-colors text-left"
                            >
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                                            {/* Time */}
                                            <div className="min-w-[70px]">
                                                <p className="text-sm font-semibold text-gray-900">{appointment.time}</p>
                                                <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusStyle(appointment.status)}`}>
                                                    {getStatusIcon(appointment.status)}
                                                    <span>{appointment.status.replace('-', ' ')}</span>
                                                </span>
                                            </div>

                                            {/* Patient Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {appointment.patientName}
                                                    </h4>
                                                    <span className="text-gray-300 flex-shrink-0">
                                                        {getTypeIcon(appointment.type)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5 truncate">{appointment.reason}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {appointment.patientInfo.age} yrs • {appointment.patientInfo.bloodGroup}
                                                </p>
                                            </div>
                                        </div>

                                        <ChevronRight size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {todayAppointments.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">No appointments</h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {viewMode === 'today'
                                ? "No appointments scheduled for today"
                                : "No appointments found"}
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}
