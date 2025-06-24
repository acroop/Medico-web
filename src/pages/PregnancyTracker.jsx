import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Leaf, Activity, BarChart3, Info, Heart, Plus, CheckCircle, Fish, Utensils } from 'lucide-react';

// Mock data - would come from a database or API in a real app
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
      notes: 'Bring previous ultrasound report' 
    },
    { 
      id: '2', 
      date: '2025-08-05', 
      time: '11:30 AM', 
      doctorName: 'Dr. Emily Carter',
      purpose: 'Anomaly Scan',
      notes: '' 
    },
  ],
  symptoms: [
    { id: '1', date: '2025-06-22', symptoms: ['Nausea', 'Fatigue'], intensityLevel: 6, notes: 'Feeling better in the afternoon' },
    { id: '2', date: '2025-06-20', symptoms: ['Backache', 'Food Cravings'], intensityLevel: 4, notes: 'Craving ice cream' },
    { id: '3', date: '2025-06-18', symptoms: ['Nausea', 'Headache'], intensityLevel: 7, notes: '' },
  ]
};

// Mock weight tracking data - would be pulled from database in real app
const weightData = [
  { week: 'Week 8', weight: 60.5 },
  { week: 'Week 10', weight: 61.2 },
  { week: 'Week 12', weight: 62.0 },
  { week: 'Week 14', weight: 63.1 },
  { week: 'Week 16', weight: 63.9 },
];

// Card component
const Card = ({ children, title, icon: Icon, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="w-5 h-5 text-pink-500" />}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

// Button component
const Button = ({ children, onClick, variant = "primary", size = "medium", className = "" }) => {
  const baseClasses = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-pink-500 hover:bg-pink-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    outline: "border border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10",
    text: "text-pink-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-500/10"
  };
  
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base"
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const PregnancyTrackerScreen = () => {
  const [pregnancyData, setPregnancyData] = useState(mockPregnancyData);
  
  // Calculate days until due date
  const dueDate = new Date(pregnancyData.dueDate || '');
  const today = new Date();
  const daysUntilDueDate = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate total pregnancy timeline
  const totalWeeks = 40;
  const progressPercentage = (pregnancyData.weeksPregnant || 0) / totalWeeks * 100;
  
  // Get next appointment
  const upcomingAppointments = pregnancyData.appointments?.filter(
    appointment => new Date(appointment.date) >= today
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const nextAppointment = upcomingAppointments && upcomingAppointments.length > 0 
    ? upcomingAppointments[0] 
    : null;

  // Trimester calculation
  let currentTrimester = 1;
  if ((pregnancyData.weeksPregnant || 0) > 13) currentTrimester = 2;
  if ((pregnancyData.weeksPregnant || 0) > 26) currentTrimester = 3;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4 pb-20">
        {pregnancyData.isPregnant ? (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Pregnancy Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Week {pregnancyData.weeksPregnant} • {daysUntilDueDate} days to go
              </p>
            </div>

            <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-pink-600 dark:text-pink-400 text-sm">
                    Baby is the size of an
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white my-1">
                    {pregnancyData.babySize}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Due on {new Date(pregnancyData.dueDate || '').toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                <div className="bg-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  Trimester {currentTrimester}
                </div>
              </div>
              
              <div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-right text-xs text-gray-600 dark:text-gray-400">
                  {pregnancyData.weeksPregnant} of 40 weeks
                </p>
              </div>
            </Card>
            
            {nextAppointment && (
              <Card title="Next Appointment" icon={Calendar}>
                <div className="space-y-2 mb-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {new Date(nextAppointment.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric'
                    })} at {nextAppointment.time}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {nextAppointment.doctorName}
                  </p>
                  <p className="text-pink-600 dark:text-pink-400 font-medium">
                    {nextAppointment.purpose}
                  </p>
                  {nextAppointment.notes && (
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      Note: {nextAppointment.notes}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="small" className="flex-1">
                    Reschedule
                  </Button>
                  <Button size="small" className="flex-1">
                    View Details
                  </Button>
                </div>
              </Card>
            )}
            
            <Card title="Weekly Development" icon={Leaf}>
              <h4 className="text-pink-600 dark:text-pink-400 font-semibold mb-4">
                Week {pregnancyData.weeksPregnant}: Key Developments
              </h4>
              
              <div className="space-y-3 mb-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed">
                    Baby's eyes can now sense light, even though the eyelids are still closed.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed">
                    The baby can now make sucking movements with their mouth.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed">
                    Your baby is now about 4.5 inches long and weighs about 3.5 ounces.
                  </p>
                </div>
              </div>
              
              <Button variant="text" size="small">
                Learn More
              </Button>
            </Card>
            
            <Card title="Weight Tracking" icon={BarChart3}>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis 
                      dataKey="week" 
                      className="text-gray-600 dark:text-gray-400"
                      fontSize={12}
                    />
                    <YAxis 
                      className="text-gray-600 dark:text-gray-400"
                      fontSize={12}
                      label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgb(255 255 255)',
                        border: '1px solid rgb(229 231 235)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <Button variant="secondary">
                Log Weight
              </Button>
            </Card>
            
            <Card title="Recent Symptoms" icon={Activity}>
              {pregnancyData.symptoms && pregnancyData.symptoms.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {pregnancyData.symptoms.slice(0, 3).map((symptom) => (
                    <div 
                      key={symptom.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(symptom.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                            symptom.intensityLevel >= 7 ? 'bg-red-500' : 
                            symptom.intensityLevel >= 4 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                        >
                          Level {symptom.intensityLevel}/10
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {symptom.symptoms.map((s, index) => (
                          <span key={index} className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full text-xs font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                      
                      {symptom.notes && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                          {symptom.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  No symptoms logged yet
                </p>
              )}
              
              <Button>
                Log Symptoms
              </Button>
            </Card>
            
            <Card title="Pregnancy Nutrition" icon={Utensils}>
              <p className="text-gray-900 dark:text-white mb-6">
                Focus on these key nutrients for a healthy pregnancy:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-9 h-9 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                      Folic Acid
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Important for preventing neural tube defects. Found in leafy greens, fortified cereals, and beans.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-9 h-9 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Fish className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                      Omega-3 Fatty Acids
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Essential for baby's brain development. Found in fatty fish, walnuts, and flaxseeds.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-9 h-9 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Utensils className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                      Iron
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Prevents anemia and supports baby's oxygen supply. Found in lean meats, beans, and fortified cereals.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Pregnancy Tracker
              </h1>
            </div>
            
            <Card>
              <div className="text-center py-12">
                <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Track Your Pregnancy Journey
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                  Document your pregnancy milestones, monitor baby's development, and keep track of your appointments.
                </p>
                <Button 
                  onClick={() => setPregnancyData({...mockPregnancyData, isPregnant: true})}
                  size="large"
                >
                  Start Pregnancy Tracker
                </Button>
              </div>
            </Card>
            
            <Card title="Planning for Pregnancy?" icon={Info}>
              <p className="text-gray-900 dark:text-white mb-6">
                If you're planning to conceive, here are some recommended steps:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <Calendar className="w-6 h-6 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-900 dark:text-white">
                    Track your ovulation using the Period Tracker feature
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Activity className="w-6 h-6 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-900 dark:text-white">
                    Schedule a pre-conception checkup with your doctor
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Utensils className="w-6 h-6 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-900 dark:text-white">
                    Start taking prenatal vitamins, especially folic acid
                  </p>
                </div>
              </div>
              
              <Button variant="outline">
                Learn More About Fertility
              </Button>
            </Card>
          </div>
        )}
      </div>
      
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
        <Plus className="w-6 h-6 mx-auto" />
      </button>
    </div>
  );
};

export default PregnancyTrackerScreen;