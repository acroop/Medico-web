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
import Layout from '../components/Layout';

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
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-full">
            <IoSearchOutline className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
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
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-blue-600 text-xl">
                    {iconMap[doc.type] || iconMap.other}
                    <h2 className="text-lg font-semibold text-gray-800">{doc.name}</h2>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(doc.date)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}</p>
                <p className="text-sm text-gray-500">{doc.notes}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <IoDocumentTextOutline className="mx-auto text-6xl mb-4" />
              <p>No documents found. Upload a new document to get started.</p>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Upload New Document</h3>
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3" placeholder="Document Name" />
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3" placeholder="Document Type" />
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3" placeholder="Date" />
              <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" placeholder="Notes (Optional)" rows={3}></textarea>
              <button className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-400 py-2 mb-4 rounded-md text-gray-600">
                <IoCloudUploadOutline size={20} /> Select Document to Upload
              </button>
              <div className="flex gap-3">
                <button
                  className="w-full border border-gray-300 py-2 rounded-md"
                  onClick={() => setModalOpen(false)}
                >Cancel</button>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-md"
                  onClick={() => alert('Upload functionality here')}
                >Upload</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedidocsScreen;
