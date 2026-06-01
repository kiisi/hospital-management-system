import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Calendar,
  Clock,
  FileText,
  Pill,
  CreditCard,
  Bell,
  User,
  Menu,
  X,
  ChevronRight,
  Plus,
  Activity,
  Heart,
  Stethoscope,
  Home,
  CalendarDays,
  ClipboardList,
  Receipt,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  ChevronLeft,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react'

export const Route = createFileRoute('/patient/')({
  // beforeLoad: ({ context }) => {
  //   if (context.auth.user?.role !== 'patient') {
  //     throw redirect({ to: '/login' })
  //   }
  // },
  component: PatientLayout,
})

function PatientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')

  const patientInfo = {
    name: "Sarah Johnson",
    id: "P-2024-0892",
    age: 34,
    bloodGroup: "O+",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    lastVisit: "2024-12-28",
    avatar: null
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'medical-records', label: 'Medical Records', icon: ClipboardList },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'billing', label: 'Billing & Payments', icon: Receipt },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "2025-01-15",
      time: "10:30 AM",
      status: "confirmed",
      type: "Follow-up",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=346ED6&color=fff"
    },
    {
      id: 2,
      doctor: "Dr. Emily Williams",
      specialty: "Dermatologist",
      date: "2025-01-20",
      time: "2:00 PM",
      status: "pending",
      type: "Consultation",
      avatar: "https://ui-avatars.com/api/?name=Emily+Williams&background=10B981&color=fff"
    }
  ]

  const recentPrescriptions = [
    {
      id: 1,
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      startDate: "2024-12-20",
      endDate: "2025-01-03",
      status: "active",
      instructions: "Take with food"
    }
  ]

  const quickStats = [
    {
      title: "Upcoming Appointments",
      value: "2",
      change: "+1 from last month",
      changeType: "increase",
      icon: Calendar,
      bgColor: "bg-blue-50",
      iconColor: "text-[#346ED6]"
    },
    {
      title: "Active Prescriptions",
      value: "1",
      change: "No change",
      changeType: "neutral",
      icon: Pill,
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Pending Bills",
      value: "$150.00",
      change: "-$50 from last bill",
      changeType: "decrease",
      icon: CreditCard,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      title: "Medical Records",
      value: "12",
      change: "+2 new records",
      changeType: "increase",
      icon: FileText,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Appointment Booked",
      details: "Cardiology follow-up with Dr. Michael Chen",
      time: "2 hours ago",
      type: "appointment",
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-[#346ED6]"
    },
    {
      id: 2,
      action: "Prescription Updated",
      details: "Amoxicillin dosage modified to 500mg",
      time: "1 day ago",
      type: "prescription",
      icon: Pill,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      action: "Lab Results Available",
      details: "Blood test results from December 28th",
      time: "2 days ago",
      type: "lab",
      icon: FileText,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      action: "Payment Received",
      details: "Payment of $200 for consultation on Dec 20",
      time: "3 days ago",
      type: "payment",
      icon: CreditCard,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ]

  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", trend: "stable" },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal", trend: "stable" },
    { label: "Weight", value: "145", unit: "lbs", status: "normal", trend: "down" },
    { label: "BMI", value: "22.7", unit: "kg/m²", status: "normal", trend: "stable" }
  ]

  const { patient } = Route.useRouteContext();

  return (
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

      {/* Page Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-[#346ED6] to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-blue-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Welcome back, {patient.firstName}! 👋</h2>
                <p className="mt-1 text-blue-100 text-sm">Here's your health overview for today</p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                <button className="bg-white text-[#346ED6] px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
                  View Records
                </button>
                <button className="bg-blue-500/30 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-500/40 transition-colors backdrop-blur-sm">
                  Emergency Contact
                </button>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Blood Group', value: patientInfo.bloodGroup },
                { label: 'Age', value: `${patientInfo.age} years` },
                { label: 'Last Visit', value: patientInfo.lastVisit },
                { label: 'Next Appointment', value: 'Jan 15, 2025' }
              ].map((info, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <p className="text-xs text-blue-100">{info.label}</p>
                  <p className="text-sm font-semibold mt-1">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bgColor} p-2.5 rounded-lg`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center space-x-1 mt-1">
                {stat.changeType === 'increase' && <ArrowUpRight size={14} className="text-green-600" />}
                {stat.changeType === 'decrease' && <ArrowDownRight size={14} className="text-red-600" />}
                <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-600' :
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointments & Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                    <p className="text-sm text-gray-500 mt-1">Your scheduled visits</p>
                  </div>
                  <button className="flex items-center space-x-1 text-[#346ED6] hover:text-blue-700 text-sm font-medium">
                    <Plus size={16} />
                    <span className="hidden sm:inline">Book New</span>
                  </button>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={appointment.avatar}
                        alt={appointment.doctor}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <div className="flex items-center space-x-1.5 text-sm text-gray-600">
                            <Calendar size={14} />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-sm text-gray-600">
                            <Clock size={14} />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <button className="text-xs text-[#346ED6] hover:text-blue-700 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <p className="text-sm text-gray-500 mt-1">Your latest health updates</p>
              </div>
              <div className="p-5 sm:p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className={`${activity.iconBg} p-2 rounded-lg flex-shrink-0`}>
                        <activity.icon size={18} className={activity.iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Prescriptions & Health Metrics */}
          <div className="space-y-6">
            {/* Active Prescriptions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Active Prescriptions</h3>
                  <button className="text-[#346ED6] hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                {recentPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{prescription.medication}</p>
                        <p className="text-sm text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>📋 {prescription.instructions}</p>
                      <p>📅 {prescription.startDate} - {prescription.endDate}</p>
                    </div>
                    <button className="mt-3 w-full text-center text-sm text-[#346ED6] hover:text-blue-700 font-medium py-2 bg-white rounded-lg border border-[#346ED6]/20 hover:border-[#346ED6]/40 transition-colors">
                      Request Refill
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Health Metrics</h3>
                <p className="text-sm text-gray-500 mt-1">Latest vital signs</p>
              </div>
              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">{metric.label}</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {metric.value}
                        <span className="text-xs font-normal text-gray-500 ml-1">{metric.unit}</span>
                      </p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs mt-2 ${metric.status === 'normal'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {metric.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-[#346ED6]/5 text-[#346ED6] rounded-lg hover:bg-[#346ED6]/10 transition-colors text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <Calendar size={18} />
                      <span>Book Appointment</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <Pill size={18} />
                      <span>Request Prescription</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <FileText size={18} />
                      <span>View Medical Records</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <CreditCard size={18} />
                      <span>Pay Bills</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}