import { createFileRoute } from '@tanstack/react-router'
import {
    User,
    Lock,
    Bell,
    Clock,
    Save,
    Eye,
    EyeOff,
    ToggleLeft,
    ToggleRight,
    CheckCircle2,
    AlertCircle
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/doctor/settings')({
    component: RouteComponent,
})


function RouteComponent() {
    const [activeSection, setActiveSection] = useState('profile')
    const [saveSuccess, setSaveSuccess] = useState(false)

    // Profile State
    const [profile, setProfile] = useState({
        fullName: 'Dr. Michael Chen',
        email: 'michael.chen@medicare.com',
        phone: '+1 (555) 123-4567',
        specialty: 'Cardiologist',
        licenseNumber: 'MED-2020-12345',
        yearsOfExperience: '12'
    })

    // Security State
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [twoFactorAuth, setTwoFactorAuth] = useState(true)

    // Notification State
    const [notifications, setNotifications] = useState({
        appointmentReminders: true,
        newPatientAlerts: true,
        labResultAlerts: true,
        messages: false,
        systemUpdates: true
    })

    // Availability State
    const [availability, setAvailability] = useState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
        startTime: '09:00',
        endTime: '17:00',
        slotDuration: '30'
    })

    const settingsSections = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'availability', label: 'Availability', icon: Clock }
    ]

    const handleSave = () => {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
    }

    const toggleNotification = (key: string) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const toggleDay = (day: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: !prev[day]
        }))
    }

    return (
        <div className="lg:ml-64 pt-16 lg:pt-0">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
                </div>

                {/* Success Alert */}
                {saveSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-green-600" />
                        <div>
                            <p className="text-sm font-medium text-green-800">Settings saved successfully</p>
                            <p className="text-xs text-green-600">Your changes have been updated</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Settings Navigation */}
                    <div className="lg:w-60 flex-shrink-0">
                        <div className="bg-white rounded-lg border border-gray-200">
                            <nav className="p-2">
                                {settingsSections.map((section) => {
                                    const Icon = section.icon
                                    const isActive = activeSection === section.id
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`
                        w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left
                        ${isActive
                                                    ? 'bg-[#346ED6] text-white'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }
                      `}
                                        >
                                            <Icon size={18} />
                                            <span className="text-sm font-medium">{section.label}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg border border-gray-200">
                            {/* Profile Section */}
                            {activeSection === 'profile' && (
                                <div>
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="font-semibold text-gray-900">Profile Information</h3>
                                        <p className="text-sm text-gray-500 mt-1">Update your personal and professional details</p>
                                    </div>

                                    <div className="p-4 space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={profile.fullName}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                                <input
                                                    type="email"
                                                    value={profile.email}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Specialty</label>
                                                <select
                                                    value={profile.specialty}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, specialty: e.target.value }))}
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                >
                                                    <option>Cardiologist</option>
                                                    <option>Dermatologist</option>
                                                    <option>Neurologist</option>
                                                    <option>Orthopedist</option>
                                                    <option>General Physician</option>
                                                    <option>Pediatrician</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">License Number</label>
                                                <input
                                                    type="text"
                                                    value={profile.licenseNumber}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, licenseNumber: e.target.value }))}
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Years of Experience</label>
                                                <select
                                                    value={profile.yearsOfExperience}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                >
                                                    {Array.from({ length: 40 }, (_, i) => i + 1).map(year => (
                                                        <option key={year} value={year}>{year} years</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200 flex justify-end">
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                                            >
                                                <Save size={16} />
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Section */}
                            {activeSection === 'security' && (
                                <div>
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="font-semibold text-gray-900">Security</h3>
                                        <p className="text-sm text-gray-500 mt-1">Manage your password and account security</p>
                                    </div>

                                    <div className="p-4 space-y-6">
                                        {/* Change Password */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Change Password</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1.5">Current Password</label>
                                                    <div className="relative">
                                                        <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type={showCurrentPassword ? 'text' : 'password'}
                                                            placeholder="Enter current password"
                                                            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                        />
                                                        <button
                                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1.5">New Password</label>
                                                    <div className="relative">
                                                        <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type={showNewPassword ? 'text' : 'password'}
                                                            placeholder="Enter new password"
                                                            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                        />
                                                        <button
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1.5">Confirm New Password</label>
                                                    <div className="relative">
                                                        <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            placeholder="Confirm new password"
                                                            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                        />
                                                        <button
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Two-Factor Auth */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Add extra security to your account</p>
                                                </div>
                                                <button onClick={() => setTwoFactorAuth(!twoFactorAuth)}>
                                                    {twoFactorAuth ? (
                                                        <ToggleRight size={36} className="text-[#346ED6]" />
                                                    ) : (
                                                        <ToggleLeft size={36} className="text-gray-300" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200 flex justify-end">
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                                            >
                                                <Save size={16} />
                                                <span>Update Security</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notifications Section */}
                            {activeSection === 'notifications' && (
                                <div>
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
                                        <p className="text-sm text-gray-500 mt-1">Choose what notifications you receive</p>
                                    </div>

                                    <div className="p-4 space-y-1">
                                        {[
                                            { key: 'appointmentReminders', label: 'Appointment Reminders', description: 'Notifications about upcoming appointments' },
                                            { key: 'newPatientAlerts', label: 'New Patient Alerts', description: 'When new patients are assigned to you' },
                                            { key: 'labResultAlerts', label: 'Lab Result Alerts', description: 'When new lab results are available' },
                                            { key: 'messages', label: 'Messages', description: 'New messages from patients or staff' },
                                            { key: 'systemUpdates', label: 'System Updates', description: 'Platform updates and maintenance notices' }
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between py-2.5">
                                                <div className="flex-1 min-w-0 mr-4">
                                                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                                </div>
                                               
                                                <button
                                                    type="button"
                                                    onClick={() => toggleNotification(item.key)}
                                                    className={`cursor-pointer relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${notifications[item.key] ? "bg-[#346ED6]" : "bg-gray-200" }`}
                                                >
                                                    <span
                                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ${notifications[item.key] ? "translate-x-6" : "translate-x-1" }`}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 border-t border-gray-200 flex justify-end">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                                        >
                                            <Save size={16} />
                                            <span>Save Preferences</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Availability Section */}
                            {activeSection === 'availability' && (
                                <div>
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="font-semibold text-gray-900">Availability Schedule</h3>
                                        <p className="text-sm text-gray-500 mt-1">Set your working hours and days</p>
                                    </div>

                                    <div className="p-4 space-y-4">
                                        {/* Working Days */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Working Days</h4>
                                            <div className="space-y-2">
                                                {[
                                                    { key: 'monday', label: 'Monday' },
                                                    { key: 'tuesday', label: 'Tuesday' },
                                                    { key: 'wednesday', label: 'Wednesday' },
                                                    { key: 'thursday', label: 'Thursday' },
                                                    { key: 'friday', label: 'Friday' },
                                                    { key: 'saturday', label: 'Saturday' },
                                                    { key: 'sunday', label: 'Sunday' }
                                                ].map((day) => (
                                                    <div key={day.key} className="flex items-center justify-between py-2">
                                                        <span className="text-sm text-gray-700">{day.label}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleDay(day.key)}
                                                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 cursor-pointer ${availability[day.key]
                                                                ? "bg-[#346ED6]"
                                                                : "bg-gray-200"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ${availability[day.key]
                                                                    ? "translate-x-6"
                                                                    : "translate-x-1"
                                                                    }`}
                                                            />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Working Hours */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Working Hours</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1.5">Start Time</label>
                                                    <select
                                                        value={availability.startTime}
                                                        onChange={(e) => setAvailability(prev => ({ ...prev, startTime: e.target.value }))}
                                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                    >
                                                        <option value="08:00">8:00 AM</option>
                                                        <option value="08:30">8:30 AM</option>
                                                        <option value="09:00">9:00 AM</option>
                                                        <option value="09:30">9:30 AM</option>
                                                        <option value="10:00">10:00 AM</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1.5">End Time</label>
                                                    <select
                                                        value={availability.endTime}
                                                        onChange={(e) => setAvailability(prev => ({ ...prev, endTime: e.target.value }))}
                                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                    >
                                                        <option value="16:00">4:00 PM</option>
                                                        <option value="16:30">4:30 PM</option>
                                                        <option value="17:00">5:00 PM</option>
                                                        <option value="17:30">5:30 PM</option>
                                                        <option value="18:00">6:00 PM</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1.5">Slot Duration</label>
                                                    <select
                                                        value={availability.slotDuration}
                                                        onChange={(e) => setAvailability(prev => ({ ...prev, slotDuration: e.target.value }))}
                                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                                                    >
                                                        <option value="15">15 minutes</option>
                                                        <option value="30">30 minutes</option>
                                                        <option value="45">45 minutes</option>
                                                        <option value="60">60 minutes</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200 flex justify-end">
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                                            >
                                                <Save size={16} />
                                                <span>Save Schedule</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}