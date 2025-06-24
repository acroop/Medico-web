import React, { useState } from 'react';
import { Activity, Apple, Bed, Plus, FileText, Video, Mic, Link, CheckCircle, Eye, EyeOff, ChevronRight } from 'lucide-react';

const PCOSManagementScreen = () => {
  const [isDiagnosed, setIsDiagnosed] = useState(true);

  const symptoms = [
    { id: '1', name: 'Irregular periods', frequency: 0.9, tracked: true },
    { id: '2', name: 'Weight gain', frequency: 0.7, tracked: true },
    { id: '3', name: 'Acne', frequency: 0.5, tracked: true },
    { id: '4', name: 'Hair growth', frequency: 0.4, tracked: false },
    { id: '5', name: 'Fatigue', frequency: 0.65, tracked: true },
  ];

  const medications = [
    { id: '1', name: 'Metformin', dosage: '500mg', frequency: 'twice daily', timeOfDay: 'morning, evening' },
    { id: '2', name: 'Birth Control', dosage: '1 pill', frequency: 'once daily', timeOfDay: 'morning' },
  ];

  const recentSymptomLogs = [
    { date: '2025-06-23', symptoms: ['Irregular periods', 'Acne'], intensityLevel: 7, notes: 'Stress might be worsening symptoms' },
    { date: '2025-06-20', symptoms: ['Weight gain', 'Fatigue'], intensityLevel: 5, notes: 'Started new diet' },
    { date: '2025-06-15', symptoms: ['Hair growth', 'Acne'], intensityLevel: 6, notes: '' },
  ];

  const resources = [
    { id: '1', title: 'Understanding PCOS', type: 'article' },
    { id: '2', title: 'PCOS Diet Tips', type: 'video' },
    { id: '3', title: 'Managing PCOS Symptoms', type: 'podcast' },
    { id: '4', title: 'Exercise for PCOS', type: 'article' },
  ];

  const getResourceIcon = (type) => {
    switch(type) {
      case 'article': return <FileText className="text-blue-500" />;
      case 'video': return <Video className="text-blue-500" />;
      case 'podcast': return <Mic className="text-blue-500" />;
      default: return <Link className="text-blue-500" />;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">PCOS Management</h1>
      <p className="text-gray-600 mb-6">Track and manage your PCOS journey</p>

      {!isDiagnosed ? (
        <div className="bg-white p-6 shadow-sm rounded-lg mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">PCOS Assessment</h2>
          <p className="mb-4 text-gray-600">Not sure if you have PCOS? Take our assessment to track your symptoms and get personalized guidance.</p>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors" 
            onClick={() => setIsDiagnosed(true)}
          >
            Start Assessment
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white p-6 shadow-sm rounded-lg mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tracked Symptoms</h2>
            <div className="space-y-3">
              {symptoms.map(symptom => (
                <div key={symptom.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${symptom.tracked ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <span className="text-gray-700">{symptom.name}</span>
                  </div>
                  {symptom.tracked ? <Eye className="text-blue-500 text-lg" /> : <EyeOff className="text-gray-400 text-lg" />}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm rounded-lg mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Medications</h2>
            <div className="space-y-4">
              {medications.map(med => (
                <div key={med.id} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-800">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                    <p className="text-sm text-gray-500 italic">{med.timeOfDay}</p>
                  </div>
                  <CheckCircle className="text-green-500 text-2xl" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm rounded-lg mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Logs</h2>
            <div className="space-y-4">
              {recentSymptomLogs.map((log, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{new Date(log.date).toLocaleDateString()}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      log.intensityLevel >= 7 ? 'bg-red-100 text-red-700' :
                      log.intensityLevel >= 4 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      Level {log.intensityLevel}/10
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {log.symptoms.map((s, i) => (
                      <span key={i} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">{s}</span>
                    ))}
                  </div>
                  {log.notes && <p className="text-sm italic text-gray-600">{log.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="bg-white p-6 shadow-sm rounded-lg mb-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">PCOS Resources</h2>
        <div className="space-y-3">
          {resources.map(res => (
            <div key={res.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer rounded px-2">
              <div className="flex items-center gap-3">
                {getResourceIcon(res.type)}
                <span className="text-gray-700">{res.title}</span>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 shadow-sm rounded-lg mb-20 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Lifestyle Recommendations</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <Activity className="text-pink-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Exercise Regularly</h3>
              <p className="text-sm text-gray-600">Aim for 30 minutes of moderate exercise most days of the week.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <Apple className="text-pink-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Balanced Diet</h3>
              <p className="text-sm text-gray-600">Focus on low-glycemic foods, lean proteins, fruits, and vegetables.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <Bed className="text-pink-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Prioritize Sleep</h3>
              <p className="text-sm text-gray-600">Aim for 7–9 hours of quality sleep each night.</p>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors">
        <Plus className="text-xl" />
      </button>
    </div>
  );
};

export default PCOSManagementScreen;