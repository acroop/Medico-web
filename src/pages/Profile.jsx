import React, { useState } from 'react';
import { User, Calendar, Mail, Phone, Camera, ChevronRight, FileText, Heart, Shield, Bell, Link, Download } from 'lucide-react';

// Mock user type


// Input Field Component
const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 placeholder-gray-500 dark:placeholder-gray-400"
    />
  </div>
);

// Button Component
const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 ";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses}${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Profile Section Component
const ProfileSection = ({ title, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg mb-2
               hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
               border border-gray-200 dark:border-gray-700"
  >
    <div className="mr-3 text-blue-600">
      <Icon size={20} />
    </div>
    <span className="flex-1 text-left text-gray-900 dark:text-white">{title}</span>
    <ChevronRight size={20} className="text-gray-400" />
  </button>
);

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    id: '1',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    dateOfBirth: '1990-05-15',
    phoneNumber: '+1 (555) 123-4567',
    profilePicture: 'https://i.pravatar.cc/300?img=5'
  });

  // Form state
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || '');
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth || '');

  // Handle save profile
  const handleSaveProfile = () => {
    // Validate form
    if (!name || !email) {
      alert('Name and email are required');
      return;
    }

    // Update user data
    setUserData({
      ...userData,
      name,
      email,
      phoneNumber,
      dateOfBirth
    });

    // Exit edit mode
    setIsEditing(false);
    alert('Profile updated successfully');
  };

  // Format date of birth
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle navigation (placeholder)
  const navigate = (screen) => {
    alert(`Navigate to ${screen}`);
  };

  // Render profile info section
  const renderProfileInfo = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
      {isEditing ? (
        <div className="space-y-4">
          <InputField
            label="Full Name"
            value={name}
            onChange={setName}
            placeholder="Enter your full name"
          />
          
          <InputField
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
          />
          
          <InputField
            label="Phone Number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter your phone number"
            type="tel"
          />
          
          <InputField
            label="Date of Birth"
            value={dateOfBirth}
            onChange={setDateOfBirth}
            placeholder="YYYY-MM-DD"
            type="date"
          />
          
          <div className="flex space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setName(userData.name);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber || '');
                setDateOfBirth(userData.dateOfBirth || '');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <div className="w-10 flex justify-center">
              <User size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="text-gray-900 dark:text-white">{userData.name}</p>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-10 flex justify-center">
              <Mail size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white">{userData.email}</p>
            </div>
          </div>
          
          {userData.phoneNumber && (
            <div className="flex items-center mb-4">
              <div className="w-10 flex justify-center">
                <Phone size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="text-gray-900 dark:text-white">{userData.phoneNumber}</p>
              </div>
            </div>
          )}
          
          {userData.dateOfBirth && (
            <div className="flex items-center mb-4">
              <div className="w-10 flex justify-center">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p className="text-gray-900 dark:text-white">{formatDate(userData.dateOfBirth)}</p>
              </div>
            </div>
          )}
          
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="w-full mt-4"
          >
            Edit Profile
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-4">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            {userData.profilePicture ? (
              <img 
                src={userData.profilePicture} 
                alt="Profile"
                className="w-30 h-30 rounded-full object-cover"
              />
            ) : (
              <div className="w-30 h-30 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <User size={60} className="text-blue-600" />
              </div>
            )}
            <button 
              className="absolute bottom-0 right-0 w-9 h-9 bg-blue-600 rounded-full 
                         flex items-center justify-center text-white hover:bg-blue-700
                         transition-colors duration-200"
              onClick={() => alert('Change photo functionality would be implemented here')}
            >
              <Camera size={16} />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {userData.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
        </div>
        
        {/* Profile Info */}
        {renderProfileInfo()}
        
        {/* Health Data Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-1">
            Health Data
          </h2>
          <ProfileSection 
            title="Medical History" 
            icon={FileText} 
            onClick={() => navigate('MedicalHistory')}
          />
          <ProfileSection 
            title="Period Tracker Data" 
            icon={Calendar} 
            onClick={() => navigate('PeriodTracker')}
          />
          <ProfileSection 
            title="PCOS Management Data" 
            icon={User} 
            onClick={() => navigate('PCOSManagement')}
          />
          <ProfileSection 
            title="Pregnancy Tracker Data" 
            icon={Heart} 
            onClick={() => navigate('PregnancyTracker')}
          />
        </div>
        
        {/* Account Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-1">
            Account
          </h2>
          <ProfileSection 
            title="Privacy Settings" 
            icon={Shield} 
            onClick={() => alert('Privacy Settings')}
          />
          <ProfileSection 
            title="Notifications" 
            icon={Bell} 
            onClick={() => alert('Notifications Settings')}
          />
          <ProfileSection 
            title="Connected Accounts" 
            icon={Link} 
            onClick={() => alert('Connected Accounts')}
          />
          <ProfileSection 
            title="Data Export" 
            icon={Download} 
            onClick={() => alert('Data Export')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;