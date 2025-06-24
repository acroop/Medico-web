import React, { useState } from 'react';
import { 
  Moon, 
  Bell, 
  AlarmClock, 
  MapPin, 
  Fingerprint, 
  CloudUpload, 
  ShieldCheck, 
  Globe, 
  Settings, 
  BarChart3, 
  HelpCircle, 
  AlertTriangle, 
  FileText, 
  File, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';

// Mock theme context
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  
  const lightTheme = {
    background: '#ffffff',
    card: '#f8f9fa',
    text: '#1a1a1a',
    textSecondary: '#6c757d',
    primary: '#007bff',
    error: '#dc3545',
    border: '#e9ecef'
  };
  
  const darkTheme = {
    background: '#1a1a1a',
    card: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#adb5bd',
    primary: '#0d6efd',
    error: '#dc3545',
    border: '#495057'
  };
  
  return {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
    toggleTheme: () => setIsDark(!isDark)
  };
};

const SettingsScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  // State for settings switches
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [dataBackupEnabled, setDataBackupEnabled] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  
  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      alert("Logout functionality would be implemented here");
    }
  };
  
  // Setting section component
  const SettingSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 
        className="text-base font-semibold mb-2 ml-1"
        style={{ color: theme.text }}
      >
        {title}
      </h3>
      <div 
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: theme.card }}
      >
        {children}
      </div>
    </div>
  );
  
  // Setting item component with switch
  const SwitchItem = ({ 
    title, 
    description, 
    value, 
    onValueChange, 
    Icon
  }) => (
    <div 
      className="flex items-center py-3 px-4 border-b last:border-b-0"
      style={{ borderColor: theme.border }}
    >
      <div className="mr-4">
        <Icon size={24} color={theme.primary} />
      </div>
      <div className="flex-1">
        <div 
          className="text-base font-medium"
          style={{ color: theme.text }}
        >
          {title}
        </div>
        {description && (
          <div 
            className="text-sm mt-0.5"
            style={{ color: theme.textSecondary }}
          >
            {description}
          </div>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={(e) => onValueChange(e.target.checked)}
        />
        <div 
          className="w-11 h-6 rounded-full peer transition-colors duration-200 ease-in-out peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
          style={{ 
            backgroundColor: value ? theme.primary : theme.border 
          }}
        />
      </label>
    </div>
  );
  
  // Navigation item component
  const NavigationItem = ({ 
    title, 
    Icon, 
    onPress 
  }) => (
    <button 
      className="w-full flex items-center py-3 px-4 border-b last:border-b-0 hover:opacity-70 transition-opacity"
      style={{ borderColor: theme.border }}
      onClick={onPress}
    >
      <div className="mr-4">
        <Icon size={24} color={theme.primary} />
      </div>
      <div className="flex-1 text-left">
        <div 
          className="text-base font-medium"
          style={{ color: theme.text }}
        >
          {title}
        </div>
      </div>
      <ChevronRight size={20} color={theme.textSecondary} />
    </button>
  );

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-2xl mx-auto p-4">
        <SettingSection title="Appearance">
          <SwitchItem
            title="Dark Mode"
            description="Switch between light and dark theme"
            value={isDark}
            onValueChange={toggleTheme}
            Icon={Moon}
          />
        </SettingSection>
        
        <SettingSection title="Notifications">
          <SwitchItem
            title="Enable Notifications"
            description="Receive important updates and reminders"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            Icon={Bell}
          />
          
          <SwitchItem
            title="Health Reminders"
            description="Get reminders for period tracking, medications, etc."
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
            Icon={AlarmClock}
          />
        </SettingSection>
        
        <SettingSection title="Privacy & Security">
          <SwitchItem
            title="Location Services"
            description="Allow app to use your location for nearby services"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            Icon={MapPin}
          />
          
          <SwitchItem
            title="Biometric Authentication"
            description="Use fingerprint or face ID to secure your data"
            value={biometricsEnabled}
            onValueChange={setBiometricsEnabled}
            Icon={Fingerprint}
          />

          <SwitchItem
            title="Data Backup"
            description="Automatically backup your data to the cloud"
            value={dataBackupEnabled}
            onValueChange={setDataBackupEnabled}
            Icon={CloudUpload}
          />
          
          <NavigationItem
            title="Data Sharing Preferences"
            Icon={ShieldCheck}
            onPress={() => alert("Data Sharing Preferences")}
          />
        </SettingSection>
        
        <SettingSection title="App Settings">
          <NavigationItem
            title="Language"
            Icon={Globe}
            onPress={() => alert("Language Settings")}
          />
          
          <NavigationItem
            title="Measurement Units"
            Icon={Settings}
            onPress={() => alert("Measurement Units Settings")}
          />
          
          <SwitchItem
            title="Analytics"
            description="Help us improve by sending anonymous usage data"
            value={analyticsEnabled}
            onValueChange={setAnalyticsEnabled}
            Icon={BarChart3}
          />
        </SettingSection>
        
        <SettingSection title="Support">
          <NavigationItem
            title="Help Center"
            Icon={HelpCircle}
            onPress={() => alert("Help Center")}
          />
          
          <NavigationItem
            title="Report a Problem"
            Icon={AlertTriangle}
            onPress={() => alert("Report a Problem")}
          />
          
          <NavigationItem
            title="Privacy Policy"
            Icon={FileText}
            onPress={() => alert("Privacy Policy")}
          />
          
          <NavigationItem
            title="Terms of Service"
            Icon={File}
            onPress={() => alert("Terms of Service")}
          />
        </SettingSection>
        
        <button 
          className="w-full flex items-center justify-center my-6 py-3 border rounded-lg hover:opacity-70 transition-opacity"
          style={{ borderColor: theme.error }}
          onClick={handleLogout}
        >
          <LogOut size={20} color={theme.error} />
          <span 
            className="text-base font-semibold ml-2"
            style={{ color: theme.error }}
          >
            Log Out
          </span>
        </button>
        
        <div 
          className="text-center text-sm mb-5"
          style={{ color: theme.textSecondary }}
        >
          Version 1.0.0
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;