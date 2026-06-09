import { Modal } from '@/components/ui/Modal'
import { createFileRoute } from '@tanstack/react-router'
import { AlertCircle, Calendar, CalendarDays, CheckCircle, CheckCircle2, Clock, Clock4, MapPin, Phone, Plus, User, Video, X, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/patient/appointments')({
  component: RouteComponent,
})

function RouteComponent() {
  const [viewMode, setViewMode] = useState('upcoming') // upcoming, past, calendar
  const [showBookModal, setShowBookModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const [appointments, setAppointments] = useState([])
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0, cancelled: 0 })

  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    departmentId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    type: 'in-person',
    reason: ''
  })

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/appointments?action=patientAppointments&status=${viewMode}`)
      const result = await response.json()
      if (result.success) {
        setAppointments(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/appointments?action=stats')
      const result = await response.json()
      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/appointments?action=departments')
      const result = await response.json()
      if (result.success) {
        setDepartments(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error)
    }
  }

  // Fetch doctors by department
  const fetchDoctors = async (department: string) => {
    try {
      const response = await fetch(`/api/appointments?action=doctors&department=${department}`)
      const result = await response.json()
      console.log(result)
      if (result.success) {
        setDoctors(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error)
    }
  }

  // Fetch time slots
  const fetchTimeSlots = async (doctorId: number, date: string) => {
    try {
      const response = await fetch(`/api/appointments?action=timeSlots&doctorId=${doctorId}&date=${date}`)
      const result = await response.json()
      if (result.success) {
        setTimeSlots(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch time slots:', error)
    }
  }

  // Initial load
  useEffect(() => {
    fetchAppointments()
    fetchStats()
  }, [viewMode])

  // Load departments when booking modal opens
  useEffect(() => {
    if (showBookModal) {
      fetchDepartments()
    }
  }, [showBookModal])

  // Load doctors when department changes
  useEffect(() => {
    if (bookingForm.departmentId) {
      fetchDoctors(bookingForm.departmentId)
    }
  }, [bookingForm.departmentId])

  // Load time slots when doctor and date are selected
  useEffect(() => {
    if (bookingForm.doctorId && bookingForm.appointmentDate) {
      fetchTimeSlots(Number(bookingForm.doctorId), bookingForm.appointmentDate)
    }
  }, [bookingForm.doctorId, bookingForm.appointmentDate])

  // Handle booking
  const handleBooking = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm)
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Appointment booked successfully!')
        setShowBookModal(false)
        resetBookingForm()
        fetchAppointments()
        fetchStats()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(result.error || 'Failed to book appointment')
      }
    } catch (error) {
      setError('Failed to book appointment')
    } finally {
      setLoading(false)
    }
  }

  // Handle cancel
  const handleCancelAppointment = async (appointmentId: number) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return

    try {
      const response = await fetch('/api/appointments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: appointmentId, status: 'cancelled' })
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Appointment cancelled successfully')
        fetchAppointments()
        fetchStats()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      setError('Failed to cancel appointment')
    }
  }

  const resetBookingForm = () => {
    setBookingForm({
      departmentId: '',
      doctorId: '',
      appointmentDate: '',
      appointmentTime: '',
      type: 'in-person',
      reason: ''
    })
    setDoctors([])
    setTimeSlots([])
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
      {/* Success/Error Messages */}
      {success && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle2 size={20} className="text-green-600" />
          <p className="text-sm font-medium text-green-800">{success}</p>
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle size={20} className="text-red-600" />
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and track your medical appointments</p>
            </div>
            <button
              onClick={() => {
                resetBookingForm()
                setShowBookModal(true)
              }}
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Appointment Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Appointments', value: stats.total, icon: CalendarDays, bgColor: 'bg-[#346ED6]/5', iconColor: 'text-[#346ED6]', borderColor: 'border-[#346ED6]/20' },
            { label: 'Upcoming', value: stats.upcoming, icon: Clock, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-200' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, bgColor: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
            { label: 'Cancelled', value: stats.cancelled, icon: XCircle, bgColor: 'bg-rose-50', iconColor: 'text-rose-400', borderColor: 'border-rose-200' }
          ].map((stat, index) => (
            <div key={index} className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-xl border border-gray-100 mb-6 p-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'past', label: 'Past' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === tab.id ? 'bg-white text-[#346ED6]' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#346ED6] mx-auto" />
            <p className="mt-2 text-sm text-gray-500">Loading appointments...</p>
          </div>
        )}

        {/* Appointments List */}
        {!loading && (
          <div className="space-y-3">
            {appointments.map((appointment: any) => (
              <div key={appointment.id} className="border border-gray-100 hover:border-[#346ED6]/30 bg-white rounded-xl">
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <img
                        src={appointment.doctor_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.doctor_name)}&background=346ED6&color=fff`}
                        alt={appointment.doctor_name}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {appointment.doctorId.firstName}{" "}{appointment.doctorId.lastName}
                            </h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${appointment.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                            appointment.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                              appointment.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                                'bg-gray-50 text-gray-600'
                            }`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{appointment.doctor_specialty}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>{new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{appointment.appointmentTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            {appointment.type === 'video' ? <Video size={12} /> : <MapPin size={12} />}
                            <span>{appointment.type === 'video' ? 'Virtual' : 'In-person'}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {['pending', 'confirmed'].includes(appointment.status) && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      {appointment.status === 'completed' && (
                        <button
                          onClick={() => {
                            resetBookingForm()
                            setShowBookModal(true)
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-[#346ED6] hover:bg-[#346ED6]/5 rounded-lg transition-colors"
                        >
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">No appointments found</h3>
            <p className="text-xs text-gray-500 mt-1">
              {viewMode === 'upcoming' ? "You don't have any upcoming appointments" : "No past appointments found"}
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

      {/* Book Appointment Modal - Updated with dynamic data */}
      <Modal className="max-w-[728px]" isOpen={showBookModal} onClose={() => setShowBookModal(false)}>
          <div className="bg-white rounded-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Book New Appointment</h2>
              <button onClick={() => setShowBookModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
                <select
                  value={bookingForm.departmentId}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, departmentId: e.target.value, doctorId: '' }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                >
                  <option value="">Select department...</option>
                  {departments.map((dept: any) => (
                    <option key={dept._id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                <select
                  value={bookingForm.doctorId}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, doctorId: e.target.value, appointmentTime: '' }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-primary"
                  disabled={!bookingForm.departmentId}
                >
                  <option value="">Select doctor...</option>
                  {doctors.map((doc: any) => (
                    <option key={doc._id} value={doc._id}>{doc.firstName} {doc.lastName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingForm.appointmentDate}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, appointmentDate: e.target.value, appointmentTime: '' }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <input 
                    type="time"
                    value={bookingForm.appointmentTime}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, appointmentTime: e.target.value }))}
                    disabled={!bookingForm.doctorId || !bookingForm.appointmentDate}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { type: 'in-person', icon: User, description: 'Visit the hospital' },
                    { type: 'video', icon: Video, description: 'Online meeting' },
                    { type: 'phone', icon: Phone, description: 'Telephone consultation' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => setBookingForm(prev => ({ ...prev, type: item.type }))}
                      className={`border-2 rounded-xl p-4 text-left transition-colors ${bookingForm.type === item.type
                        ? 'border-[#346ED6] bg-[#346ED6]/5'
                        : 'border-gray-200 hover:border-[#346ED6]'
                        }`}
                    >
                      <item.icon size={20} className={bookingForm.type === item.type ? 'text-[#346ED6]' : 'text-gray-400'} />
                      <p className="font-medium text-sm mt-2 text-gray-900 capitalize">{item.type}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for appointment</label>
                <textarea
                  rows={3}
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
                  placeholder="Brief description of your symptoms or reason for visit..."
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 rounded-b-2xl">
              <button
                onClick={() => setShowBookModal(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={!bookingForm.doctorId || !bookingForm.appointmentDate || !bookingForm.appointmentTime || loading}
                className="px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
      </Modal>
    </div>
  )
}
