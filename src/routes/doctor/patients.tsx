import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { 
  Search, 
  ChevronRight,
  User,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Filter
} from 'lucide-react'

export const Route = createFileRoute('/doctor/patients')({
    component: RouteComponent,
})

interface PatientProps {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment: string;
  conditions: string[];
  status: 'active' | 'inactive';
};

function RouteComponent() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPatient, setSelectedPatient] = useState({} as PatientProps)
    const [filterBy, setFilterBy] = useState('all')

    const patients = [
        {
            id: 1,
            name: 'Sarah Johnson',
            age: 45,
            gender: 'Female',
            bloodGroup: 'A+',
            phone: '+1 (555) 123-4567',
            email: 'sarah.j@email.com',
            lastVisit: 'Dec 15, 2024',
            nextAppointment: 'Jan 15, 2025',
            conditions: ['Hypertension', 'Type 2 Diabetes'],
            status: 'active'
        },
        {
            id: 2,
            name: 'Michael Chen',
            age: 32,
            gender: 'Male',
            bloodGroup: 'B+',
            phone: '+1 (555) 234-5678',
            email: 'michael.c@email.com',
            lastVisit: 'Nov 28, 2024',
            nextAppointment: 'Jan 20, 2025',
            conditions: ['Annual Check-up'],
            status: 'active'
        },
        {
            id: 3,
            name: 'Emily Davis',
            age: 28,
            gender: 'Female',
            bloodGroup: 'O+',
            phone: '+1 (555) 345-6789',
            email: 'emily.d@email.com',
            lastVisit: 'Jan 5, 2025',
            nextAppointment: 'Jan 10, 2025',
            conditions: ['Chronic Migraine'],
            status: 'critical'
        },
        {
            id: 4,
            name: 'James Wilson',
            age: 55,
            gender: 'Male',
            bloodGroup: 'AB-',
            phone: '+1 (555) 456-7890',
            email: 'james.w@email.com',
            lastVisit: 'Oct 20, 2024',
            nextAppointment: null,
            conditions: ['Type 2 Diabetes', 'High Cholesterol'],
            status: 'inactive'
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            age: 38,
            gender: 'Female',
            bloodGroup: 'A-',
            phone: '+1 (555) 567-8901',
            email: 'lisa.a@email.com',
            lastVisit: 'Jan 2, 2025',
            nextAppointment: 'Feb 5, 2025',
            conditions: ['Pregnancy - 2nd Trimester'],
            status: 'active'
        }
    ]

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-50 text-green-700'
            case 'critical': return 'bg-red-50 text-red-700'
            case 'inactive': return 'bg-gray-50 text-gray-600'
            default: return 'bg-gray-50 text-gray-600'
        }
    }

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.phone.includes(searchQuery) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesFilter = filterBy === 'all' || patient.status === filterBy

        return matchesSearch && matchesFilter
    })

    return (
        <div className="lg:ml-64 pt-16 lg:pt-0">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {filteredPatients.length} total patients
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="space-y-3 mb-6">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, phone, or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent bg-white"
                        />
                    </div>

                    <div className="flex space-x-2 overflow-x-auto">
                        {[
                            { id: 'all', label: 'All Patients' },
                            { id: 'active', label: 'Active' },
                            { id: 'critical', label: 'Critical' },
                            { id: 'inactive', label: 'Inactive' }
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setFilterBy(filter.id)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterBy === filter.id
                                        ? 'bg-[#346ED6] text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Patient Detail View */}
                {Object.keys(selectedPatient).length !== 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <button
                                onClick={() => setSelectedPatient({} as PatientProps)}
                                className="text-sm text-[#346ED6] hover:text-blue-700 font-medium"
                            >
                                ← Back to list
                            </button>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedPatient.status)}`}>
                                {selectedPatient.status}
                            </span>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Patient Header */}
                            <div className="flex items-start space-x-3">
                                <div className="w-14 h-14 bg-[#346ED6] rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-lg font-medium">
                                        {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedPatient.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.bloodGroup}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Phone size={16} className="text-gray-400" />
                                    <span className="text-gray-700">{selectedPatient.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="text-gray-700 truncate">{selectedPatient.email}</span>
                                </div>
                            </div>

                            {/* Visit Info */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Last Visit</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedPatient.lastVisit}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Next Appointment</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">
                                        {selectedPatient.nextAppointment || 'Not scheduled'}
                                    </p>
                                </div>
                            </div>

                            {/* Medical Conditions */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Medical Conditions</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPatient.conditions.map((condition, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium"
                                        >
                                            {condition}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex space-x-2 pt-2">
                                <button className="flex-1 py-2.5 bg-[#346ED6] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Schedule Appointment
                                </button>
                                <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    View Records
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Patients List
                    <div className="space-y-3">
                        {filteredPatients.map((patient) => (
                            <button
                                key={patient.id}
                                onClick={() => setSelectedPatient(patient as PatientProps)}
                                className="w-full bg-white rounded-lg border border-gray-200 hover:border-[#346ED6] transition-colors text-left"
                            >
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                                            {/* Avatar */}
                                            <div className="w-10 h-10 bg-[#346ED6] rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-sm font-medium">
                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>

                                            {/* Patient Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {patient.name}
                                                    </h4>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(patient.status)}`}>
                                                        {patient.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {patient.age} yrs • {patient.gender} • {patient.bloodGroup}
                                                </p>
                                                <div className="flex items-center space-x-3 mt-1.5 text-xs text-gray-400">
                                                    <span className="flex items-center space-x-1">
                                                        <Calendar size={12} />
                                                        <span>{patient.lastVisit}</span>
                                                    </span>
                                                    {patient.nextAppointment && (
                                                        <span className="flex items-center space-x-1 text-green-600">
                                                            <Calendar size={12} />
                                                            <span>{patient.nextAppointment}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <ChevronRight size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                                    </div>

                                    {/* Conditions Preview */}
                                    {patient.conditions.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3 ml-13">
                                            {patient.conditions.map((condition, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs"
                                                >
                                                    {condition}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}

                        {filteredPatients.length === 0 && (
                            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="h-8 w-8 text-gray-300" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900">No patients found</h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {searchQuery
                                        ? "No patients match your search criteria"
                                        : "No patients in this category"}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}