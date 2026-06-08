import { createFileRoute } from '@tanstack/react-router'
import { AlertCircle, ArrowLeft, Bell, Calendar, CalendarDays, CheckCircle, CheckCircle2, Clock, Clock4, MapPin, Menu, MoreVertical, Phone, Plus, Search, SlidersHorizontal, Star, User, Video, X, XCircle } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/patient/appointments')({
  component: RouteComponent,
})

function RouteComponent() {
  const [viewMode, setViewMode] = useState('upcoming') // upcoming, past, calendar
  const [showBookModal, setShowBookModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const upcomingAppointments = [
    {
      id: 1,
      doctor: {
        name: "Dr. Michael Chen",
        specialty: "Cardiologist",
        avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=346ED6&color=fff"
      },
      date: "Jan 15, 2025",
      time: "10:30 AM",
      type: "In-person",
      status: "confirmed",
      location: "Room 302",
      canReschedule: true,
      canCancel: true
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Emily Williams",
        specialty: "Dermatologist",
        avatar: "https://ui-avatars.com/api/?name=Emily+Williams&background=10B981&color=fff"
      },
      date: "Jan 20, 2025",
      time: "2:00 PM",
      type: "Video Consultation",
      status: "pending",
      location: "Virtual",
      canReschedule: true,
      canCancel: true
    }
  ]

  const pastAppointments = [
    {
      id: 3,
      doctor: {
        name: "Dr. Robert Brown",
        specialty: "General Physician",
        avatar: "https://ui-avatars.com/api/?name=Robert+Brown&background=F59E0B&color=fff"
      },
      date: "Jan 10, 2025",
      time: "9:00 AM",
      type: "In-person",
      status: "completed",
      location: "Room 105",
      canReschedule: false,
      canCancel: false
    },
    {
      id: 4,
      doctor: {
        name: "Dr. Lisa Anderson",
        specialty: "Orthopedist",
        avatar: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=8B5CF6&color=fff"
      },
      date: "Jan 5, 2025",
      time: "11:30 AM",
      type: "In-person",
      status: "cancelled",
      location: "Room 210",
      canReschedule: true,
      canCancel: false
    }
  ]

  const appointmentStats = {
    total: 4,
    upcoming: 2,
    completed: 1,
    cancelled: 1
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-50 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-600" />
      case 'pending': return <Clock4 size={16} className="text-yellow-600" />
      case 'completed': return <CheckCircle size={16} className="text-blue-600" />
      case 'cancelled': return <XCircle size={16} className="text-red-600" />
      default: return null
    }
  }

  const getTypeIcon = (type: string) => {
    if (type.includes('Video')) return <Video size={16} className="text-purple-600" />
    if (type.includes('Phone')) return <Phone size={16} className="text-indigo-600" />
    return <User size={16} className="text-blue-600" />
  }

  const getTypeColor = (type: string) => {
    if (type.includes('Video')) return 'bg-purple-50 text-purple-700 border-purple-200'
    if (type.includes('Phone')) return 'bg-indigo-50 text-indigo-700 border-indigo-200'
    return 'bg-blue-50 text-blue-700 border-blue-200'
  }

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setShowDetailModal(true)
  }

  const handleReschedule = (appointment) => {
    // Handle reschedule logic
    console.log('Reschedule:', appointment.id)
  }

  const handleCancel = (appointment) => {
    // Handle cancel logic
    console.log('Cancel:', appointment.id)
  }

  const handleRebook = (appointment) => {
    setShowBookModal(true)
    console.log('Rebook:', appointment.id)
  }

  return (
    <div>
      {/* Page Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and track your medical appointments</p>
            </div>
            <button
              onClick={() => setShowBookModal(true)}
              className="sm:hidden w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              <span>Book New Appointment</span>
            </button>
          </div>
        </div>

        {/* Appointment Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Total Appointments',
              value: appointmentStats.total,
              icon: CalendarDays,
              bgColor: 'bg-[#346ED6]/5',
              iconColor: 'text-[#346ED6]',
              borderColor: 'border-[#346ED6]/20'
            },
            {
              label: 'Upcoming',
              value: appointmentStats.upcoming,
              icon: Clock,
              bgColor: 'bg-emerald-50',
              iconColor: 'text-emerald-600',
              borderColor: 'border-emerald-200'
            },
            {
              label: 'Completed',
              value: appointmentStats.completed,
              icon: CheckCircle2,
              bgColor: 'bg-blue-50',
              iconColor: 'text-blue-600',
              borderColor: 'border-blue-200'
            },
            {
              label: 'Cancelled',
              value: appointmentStats.cancelled,
              icon: XCircle,
              bgColor: 'bg-rose-50',
              iconColor: 'text-rose-400',
              borderColor: 'border-rose-200'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* View Toggle & Filters */}
        <div className="bg-white rounded-xl border border-gray-100 mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'upcoming', label: 'Upcoming' },
                  { id: 'past', label: 'Past' },
                  { id: 'calendar', label: 'Calendar' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setViewMode(tab.id)}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === tab.id
                      ? 'bg-white text-[#346ED6]'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="flex-1 flex items-center justify-end space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </button>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                  <option>All Types</option>
                  <option>In-person</option>
                  <option>Video Consultation</option>
                  <option>Phone Call</option>
                </select>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                      <option>All Departments</option>
                      <option>Cardiology</option>
                      <option>Dermatology</option>
                      <option>Orthopedics</option>
                      <option>General Medicine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                      <option>All Time</option>
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>Last 3 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                      <option>All Status</option>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                    Clear Filters
                  </button>
                  <button className="px-4 py-2 bg-[#346ED6] text-white rounded-lg text-sm hover:bg-blue-700">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {(viewMode === 'upcoming' ? upcomingAppointments : pastAppointments).map((appointment) => (
            <div key={appointment.id} className="border border-gray-100 hover:border-[#346ED6]/30 bg-white rounded-xl">
              <div className="p-4">
                {/* Mobile & Desktop Layout */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Doctor Info & Appointment Details */}
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <img
                      src={appointment.doctor.avatar}
                      alt={appointment.doctor.name}
                      className="w-12 h-12 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{appointment.doctor.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${appointment.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                          appointment.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                            appointment.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                              'bg-gray-50 text-gray-600'
                          }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{appointment.doctor.specialty}</p>

                      {/* Date/Time Row - Stacks on mobile */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1 whitespace-nowrap">
                          <Calendar size={12} />
                          <span>{appointment.date}</span>
                        </span>
                        <span className="flex items-center space-x-1 whitespace-nowrap">
                          <Clock size={12} />
                          <span>{appointment.time}</span>
                        </span>
                        <span className="flex items-center space-x-1 whitespace-nowrap">
                          {appointment.type.includes('Video') ? <Video size={12} /> : <MapPin size={12} />}
                          <span className="truncate">{appointment.type.includes('Video') ? 'Virtual' : appointment.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions - Horizontal on mobile, unchanged on desktop */}
                  <div className="flex items-center gap-2 sm:ml-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {appointment.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => handleReschedule(appointment)}
                          className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(appointment)}
                          className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(appointment)}
                        className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    )}
                    {appointment.status === 'completed' && (
                      <button
                        onClick={() => handleRebook(appointment)}
                        className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium text-[#346ED6] hover:bg-[#346ED6]/5 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Book Again
                      </button>
                    )}
                    {appointment.status === 'cancelled' && appointment.canReschedule && (
                      <button
                        onClick={() => handleRebook(appointment)}
                        className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium text-[#346ED6] hover:bg-[#346ED6]/5 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Rebook
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Empty State */}
        {(viewMode === 'upcoming' ? upcomingAppointments : pastAppointments).length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">No appointments found</h3>
            <p className="text-xs text-gray-500 mt-1">
              {viewMode === 'upcoming'
                ? "You don't have any upcoming appointments"
                : "No past appointments found"}
            </p>
            {viewMode === 'upcoming' && (
              <button
                onClick={() => setShowBookModal(true)}
                className="mt-4 inline-flex items-center px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus size={16} className="mr-1.5" />
                Book Appointment
              </button>
            )}
          </div>
        )}
      </main>

      {/* Appointment Detail Modal */}
      {showDetailModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">Appointment Details</h2>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Doctor Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedAppointment.doctor.avatar}
                  alt={selectedAppointment.doctor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedAppointment.doctor.name}</h3>
                  <p className="text-gray-500">{selectedAppointment.doctor.specialty}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{selectedAppointment.doctor.rating}</span>
                    <span className="text-sm text-gray-400">({selectedAppointment.doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedAppointment.date} at {selectedAppointment.time}</p>
                  <p className="text-xs text-gray-400">{selectedAppointment.day} • {selectedAppointment.duration}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Type</p>
                  <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getTypeColor(selectedAppointment.type)}`}>
                    {getTypeIcon(selectedAppointment.type)}
                    <span>{selectedAppointment.type}</span>
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedAppointment.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getStatusColor(selectedAppointment.status)}`}>
                    {getStatusIcon(selectedAppointment.status)}
                    <span>{selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}</span>
                  </span>
                </div>
              </div>

              {/* Notes */}
              {selectedAppointment.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Appointment Notes</h4>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-gray-700">{selectedAppointment.notes}</p>
                  </div>
                </div>
              )}

              {/* Meeting Link */}
              {selectedAppointment.meetingLink && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Meeting Link</h4>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-purple-700 font-medium">{selectedAppointment.meetingLink}</p>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                        Join Meeting
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {selectedAppointment.canReschedule && selectedAppointment.status !== 'cancelled' && (
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Reschedule
                  </button>
                )}
                {selectedAppointment.canCancel && selectedAppointment.status !== 'cancelled' && (
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium">
                    Cancel Appointment
                  </button>
                )}
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Book New Appointment</h2>
              <button
                onClick={() => setShowBookModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                  <option>Select department...</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Orthopedics</option>
                  <option>General Medicine</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                  <option>Select doctor...</option>
                  <option>Dr. Michael Chen - Cardiologist</option>
                  <option>Dr. Emily Williams - Dermatologist</option>
                  <option>Dr. Robert Brown - General Physician</option>
                  <option>Dr. Lisa Anderson - Orthopedist</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                    <option>Select time...</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { type: 'In-person', icon: User, description: 'Visit the hospital' },
                    { type: 'Video Consultation', icon: Video, description: 'Online meeting' },
                    { type: 'Phone Call', icon: Phone, description: 'Telephone consultation' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      className="border-2 border-gray-200 hover:border-[#346ED6] rounded-xl p-4 text-left transition-colors group"
                    >
                      <item.icon size={20} className="text-gray-400 group-hover:text-[#346ED6]" />
                      <p className="font-medium text-sm mt-2 text-gray-900">{item.type}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                  placeholder="Brief description of your symptoms or reason for visit..."
                />
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" id="reminders" className="mt-1" defaultChecked />
                <label htmlFor="reminders" className="text-sm text-gray-600">
                  Send me appointment reminders via email and SMS
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 rounded-b-2xl">
              <button
                onClick={() => setShowBookModal(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
