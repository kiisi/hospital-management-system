import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { 
  Calendar, 
  Clock,
  Bell,
  User,
  Menu,
  X,
  Plus,
  Activity,
  Heart,
  Home,
  CalendarDays,
  ClipboardList,
  Pill,
  Receipt,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  Filter,
  Download,
  Eye,
  FileText,
  Stethoscope,
  Thermometer,
  Weight,
  Ruler,
  HeartPulse,
  FlaskConical,
  Shield,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  Clock4,
  Upload,
  Printer,
  Share2,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ZoomIn,
  FileSpreadsheet
} from 'lucide-react'

export const Route = createFileRoute('/patient/medical-records')({
  component: RouteComponent,
})

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('medical-records')
  const [activeTab, setActiveTab] = useState('summary')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)

    const patientInfo = {
    name: "Sarah Johnson",
    id: "P-2024-0892",
    email: "sarah.johnson@email.com",
    bloodGroup: "O+",
    age: 34,
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension - Stage 1"]
  }

  // Vital Signs History
  const vitalsHistory = {
    current: {
      bloodPressure: { systolic: 120, diastolic: 80, status: 'normal', date: '2024-12-28' },
      heartRate: { value: 72, status: 'normal', date: '2024-12-28' },
      temperature: { value: 98.6, status: 'normal', date: '2024-12-28' },
      respiratoryRate: { value: 16, status: 'normal', date: '2024-12-28' },
      oxygenSaturation: { value: 98, status: 'normal', date: '2024-12-28' },
      weight: { value: 145, unit: 'lbs', bmi: 22.7, status: 'normal', date: '2024-12-28' },
      height: { value: "5'7\"", unit: 'cm', equivalent: '170.18', date: '2024-12-28' }
    },
    trends: [
      { date: '2024-12-28', systolic: 120, diastolic: 80 },
      { date: '2024-09-15', systolic: 128, diastolic: 84 },
      { date: '2024-06-10', systolic: 125, diastolic: 82 },
      { date: '2024-03-05', systolic: 132, diastolic: 86 },
      { date: '2023-12-20', systolic: 130, diastolic: 85 }
    ]
  }

  // Medical Records
  const medicalRecords = [
    {
      id: 'MR-2024-001',
      date: '2024-12-28',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      department: 'Cardiology',
      type: 'Consultation',
      diagnosis: 'Hypertension - Stage 1',
      summary: 'Patient reported occasional headaches and dizziness. Blood pressure readings consistently elevated over past two visits. Recommended lifestyle modifications and prescribed Lisinopril 10mg.',
      severity: 'moderate',
      documents: [
        { name: 'ECG_Report_2024-12-28.pdf', type: 'PDF', size: '2.4 MB', icon: FileText },
        { name: 'Blood_Pressure_Log_2024-12-28.pdf', type: 'PDF', size: '1.1 MB', icon: FileText },
        { name: 'Consultation_Notes_2024-12-28.pdf', type: 'PDF', size: '856 KB', icon: FileSpreadsheet }
      ],
      labResults: [
        { test: 'Complete Blood Count (CBC)', result: 'Normal', range: 'Normal', status: 'normal' },
        { test: 'Lipid Panel', result: 'Borderline High', range: 'Normal: <200 mg/dL', status: 'abnormal' },
        { test: 'Blood Glucose', result: '95 mg/dL', range: '70-100 mg/dL', status: 'normal' }
      ],
      followUp: '3 months',
      notes: 'Patient advised to monitor blood pressure daily and maintain low-sodium diet.'
    },
    {
      id: 'MR-2024-002',
      date: '2024-11-15',
      doctor: 'Dr. Emily Williams',
      specialty: 'Dermatology',
      department: 'Dermatology',
      type: 'Consultation',
      diagnosis: 'Atopic Dermatitis',
      summary: 'Patient presented with dry, itchy patches on arms and legs. Diagnosed with mild atopic dermatitis. Prescribed topical corticosteroids and moisturizers.',
      severity: 'mild',
      documents: [
        { name: 'Skin_Assessment_2024-11-15.pdf', type: 'PDF', size: '1.8 MB', icon: FileText },
        { name: 'Dermatology_Report_2024-11-15.pdf', type: 'PDF', size: '3.2 MB', icon: FileText }
      ],
      labResults: [],
      followUp: '6 months',
      notes: 'Recommended hypoallergenic skincare products and avoiding known irritants.'
    },
    {
      id: 'MR-2024-003',
      date: '2024-10-05',
      doctor: 'Dr. Robert Brown',
      specialty: 'General Medicine',
      department: 'General Medicine',
      type: 'Annual Checkup',
      diagnosis: 'General Health - Normal',
      summary: 'Annual physical examination completed. All vitals within normal range. Updated vaccinations. Recommended routine blood work.',
      severity: 'normal',
      documents: [
        { name: 'Annual_Physical_2024-10-05.pdf', type: 'PDF', size: '4.1 MB', icon: FileText },
        { name: 'Vaccination_Record_2024-10-05.pdf', type: 'PDF', size: '987 KB', icon: FileSpreadsheet },
        { name: 'Lab_Results_2024-10-05.pdf', type: 'PDF', size: '2.3 MB', icon: FileText }
      ],
      labResults: [
        { test: 'Complete Blood Count (CBC)', result: 'Normal', range: 'Normal', status: 'normal' },
        { test: 'Thyroid Panel', result: 'Normal', range: 'Normal', status: 'normal' },
        { test: 'Vitamin D', result: '32 ng/mL', range: '30-100 ng/mL', status: 'normal' },
        { test: 'Vitamin B12', result: '450 pg/mL', range: '200-900 pg/mL', status: 'normal' }
      ],
      followUp: '1 year',
      notes: 'Patient in good health. Continue current lifestyle and exercise routine.'
    },
    {
      id: 'MR-2024-004',
      date: '2024-08-20',
      doctor: 'Dr. Lisa Anderson',
      specialty: 'Orthopedics',
      department: 'Orthopedics',
      type: 'Consultation',
      diagnosis: 'Right Knee Strain',
      summary: 'Patient reported right knee pain after exercise. X-ray showed no fracture. Diagnosed with mild knee strain. Recommended rest, ice, and physical therapy.',
      severity: 'mild',
      documents: [
        { name: 'Knee_XRay_2024-08-20.pdf', type: 'PDF', size: '5.6 MB', icon: FileText },
        { name: 'Orthopedic_Assessment_2024-08-20.pdf', type: 'PDF', size: '2.1 MB', icon: FileSpreadsheet }
      ],
      labResults: [],
      followUp: 'As needed',
      notes: 'Patient responded well to treatment. Resume normal activities gradually.'
    }
  ]

  // Lab Results Summary
  const labResultsSummary = [
    { category: 'Hematology', count: 8, lastTest: '2024-12-28', status: 'up-to-date' },
    { category: 'Biochemistry', count: 12, lastTest: '2024-10-05', status: 'up-to-date' },
    { category: 'Microbiology', count: 3, lastTest: '2024-06-15', status: 'review' },
    { category: 'Immunology', count: 5, lastTest: '2024-11-15', status: 'up-to-date' }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'normal': return 'bg-green-50 text-green-700 border-green-200'
      case 'abnormal': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'critical': return 'bg-red-50 text-red-700 border-red-200'
      case 'mild': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'moderate': return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'severe': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'mild': return 'bg-blue-100 text-blue-800'
      case 'moderate': return 'bg-orange-100 text-orange-800'
      case 'severe': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <TrendingUp size={16} className="text-red-500" />
      case 'down': return <TrendingDown size={16} className="text-green-500" />
      default: return <Minus size={16} className="text-gray-400" />
    }
  }

  const VitalSignCard = ({ icon: Icon, label, value, unit, status, trend, date, color }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend && getTrendIcon(trend)}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <div className="flex items-baseline space-x-1 mt-1">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {unit && <p className="text-sm text-gray-500">{unit}</p>}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
    </div>
  )

  const handleViewRecord = (record) => {
    setSelectedRecord(record)
    setShowRecordModal(true)
  }

  const handleDownload = (document) => {
    console.log('Downloading:', document.name)
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                    placeholder="Search medical records..."
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
                  <Upload size={16} />
                  <span>Upload Documents</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
                <p className="text-sm text-gray-500 mt-1">View your complete medical history and health records</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  <Printer size={16} />
                  <span className="hidden sm:inline">Print Summary</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Download size={16} />
                  <span className="hidden sm:inline">Download All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Patient Info Banner */}
          <div className="bg-gradient-to-r from-[#346ED6] to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{patientInfo.name}</h3>
                  <p className="text-blue-100">Patient ID: {patientInfo.id}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                      Blood Group: {patientInfo.bloodGroup}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                      Age: {patientInfo.age}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {patientInfo.allergies.map((allergy, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-400/30 backdrop-blur-sm border border-red-300/50">
                    <AlertCircle size={12} className="mr-1" />
                    Allergy: {allergy}
                  </span>
                ))}
                {patientInfo.chronicConditions.map((condition, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400/30 backdrop-blur-sm border border-yellow-300/50">
                    <Shield size={12} className="mr-1" />
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {[
                  { id: 'summary', label: 'Health Summary' },
                  { id: 'vitals', label: 'Vital Signs' },
                  { id: 'records', label: 'Medical Records' },
                  { id: 'labs', label: 'Lab Results' },
                  { id: 'documents', label: 'Documents' }
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
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Vital Signs Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Current Vital Signs</h3>
                    <button className="text-[#346ED6] hover:text-blue-700 text-sm font-medium">
                      View History
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <VitalSignCard 
                      icon={HeartPulse}
                      label="Blood Pressure"
                      value={`${vitalsHistory.current.bloodPressure.systolic}/${vitalsHistory.current.bloodPressure.diastolic}`}
                      unit="mmHg"
                      status="normal"
                      trend="down"
                      date="Dec 28"
                      color="bg-red-500"
                    />
                    <VitalSignCard 
                      icon={Heart}
                      label="Heart Rate"
                      value={vitalsHistory.current.heartRate.value}
                      unit="bpm"
                      status="normal"
                      trend="stable"
                      date="Dec 28"
                      color="bg-pink-500"
                    />
                    <VitalSignCard 
                      icon={Thermometer}
                      label="Temperature"
                      value={vitalsHistory.current.temperature.value}
                      unit="°F"
                      status="normal"
                      trend="stable"
                      date="Dec 28"
                      color="bg-orange-500"
                    />
                    <VitalSignCard 
                      icon={Weight}
                      label="Oxygen Saturation"
                      value={vitalsHistory.current.oxygenSaturation.value}
                      unit="%"
                      status="normal"
                      trend="stable"
                      date="Dec 28"
                      color="bg-cyan-500"
                    />
                    <VitalSignCard 
                      icon={Weight}
                      label="Weight"
                      value={vitalsHistory.current.weight.value}
                      unit="lbs"
                      status="normal"
                      trend="down"
                      date="Dec 28"
                      color="bg-indigo-500"
                    />
                    <VitalSignCard 
                      icon={Ruler}
                      label="Height"
                      value={vitalsHistory.current.height.value}
                      unit=""
                      status="normal"
                      trend={null}
                      date="Dec 28"
                      color="bg-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Recent Records & Lab Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Medical Records */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Medical Records</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {medicalRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleViewRecord(record)}
                      >
                        <div className="bg-[#346ED6]/10 p-2 rounded-lg">
                          <Stethoscope size={18} className="text-[#346ED6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{record.diagnosis}</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(record.severity)}`}>
                              {record.severity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{record.doctor} • {record.specialty}</p>
                          <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Calendar size={12} />
                              <span>{record.date}</span>
                            </span>
                            <span>{record.type}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Lab Results */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Lab Results Summary</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {labResultsSummary.map((lab, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <FlaskConical size={16} className="text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{lab.category}</p>
                              <p className="text-xs text-gray-500">{lab.count} tests • Last: {lab.lastTest}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lab.status === 'up-to-date' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {lab.status === 'up-to-date' ? (
                              <CheckCircle2 size={12} className="mr-1" />
                            ) : (
                              <Clock4 size={12} className="mr-1" />
                            )}
                            {lab.status === 'up-to-date' ? 'Up to date' : 'Review needed'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Vital Signs History</h3>
                <p className="text-sm text-gray-500 mt-1">Track your vital signs over time</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Blood Pressure Trend */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Blood Pressure Trend</h4>
                        <p className="text-xs text-gray-500">Last 12 months</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Improving
                      </span>
                    </div>
                    <div className="space-y-3">
                      {vitalsHistory.trends.map((reading, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-500 w-24">{reading.date}</p>
                            <div className="flex items-center space-x-2">
                              <div className="bg-blue-100 px-3 py-1 rounded-lg">
                                <p className="text-sm font-medium text-blue-700">{reading.systolic}/{reading.diastolic}</p>
                              </div>
                              <span className="text-xs text-gray-400">mmHg</span>
                            </div>
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(reading.systolic / 140) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Other Vitals Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <VitalSignCard 
                      icon={Heart}
                      label="Heart Rate"
                      value={vitalsHistory.current.heartRate.value}
                      unit="bpm"
                      status="normal"
                      trend="stable"
                      date="Dec 28"
                      color="bg-pink-500"
                    />
                    <VitalSignCard 
                      icon={Thermometer}
                      label="Temperature"
                      value={vitalsHistory.current.temperature.value}
                      unit="°F"
                      status="normal"
                      trend="stable"
                      date="Dec 28"
                      color="bg-orange-500"
                    />
                    <VitalSignCard 
                      icon={Weight}
                      label="Respiratory Rate"
                      value={vitalsHistory.current.respiratoryRate.value}
                      unit="breaths/min"
                      status="normal"
                      trend="stable"
                      date="Dec 28"
                      color="bg-cyan-500"
                    />
                    <VitalSignCard 
                      icon={HeartPulse}
                      label="Oxygen Saturation"
                      value={vitalsHistory.current.oxygenSaturation.value}
                      unit="%"
                      status="normal"
                      trend="stable"
                      date="Dec 28"
                      color="bg-emerald-500"
                    />
                    <VitalSignCard 
                      icon={Weight}
                      label="Weight"
                      value={vitalsHistory.current.weight.value}
                      unit="lbs"
                      status="normal"
                      trend="down"
                      date="Dec 28"
                      color="bg-indigo-500"
                    />
                    <VitalSignCard 
                      icon={Ruler}
                      label="Height"
                      value={vitalsHistory.current.height.value}
                      unit={`(${vitalsHistory.current.height.equivalent} cm)`}
                      status="normal"
                      trend={null}
                      date="Dec 28"
                      color="bg-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                    <option>All Departments</option>
                    <option>Cardiology</option>
                    <option>Dermatology</option>
                    <option>Orthopedics</option>
                    <option>General Medicine</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                    <option>All Types</option>
                    <option>Consultation</option>
                    <option>Annual Checkup</option>
                    <option>Emergency</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent">
                    <option>All Dates</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>

              {/* Records List */}
              {medicalRecords.map((record) => (
                <div key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{record.diagnosis}</h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-sm text-gray-500">{record.doctor}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{record.specialty}</span>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(record.severity)}`}>
                            {record.severity}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{record.summary}</p>
                        
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{record.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Stethoscope size={14} />
                            <span>{record.type}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText size={14} />
                            <span>{record.documents.length} documents</span>
                          </span>
                          {record.labResults.length > 0 && (
                            <span className="flex items-center space-x-1">
                              <FlaskConical size={14} />
                              <span>{record.labResults.length} lab results</span>
                            </span>
                          )}
                        </div>

                        {/* Lab Results Preview */}
                        {record.labResults.length > 0 && (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {record.labResults.map((lab, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600">{lab.test}</p>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  lab.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {lab.result}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="lg:w-48 flex lg:flex-col gap-2">
                        <button 
                          onClick={() => handleViewRecord(record)}
                          className="flex-1 px-4 py-2 border border-[#346ED6] text-[#346ED6] rounded-lg text-sm font-medium hover:bg-[#346ED6]/5 transition-colors"
                        >
                          <Eye size={16} className="inline mr-1" />
                          View Details
                        </button>
                        <button className="flex-1 px-4 py-2 bg-[#346ED6] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          <Download size={16} className="inline mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Laboratory Results</h3>
                <p className="text-sm text-gray-500 mt-1">Complete lab test history</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {medicalRecords.filter(r => r.labResults.length > 0).map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{record.date}</h4>
                          <p className="text-xs text-gray-500">{record.doctor} • {record.department}</p>
                        </div>
                        <span className="text-xs text-gray-400">ID: {record.id}</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left text-xs font-medium text-gray-500 pb-3">Test Name</th>
                              <th className="text-left text-xs font-medium text-gray-500 pb-3">Result</th>
                              <th className="text-left text-xs font-medium text-gray-500 pb-3">Reference Range</th>
                              <th className="text-left text-xs font-medium text-gray-500 pb-3">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.labResults.map((lab, idx) => (
                              <tr key={idx} className="border-b border-gray-100 last:border-0">
                                <td className="py-3 text-sm text-gray-900">{lab.test}</td>
                                <td className="py-3 text-sm font-medium text-gray-900">{lab.result}</td>
                                <td className="py-3 text-sm text-gray-500">{lab.range}</td>
                                <td className="py-3">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    lab.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {lab.status === 'normal' ? (
                                      <CheckCircle2 size={12} className="mr-1" />
                                    ) : (
                                      <AlertCircle size={12} className="mr-1" />
                                    )}
                                    {lab.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Documents & Reports</h3>
                    <p className="text-sm text-gray-500 mt-1">All your medical documents in one place</p>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Upload size={16} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {medicalRecords.map((record) => (
                    <div key={record.id}>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">{record.date} - {record.diagnosis}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {record.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center space-x-3">
                              <div className="bg-[#346ED6]/10 p-2 rounded-lg">
                                <doc.icon size={18} className="text-[#346ED6]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleDownload(doc)}
                                className="p-1.5 text-gray-400 hover:text-[#346ED6] hover:bg-white rounded-lg"
                              >
                                <Download size={16} />
                              </button>
                              <button className="p-1.5 text-gray-400 hover:text-[#346ED6] hover:bg-white rounded-lg">
                                <Eye size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Medical Record Details</h2>
              <button 
                onClick={() => setShowRecordModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedRecord.diagnosis}</h3>
                  <p className="text-gray-500 mt-1">{selectedRecord.doctor} • {selectedRecord.specialty}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(selectedRecord.severity)}`}>
                  {selectedRecord.severity}
                </span>
              </div>

              {/* Record Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Date', value: selectedRecord.date, icon: Calendar },
                  { label: 'Type', value: selectedRecord.type, icon: Stethoscope },
                  { label: 'Department', value: selectedRecord.department, icon: ClipboardList },
                  { label: 'Follow-up', value: selectedRecord.followUp, icon: Clock }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <item.icon size={16} className="text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Summary</h4>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="text-sm text-gray-700">{selectedRecord.summary}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Doctor's Notes</h4>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <p className="text-sm text-gray-700">{selectedRecord.notes}</p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Attached Documents</h4>
                <div className="space-y-2">
                  {selectedRecord.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <doc.icon size={18} className="text-[#346ED6]" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-[#346ED6] hover:bg-white rounded-lg">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#346ED6] hover:bg-white rounded-lg">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#346ED6] hover:bg-white rounded-lg">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  <Printer size={16} className="inline mr-1" />
                  Print Record
                </button>
                <button className="px-4 py-2 bg-[#346ED6] text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  <Download size={16} className="inline mr-1" />
                  Download All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
