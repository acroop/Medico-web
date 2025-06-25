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
  IoClose,
} from 'react-icons/io5';
import Layout from '../components/Layout';
import { useTheme } from '../context/ThemeContext';

const initialRecords = [
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
  const { theme, isDark } = useTheme();
  const [records, setRecords] = useState(initialRecords);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: 'medication',
    name: '',
    date: '',
    details: '',
    doctor: '',
    hospital: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newRecord = {
      ...form,
      id: Date.now().toString(),
    };
    setRecords((prev) => [newRecord, ...prev]);
    setForm({
      type: 'medication',
      name: '',
      date: '',
      details: '',
      doctor: '',
      hospital: '',
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return (
    <Layout>
      <div
        className="min-h-screen px-4 py-6 flex flex-col items-center"
        style={{ backgroundColor: theme.background, color: theme.text }}
      >
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
            Medical Records
          </h1>
          <p className="mb-6" style={{ color: theme.textSecondary }}>
            Manage your health history
          </p>

          {records.map((record) => (
            <div
              key={record.id}
              className="p-4 rounded-lg shadow mb-4"
              style={{ backgroundColor: theme.surface, color: theme.text }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div style={{ color: theme.primary, fontSize: 22 }}>
                    {iconMap[record.type]}
                  </div>
                  <h2 className="text-lg font-semibold">{record.name}</h2>
                </div>
                <span style={{ color: theme.textSecondary, fontSize: 12 }}>
                  {new Date(record.date).toLocaleDateString('en-US')}
                </span>
              </div>
              <p className="text-sm" style={{ color: theme.text }}>
                {record.details}
              </p>
              <div className="flex gap-4 mt-3 text-sm" style={{ color: theme.textSecondary }}>
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
              <button
                onClick={() => handleDelete(record.id)}
                className="mt-2 text-xs"
                style={{ color: 'red' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Floating + Button */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: theme.primary,
            color: '#fff',
            position: 'fixed',
            bottom: 24,
            right: 24,
            padding: 16,
            borderRadius: '9999px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <IoAdd size={24} />
        </button>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          >
            <div
              className="rounded-lg p-6 w-full max-w-md relative"
              style={{ backgroundColor: theme.surface, color: theme.text }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{ position: 'absolute', top: 12, right: 12, color: theme.textSecondary }}
              >
                <IoClose size={22} />
              </button>
              <h2 className="text-xl font-bold mb-4">Add Medical Note</h2>
              <div className="space-y-3">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                >
                  <option value="medication">Medication</option>
                  <option value="condition">Condition</option>
                  <option value="procedure">Procedure</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="allergy">Allergy</option>
                </select>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{ backgroundColor: isDark ? '#333' : '#fff', borderColor: theme.border, color: theme.text }}
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{ backgroundColor: isDark ? '#333' : '#fff', borderColor: theme.border, color: theme.text }}
                />
                <input
                  type="text"
                  name="doctor"
                  placeholder="Doctor's Name"
                  value={form.doctor}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{ backgroundColor: isDark ? '#333' : '#fff', borderColor: theme.border, color: theme.text }}
                />
                <input
                  type="text"
                  name="hospital"
                  placeholder="Hospital"
                  value={form.hospital}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{ backgroundColor: isDark ? '#333' : '#fff', borderColor: theme.border, color: theme.text }}
                />
                <textarea
                  name="details"
                  placeholder="Details"
                  value={form.details}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  style={{ backgroundColor: isDark ? '#333' : '#fff', borderColor: theme.border, color: theme.text }}
                />
                <button
                  onClick={handleAdd}
                  className="w-full py-2 rounded font-semibold"
                  style={{ backgroundColor: theme.primary, color: '#fff' }}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedicalHistoryScreen;
