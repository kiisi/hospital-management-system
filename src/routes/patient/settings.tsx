import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { 
  Bell,
  User,
  Menu,
  X,
  Activity,
  Home,
  CalendarDays,
  ClipboardList,
  Pill,
  Receipt,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Camera,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  CreditCard,
  Trash2,
  ChevronRight,
  Download,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Save,
  Plus,
  Minus
} from 'lucide-react'


export const Route = createFileRoute('/patient/settings')({
  component: RouteComponent,
})

function RouteComponent() {
   const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('settings')
  const [activeSection, setActiveSection] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const patientInfo = {
    name: "Sarah Johnson",
    id: "P-2024-0892",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    bloodGroup: "O+",
    address: "123 Medical Center Drive, Suite 100, New York, NY 10001",
    emergencyContact: {
      name: "John Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    }
  }

  const settingsSections = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
  ]

  const [notificationSettings, setNotificationSettings] = useState({
    emailAppointmentReminders: true,
    emailPrescriptionUpdates: true,
    emailLabResults: true,
    emailBillingNotifications: true,
    smsAppointmentReminders: false,
    smsPrescriptionUpdates: false,
    smsLabResults: false,
    pushNewMessages: true,
    pushAppointmentUpdates: true,
    pushHealthTips: false
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    highContrast: false
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareDataWithResearch: false,
    allowMarketingEmails: false,
    twoFactorAuth: true,
    sessionTimeout: '30min'
  })

  const toggleNotification = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>

              <div className="flex-1 max-w-md ml-4 hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search settings..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

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
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your account preferences and configurations</p>
          </div>

          {/* Success Alert */}
          {saveSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
              <CheckCircle2 size={20} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
                <p className="text-xs text-green-600">Your changes have been updated.</p>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Settings Navigation Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <nav className="p-2">
                  {settingsSections.map((section) => {
                    const Icon = section.icon
                    const isActive = activeSection === section.id
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left
                          ${isActive 
                            ? 'bg-[#346ED6] text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{section.label}</span>
                        {!isActive && <ChevronRight size={16} className="ml-auto text-gray-400" />}
                      </button>
                    )
                  })}
                </nav>

                {/* Danger Zone */}
                <div className="p-4 border-t border-gray-200">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Danger Zone</p>
                        <p className="text-xs text-red-600 mt-1">Permanent actions that cannot be undone</p>
                        <button className="mt-3 flex items-center space-x-2 px-3 py-1.5 bg-white text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">
                          <Trash2 size={14} />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Profile Information */}
                {activeSection === 'profile' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                      <p className="text-sm text-gray-500 mt-1">Update your personal information and contact details</p>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Avatar Upload */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-gray-100">
                        <div className="relative">
                          <div className="w-24 h-24 bg-[#346ED6] rounded-full flex items-center justify-center">
                            <User size={40} className="text-white" />
                          </div>
                          <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50">
                            <Camera size={16} className="text-gray-600" />
                          </button>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Profile Photo</p>
                          <p className="text-sm text-gray-500 mt-1">Upload a clear photo of yourself. Max size: 5MB</p>
                          <div className="flex gap-2 mt-3">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                              <Upload size={14} />
                              <span>Upload Photo</span>
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input 
                            type="text" 
                            defaultValue={patientInfo.name}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <input 
                            type="date" 
                            defaultValue={patientInfo.dateOfBirth}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                              type="email" 
                              defaultValue={patientInfo.email}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                              type="tel" 
                              defaultValue={patientInfo.phone}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                            <option>{patientInfo.bloodGroup}</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O-</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                            <textarea 
                              rows={2}
                              defaultValue={patientInfo.address}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                            <input 
                              type="text" 
                              defaultValue={patientInfo.emergencyContact.name}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                              <option>{patientInfo.emergencyContact.relationship}</option>
                              <option>Parent</option>
                              <option>Sibling</option>
                              <option>Child</option>
                              <option>Friend</option>
                              <option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                            <input 
                              type="tel" 
                              defaultValue={patientInfo.emergencyContact.phone}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                        >
                          <Save size={16} />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security */}
                {activeSection === 'security' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                      <p className="text-sm text-gray-500 mt-1">Manage your password and account security</p>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Change Password */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Change Password</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <div className="relative">
                              <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input 
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="Enter current password"
                                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <div className="relative">
                              <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input 
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <div className="relative">
                              <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input 
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
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
                        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <p className="text-xs text-gray-600">
                            <span className="font-medium text-gray-700">Password requirements:</span> Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.
                          </p>
                        </div>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                          </div>
                          <button 
                            onClick={() => setPrivacySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                            className="relative"
                          >
                            {privacySettings.twoFactorAuth ? (
                              <ToggleRight size={40} className="text-[#346ED6]" />
                            ) : (
                              <ToggleLeft size={40} className="text-gray-300" />
                            )}
                          </button>
                        </div>
                        {privacySettings.twoFactorAuth && (
                          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 size={16} className="text-green-600" />
                              <p className="text-sm text-green-700">Two-factor authentication is enabled</p>
                            </div>
                            <button className="mt-3 text-sm text-[#346ED6] hover:text-blue-700 font-medium">
                              Configure 2FA Settings
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Session Management */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Active Sessions</h4>
                        <div className="space-y-3">
                          {[
                            { device: 'Chrome on Windows', location: 'New York, USA', lastActive: 'Current session', current: true },
                            { device: 'Safari on iPhone', location: 'New York, USA', lastActive: '2 hours ago', current: false },
                            { device: 'Firefox on Mac', location: 'Boston, USA', lastActive: '3 days ago', current: false }
                          ].map((session, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {session.device}
                                  {session.current && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                      Current
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{session.location} • {session.lastActive}</p>
                              </div>
                              {!session.current && (
                                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                  Revoke
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium">
                          Sign out of all other sessions
                        </button>
                      </div>

                      {/* Save Button */}
                      <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                        >
                          <Save size={16} />
                          <span>Update Security Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeSection === 'notifications' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                      <p className="text-sm text-gray-500 mt-1">Choose how and when you want to be notified</p>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Email Notifications */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Email Notifications</h4>
                        <div className="space-y-4">
                          {[
                            { key: 'emailAppointmentReminders', label: 'Appointment Reminders', description: 'Get reminders about upcoming appointments' },
                            { key: 'emailPrescriptionUpdates', label: 'Prescription Updates', description: 'Notifications about prescription refills and changes' },
                            { key: 'emailLabResults', label: 'Lab Results', description: 'Alerts when new lab results are available' },
                            { key: 'emailBillingNotifications', label: 'Billing Notifications', description: 'Updates about bills, payments, and insurance claims' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-2">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                              <button 
                                onClick={() => toggleNotification(item.key)}
                                className="relative flex-shrink-0"
                              >
                                {notificationSettings[item.key] ? (
                                  <ToggleRight size={40} className="text-[#346ED6]" />
                                ) : (
                                  <ToggleLeft size={40} className="text-gray-300" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SMS Notifications */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">SMS Notifications</h4>
                        <div className="space-y-4">
                          {[
                            { key: 'smsAppointmentReminders', label: 'Appointment Reminders', description: 'SMS reminders for upcoming appointments' },
                            { key: 'smsPrescriptionUpdates', label: 'Prescription Updates', description: 'Text alerts for prescription status changes' },
                            { key: 'smsLabResults', label: 'Lab Results', description: 'SMS when new lab results are available' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-2">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                              <button 
                                onClick={() => toggleNotification(item.key)}
                                className="relative flex-shrink-0"
                              >
                                {notificationSettings[item.key] ? (
                                  <ToggleRight size={40} className="text-[#346ED6]" />
                                ) : (
                                  <ToggleLeft size={40} className="text-gray-300" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Push Notifications */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Push Notifications</h4>
                        <div className="space-y-4">
                          {[
                            { key: 'pushNewMessages', label: 'New Messages', description: 'Push notifications for new messages from your care team' },
                            { key: 'pushAppointmentUpdates', label: 'Appointment Updates', description: 'Real-time updates about your appointments' },
                            { key: 'pushHealthTips', label: 'Health Tips', description: 'Weekly health tips and wellness recommendations' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-2">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                              <button 
                                onClick={() => toggleNotification(item.key)}
                                className="relative flex-shrink-0"
                              >
                                {notificationSettings[item.key] ? (
                                  <ToggleRight size={40} className="text-[#346ED6]" />
                                ) : (
                                  <ToggleLeft size={40} className="text-gray-300" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                        >
                          <Save size={16} />
                          <span>Save Preferences</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance */}
                {activeSection === 'appearance' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
                      <p className="text-sm text-gray-500 mt-1">Customize how the application looks</p>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Theme */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Theme</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            { id: 'light', label: 'Light', icon: Sun, description: 'Clean and bright' },
                            { id: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
                            { id: 'system', label: 'System', icon: Globe, description: 'Follow system preference' }
                          ].map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: theme.id }))}
                              className={`
                                p-4 rounded-xl border-2 transition-all text-left
                                ${appearanceSettings.theme === theme.id 
                                  ? 'border-[#346ED6] bg-[#346ED6]/5' 
                                  : 'border-gray-200 hover:border-gray-300'
                                }
                              `}
                            >
                              <theme.icon size={24} className={appearanceSettings.theme === theme.id ? 'text-[#346ED6]' : 'text-gray-400'} />
                              <p className="font-medium text-sm mt-3 text-gray-900">{theme.label}</p>
                              <p className="text-xs text-gray-500 mt-1">{theme.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Font Size */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Font Size</h4>
                        <div className="flex items-center space-x-4">
                          <Minus size={16} className="text-gray-400" />
                          <div className="flex gap-2 flex-1">
                            {['small', 'medium', 'large'].map((size) => (
                              <button
                                key={size}
                                onClick={() => setAppearanceSettings(prev => ({ ...prev, fontSize: size }))}
                                className={`
                                  flex-1 py-2.5 rounded-lg text-sm font-medium transition-all
                                  ${appearanceSettings.fontSize === size 
                                    ? 'bg-[#346ED6] text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }
                                `}
                              >
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                              </button>
                            ))}
                          </div>
                          <Plus size={16} className="text-gray-400" />
                        </div>
                      </div>

                      {/* High Contrast */}
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">High Contrast Mode</h4>
                            <p className="text-xs text-gray-500 mt-1">Increase contrast for better readability</p>
                          </div>
                          <button 
                            onClick={() => setAppearanceSettings(prev => ({ ...prev, highContrast: !prev.highContrast }))}
                          >
                            {appearanceSettings.highContrast ? (
                              <ToggleRight size={40} className="text-[#346ED6]" />
                            ) : (
                              <ToggleLeft size={40} className="text-gray-300" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                        >
                          <Save size={16} />
                          <span>Save Appearance</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Methods */}
                {activeSection === 'payment' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                      <p className="text-sm text-gray-500 mt-1">Manage your saved payment methods</p>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      {/* Saved Cards */}
                      {[
                        { type: 'Visa', last4: '4242', expiry: '12/2026', isDefault: true },
                        { type: 'Mastercard', last4: '8888', expiry: '06/2025', isDefault: false }
                      ].map((card, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                              <CreditCard size={16} className="text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {card.type} •••• {card.last4}
                                {card.isDefault && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#346ED6]/10 text-[#346ED6]">
                                    Default
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!card.isDefault && (
                              <button className="text-xs text-[#346ED6] hover:text-blue-700 font-medium">
                                Set as Default
                              </button>
                            )}
                            <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add New Card */}
                      <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#346ED6] hover:text-[#346ED6] transition-colors">
                        <Plus size={20} className="mx-auto mb-2" />
                        <p className="text-sm font-medium">Add New Payment Method</p>
                      </button>

                      {/* Insurance Information */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Insurance Information</h4>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className="text-green-600" />
                            <p className="text-sm font-medium text-green-700">Insurance Verified</p>
                          </div>
                          <p className="text-xs text-green-600 mt-1">Your insurance information is up to date. Coverage valid until Dec 2025.</p>
                          <button className="mt-3 text-sm text-[#346ED6] hover:text-blue-700 font-medium">
                            Update Insurance Info
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy & Data */}
                {activeSection === 'privacy' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Privacy & Data</h3>
                      <p className="text-sm text-gray-500 mt-1">Control your data and privacy settings</p>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Data Sharing */}
                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Share Data for Research</h4>
                            <p className="text-xs text-gray-500 mt-1">Allow anonymized data to be used for medical research</p>
                          </div>
                          <button 
                            onClick={() => setPrivacySettings(prev => ({ ...prev, shareDataWithResearch: !prev.shareDataWithResearch }))}
                          >
                            {privacySettings.shareDataWithResearch ? (
                              <ToggleRight size={40} className="text-[#346ED6]" />
                            ) : (
                              <ToggleLeft size={40} className="text-gray-300" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Marketing Emails */}
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Marketing Communications</h4>
                            <p className="text-xs text-gray-500 mt-1">Receive emails about new services and health tips</p>
                          </div>
                          <button 
                            onClick={() => setPrivacySettings(prev => ({ ...prev, allowMarketingEmails: !prev.allowMarketingEmails }))}
                          >
                            {privacySettings.allowMarketingEmails ? (
                              <ToggleRight size={40} className="text-[#346ED6]" />
                            ) : (
                              <ToggleLeft size={40} className="text-gray-300" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Session Timeout */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Session Timeout</h4>
                        <p className="text-xs text-gray-500 mb-3">Automatically log out after a period of inactivity</p>
                        <select 
                          value={privacySettings.sessionTimeout}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                          className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                        >
                          <option value="15min">15 minutes</option>
                          <option value="30min">30 minutes</option>
                          <option value="1hour">1 hour</option>
                          <option value="2hours">2 hours</option>
                          <option value="never">Never</option>
                        </select>
                      </div>

                      {/* Data Export & Delete */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Data Management</h4>
                        <div className="space-y-3">
                          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Download My Data</p>
                              <p className="text-xs text-gray-500 mt-1">Get a copy of all your medical records and data</p>
                            </div>
                            <Download size={16} className="text-gray-400" />
                          </button>
                          <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                            <div>
                              <p className="text-sm font-medium text-red-700">Delete Account & Data</p>
                              <p className="text-xs text-red-600 mt-1">Permanently delete your account and all associated data</p>
                            </div>
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                        >
                          <Save size={16} />
                          <span>Save Privacy Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
