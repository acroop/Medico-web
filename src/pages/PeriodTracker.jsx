import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PeriodTrackerScreen = () => {
  const [periodDays] = useState([
    { date: '2025-06-01', flow: 'heavy' },
    { date: '2025-06-02', flow: 'heavy' },
    { date: '2025-06-03', flow: 'medium' },
    { date: '2025-06-04', flow: 'medium' },
    { date: '2025-06-05', flow: 'light' },
    { date: '2025-06-06', flow: 'light' },
  ]);

  const [fertileDays] = useState([
    { date: '2025-06-14', type: 'ovulation' },
    { date: '2025-06-12', type: 'fertile' },
    { date: '2025-06-13', type: 'fertile' },
    { date: '2025-06-15', type: 'fertile' },
    { date: '2025-06-16', type: 'fertile' },
  ]);

  const predictedPeriod = {
    start: '2025-06-28',
    end: '2025-07-04',
  };

  const today = new Date().toISOString().split('T')[0];
  const isInPeriod = periodDays.some(day => day.date === today);

  const nextPeriodDate = new Date(predictedPeriod.start);
  const currentDate = new Date();
  const daysUntilPeriod = Math.ceil((nextPeriodDate - currentDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Period Tracker</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {daysUntilPeriod > 0
            ? `${daysUntilPeriod} days until next period`
            : isInPeriod
            ? 'You are on your period'
            : 'Your period is late'}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">My Calendar</h2>
        <Calendar className="w-full mb-4" />
        <div className="flex flex-wrap gap-4">
          <Legend color="#D50000" label="Heavy Flow" />
          <Legend color="#FF5252" label="Medium Flow" />
          <Legend color="#FF8A80" label="Light Flow" />
          <Legend color="#1976D2" label="Ovulation" />
          <Legend color="#64B5F6" label="Fertile Window" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Quick Add</h3>
        <div className="flex gap-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded">Log Period</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Log Symptoms</button>
          <button className="border px-4 py-2 rounded">Add Notes</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Cycle Stats</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <Stat value="28" label="Avg. Cycle (days)" />
          <Stat value="6" label="Avg. Period (days)" />
          <Stat value="Regular" label="Cycle Variation" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Period Tips</h2>
        <Tip text="Stay hydrated and drink plenty of water during your period to help reduce bloating." />
        <Tip text="Light exercise like walking or yoga can help ease cramps and improve mood." />
      </div>

      <button className="fixed bottom-6 right-6 bg-red-500 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center">
        +
      </button>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
    <span className="text-sm">{label}</span>
  </div>
);

const Stat = ({ value, label }) => (
  <div>
    <p className="text-2xl font-bold text-red-500">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

const Tip = ({ text }) => (
  <div className="flex items-start gap-2 mb-4">
    <span className="text-red-500">&#9432;</span>
    <p className="text-sm leading-relaxed">{text}</p>
  </div>
);

export default PeriodTrackerScreen;
