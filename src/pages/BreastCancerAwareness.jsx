import React, { useState } from 'react';
import {
  Calendar,
  Info,
  Shield,
  Heart,
  Book,
  FileText,
  Video,
  Users,
  Activity,
  ChevronRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Layout from '../components/Layout';

const BreastCancerAwareness = () => {
  const { theme } = useTheme();

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
    Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
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
  const riskLevel =
    presentCount >= 3 ? 'High' : presentCount >= 1 ? 'Moderate' : 'Low';

  const riskColor = {
    High: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
    Moderate: 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30',
    Low: 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
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
    <Layout>
      <div
        className="min-h-screen px-4 py-6 max-w-4xl mx-auto"
        style={{ backgroundColor: theme.background, color: theme.text }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: theme.text }}>
            Breast Cancer Awareness
          </h1>
          <p style={{ color: theme.textSecondary }}>Early detection saves lives</p>
        </div>

        {/* Self-Exam Reminder */}
        <Card title="Self-Examination Reminder" icon={<Calendar size={24} className="text-pink-500" />}>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-pink-500 flex items-center justify-center bg-pink-100 dark:bg-pink-900/20">
              <div
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold ${
                  daysUntilNextCheck <= 3 ? 'bg-pink-500' : 'bg-gray-400'
                }`}
              >
                <span className="text-2xl">{daysUntilNextCheck}</span>
                <span className="text-xs">days</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                {daysUntilNextCheck === 0
                  ? 'Self-check is due today!'
                  : 'Days until next self-check'}
              </h3>
              <p className="mb-3" style={{ color: theme.textSecondary }}>
                Next check: {nextDate.toDateString()}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: theme.textSecondary }}>Your streak:</span>
                <div className="flex gap-1">
                  {reminders[0]?.completed.map((done, idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full ${
                        done ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
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
          <p className="mb-6" style={{ color: theme.textSecondary }}>
            Follow these steps to perform a breast self-examination:
          </p>
          {[
            ['Visual Inspection', 'Look in the mirror for size, shape, or color changes.'],
            ['Raise Your Arms', 'Raise arms and inspect again for dimples or nipple changes.'],
            ['Lying Down Exam', 'Lie down and use circular motions to feel each breast.'],
            ['Check for Discharge', 'Gently squeeze nipples to check for discharge.'],
          ].map(([title, desc], idx) => (
            <div key={idx} className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: theme.text }}>{title}</h4>
                <p style={{ color: theme.textSecondary }}>{desc}</p>
              </div>
            </div>
          ))}
          <a href="https://www.youtube.com/watch?v=u-LzRJQJn3Q" target="_blank" rel="noopener noreferrer" className="block mt-4">
            <Button title="Watch Video Tutorial" type="secondary" />
          </a>
        </Card>

        {/* Risk Assessment */}
        <Card title="Risk Assessment" icon={<Shield size={24} className="text-pink-500" />}>
          <div className="flex items-center gap-4 mb-4">
            <span style={{ color: theme.textSecondary }}>Your Risk Level:</span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${riskColor}`}>
              {riskLevel}
            </span>
          </div>
          <p className="text-sm italic mb-6" style={{ color: theme.textSecondary }}>
            Based on your inputs. Consult your doctor for professional assessment.
          </p>
          <div className="space-y-3">
            {riskFactors.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ border: `1px solid ${theme.border}` }}
              >
                <span>{item.factor}</span>
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

        {/* Screening Recommendations */}
        <Card title="Screening Recommendations" icon={<Heart size={24} className="text-pink-500" />}>
          <div className="space-y-4">
            {[
              ['Clinical Breast Exam', 'Every 1–3 years for women in their 20s/30s, annually after 40.', Calendar],
              ['Mammogram', 'Annually for women 45+, optional from 40.', Activity],
              ['MRI', 'For high-risk women, done with mammogram.', Shield],
            ].map(([title, desc, IconComponent], idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: theme.inputBackground }}
              >
                <IconComponent className="text-pink-500 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: theme.text }}>{title}</h4>
                  <p style={{ color: theme.textSecondary }}>{desc}</p>
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
              <div
                key={idx}
                className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200"
                style={{ backgroundColor: theme.inputBackground }}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="text-pink-500" size={20} />
                  <span>{title}</span>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default BreastCancerAwareness;
