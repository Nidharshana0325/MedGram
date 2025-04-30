import { useState } from 'react';
import { Search, Download, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const records = [
    {
      id: 1,
      date: '2025-03-14',
      doctorName: 'Dr. Aditi Verma',
      diagnosis: 'General Health Checkup',
      type: 'Consultation',
      prescription: 'Multivitamins, Balanced diet',
      notes: 'Patient advised to reduce screen time and walk daily.'
    },
    {
      id: 2,
      date: '2025-03-10',
      doctorName: 'Dr. Rohan Mehta',
      diagnosis: 'Viral Fever',
      type: 'Treatment',
      prescription: 'Paracetamol 500mg, ORS solution',
      notes: 'Hydration emphasized. Rest for 3 days advised.'
    },
    {
      id: 3,
      date: '2025-02-28',
      doctorName: 'Dr. Priya Nair',
      diagnosis: 'Annual Physical Examination',
      type: 'Examination',
      prescription: 'None',
      notes: 'Vitals normal. Next routine checkup scheduled after 1 year.'
    },
    {
      id: 4,
      date: '2025-01-18',
      doctorName: 'Dr. Arjun Deshmukh',
      diagnosis: 'Skin Allergy',
      type: 'Treatment',
      prescription: 'Antihistamines, Aloe vera lotion',
      notes: 'Avoid triggers like dust and synthetic fabrics.'
    },
    {
      id: 5,
      date: '2024-12-02',
      doctorName: 'Dr. Kavita Iyer',
      diagnosis: 'Thyroid Test Report',
      type: 'Laboratory',
      prescription: 'Levothyroxine (if TSH > 5.0)',
      notes: 'Suggested to monitor thyroid levels quarterly.'
    }
  ];
  
  const recordTypes = ['all', 'Consultation', 'Treatment', 'Examination', 'Laboratory'];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || record.type === selectedType;
    const matchesDateRange = (!dateRange.start || new Date(record.date) >= new Date(dateRange.start)) &&
                            (!dateRange.end || new Date(record.date) <= new Date(dateRange.end));
    return matchesSearch && matchesType && matchesDateRange;
  });

  const downloadAllRecords = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ['ID,Date,Doctor Name,Diagnosis,Type,Prescription,Notes']
      + "\n"
      + records.map(record => Object.values(record).map(value => `"${value}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "medical_records.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadRecord = (record: typeof records[0]) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ['ID,Date,Doctor Name,Diagnosis,Type,Prescription,Notes']
      + "\n"
      + Object.values(record).map(value => `"${value}"`).join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `record_${record.id}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Medical Records</h1>
        <button 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          onClick={downloadAllRecords}
        >
          <Download className="h-4 w-4 mr-2" />
          Download All Records
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {recordTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Calendar className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">{record.doctorName}</h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {record.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{format(new Date(record.date), 'MMMM d, yyyy')}</p>
                  </div>
                  <button 
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                    onClick={() => downloadRecord(record)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Diagnosis</h4>
                    <p className="mt-1 text-sm text-gray-600">{record.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Prescription</h4>
                    <p className="mt-1 text-sm text-gray-600">{record.prescription}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Notes</h4>
                  <p className="mt-1 text-sm text-gray-600">{record.notes}</p>
                </div>
              </div>
            ))}

            {filteredRecords.length === 0 && (
              <p className="text-gray-500 text-center">No records found for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
