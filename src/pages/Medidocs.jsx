import React, { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import {
  IoDocumentTextOutline,
  IoMedicalOutline,
  IoFlaskOutline,
  IoScanOutline,
  IoExitOutline,
  IoSearchOutline,
} from 'react-icons/io5';
import Layout from '../components/Layout.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const mockDocuments = [
  {
    id: '1',
    name: 'Annual Checkup Report',
    date: '2025-04-15',
    type: 'other',
    notes: 'Annual physical examination report'
  },
  {
    id: '2',
    name: 'Blood Test Results',
    date: '2025-05-20',
    type: 'labReport',
    notes: 'Complete blood count, lipid profile'
  },
  {
    id: '3',
    name: 'Mammogram Results',
    date: '2025-03-10',
    type: 'imaging',
    notes: 'Annual screening mammogram'
  },
  {
    id: '4',
    name: 'Prescription for Vitamins',
    date: '2025-06-01',
    type: 'prescription',
    notes: 'Prenatal vitamins prescription'
  },
];

const iconMap = {
  prescription: <IoMedicalOutline />,
  labReport: <IoFlaskOutline />,
  imaging: <IoScanOutline />,
  discharge: <IoExitOutline />,
  other: <IoDocumentTextOutline />,
};

const MedidocsScreen = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();

  const filteredDocs = mockDocuments.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.type.toLowerCase().includes(search.toLowerCase()) ||
    doc.notes.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = dateStr => new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto"> {/* Broader layout for consistency */}
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-3" style={{ color: theme.textSecondary }} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring"
                style={{
                  background: theme.surface,
                  color: theme.text,
                  borderColor: theme.border,
                  boxShadow: 'none',
                }}
                placeholder="Search documents..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-md font-medium"
              style={{
                background: theme.primary,
                color: theme.text,
                border: 'none',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = theme.secondary}
              onMouseOut={e => e.currentTarget.style.background = theme.primary}
            >
              Upload
            </button>
          </div>

          {/* Document Cards */}
          <div className="space-y-4">
            {filteredDocs.length > 0 ? (
              filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  className="shadow rounded-lg p-4 border"
                  style={{
                    background: theme.card,
                    borderColor: theme.border,
                    color: theme.text,
                    boxShadow: theme.isDark ? '0 2px 8px rgba(0,0,0,0.6)' : '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xl" style={{ color: theme.primary }}>
                      {iconMap[doc.type] || iconMap.other}
                      <h2 className="text-lg font-semibold" style={{ color: theme.text }}>{doc.name}</h2>
                    </div>
                    <span className="text-sm" style={{ color: theme.textSecondary }}>{formatDate(doc.date)}</span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: theme.accent, fontWeight: 500 }}>{doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}</p>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>{doc.notes}</p>
                </div>
              ))
            ) : (
              <div className="text-center mt-20" style={{ color: theme.textSecondary }}>
                <IoDocumentTextOutline className="mx-auto text-6xl mb-4" style={{ color: theme.disabled }} />
                <p>No documents found. Upload a new document to get started.</p>
              </div>
            )}
          </div>

          {/* Upload Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="rounded-md shadow-lg p-6 w-full max-w-md" style={{ background: theme.card, color: theme.text }}>
                <h3 className="text-xl font-semibold mb-4">Upload New Document</h3>
                <input className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Document Name" />
                <input className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Document Type" />
                <input className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Date" />
                <textarea className="w-full rounded-md px-3 py-2 mb-4 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Notes (Optional)" rows={3}></textarea>
                <button className="w-full flex items-center justify-center gap-2 border border-dashed py-2 mb-4 rounded-md" style={{ borderColor: theme.disabled, color: theme.textSecondary, background: theme.surface }}>
                  <IoCloudUploadOutline size={20} /> Select Document to Upload
                </button>
                <div className="flex gap-3">
                  <button
                    className="w-full py-2 rounded-md border"
                    style={{ background: theme.surface, color: theme.text, borderColor: theme.border }}
                    onClick={() => setModalOpen(false)}
                  >Cancel</button>
                  <button
                    className="w-full py-2 rounded-md"
                    style={{ background: theme.primary, color: theme.text, border: 'none' }}
                    onClick={() => alert('Upload functionality here')}
                    onMouseOver={e => e.currentTarget.style.background = theme.secondary}
                    onMouseOut={e => e.currentTarget.style.background = theme.primary}
                  >Upload</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MedidocsScreen;
