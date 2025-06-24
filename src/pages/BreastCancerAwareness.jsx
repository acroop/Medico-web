import React, { useState } from 'react';
import { Calendar, Info, Shield, Heart, Book, FileText, Video, Users, Activity, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

const Card = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const Button = ({ title, onPress, type = "primary", className = "" }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full";
  const styles = {
    primary: "bg-pink-500 text-white hover:bg-pink-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline: "border-2 border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20"
  };
  
  return (
    <button 
      onClick={onPress}
      className={`${baseStyles} ${styles[type]} ${className}`}
    >
      {title}
    </button>
  );
};

const BreastCancerAwareness = () => {
  const [reminders, setReminders] = useState([
    {
      id: '1',
      frequency: 'monthly',
      nextDate: '2025-07-15',
      completed: [true, false, true, true, false, true],
    },
  ]);

  const nextDate = new Date(reminders[0]?.nextDate || '');
  const today = new Date();
  const daysUntilNextCheck = Math.max(
    0,
    Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24))
  );

  const riskFactors = [
    { factor: 'Family History', present: true },
    { factor: 'Age over 50', present: false },
    { factor: 'Early Menstruation', present: true },
    { factor: 'Late Menopause', present: false },
    { factor: 'Previous Chest Radiation', present: false },
    { factor: 'Dense Breast Tissue', present: true },
  ];

  const presentCount = riskFactors.filter((f) => f.present).length;
  const riskLevel = presentCount >= 3 ? 'High' : presentCount >= 1 ? 'Moderate' : 'Low';
  const riskColor = {
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    Moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  }[riskLevel];

  const completeCheck = () => {
    const updated = { ...reminders[0] };
    updated.completed = [...updated.completed, true];

    const next = new Date(updated.nextDate);
    next.setMonth(next.getMonth() + 1);
    updated.nextDate = next.toISOString().split('T')[0];

    setReminders([updated]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Breast Cancer Awareness</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Early detection saves lives</p>
      </div>

      {/* Self-Exam Reminder */}
      <Card title="Self-Examination Reminder" icon={<Calendar size={24} className="text-pink-500" />}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-pink-500 flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20">
            <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold ${daysUntilNextCheck <= 3 ? 'bg-pink-500' : 'bg-gray-400'}`}>
              <span className="text-2xl">{daysUntilNextCheck}</span>
              <span className="text-xs">days</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {daysUntilNextCheck === 0 ? 'Self-check is due today!' : 'Days until next self-check'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Next check: {nextDate.toDateString()}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Your streak:</span>
              <div className="flex gap-1">
                {reminders[0]?.completed.map((done, idx) => (
                  <div 
                    key={idx} 
                    className={`w-4 h-4 rounded-full ${done ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button title="Mark as Completed" onPress={completeCheck} />
      </Card>

      {/* How-To Section */}
      <Card title="How to Perform a Self-Exam" icon={<Info size={24} className="text-pink-500" />}>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Follow these steps to perform a breast self-examination:
        </p>
        {[
          ['Visual Inspection', 'Look in the mirror for size, shape, or color changes.'],
          ['Raise Your Arms', 'Raise arms and inspect again for dimples or nipple changes.'],
          ['Lying Down Exam', 'Lie down and use circular motions to feel each breast.'],
          ['Check for Discharge', 'Gently squeeze nipples to check for discharge.'],
        ].map(([title, desc], idx) => (
          <div key={idx} className="flex items-start gap-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {idx + 1}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
        <Button title="Watch Video Tutorial" type="secondary" />
      </Card>

      {/* Risk Assessment */}
      <Card title="Risk Assessment" icon={<Shield size={24} className="text-pink-500" />}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-700 dark:text-gray-300">Your Risk Level:</span>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${riskColor}`}>
            {riskLevel}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic">
          Based on your inputs. Consult your doctor for professional assessment.
        </p>
        <div className="space-y-3">
          {riskFactors.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">{item.factor}</span>
              {item.present ? (
                <CheckCircle size={20} className="text-red-500" />
              ) : (
                <XCircle size={20} className="text-green-500" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button title="Update Risk Factors" type="outline" />
        </div>
      </Card>

      {/* Screening */}
      <Card title="Screening Recommendations" icon={<Heart size={24} className="text-pink-500" />}>
        <div className="space-y-4">
          {[
            ['Clinical Breast Exam', 'Every 1-3 years for women in their 20s/30s, annually after 40.', Calendar],
            ['Mammogram', 'Annually for women 45+, optional from 40.', Activity],
            ['MRI', 'For high-risk women, done with mammogram.', Shield],
          ].map(([title, desc, IconComponent], idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <IconComponent className="text-pink-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button title="Schedule Screening" />
        </div>
      </Card>

      {/* Educational Resources */}
      <Card title="Educational Resources" icon={<Book size={24} className="text-pink-500" />}>
        <div className="space-y-2">
          {[
            ['Understanding Breast Cancer', FileText],
            ['Early Detection Video Series', Video],
            ['Support Groups Near You', Users],
            ['Lifestyle and Prevention', Activity],
          ].map(([title, IconComponent], idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
              <div className="flex items-center gap-3">
                <IconComponent className="text-pink-500" size={20} />
                <span className="text-gray-700 dark:text-gray-300">{title}</span>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BreastCancerAwareness;