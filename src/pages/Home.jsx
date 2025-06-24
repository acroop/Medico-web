import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiUser, FiHeart, FiClipboard } from 'react-icons/fi';
import { IoMedicalOutline, IoRibbonOutline } from 'react-icons/io5';

const HomeScreen = () => {
  const navigate = useNavigate();

  const theme = {
    background: 'bg-white dark:bg-gray-900',
    text: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-500 dark:text-gray-400',
    primary: 'text-blue-600',
    secondary: 'text-pink-600',
  };

  const upcomingPeriod = "June 28, 2025";
  const nextAppointment = {
    doctor: "Dr. Sarah Johnson",
    date: "June 30, 2025",
    time: "10:00 AM"
  };

  const features = [
    {
      title: 'Period Tracker',
      icon: <FiCalendar className="text-xl" />,
      route: '/period-tracker',
      description: 'Track your cycle, monitor symptoms, and get predictions.',
    },
    {
      title: 'PCOS Management',
      icon: <IoMedicalOutline className="text-xl" />,
      route: '/pcos-management',
      description: 'Tools to help manage PCOS symptoms and treatment.',
    },
    {
      title: 'Pregnancy Tracker',
      icon: <FiHeart className="text-xl" />,
      route: '/pregnancy-tracker',
      description: 'Follow your pregnancy journey week by week.',
    },
    {
      title: 'Breast Cancer Awareness',
      icon: <IoRibbonOutline className="text-xl" />,
      route: '/breast-cancer-awareness',
      description: 'Learn about screening and self-examination.',
    },
    {
      title: 'Medical Records',
      icon: <FiClipboard className="text-xl" />,
      route: '/medical-history',
      description: 'Securely store your medical history and documents.',
    },
    {
      title: 'Consult a Doctor',
      icon: <IoMedicalOutline className="text-xl" />,
      route: '/consult-doctor',
      description: 'Connect with healthcare providers for women.',
    },
  ];

  return (
    <div className={`min-h-screen p-6 ${theme.background}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${theme.text}`}>Hello, Sarah</h1>
          <p className={`text-sm mt-1 ${theme.textSecondary}`}>
            How are you feeling today?
          </p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-800 font-bold">
          S
        </div>
      </div>

      {/* Reminders */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-blue-800">Upcoming Period</h2>
            <FiCalendar className="text-blue-600 text-xl" />
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Your next period is expected on <strong>{upcomingPeriod}</strong>
          </p>
          <button
            onClick={() => navigate('/period-tracker')}
            className="text-blue-600 border border-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white text-sm"
          >
            Track Period
          </button>
        </div>

        <div className="bg-pink-100 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-pink-800">Upcoming Appointment</h2>
            <IoMedicalOutline className="text-pink-600 text-xl" />
          </div>
          <p className="text-sm text-gray-700 mb-1">
            {`${nextAppointment.date} at ${nextAppointment.time}`}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            With {nextAppointment.doctor}
          </p>
          <button
            onClick={() => navigate('/consult-doctor')}
            className="text-pink-600 border border-pink-600 px-4 py-1 rounded hover:bg-pink-600 hover:text-white text-sm"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <h2 className={`text-xl font-semibold mb-4 ${theme.text}`}>Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg shadow hover:shadow-md bg-white dark:bg-gray-800 cursor-pointer"
            onClick={() => navigate(feature.route)}
          >
            <div className="flex items-center mb-2 gap-2">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                {feature.icon}
              </div>
              <h3 className={`text-md font-semibold ${theme.text}`}>
                {feature.title}
              </h3>
            </div>
            <p className={`text-sm ${theme.textSecondary}`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
