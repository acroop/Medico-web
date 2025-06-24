import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { IoAdd, IoCheckmarkCircle, IoHeartCircleOutline } from 'react-icons/io5';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';


const mockPregnancyData = {
  isPregnant: true,
  dueDate: '2026-01-15',
  weeksPregnant: 16,
  babySize: 'Avocado',
  appointments: [
    {
      id: '1',
      date: '2025-07-10',
      time: '10:00 AM',
      doctorName: 'Dr. Emily Carter',
      purpose: 'Regular Checkup',
      notes: 'Bring previous ultrasound report',
    },
    {
      id: '2',
      date: '2025-08-05',
      time: '11:30 AM',
      doctorName: 'Dr. Emily Carter',
      purpose: 'Anomaly Scan',
      notes: '',
    },
  ],
  symptoms: [
    {
      id: '1',
      date: '2025-06-22',
      symptoms: ['Nausea', 'Fatigue'],
      intensityLevel: 6,
      notes: 'Feeling better in the afternoon',
    },
    {
      id: '2',
      date: '2025-06-20',
      symptoms: ['Backache', 'Food Cravings'],
      intensityLevel: 4,
      notes: 'Craving ice cream',
    },
    {
      id: '3',
      date: '2025-06-18',
      symptoms: ['Nausea', 'Headache'],
      intensityLevel: 7,
      notes: '',
    },
  ],
  weightTracking: [
  { week: 8, weight: 60.5 },
  { week: 10, weight: 61.2 },
  { week: 12, weight: 61.8 },
  { week: 14, weight: 62.9 },
  { week: 16, weight: 63.5 }
],
};

const PregnancyTracker = () => {
  const { theme } = useTheme();
  const [pregnancyData, setPregnancyData] = useState(mockPregnancyData);

  const dueDate = new Date(pregnancyData.dueDate);
  const today = new Date();
  const daysUntilDueDate = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
  const progress = (pregnancyData.weeksPregnant / 40) * 100;

  const upcoming = pregnancyData.appointments.filter(
    a => new Date(a.date) >= today
  ).sort((a, b) => new Date(a.date) - new Date(b.date));
  const next = upcoming[0];

  const trimester = pregnancyData.weeksPregnant > 26 ? 3 : pregnancyData.weeksPregnant > 13 ? 2 : 1;

  return (
    <div style={{ padding: '1rem', backgroundColor: theme.background, color: theme.text }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Pregnancy Tracker</h1>
      <p style={{ marginBottom: '1.5rem', color: theme.textSecondary }}>
        Week {pregnancyData.weeksPregnant} • {daysUntilDueDate} days to go
      </p>

      <Card>
        <p style={{ color: theme.primary }}>Baby is the size of an</p>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{pregnancyData.babySize}</h2>
        <p style={{ color: theme.textSecondary }}>
          Due on {dueDate.toLocaleDateString()}
        </p>
        <span style={{
          backgroundColor: theme.primary,
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '6px',
          display: 'inline-block',
          marginTop: '0.5rem'
        }}>
          Trimester {trimester}
        </span>
        <div style={{
          background: theme.border,
          borderRadius: '4px',
          height: '8px',
          marginTop: '10px'
        }}>
          <div style={{
            background: theme.primary,
            height: '8px',
            width: `${progress}%`,
            borderRadius: '4px'
          }}></div>
        </div>
        <p style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
          {pregnancyData.weeksPregnant} of 40 weeks
        </p>
      </Card>

      {next && (
        <Card title="Next Appointment">
          <p>{new Date(next.date).toLocaleDateString()} at {next.time}</p>
          <p>{next.doctorName}</p>
          <p style={{ color: theme.primary }}>{next.purpose}</p>
          {next.notes && (
            <p style={{ fontStyle: 'italic', color: theme.textSecondary }}>
              Note: {next.notes}
            </p>
          )}
        </Card>
      )}
      <Card title="Weight Tracking">
        <div style={{ height: '250px', marginBottom: '1rem'}}>
        <LineChart
          width={1400}
          height={250}
          data={pregnancyData.weightTracking}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
        <XAxis dataKey="week" tick={{ fill: theme.textSecondary }} label={{ value: 'Week', position: 'insideBottomRight', offset: -5 }} />
        <YAxis domain={['auto', 'auto']} tick={{ fill: theme.textSecondary }} unit="kg" />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke={theme.primary} strokeWidth={3} dot={{ fill: theme.primary }} />
      </LineChart>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
  <Button
    title="Log Weight"
    onClick={() => {
      const latestWeek = pregnancyData.weightTracking[pregnancyData.weightTracking.length - 1].week;
      const newWeight = prompt('Enter your current weight (kg):');
      if (newWeight && !isNaN(newWeight)) {
        const newData = [...pregnancyData.weightTracking, { week: latestWeek + 1, weight: parseFloat(newWeight) }];
        setPregnancyData(prev => ({ ...prev, weightTracking: newData }));
      }
    }}
    style={{ flex: 1, backgroundColor: theme.accent, color: '#fff', fontWeight: 'bold' }}
  />
  <Button
    title="Delete Last"
    onClick={() => {
      if (pregnancyData.weightTracking.length > 0) {
        const newData = pregnancyData.weightTracking.slice(0, -1); // removes last item
        setPregnancyData(prev => ({ ...prev, weightTracking: newData }));
      }
    }}
    type="outline"
    style={{ flex: 1, borderColor: theme.danger, color: theme.danger }}
    textStyle={{ color: theme.danger }}
  />
</div>
    </Card>

      <Card title="Weekly Development">
        <h3 style={{ color: theme.primary }}>
          Week {pregnancyData.weeksPregnant}: Key Developments
        </h3>
        <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
          <li><IoCheckmarkCircle size={18} style={{ marginRight: 6, color: theme.success }} /> Baby’s eyes can now sense light.</li>
          <li><IoCheckmarkCircle size={18} style={{ marginRight: 6, color: theme.success }} /> The baby can now make sucking movements.</li>
          <li><IoCheckmarkCircle size={18} style={{ marginRight: 6, color: theme.success }} /> Baby is about 4.5 inches long.</li>
        </ul>
      </Card>

      <Card title="Symptoms">
        {pregnancyData.symptoms.slice(0, 3).map(s => (
          <div key={s.id} style={{ marginBottom: '1rem' }}>
            <p>{new Date(s.date).toDateString()}</p>
            <p style={{ color: theme.textSecondary }}>
              Level {s.intensityLevel}/10
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {s.symptoms.map((sym, i) => (
                <span key={i} style={{
                  background: theme.primary + '20',
                  color: theme.primary,
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}>
                  {sym}
                </span>
              ))}
            </div>
            {s.notes && (
              <p style={{ fontStyle: 'italic', color: theme.textSecondary }}>
                {s.notes}
              </p>
            )}
          </div>
        ))}
      </Card>

      <Card title="Nutrition">
        <p>Focus on key nutrients like Folic Acid, Omega-3, and Iron.</p>
      </Card>

      <button style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: theme.primary,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.25)'
      }}>
        <IoAdd size={24} />
      </button>
    </div>
  );
};

export default PregnancyTracker;
