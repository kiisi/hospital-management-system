import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { 
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Search,
  MessageSquare,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/doctor/')({
  component: RouteComponent,
})

function RouteComponent() {
  // Sample data
  const [todayAppointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      time: '09:00 AM',
      type: 'Follow-up',
      status: 'checked-in',
      reason: 'Blood pressure check'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      time: '09:30 AM',
      type: 'New Patient',
      status: 'scheduled',
      reason: 'Annual physical'
    },
    {
      id: 3,
      patientName: 'Emily Davis',
      time: '10:15 AM',
      type: 'Consultation',
      status: 'waiting',
      reason: 'Migraine follow-up'
    },
    {
      id: 4,
      patientName: 'James Wilson',
      time: '11:00 AM',
      type: 'Follow-up',
      status: 'scheduled',
      reason: 'Diabetes management'
    }
  ]);

  const pendingItems = [
    { type: 'Lab Results', count: 3, urgent: true },
    { type: 'Prescription Refills', count: 2, urgent: false },
    { type: 'Messages', count: 5, urgent: false }
  ];

  const quickStats = [
    { label: "Today's Patients", value: '12', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'In Waiting Room', value: '3', icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Completed', value: '5', icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Labs', value: '3', icon: AlertCircle, color: 'bg-red-50 text-red-600' }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'records', label: 'Medical Records', icon: ClipboardList },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'checked-in': 'bg-green-100 text-green-700',
      'waiting': 'bg-yellow-100 text-yellow-700',
      'scheduled': 'bg-gray-100 text-gray-600'
    };
    return badges[status] || badges.scheduled;
  };

  return (
    <div className="lg:ml-64 pt-16 lg:pt-0">
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Dr. Smith</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Today's Appointments */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Today's Appointments</h3>
                <button
                  onClick={() => setActivePage('appointments')}
                  className="text-sm text-[#346ED6] hover:text-blue-700 font-medium"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-center min-w-[60px]">
                          <p className="text-sm font-semibold text-gray-900">{appointment.time}</p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{appointment.reason}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{appointment.type}</p>
                        </div>
                      </div>
                      <button className="flex items-center space-x-1 text-sm text-[#346ED6] hover:text-blue-700">
                        <span>Start</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Pending Actions */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Pending Actions</h3>
              <div className="space-y-3">
                {pendingItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      {item.urgent ? (
                        <AlertCircle size={16} className="text-red-500" />
                      ) : (
                        <FileText size={16} className="text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">{item.type}</span>
                    </div>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${item.urgent ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Patient Search */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Patient Lookup</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patient name or ID..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                />
              </div>
            </div>

            {/* Schedule Summary */}
            <div className="bg-[#346ED6] rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">This Week</h3>
                <Calendar size={16} className="opacity-80" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Total Patients</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Available Slots</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Next Available</span>
                  <span className="font-medium">Thursday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}