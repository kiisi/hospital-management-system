import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export const Route = createFileRoute('/doctor')({
  component: RouteComponent,
})

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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

  const navItems = [
    { id: 'dashboard', path: "/doctor", label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', path: "/doctor/appointments", label: 'Appointments', icon: Calendar },
    { id: 'patients', path: "/doctor/patients", label: 'Patients', icon: Users },
    { id: 'medical-records', path: "/doctor/medical-records", label: 'Medical Records', icon: ClipboardList },
    // { id: 'messages', path: "/doctor/messages", label: 'Messages', icon: MessageSquare },
    { id: 'settings', path: "/doctor/settings", label: 'Settings', icon: Settings }
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-bold text-gray-900">MediCare</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-[#346ED6]">MediCare</h1>
          <p className="text-xs text-gray-500 mt-1">Doctor Portal</p>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#346ED6] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">DS</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
              <p className="text-xs text-gray-500">Cardiologist</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path
            return (
              <Link
                to={item.path}
                key={item.id}
                onClick={() => {
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left
                  ${isActive
                    ? 'bg-[#346ED6] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
