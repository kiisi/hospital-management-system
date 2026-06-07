import { createFileRoute } from '@tanstack/react-router'
import { 
  Search, 
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Activity,
  Heart,
  Thermometer,
  ClipboardList,
  ChevronRight,
  ArrowLeft,
  Filter
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/doctor/medical-records')({
  component: RouteComponent,
})

interface LabResult {
  test: string;
  value: string;
  range: string;
  status: 'normal' | 'abnormal' | 'high' | 'low';
}

interface MedicalRecord {
  id: number;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  recordType: 'lab-result' | 'prescription' | 'diagnosis' | 'imaging' | 'consultation';
  title: string;
  date: string;
  doctor: string;
  department: string;
  status: 'draft' | 'pending' | 'final';
  summary: string;
  attachments: number;
  results: LabResult[];
}

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecord, setSelectedRecord] = useState({} as MedicalRecord)
  const [filterType, setFilterType] = useState('all')

  const medicalRecords = [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientAge: 45,
      patientGender: 'Female',
      recordType: 'lab-result',
      title: 'Complete Blood Count (CBC)',
      date: 'Jan 12, 2025',
      doctor: 'Dr. Michael Chen',
      department: 'Pathology',
      status: 'final',
      summary: 'All parameters within normal range. Hemoglobin: 13.5 g/dL, WBC: 7,200/µL',
      attachments: 2,
      results: [
        { test: 'Hemoglobin', value: '13.5 g/dL', range: '12.0-15.5 g/dL', status: 'normal' },
        { test: 'WBC Count', value: '7,200/µL', range: '4,500-11,000/µL', status: 'normal' },
        { test: 'Platelets', value: '250,000/µL', range: '150,000-400,000/µL', status: 'normal' },
        { test: 'RBC Count', value: '4.8 M/µL', range: '4.0-5.2 M/µL', status: 'normal' }
      ]
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      patientAge: 32,
      patientGender: 'Male',
      recordType: 'imaging',
      title: 'Chest X-Ray',
      date: 'Jan 10, 2025',
      doctor: 'Dr. Robert Brown',
      department: 'Radiology',
      status: 'final',
      summary: 'No acute cardiopulmonary findings. Lungs clear. Heart size normal.',
      attachments: 3,
      results: []
    },
    {
      id: 3,
      patientName: 'Emily Davis',
      patientAge: 28,
      patientGender: 'Female',
      recordType: 'prescription',
      title: 'Prescription - Sumatriptan',
      date: 'Jan 8, 2025',
      doctor: 'Dr. Michael Chen',
      department: 'Neurology',
      status: 'active',
      summary: 'Sumatriptan 50mg - Take as needed for migraine. Max 2 doses in 24 hours.',
      attachments: 0,
      results: []
    },
    {
      id: 4,
      patientName: 'James Wilson',
      patientAge: 55,
      patientGender: 'Male',
      recordType: 'lab-result',
      title: 'Lipid Profile',
      date: 'Jan 5, 2025',
      doctor: 'Dr. Michael Chen',
      department: 'Pathology',
      status: 'final',
      summary: 'Elevated LDL cholesterol. Total Cholesterol: 245 mg/dL, LDL: 160 mg/dL',
      attachments: 1,
      results: [
        { test: 'Total Cholesterol', value: '245 mg/dL', range: '<200 mg/dL', status: 'high' },
        { test: 'LDL Cholesterol', value: '160 mg/dL', range: '<100 mg/dL', status: 'high' },
        { test: 'HDL Cholesterol', value: '45 mg/dL', range: '>40 mg/dL', status: 'normal' },
        { test: 'Triglycerides', value: '180 mg/dL', range: '<150 mg/dL', status: 'high' }
      ]
    },
    {
      id: 5,
      patientName: 'Sarah Johnson',
      patientAge: 45,
      patientGender: 'Female',
      recordType: 'visit-note',
      title: 'Follow-up Visit Notes',
      date: 'Dec 15, 2024',
      doctor: 'Dr. Michael Chen',
      department: 'Cardiology',
      status: 'final',
      summary: 'Blood pressure 128/82 mmHg. Patient reports improved energy levels. Continue current medications.',
      attachments: 0,
      results: []
    }
  ]

  const getRecordTypeStyle = (type: string) => {
    switch (type) {
      case 'lab-result': return 'bg-purple-50 text-purple-700'
      case 'imaging': return 'bg-blue-50 text-blue-700'
      case 'prescription': return 'bg-green-50 text-green-700'
      case 'visit-note': return 'bg-orange-50 text-orange-700'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'final': return 'bg-green-50 text-green-700'
      case 'active': return 'bg-blue-50 text-blue-700'
      case 'pending': return 'bg-yellow-50 text-yellow-700'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  const getResultStatusStyle = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-700'
      case 'high': return 'text-red-700'
      case 'low': return 'text-yellow-700'
      default: return 'text-gray-700'
    }
  }

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'lab-result': return <Activity size={16} />
      case 'imaging': return <Eye size={16} />
      case 'prescription': return <ClipboardList size={16} />
      case 'visit-note': return <FileText size={16} />
      default: return <FileText size={16} />
    }
  }

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterType === 'all' || record.recordType === filterType
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="lg:ml-64 pt-16 lg:pt-0">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredRecords.length} records found
          </p>
        </div>

        {/* Search and Filter */}
        {Object.keys(selectedRecord).length !== 0 && (
          <div className="space-y-3 mb-6">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient, record type, or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#346ED6] focus:border-transparent bg-white"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'all', label: 'All Records' },
                { id: 'lab-result', label: 'Lab Results' },
                { id: 'imaging', label: 'Imaging' },
                { id: 'prescription', label: 'Prescriptions' },
                { id: 'visit-note', label: 'Visit Notes' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filterType === filter.id
                      ? 'bg-[#346ED6] text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Record Detail View */}
        {Object.keys(selectedRecord).length !== 0 ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => setSelectedRecord({} as MedicalRecord)}
                className="text-sm text-[#346ED6] hover:text-blue-700 font-medium"
              >
                ← Back to records
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Record Header */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRecordTypeStyle(selectedRecord.recordType)}`}>
                    {selectedRecord.recordType.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedRecord.status)}`}>
                    {selectedRecord.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedRecord.title}</h3>
              </div>

              {/* Patient & Doctor Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Patient</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedRecord.patientName}</p>
                  <p className="text-xs text-gray-500">
                    {selectedRecord.patientAge} yrs • {selectedRecord.patientGender}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Doctor</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedRecord.doctor}</p>
                  <p className="text-xs text-gray-500">{selectedRecord.department}</p>
                </div>
              </div>

              {/* Date & Summary */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedRecord.date}</p>
                {selectedRecord.summary && (
                  <>
                    <p className="text-xs text-gray-500 mt-2">Summary</p>
                    <p className="text-sm text-gray-700 mt-0.5">{selectedRecord.summary}</p>
                  </>
                )}
              </div>

              {/* Lab Results Table */}
              {selectedRecord.results.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Test Results</h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-3 py-2 text-xs font-medium text-gray-500">Test</th>
                          <th className="text-left px-3 py-2 text-xs font-medium text-gray-500">Result</th>
                          <th className="text-left px-3 py-2 text-xs font-medium text-gray-500">Reference</th>
                          <th className="text-left px-3 py-2 text-xs font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedRecord.results.map((result, idx) => (
                          <tr key={idx}>
                            <td className="px-3 py-2.5 text-sm text-gray-900">{result.test}</td>
                            <td className="px-3 py-2.5 text-sm font-medium text-gray-900">{result.value}</td>
                            <td className="px-3 py-2.5 text-sm text-gray-500">{result.range}</td>
                            <td className="px-3 py-2.5">
                              <span className={`text-sm font-medium capitalize ${getResultStatusStyle(result.status)}`}>
                                {result.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 py-2.5 bg-[#346ED6] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Download size={16} />
                  <span>Download</span>
                </button>
                {selectedRecord.attachments > 0 && (
                  <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View Attachments ({selectedRecord.attachments})
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Records List
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedRecord(record as MedicalRecord)}
                className="w-full bg-white rounded-lg border border-gray-200 hover:border-[#346ED6] transition-colors text-left"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      {/* Record Type Icon */}
                      <div className={`p-2 rounded-lg ${getRecordTypeStyle(record.recordType)}`}>
                        {getRecordIcon(record.recordType)}
                      </div>

                      {/* Record Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {record.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(record.status)}`}>
                            {record.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <User size={12} />
                            <span>{record.patientName}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>{record.date}</span>
                          </span>
                        </div>

                        {record.summary && (
                          <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">
                            {record.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <ChevronRight size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                  </div>

                  {/* Tags */}
                  <div className="flex items-center space-x-2 mt-3 ml-11">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRecordTypeStyle(record.recordType)}`}>
                      {record.recordType.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-gray-400">
                      {record.doctor}
                    </span>
                    {record.attachments > 0 && (
                      <span className="text-xs text-gray-400">
                        {record.attachments} attachment{record.attachments > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {filteredRecords.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">No records found</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {searchQuery 
                    ? "No records match your search criteria"
                    : "No records in this category"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}