// src/pages/PeriodTracker.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoInformationCircleOutline, IoAdd } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout';
import '../styles/Calendar.css';



const PeriodTrackerScreen = () => {
  const { theme, isDark } = useTheme();
  const [date, setDate] = useState(new Date());

  const periodDays = [
    { date: '2025-06-01', flow: 'heavy' },
    { date: '2025-06-02', flow: 'heavy' },
    { date: '2025-06-03', flow: 'medium' },
    { date: '2025-06-04', flow: 'medium' },
    { date: '2025-06-05', flow: 'light' },
    { date: '2025-06-06', flow: 'light' },
  ];

  const fertileDays = [
    { date: '2025-06-14', type: 'ovulation' },
    { date: '2025-06-12', type: 'fertile' },
    { date: '2025-06-13', type: 'fertile' },
    { date: '2025-06-15', type: 'fertile' },
    { date: '2025-06-16', type: 'fertile' },
  ];

  const stats = [
    { label: 'Avg. Cycle (days)', value: '28' },
    { label: 'Avg. Period (days)', value: '6' },
    { label: 'Cycle Variation', value: 'Regular' },
  ];

  const tips = [
    "Stay hydrated and drink plenty of water during your period to help reduce bloating.",
    "Light exercise like walking or yoga can help ease cramps and improve mood.",
  ];
  const renderDotsForDate = (date) => {
  const dots = [];

  const dateStr = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

  // Period flow
  periodDays.forEach(day => {
    if (day.date === dateStr) {
      const color = day.flow === 'heavy' ? '#D50000' :
                    day.flow === 'medium' ? '#FF5252' :
                    '#FF8A80';
      dots.push(<span key={color} style={{ backgroundColor: color }} className="dot" />);
    }
  });

  // Fertile/ovulation
  fertileDays.forEach(day => {
    if (day.date === dateStr) {
      const color = day.type === 'ovulation' ? '#1976D2' : '#64B5F6';
      dots.push(<span key={color} style={{ backgroundColor: color }} className="dot" />);
    }
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      {dots}
    </div>
  );
};

  return (
    <Layout>
      <div style={{ backgroundColor: theme.background, minHeight: '100vh', padding: '1rem' }}>
        <h1 style={{ color: theme.text, fontSize: '2rem', fontWeight: 'bold' }}>Period Tracker</h1>
        <p style={{ color: theme.textSecondary, marginBottom: '1rem' }}>4 days until next period</p>

        <Card title="My Calendar" icon="calendar"className="justify-center">
          <div style={{  width: '100%', margin: '0 auto', borderRadius: '12px', padding: '1rem', background: isDark ? '#2a2a2a' : '#fff' }}>
            <Calendar
              onChange={setDate}
              value={date}
              prevLabel="←"
              nextLabel="→"
              next2Label="»"
              prev2Label="«"
              showNeighboringMonth
              className="themed-calendar"
              tileContent={({ date, view }) => view === 'month' ? renderDotsForDate(date) : null}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
            {[{ label: 'Heavy Flow', color: '#D50000' }, { label: 'Medium Flow', color: '#FF5252' }, { label: 'Light Flow', color: '#FF8A80' }, { label: 'Ovulation', color: '#1976D2' }, { label: 'Fertile Window', color: '#64B5F6' }].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, marginRight: '5px' }}></div>
                <span style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <h2 style={{ color: theme.text, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Quick Add</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Button title="Log Period" size="small" style={{ backgroundColor: '#FF69B4', flex: 1, maxWidth: '200px' }} />
          <Button title="Log Symptoms" size="small" style={{ backgroundColor: '#9370DB', flex: 1, maxWidth: '200px' }} />
          <Button title="Add Notes" size="small" style={{ borderColor: '#FF69B4', borderWidth: 1, flex: 1, maxWidth: '200px' }} />
        </div>

        <Card title="Your Cycle Stats" icon="analytics">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.primary }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Period Tips" icon="bulb">
          {tips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <IoInformationCircleOutline size={20} color={theme.primary} style={{ marginRight: 8 }} />
              <span style={{ color: theme.text }}>{tip}</span>
            </div>
          ))}
        </Card>

        <button
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: theme.primary,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
          }}>
          <IoAdd size={24} color="white" />
        </button>
      </div>
    </Layout>
  );
};

export default PeriodTrackerScreen;