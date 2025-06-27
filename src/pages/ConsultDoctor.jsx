// import React, { useState } from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { IoVideocamOutline, IoLocationOutline } from 'react-icons/io5';
// import Layout from '../components/Layout.jsx';
// import { useTheme } from '../context/ThemeContext.jsx';
// import Card from '../components/Card';
// import Button from '../components/Button';

// const doctorsMock = [
// 	{
// 		id: '1',
// 		name: 'Dr. Sarah Johnson',
// 		specialty: 'Gynecologist',
// 		hospital: "Women's Health Center",
// 		rating: 4.8,
// 		reviewCount: 125,
// 		availableDates: ['2025-06-28', '2025-06-29', '2025-07-01'],
// 	},
// 	{
// 		id: '2',
// 		name: 'Dr. Michael Chen',
// 		specialty: 'Obstetrician',
// 		hospital: 'City Medical Center',
// 		rating: 4.7,
// 		reviewCount: 98,
// 		availableDates: ['2025-06-27', '2025-06-30', '2025-07-02'],
// 	},
// 	{
// 		id: '3',
// 		name: 'Dr. Emily Rodriguez',
// 		specialty: 'Endocrinologist',
// 		hospital: 'Metropolitan Hospital',
// 		rating: 4.9,
// 		reviewCount: 157,
// 		availableDates: ['2025-06-25', '2025-06-26', '2025-07-03'],
// 	},
// 	{
// 		id: '4',
// 		name: 'Dr. James Wilson',
// 		specialty: 'Breast Surgeon',
// 		hospital: 'Oncology Institute',
// 		rating: 4.6,
// 		reviewCount: 112,
// 		availableDates: ['2025-06-29', '2025-07-01', '2025-07-04'],
// 	},
// ];

// const ConsultDoctorScreen = () => {
// 	const { theme } = useTheme();
// 	const [searchQuery, setSearchQuery] = useState('');
// 	const [selectedDoctor, setSelectedDoctor] = useState(null);
// 	const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
// 	const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('');
// 	const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
// 	const [isVirtual, setIsVirtual] = useState(false);
// 	const [appointments, setAppointments] = useState([
// 		{
// 			id: '1',
// 			doctorId: '1',
// 			date: '2025-06-30',
// 			time: '10:00 AM',
// 			status: 'scheduled',
// 			notes: 'Annual checkup',
// 			virtual: false,
// 		},
// 	]);
// 	const [rescheduleId, setRescheduleId] = useState(null);

// 	const filteredDoctors = doctorsMock.filter(
// 		(doctor) =>
// 			doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// 			doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
// 			doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
// 	);

// 	const formatDate = (dateString) => {
// 		const options = { year: 'numeric', month: 'long', day: 'numeric' };
// 		return new Date(dateString).toLocaleDateString('en-US', options);
// 	};

// 	// Find all upcoming appointments (sorted by date)
// 	const upcomingAppointments = appointments
// 		.filter((a) => new Date(a.date) >= new Date())
// 		.sort((a, b) => new Date(a.date) - new Date(b.date));

// 	// Reschedule logic
// 	const handleReschedule = (appointment) => {
// 		setRescheduleId(appointment.id);
// 		setSelectedDoctor(doctorsMock.find((d) => d.id === appointment.doctorId));
// 		setIsBookingModalVisible(true);
// 		setSelectedAppointmentDate(appointment.date);
// 		setSelectedAppointmentTime(appointment.time);
// 		setIsVirtual(appointment.virtual);
// 	};

// 	const handleBook = () => {
// 		if (!selectedAppointmentDate || !selectedAppointmentTime) {
// 			alert('Select date and time');
// 			return;
// 		}
// 		if (rescheduleId) {
// 			setAppointments(
// 				appointments.map((a) =>
// 					a.id === rescheduleId
// 						? {
// 								...a,
// 								date: selectedAppointmentDate,
// 								time: selectedAppointmentTime,
// 								virtual: isVirtual,
// 						  }
// 						: a
// 				)
// 			);
// 			setRescheduleId(null);
// 		} else {
// 			setAppointments([
// 				...appointments,
// 				{
// 					id: `${Date.now()}`,
// 					doctorId: selectedDoctor.id,
// 					date: selectedAppointmentDate,
// 					time: selectedAppointmentTime,
// 					status: 'scheduled',
// 					notes: '',
// 					virtual: isVirtual,
// 				},
// 			]);
// 		}
// 		alert(
// 			`Appointment with ${selectedDoctor.name} booked for ${selectedAppointmentDate} at ${selectedAppointmentTime}`
// 		);
// 		setIsBookingModalVisible(false);
// 		setSelectedAppointmentDate('');
// 		setSelectedAppointmentTime('');
// 		setIsVirtual(false);
// 	};

// 	return (
// 		<Layout>
// 			<div
// 				className="min-h-screen px-4 py-6 flex flex-col items-center"
// 				style={{ backgroundColor: theme.background, color: theme.text }}
// 			>
// 				<div className="w-full max-w-6xl mx-auto"> {/* Broader layout for consistency */}
// 					{/* Search at Top */}
// 					<div
// 						className="flex items-center border rounded-lg px-3 py-2 mb-6"
// 						style={{ borderColor: theme.border, background: theme.surface }}
// 					>
// 						<AiOutlineSearch className="text-xl mr-2" style={{ color: theme.textSecondary }} />
// 						<input
// 							type="text"
// 							placeholder="Search doctors..."
// 							className="w-full bg-transparent outline-none"
// 							style={{ color: theme.text, background: 'transparent' }}
// 							value={searchQuery}
// 							onChange={(e) => setSearchQuery(e.target.value)}
// 						/>
// 					</div>

// 					{/* Upcoming Appointments as Small Cards */}
// 					{upcomingAppointments.length > 0 && (
// 						<div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
// 							{upcomingAppointments.map((appt) => {
// 								const doc = doctorsMock.find((d) => d.id === appt.doctorId);
// 								return (
// 									<Card key={appt.id} style={{ background: theme.card, borderColor: theme.border, padding: 16 }}>
// 										<div className="flex flex-col gap-1">
// 											<div className="flex justify-between items-center">
// 												<div>
// 													<h4 className="font-semibold text-base" style={{ color: theme.text }}>{doc.name}</h4>
// 													<p className="text-xs" style={{ color: theme.textSecondary }}>{doc.specialty} • {doc.hospital}</p>
// 												</div>
// 												<span className="text-xs px-2 py-1 rounded-full" style={{ background: theme.surface, color: theme.primary }}>
// 													{appt.virtual ? 'Virtual' : 'In-person'}
// 												</span>
// 											</div>
// 											<div className="flex items-center gap-2 mt-1">
// 												<span className="text-sm" style={{ color: theme.primary }}>{formatDate(appt.date)}</span>
// 												<span className="text-sm" style={{ color: theme.textSecondary }}>{appt.time}</span>
// 											</div>
// 											{appt.notes && <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>Notes: {appt.notes}</p>}
// 											<div className="flex justify-end mt-2">
// 												<Button
// 													title="Reschedule"
// 													onPress={() => handleReschedule(appt)}
// 													type="outline"
// 													style={{ minWidth: 100 }}
// 												/>
// 											</div>
// 										</div>
// 									</Card>
// 								);
// 							})}
// 						</div>
// 					)}

// 					{/* Doctor Cards */}
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 						{filteredDoctors.map((doctor) => (
// 							<Card
// 								key={doctor.id}
// 								style={{ background: theme.card, borderColor: theme.border }}
// 							>
// 								<div className="flex justify-between items-start">
// 									<div>
// 										<h3 className="text-lg font-semibold" style={{ color: theme.text }}>{doctor.name}</h3>
// 										<p className="text-sm" style={{ color: theme.textSecondary }}>{doctor.specialty}</p>
// 										<p className="text-sm" style={{ color: theme.textSecondary }}>{doctor.hospital}</p>
// 										<p className="text-sm font-semibold" style={{ color: theme.primary }}>
// 											★ {doctor.rating}{' '}
// 											<span style={{ color: theme.textSecondary }}>
// 												({doctor.reviewCount} reviews)
// 											</span>
// 										</p>
// 									</div>
// 									<button
// 										onClick={() => {
// 											setSelectedDoctor(doctor);
// 											setIsBookingModalVisible(true);
// 										}}
// 										className="px-4 py-2 rounded-full text-sm font-semibold"
// 										style={{ background: theme.primary, color: theme.text, border: 'none' }}
// 									>
// 										Book
// 									</button>
// 								</div>
// 							</Card>
// 						))}
// 					</div>

// 					{/* Booking Modal */}
// 					{isBookingModalVisible && selectedDoctor && (
// 						<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
// 							<div
// 								className="rounded-lg w-[90%] md:w-[500px] p-6"
// 								style={{ background: theme.card, color: theme.text }}
// 							>
// 								<h2 className="text-xl font-bold mb-4">
// 									{rescheduleId ? 'Reschedule Appointment' : 'Book an Appointment'}
// 								</h2>
// 								<p className="font-medium mb-1">{selectedDoctor.name}</p>
// 								<p
// 									className="text-sm mb-4"
// 									style={{ color: theme.textSecondary }}
// 								>
// 									{selectedDoctor.specialty} • {selectedDoctor.hospital}
// 								</p>

// 								{/* Select Date */}
// 								<p className="mb-2 font-semibold">Select Date</p>
// 								<div className="flex flex-wrap gap-2 mb-4">
// 									{selectedDoctor.availableDates.map((date) => (
// 										<button
// 											key={date}
// 											className={`px-4 py-2 border rounded-full`}
// 											style={{
// 												background:
// 													selectedAppointmentDate === date
// 														? theme.primary
// 														: theme.surface,
// 												color:
// 													selectedAppointmentDate === date
// 														? theme.text
// 														: theme.text,
// 												borderColor: theme.border,
// 											}}
// 											onClick={() => setSelectedAppointmentDate(date)}
// 										>
// 											{new Date(date).toDateString().slice(4, 10)}
// 										</button>
// 									))}
// 								</div>

// 								{/* Select Time */}
// 								<p className="mb-2 font-semibold">Select Time</p>
// 								<div className="grid grid-cols-3 gap-2 mb-4">
// 									{['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'].map(
// 										(time) => (
// 											<button
// 												key={time}
// 												className={`px-3 py-2 border rounded`}
// 												style={{
// 													background:
// 														selectedAppointmentTime === time
// 															? theme.primary
// 															: theme.surface,
// 													color:
// 														selectedAppointmentTime === time
// 															? theme.text
// 															: theme.text,
// 													borderColor: theme.border,
// 												}}
// 												onClick={() => setSelectedAppointmentTime(time)}
// 											>
// 												{time}
// 											</button>
// 										)
// 									)}
// 								</div>

// 								{/* Consultation Type */}
// 								<p className="mb-2 font-semibold">Consultation Type</p>
// 								<div className="flex gap-4 mb-6">
// 									<button
// 										className={`flex items-center gap-2 px-4 py-2 border rounded`}
// 										style={{
// 											background: !isVirtual ? theme.primary : theme.surface,
// 											color: !isVirtual ? theme.text : theme.text,
// 											borderColor: theme.border,
// 										}}
// 										onClick={() => setIsVirtual(false)}
// 									>
// 										<IoLocationOutline /> In-person
// 									</button>
// 									<button
// 										className={`flex items-center gap-2 px-4 py-2 border rounded`}
// 										style={{
// 											background: isVirtual ? theme.primary : theme.surface,
// 											color: isVirtual ? theme.text : theme.text,
// 											borderColor: theme.border,
// 										}}
// 										onClick={() => setIsVirtual(true)}
// 									>
// 										<IoVideocamOutline /> Virtual
// 									</button>
// 								</div>

// 								{/* Action Buttons */}
// 								<div className="flex justify-end gap-4">
// 									<button
// 										onClick={() => {
// 											setIsBookingModalVisible(false);
// 											setRescheduleId(null);
// 										}}
// 										className="px-4 py-2 border rounded"
// 										style={{
// 											background: theme.surface,
// 											color: theme.text,
// 											borderColor: theme.border,
// 										}}
// 									>
// 										Cancel
// 									</button>
// 									<button
// 										onClick={handleBook}
// 										className="px-4 py-2 rounded"
// 										style={{
// 											background: theme.primary,
// 											color: theme.text,
// 											border: 'none',
// 										}}
// 									>
// 										{rescheduleId ? 'Save Changes' : 'Book Appointment'}
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</Layout>
// 	);
// };

// export default ConsultDoctorScreen;


import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { MapPin, Phone, Clock, Star, Navigation } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { featureType: "all", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
    { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
    { featureType: "all", elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f0f0f" }] },
  ],
};

const ConsultDoctor = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCaffkrUBk4OEsmAYqGcF48LYdau-uC32E", // Replace with your Google Maps API key
    libraries: ["places"],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      (error) => {
        console.error("Location error:", error);
        setUserLocation({ lat: 40.7128, lng: -74.006 });
        setLocationError(true);
        setLoading(false);
      }
    );
  }, []);

  const toggleMapSize = () => setIsMapExpanded((prev) => !prev);

  // Enhanced function to extract medical specialties from Google Place types and name
  const extractSpecialties = (name, types) => {
    const specialtyKeywords = {
      'Cardiology': ['cardio', 'heart', 'cardiac', 'cardiovascular'],
      'Dermatology': ['dermat', 'skin', 'cosmet', 'beauty', 'laser'],
      'Gynecology': ['gynec', 'women', 'maternity', 'obstetric', 'pregnancy'],
      'Orthopedics': ['ortho', 'bone', 'joint', 'fracture', 'spine', 'sports'],
      'Pediatrics': ['child', 'pediatric', 'kids', 'baby', 'infant'],
      'Neurology': ['neuro', 'brain', 'nerve', 'stroke', 'epilepsy'],
      'ENT': ['ent', 'ear', 'nose', 'throat', 'hearing', 'sinus'],
      'Dentistry': ['dental', 'tooth', 'dentist', 'teeth', 'oral'],
      'General Medicine': ['general', 'family', 'primary', 'physician', 'clinic'],
      'Ophthalmology': ['eye', 'vision', 'ophthal', 'retina', 'cataract'],
      'Urology': ['urology', 'kidney', 'urinary', 'prostate'],
      'Psychiatry': ['mental', 'psychiatric', 'psychology', 'counseling'],
      'Haematology': ['haematol', 'blood', 'hematol', 'anemia'],
      'Neonatal': ['neonatal', 'newborn', 'infant', 'premature'],
      'Radiology': ['radio', 'scan', 'imaging', 'xray', 'mri', 'ct'],
      'Oncology': ['cancer', 'oncol', 'tumor', 'chemotherapy', 'radiation'],
      'Endocrinology': ['diabetes', 'thyroid', 'hormone', 'endocrin'],
      'Gastroenterology': ['gastro', 'stomach', 'liver', 'digestive', 'colon'],
      'Pulmonology': ['lung', 'respiratory', 'asthma', 'pulmon', 'chest'],
      'Rheumatology': ['arthritis', 'joint pain', 'rheumat', 'autoimmune'],
      'Nephrology': ['kidney', 'dialysis', 'nephro', 'renal'],
      'Anesthesiology': ['anesthesia', 'pain management', 'surgery'],
      'Emergency Medicine': ['emergency', 'urgent', 'trauma', 'critical'],
      'Pathology': ['pathology', 'lab', 'biopsy', 'diagnosis'],
      'Physiotherapy': ['physio', 'therapy', 'rehabilitation', 'massage']
    };

    // Google Place types mapping to medical specialties
    const googleTypesToSpecialties = {
      'hospital': ['General Medicine', 'Emergency Medicine'],
      'doctor': ['General Medicine'],
      'dentist': ['Dentistry'],
      'physiotherapist': ['Physiotherapy'],
      'health': ['General Medicine'],
      'establishment': [], // Will rely on name parsing
      'point_of_interest': [] // Will rely on name parsing
    };

    const lowerName = name.toLowerCase();
    const foundSpecialties = new Set();

    // First, check Google Place types
    if (types && Array.isArray(types)) {
      types.forEach(type => {
        const lowerType = type.toLowerCase();
        if (googleTypesToSpecialties[lowerType]) {
          googleTypesToSpecialties[lowerType].forEach(specialty => 
            foundSpecialties.add(specialty)
          );
        }
      });
    }

    // Then, parse the name for specialty keywords
    for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
      if (keywords.some(keyword => lowerName.includes(keyword))) {
        foundSpecialties.add(specialty);
      }
    }

    // Convert Set to Array
    const specialtiesArray = Array.from(foundSpecialties);

    // If no specialties found, determine based on place types
    if (specialtiesArray.length === 0) {
      if (types && types.includes('hospital')) {
        return ['Multi-specialty Hospital'];
      } else if (types && types.includes('doctor')) {
        return ['General Medicine'];
      } else if (types && types.includes('dentist')) {
        return ['Dentistry'];
      } else {
        return ['Medical Center'];
      }
    }

    return specialtiesArray;
  };

  // Enhanced function to get opening hours text with 24/7 detection
  const getOpeningHoursText = (openingHours) => {
    if (!openingHours) return 'Hours not available';
    
    // Check if the place is open 24/7
    if (openingHours.periods && openingHours.periods.length === 1) {
      const period = openingHours.periods[0];
      // If there's an open time but no close time, it's likely 24/7
      if (period.open && !period.close) {
        return 'Open 24/7';
      }
      // If open time is 0000 and close time is 2359 or similar, it's 24/7
      if (period.open && period.close && 
          period.open.time === '0000' && 
          (period.close.time === '2359' || period.close.time === '0000')) {
        return 'Open 24/7';
      }
    }

    // Check weekday text for 24/7 indicators
    if (openingHours.weekday_text && openingHours.weekday_text.length > 0) {
      const hasAllDays24Hours = openingHours.weekday_text.every(dayText => 
        dayText.toLowerCase().includes('24 hours') || 
        dayText.toLowerCase().includes('open 24 hours') ||
        dayText.toLowerCase().includes('24/7')
      );
      
      if (hasAllDays24Hours) {
        return 'Open 24/7';
      }
    }
    
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentTime = now.getHours() * 100 + now.getMinutes(); // Convert to HHMM format
    
    if (openingHours.periods && openingHours.periods.length > 0) {
      // Find today's opening hours
      const todayPeriods = openingHours.periods.filter(period => period.open.day === currentDay);
      
      if (todayPeriods.length > 0) {
        const todayPeriod = todayPeriods[0];
        const openTime = parseInt(todayPeriod.open.time);
        const closeTime = todayPeriod.close ? parseInt(todayPeriod.close.time) : 2359;
        
        const isOpen = currentTime >= openTime && currentTime <= closeTime;
        
        // Format time display
        const formatTime = (time) => {
          const hours = Math.floor(time / 100);
          const minutes = time % 100;
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
          return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        };
        
        const openTimeStr = formatTime(openTime);
        const closeTimeStr = formatTime(closeTime);
        
        return isOpen 
          ? `Open now • ${openTimeStr} - ${closeTimeStr}`
          : `Closed • Opens at ${openTimeStr}`;
      }
    }
    
    // Fallback to weekday_text if periods not available
    if (openingHours.weekday_text && openingHours.weekday_text.length > 0) {
      const todayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert Sunday=0 to index 6
      const todayHours = openingHours.weekday_text[todayIndex] || openingHours.weekday_text[0];
      
      // Check if it mentions 24 hours
      if (todayHours.toLowerCase().includes('24 hours') || 
          todayHours.toLowerCase().includes('24/7')) {
        return 'Open 24/7';
      }
      
      if (openingHours.isOpen && typeof openingHours.isOpen === 'function') {
        const isCurrentlyOpen = openingHours.isOpen();
        return isCurrentlyOpen 
          ? `Open now • ${todayHours.split(': ')[1] || 'See hours'}`
          : `Closed • ${todayHours.split(': ')[1] || 'See hours'}`;
      }
    }
    
    return 'Hours not available';
  };

  const getPlaceDetails = useCallback((placeId, service) => {
    return new Promise((resolve) => {
      service.getDetails(
        {
          placeId,
          fields: [
            "name",
            "formatted_phone_number",
            "opening_hours",
            "website",
            "reviews",
            "rating",
            "user_ratings_total",
            "vicinity",
            "geometry",
            "types",
          ],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // Add specialties to the place object, keep original name
            const enhancedPlace = {
              ...place,
              specialties: extractSpecialties(place.name, place.types)
            };
            resolve(enhancedPlace);
          } else {
            resolve(null);
          }
        }
      );
    });
  }, []);

  const onMapLoad = useCallback(async (map) => {
    if (!userLocation) return;

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: userLocation,
      radius: 5000,
      keyword: "doctor clinic hospital medical",
    };

    service.nearbySearch(request, async (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const detailedPlaces = await Promise.all(
          results.map(async (place) => {
            const details = await getPlaceDetails(place.place_id, service);
            return details ? { ...place, ...details } : null;
          })
        );
        setPlaces(detailedPlaces.filter(Boolean));
      }
    });
  }, [userLocation, getPlaceDetails]);

  const normalize = (text) => text?.toLowerCase() || "";

  const isSpecialty = (term) => {
    const knownSpecialties = [
      "cardiology", "cardiac", "heart",
      "dermatology", "skin", "dermat",
      "gynecology", "gynecologist", "women", "maternity",
      "pediatrics", "child", "kids",
      "neurology", "brain", "neuro",
      "orthopedics", "bone", "ortho",
      "general medicine", "medicine", "general",
      "radiology", "scan", "imaging",
      "psychiatry", "mental", "psychology",
      "urology", "kidney",
      "dentistry", "dental", "teeth", "tooth",
      "ent", "ear", "nose", "throat",
      "ophthalmology", "eye", "vision",
      "multi-specialty", "hospital",
      "haematology", "blood",
      "neonatal", "newborn",
      "oncology", "cancer",
      "endocrinology", "diabetes", "thyroid",
      "gastroenterology", "stomach", "digestive",
      "pulmonology", "lung", "respiratory",
      "rheumatology", "arthritis",
      "nephrology", "dialysis",
      "anesthesiology", "pain management",
      "emergency", "urgent",
      "pathology", "lab",
      "physiotherapy", "physio", "therapy"
    ];
    const normalizedTerm = normalize(term);
    return knownSpecialties.some(specialty => 
      normalizedTerm.includes(specialty) || specialty.includes(normalizedTerm)
    );
  };

  // Smart search function for clinic names (global search)
  const searchClinicByName = useCallback(async (searchName) => {
    if (!mapRef) return [];
    
    const service = new window.google.maps.places.PlacesService(mapRef);
    
    return new Promise((resolve) => {
      const request = {
        query: searchName + " clinic hospital doctor medical",
        fields: [
          "name",
          "formatted_phone_number", 
          "opening_hours",
          "website",
          "reviews",
          "rating",
          "user_ratings_total",
          "vicinity",
          "geometry",
          "types",
          "place_id"
        ]
      };
      
      service.textSearch(request, async (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const detailedPlaces = await Promise.all(
            results.slice(0, 10).map(async (place) => {
              const details = await getPlaceDetails(place.place_id, service);
              return details ? { ...place, ...details } : null;
            })
          );
          resolve(detailedPlaces.filter(Boolean));
        } else {
          resolve([]);
        }
      });
    });
  }, [mapRef, getPlaceDetails]);

  const [globalSearchResults, setGlobalSearchResults] = useState([]);

  // Enhanced filtering logic that properly matches specialties
  const filteredPlaces = searchTerm.trim()
    ? isSpecialty(searchTerm)
      ? places.filter((place) => {
          const searchTermLower = normalize(searchTerm);
          return place.specialties?.some((specialty) => 
            normalize(specialty).includes(searchTermLower) ||
            searchTermLower.includes(normalize(specialty))
          ) || normalize(place.name).includes(searchTermLower);
        })
      : globalSearchResults.length > 0 ? globalSearchResults : places.filter((place) => 
          normalize(place.name).includes(normalize(searchTerm))
        )
    : places;

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim() && !isSpecialty(searchTerm)) {
        const results = await searchClinicByName(searchTerm);
        setGlobalSearchResults(results);
      } else {
        setGlobalSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchClinicByName]);

  const handleBookAppointment = (place) => {
    alert(`Booking appointment at ${place.name}`);
  };

  if (loadError)
    return <div className="text-center p-6 text-red-500">Map failed to load.</div>;

  if (!isLoaded || loading)
    return <div className="text-center p-6 text-white">Loading nearby clinics...</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold mb-4">Find Doctors Near You</h1>
        <input
          type="text"
          placeholder="Search specialties or clinic names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
        />
        {locationError && (
          <p className="text-yellow-400 mt-2">Location access disabled. Using fallback.</p>
        )}
      </div>

      <div className="p-6">
        <div className={`relative rounded-xl overflow-hidden border border-gray-800 ${isMapExpanded ? "h-[600px]" : "h-[350px]"}`}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={userLocation}
            options={options}
            onLoad={(map) => {
              setMapRef(map);
              onMapLoad(map);
            }}
          >
            {userLocation && (
              <Marker position={userLocation} />
            )}

            {filteredPlaces.map((place, i) => (
              <Marker
                key={place.place_id || i}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                onClick={() => setSelectedPlace(place)}
              />
            ))}

            {selectedPlace && (
              <InfoWindow
                position={{
                  lat: selectedPlace.geometry.location.lat(),
                  lng: selectedPlace.geometry.location.lng(),
                }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div className="text-black">
                  <strong className="text-pink-600">{selectedPlace.name}</strong>
                  <p className="text-sm text-gray-600">{selectedPlace.specialties?.join(", ")}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          <button
            onClick={toggleMapSize}
            className="absolute top-4 right-4 px-3 py-1 bg-pink-600 text-white text-sm rounded-full"
          >
            {isMapExpanded ? "Collapse Map" : "Choose on Map"}
          </button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold mb-4">
          {searchTerm ? `Results for "${searchTerm}"` : "Nearby Clinics"} ({filteredPlaces.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredPlaces.map((place, index) => (
            <div
              key={place.place_id || index}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow hover:border-gray-700"
            >
              <h3 className="text-pink-500 text-lg font-bold mb-1">
                {place.name}
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                {place.specialties?.join(", ") || "Medical Center"}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{place.vicinity}</span>
              </div>
              {place.formatted_phone_number && (
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{place.formatted_phone_number}</span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {getOpeningHoursText(place.opening_hours)}
                </span>
              </div>
              {place.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{place.rating}</span>
                  <span className="text-gray-400 text-sm">
                    ({place.user_ratings_total || 0} reviews)
                  </span>
                </div>
              )}
              <button
                onClick={() => handleBookAppointment(place)}
                className="mt-3 w-full px-4 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultDoctor;