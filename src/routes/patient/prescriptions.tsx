import { createFileRoute } from '@tanstack/react-router'
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
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Download,
  Printer,
  Eye,
  ChevronRight,
  ChevronDown,
  Calendar,
  Filter,
  Plus,
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Info,
  MoreHorizontal
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/patient/prescriptions')({
  component: RouteComponent,
})

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('prescriptions')
  const [activeTab, setActiveTab] = useState('active')
  const [showRefillModal, setShowRefillModal] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const patientInfo = {
    name: "Sarah Johnson",
    id: "P-2024-0892",
    email: "sarah.johnson@email.com",
    pharmacy: "MediCare Pharmacy - Downtown Branch"
  }
   const activePrescriptions = [
    {
      id: 'RX-2024-0892',
      medication: "Lisinopril",
      genericName: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      startDate: "2024-12-28",
      endDate: "2025-01-27",
      prescribedBy: "Dr. Michael Chen",
      specialty: "Cardiologist",
      status: "active",
      refillsRemaining: 2,
      refillsTotal: 3,
      instructions: "Take one tablet by mouth once daily in the morning. Do not take with potassium supplements.",
      warnings: ["May cause dizziness", "Avoid alcohol", "Take with or without food"],
      pharmacy: "MediCare Pharmacy - Downtown Branch",
      lastFilled: "2024-12-28",
      nextRefillDate: "2025-01-25",
      condition: "Hypertension",
      cost: 15.00,
      insuranceCovered: true
    },
    {
      id: 'RX-2024-0893',
      medication: "Hydrocortisone Cream",
      genericName: "Hydrocortisone Topical",
      dosage: "1%",
      frequency: "Twice daily",
      duration: "14 days",
      startDate: "2024-11-15",
      endDate: "2024-11-29",
      prescribedBy: "Dr. Emily Williams",
      specialty: "Dermatologist",
      status: "active",
      refillsRemaining: 1,
      refillsTotal: 2,
      instructions: "Apply thin layer to affected areas twice daily. Do not use on face for more than 5 days.",
      warnings: ["For external use only", "Avoid contact with eyes", "Do not bandage treated area"],
      pharmacy: "MediCare Pharmacy - Downtown Branch",
      lastFilled: "2024-12-15",
      nextRefillDate: "2025-01-15",
      condition: "Atopic Dermatitis",
      cost: 8.50,
      insuranceCovered: true
    },
    {
      id: 'RX-2024-0894',
      medication: "Ibuprofen",
      genericName: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      duration: "As needed",
      startDate: "2024-08-20",
      endDate: null,
      prescribedBy: "Dr. Lisa Anderson",
      specialty: "Orthopedist",
      status: "active",
      refillsRemaining: 0,
      refillsTotal: 1,
      instructions: "Take one tablet every 6-8 hours as needed for pain. Do not exceed 3 tablets in 24 hours.",
      warnings: ["Take with food", "Avoid if allergic to NSAIDs", "Do not take with other NSAIDs"],
      pharmacy: "MediCare Pharmacy - Downtown Branch",
      lastFilled: "2024-12-20",
      nextRefillDate: null,
      condition: "Knee Pain",
      cost: 12.00,
      insuranceCovered: false
    }
  ]

  const pastPrescriptions = [
    {
      id: 'RX-2024-0880',
      medication: "Amoxicillin",
      genericName: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days",
      startDate: "2024-10-05",
      endDate: "2024-10-12",
      prescribedBy: "Dr. Robert Brown",
      specialty: "General Physician",
      status: "completed",
      refillsRemaining: 0,
      refillsTotal: 0,
      instructions: "Take one capsule three times daily with meals. Complete full course of medication.",
      warnings: ["Complete full course", "Take with food", "May cause stomach upset"],
      pharmacy: "MediCare Pharmacy - Downtown Branch",
      lastFilled: "2024-10-05",
      condition: "Bacterial Infection",
      cost: 10.00,
      insuranceCovered: true
    },
    {
      id: 'RX-2024-0875',
      medication: "Vitamin D3",
      genericName: "Cholecalciferol",
      dosage: "2000 IU",
      frequency: "Once daily",
      duration: "90 days",
      startDate: "2024-06-10",
      endDate: "2024-09-08",
      prescribedBy: "Dr. Robert Brown",
      specialty: "General Physician",
      status: "completed",
      refillsRemaining: 0,
      refillsTotal: 1,
      instructions: "Take one tablet daily with a meal containing fat for better absorption.",
      warnings: ["Do not exceed recommended dose"],
      pharmacy: "MediCare Pharmacy - Downtown Branch",
      lastFilled: "2024-06-10",
      condition: "Vitamin D Deficiency",
      cost: 5.00,
      insuranceCovered: false
    }
  ]

  const prescriptionStats = {
    active: activePrescriptions.length,
    totalRefills: activePrescriptions.reduce((sum, p) => sum + p.refillsRemaining, 0),
    monthlyCost: activePrescriptions.reduce((sum, p) => sum + p.cost, 0),
    nextRefill: "Jan 15, 2025"
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-50 text-green-700 border-green-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200',
      expired: 'bg-gray-50 text-gray-700 border-gray-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }
    const icons = {
      active: <CheckCircle2 size={14} className="text-green-600" />,
      completed: <CheckCircle2 size={14} className="text-blue-600" />,
      expired: <XCircle size={14} className="text-gray-600" />,
      pending: <Clock size={14} className="text-yellow-600" />
    }
    return (
      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    )
  }

  const RefillProgressBar = ({ remaining, total }) => {
    const percentage = (remaining / total) * 100
    return (
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-500">Refills</span>
          <span className="font-medium text-gray-700">{remaining} of {total} remaining</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#346ED6] h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    )
  }

  const handleRefill = (prescription) => {
    setSelectedPrescription(prescription)
    setShowRefillModal(true)
  }

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription)
    setShowDetailModal(true)
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
                    placeholder="Search medications..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <RefreshCw size={16} />
                  <span>Request Refill</span>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Prescriptions</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your medications and refill requests</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  <Printer size={16} />
                  <span className="hidden sm:inline">Print All</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Download size={16} />
                  <span className="hidden sm:inline">Download List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Prescription Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Active Prescriptions', value: prescriptionStats.active, icon: Pill, color: 'bg-[#346ED6]', iconBg: 'bg-white/20' },
              { label: 'Refills Available', value: prescriptionStats.totalRefills, icon: RefreshCw, color: 'bg-green-500', iconBg: 'bg-white/20' },
              { label: 'Monthly Cost', value: `$${prescriptionStats.monthlyCost}`, icon: Receipt, color: 'bg-orange-500', iconBg: 'bg-white/20' },
              { label: 'Next Refill Due', value: prescriptionStats.nextRefill, icon: Calendar, color: 'bg-purple-500', iconBg: 'bg-white/20' }
            ].map((stat, index) => (
              <div key={index} className={`${stat.color} rounded-xl p-4 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.iconBg} p-2 rounded-lg backdrop-blur-sm`}>
                    <stat.icon size={18} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs opacity-90 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {[
                  { id: 'active', label: 'Active', count: activePrescriptions.length },
                  { id: 'past', label: 'Past', count: pastPrescriptions.length },
                  { id: 'all', label: 'All Prescriptions', count: activePrescriptions.length + pastPrescriptions.length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                      ${activeTab === tab.id
                        ? 'border-[#346ED6] text-[#346ED6]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Pharmacy Info Banner */}
          <div className="bg-gradient-to-r from-[#346ED6] to-blue-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-blue-200 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Preferred Pharmacy</h3>
                  <p className="text-blue-100 text-sm">{patientInfo.pharmacy}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white text-[#346ED6] rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                Change Pharmacy
              </button>
            </div>
          </div>

          {/* Prescriptions List */}
          <div className="space-y-4">
            {(activeTab === 'active' ? activePrescriptions : activeTab === 'past' ? pastPrescriptions : [...activePrescriptions, ...pastPrescriptions]).map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="bg-[#346ED6]/10 p-3 rounded-xl">
                            <Pill size={24} className="text-[#346ED6]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{prescription.medication}</h3>
                            <p className="text-sm text-gray-500">{prescription.genericName} • {prescription.dosage}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(prescription.status)}
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {[
                          { label: 'Frequency', value: prescription.frequency },
                          { label: 'Duration', value: prescription.duration },
                          { label: 'Prescribed By', value: `Dr. ${prescription.prescribedBy.split(' ').slice(1).join(' ')}` },
                          { label: 'Condition', value: prescription.condition }
                        ].map((detail, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500">{detail.label}</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{detail.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Refill Progress */}
                      {prescription.status === 'active' && prescription.refillsTotal > 0 && (
                        <div className="mb-4">
                          <RefillProgressBar remaining={prescription.refillsRemaining} total={prescription.refillsTotal} />
                        </div>
                      )}

                      {/* Dates & Cost */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar size={14} />
                          <span>Started: {prescription.startDate}</span>
                        </div>
                        {prescription.endDate && (
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Clock size={14} />
                            <span>Ends: {prescription.endDate}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Receipt size={14} />
                          <span>${prescription.cost}</span>
                          {prescription.insuranceCovered ? (
                            <span className="text-xs text-green-600 font-medium">Covered</span>
                          ) : (
                            <span className="text-xs text-gray-400">Not covered</span>
                          )}
                        </div>
                      </div>

                      {/* Warnings */}
                      {prescription.warnings && (
                        <div className="mt-4 space-y-1">
                          {prescription.warnings.map((warning, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-xs">
                              <AlertCircle size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
                              <span className="text-amber-700">{warning}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="lg:w-48 flex lg:flex-col gap-2">
                      <button 
                        onClick={() => handleViewDetails(prescription)}
                        className="flex-1 px-4 py-2 border border-[#346ED6] text-[#346ED6] rounded-lg text-sm font-medium hover:bg-[#346ED6]/5 transition-colors"
                      >
                        <Eye size={16} className="inline mr-1" />
                        Details
                      </button>
                      {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                        <button 
                          onClick={() => handleRefill(prescription)}
                          className="flex-1 px-4 py-2 bg-[#346ED6] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          <RefreshCw size={16} className="inline mr-1" />
                          Refill
                        </button>
                      )}
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Printer size={16} className="inline mr-1" />
                        Print
                      </button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-start space-x-2">
                      <Info size={16} className="text-[#346ED6] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#346ED6]">Instructions</p>
                        <p className="text-sm text-gray-700 mt-1">{prescription.instructions}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {(activeTab === 'active' ? activePrescriptions : activeTab === 'past' ? pastPrescriptions : [...activePrescriptions, ...pastPrescriptions]).length === 0 && (
            <div className="text-center py-16">
              <Pill className="mx-auto h-16 w-16 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No prescriptions found</h3>
              <p className="mt-2 text-sm text-gray-500">You don't have any {activeTab} prescriptions.</p>
            </div>
          )}
        </main>
      </div>

      {/* Prescription Detail Modal */}
      {showDetailModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Prescription Details</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Medication Header */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#346ED6]/10 p-4 rounded-xl">
                  <Pill size={32} className="text-[#346ED6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedPrescription.medication}</h3>
                  <p className="text-gray-500">{selectedPrescription.genericName}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Dosage', value: selectedPrescription.dosage },
                  { label: 'Frequency', value: selectedPrescription.frequency },
                  { label: 'Duration', value: selectedPrescription.duration },
                  { label: 'Status', value: getStatusBadge(selectedPrescription.status), isComponent: true },
                  { label: 'Prescribed By', value: selectedPrescription.prescribedBy },
                  { label: 'Specialty', value: selectedPrescription.specialty },
                  { label: 'Start Date', value: selectedPrescription.startDate },
                  { label: 'End Date', value: selectedPrescription.endDate || 'Ongoing' },
                  { label: 'Condition', value: selectedPrescription.condition },
                  { label: 'Cost', value: `$${selectedPrescription.cost}` },
                  { label: 'Insurance', value: selectedPrescription.insuranceCovered ? 'Covered' : 'Not Covered' },
                  { label: 'Pharmacy', value: selectedPrescription.pharmacy }
                ].map((detail, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
                    {detail.isComponent ? detail.value : (
                      <p className="text-sm font-medium text-gray-900">{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Instructions</h4>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="text-sm text-gray-700">{selectedPrescription.instructions}</p>
                </div>
              </div>

              {/* Warnings */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Warnings & Precautions</h4>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <ul className="space-y-2">
                    {selectedPrescription.warnings.map((warning, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                        <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Refill Info */}
              {selectedPrescription.status === 'active' && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Refill Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <RefillProgressBar 
                      remaining={selectedPrescription.refillsRemaining} 
                      total={selectedPrescription.refillsTotal} 
                    />
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Last Filled</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.lastFilled}</p>
                      </div>
                      {selectedPrescription.nextRefillDate && (
                        <div>
                          <p className="text-gray-500">Next Refill Date</p>
                          <p className="font-medium text-gray-900">{selectedPrescription.nextRefillDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  <Printer size={16} className="inline mr-1" />
                  Print
                </button>
                {selectedPrescription.refillsRemaining > 0 && (
                  <button 
                    onClick={() => {
                      setShowDetailModal(false)
                      handleRefill(selectedPrescription)
                    }}
                    className="px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    <RefreshCw size={16} className="inline mr-1" />
                    Request Refill
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refill Request Modal */}
      {showRefillModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Request Refill</h2>
              <button onClick={() => setShowRefillModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Medication Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Pill size={20} className="text-[#346ED6]" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedPrescription.medication} {selectedPrescription.dosage}</p>
                    <p className="text-sm text-gray-500">{selectedPrescription.frequency} • {selectedPrescription.refillsRemaining} refills remaining</p>
                  </div>
                </div>
              </div>

              {/* Pharmacy Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Pharmacy</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                  <option>{patientInfo.pharmacy}</option>
                  <option>MediCare Pharmacy - Uptown Branch</option>
                  <option>MediCare Pharmacy - Westside Branch</option>
                </select>
              </div>

              {/* Pickup Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Method</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { method: 'Pickup', icon: Package, description: 'Pick up at pharmacy' },
                    { method: 'Delivery', icon: Truck, description: 'Deliver to your address' }
                  ].map((option) => (
                    <button 
                      key={option.method}
                      className="border-2 border-gray-200 hover:border-[#346ED6] rounded-xl p-4 text-left transition-colors"
                    >
                      <option.icon size={20} className="text-gray-400" />
                      <p className="font-medium text-sm mt-2">{option.method}</p>
                      <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent"
                  placeholder="Any special instructions for the pharmacist..."
                />
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 rounded-b-2xl">
              <button 
                onClick={() => setShowRefillModal(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                Confirm Refill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
