import React, { useState } from 'react';
import {
  IoPersonOutline,
  IoBusinessOutline,
  IoAdd,
  IoDocumentTextOutline,
  IoMedkitOutline,
  IoFitnessOutline,
  IoMedicalOutline,
  IoShieldCheckmarkOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';

const mockMedicalRecords = [
  {
    id: '1',
    type: 'medication',
    name: 'Metformin',
    date: '2025-03-15',
    details: 'For PCOS management, 500mg twice daily',
    doctor: 'Dr. Sarah Johnson',
    hospital: "Women's Health Clinic",
  },
  {
    id: '2',
    type: 'condition',
    name: 'PCOS',
    date: '2024-12-10',
    details: 'Diagnosed with Polycystic Ovary Syndrome',
    doctor: 'Dr. James Wilson',
    hospital: 'Metropolitan Hospital',
  },
  {
    id: '3',
    type: 'procedure',
    name: 'Gynecological Examination',
    date: '2025-01-22',
    details: 'Annual checkup and pap smear',
    doctor: 'Dr. Sarah Johnson',
    hospital: "Women's Health Clinic",
  },
  {
    id: '4',
    type: 'vaccination',
    name: 'HPV Vaccine',
    date: '2024-09-05',
    details: 'Gardasil 9, 2nd dose',
    doctor: 'Dr. Robert Brown',
    hospital: 'Community Wellness Center',
  },
  {
    id: '5',
    type: 'allergy',
    name: 'Penicillin',
    date: '2023-06-30',
    details: 'Severe skin rash reaction',
    doctor: 'Dr. Linda Martinez',
    hospital: 'City General Hospital',
  },
];

const iconMap = {
  medication: <IoMedkitOutline />,
  condition: <IoFitnessOutline />,
  procedure: <IoMedicalOutline />,
  vaccination: <IoShieldCheckmarkOutline />,
  allergy: <IoAlertCircleOutline />,
};

const MedicalHistoryScreen = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredRecords =
    activeTab === 'all'
      ? mockMedicalRecords
      : mockMedicalRecords.filter(record => record.type === activeTab);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'medication', label: 'Medications' },
    { id: 'condition', label: 'Conditions' },
    { id: 'procedure', label: 'Procedures' },
    { id: 'vaccination', label: 'Vaccinations' },
    { id: 'allergy', label: 'Allergies' },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your health history</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Records */}
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map(record => (
            <div key={record.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-xl text-blue-600">{iconMap[record.type]}</div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {record.name}
                  </h2>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">{record.details}</p>

              <div className="flex gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                {record.doctor && (
                  <div className="flex items-center gap-1">
                    <IoPersonOutline />
                    <span>{record.doctor}</span>
                  </div>
                )}
                {record.hospital && (
                  <div className="flex items-center gap-1">
                    <IoBusinessOutline />
                    <span>{record.hospital}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-20">
            <IoDocumentTextOutline className="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              No medical records found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add your first record to start tracking your health history
            </p>
          </div>
        )}
      </div>

      {/* Floating Button */}
      <button
        onClick={() => alert('Navigate to Add Record Screen')}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <IoAdd size={24} />
      </button>
    </div>
  );
};

export default MedicalHistoryScreen;
