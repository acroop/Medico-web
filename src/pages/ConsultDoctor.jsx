import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoVideocamOutline, IoLocationOutline } from 'react-icons/io5';
import Layout from '../components/Layout.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Card from '../components/Card';
import Button from '../components/Button';

const doctorsMock = [
	{
		id: '1',
		name: 'Dr. Sarah Johnson',
		specialty: 'Gynecologist',
		hospital: "Women's Health Center",
		rating: 4.8,
		reviewCount: 125,
		availableDates: ['2025-06-28', '2025-06-29', '2025-07-01'],
	},
	{
		id: '2',
		name: 'Dr. Michael Chen',
		specialty: 'Obstetrician',
		hospital: 'City Medical Center',
		rating: 4.7,
		reviewCount: 98,
		availableDates: ['2025-06-27', '2025-06-30', '2025-07-02'],
	},
	{
		id: '3',
		name: 'Dr. Emily Rodriguez',
		specialty: 'Endocrinologist',
		hospital: 'Metropolitan Hospital',
		rating: 4.9,
		reviewCount: 157,
		availableDates: ['2025-06-25', '2025-06-26', '2025-07-03'],
	},
	{
		id: '4',
		name: 'Dr. James Wilson',
		specialty: 'Breast Surgeon',
		hospital: 'Oncology Institute',
		rating: 4.6,
		reviewCount: 112,
		availableDates: ['2025-06-29', '2025-07-01', '2025-07-04'],
	},
];

const ConsultDoctorScreen = () => {
	const { theme } = useTheme();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
	const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('');
	const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
	const [isVirtual, setIsVirtual] = useState(false);
	const [appointments, setAppointments] = useState([
		{
			id: '1',
			doctorId: '1',
			date: '2025-06-30',
			time: '10:00 AM',
			status: 'scheduled',
			notes: 'Annual checkup',
			virtual: false,
		},
	]);
	const [rescheduleId, setRescheduleId] = useState(null);

	const filteredDoctors = doctorsMock.filter(
		(doctor) =>
			doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
			doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	// Find all upcoming appointments (sorted by date)
	const upcomingAppointments = appointments
		.filter((a) => new Date(a.date) >= new Date())
		.sort((a, b) => new Date(a.date) - new Date(b.date));

	// Reschedule logic
	const handleReschedule = (appointment) => {
		setRescheduleId(appointment.id);
		setSelectedDoctor(doctorsMock.find((d) => d.id === appointment.doctorId));
		setIsBookingModalVisible(true);
		setSelectedAppointmentDate(appointment.date);
		setSelectedAppointmentTime(appointment.time);
		setIsVirtual(appointment.virtual);
	};

	const handleBook = () => {
		if (!selectedAppointmentDate || !selectedAppointmentTime) {
			alert('Select date and time');
			return;
		}
		if (rescheduleId) {
			setAppointments(
				appointments.map((a) =>
					a.id === rescheduleId
						? {
								...a,
								date: selectedAppointmentDate,
								time: selectedAppointmentTime,
								virtual: isVirtual,
						  }
						: a
				)
			);
			setRescheduleId(null);
		} else {
			setAppointments([
				...appointments,
				{
					id: `${Date.now()}`,
					doctorId: selectedDoctor.id,
					date: selectedAppointmentDate,
					time: selectedAppointmentTime,
					status: 'scheduled',
					notes: '',
					virtual: isVirtual,
				},
			]);
		}
		alert(
			`Appointment with ${selectedDoctor.name} booked for ${selectedAppointmentDate} at ${selectedAppointmentTime}`
		);
		setIsBookingModalVisible(false);
		setSelectedAppointmentDate('');
		setSelectedAppointmentTime('');
		setIsVirtual(false);
	};

	return (
		<Layout>
			<div
				className="min-h-screen px-4 py-6 flex flex-col items-center"
				style={{ backgroundColor: theme.background, color: theme.text }}
			>
				<div className="w-full max-w-6xl mx-auto"> {/* Broader layout for consistency */}
					{/* Search at Top */}
					<div
						className="flex items-center border rounded-lg px-3 py-2 mb-6"
						style={{ borderColor: theme.border, background: theme.surface }}
					>
						<AiOutlineSearch className="text-xl mr-2" style={{ color: theme.textSecondary }} />
						<input
							type="text"
							placeholder="Search doctors..."
							className="w-full bg-transparent outline-none"
							style={{ color: theme.text, background: 'transparent' }}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* Upcoming Appointments as Small Cards */}
					{upcomingAppointments.length > 0 && (
						<div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
							{upcomingAppointments.map((appt) => {
								const doc = doctorsMock.find((d) => d.id === appt.doctorId);
								return (
									<Card key={appt.id} style={{ background: theme.card, borderColor: theme.border, padding: 16 }}>
										<div className="flex flex-col gap-1">
											<div className="flex justify-between items-center">
												<div>
													<h4 className="font-semibold text-base" style={{ color: theme.text }}>{doc.name}</h4>
													<p className="text-xs" style={{ color: theme.textSecondary }}>{doc.specialty} • {doc.hospital}</p>
												</div>
												<span className="text-xs px-2 py-1 rounded-full" style={{ background: theme.surface, color: theme.primary }}>
													{appt.virtual ? 'Virtual' : 'In-person'}
												</span>
											</div>
											<div className="flex items-center gap-2 mt-1">
												<span className="text-sm" style={{ color: theme.primary }}>{formatDate(appt.date)}</span>
												<span className="text-sm" style={{ color: theme.textSecondary }}>{appt.time}</span>
											</div>
											{appt.notes && <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>Notes: {appt.notes}</p>}
											<div className="flex justify-end mt-2">
												<Button
													title="Reschedule"
													onPress={() => handleReschedule(appt)}
													type="outline"
													style={{ minWidth: 100 }}
												/>
											</div>
										</div>
									</Card>
								);
							})}
						</div>
					)}

					{/* Doctor Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{filteredDoctors.map((doctor) => (
							<Card
								key={doctor.id}
								style={{ background: theme.card, borderColor: theme.border }}
							>
								<div className="flex justify-between items-start">
									<div>
										<h3 className="text-lg font-semibold" style={{ color: theme.text }}>{doctor.name}</h3>
										<p className="text-sm" style={{ color: theme.textSecondary }}>{doctor.specialty}</p>
										<p className="text-sm" style={{ color: theme.textSecondary }}>{doctor.hospital}</p>
										<p className="text-sm font-semibold" style={{ color: theme.primary }}>
											★ {doctor.rating}{' '}
											<span style={{ color: theme.textSecondary }}>
												({doctor.reviewCount} reviews)
											</span>
										</p>
									</div>
									<button
										onClick={() => {
											setSelectedDoctor(doctor);
											setIsBookingModalVisible(true);
										}}
										className="px-4 py-2 rounded-full text-sm font-semibold"
										style={{ background: theme.primary, color: theme.text, border: 'none' }}
									>
										Book
									</button>
								</div>
							</Card>
						))}
					</div>

					{/* Booking Modal */}
					{isBookingModalVisible && selectedDoctor && (
						<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
							<div
								className="rounded-lg w-[90%] md:w-[500px] p-6"
								style={{ background: theme.card, color: theme.text }}
							>
								<h2 className="text-xl font-bold mb-4">
									{rescheduleId ? 'Reschedule Appointment' : 'Book an Appointment'}
								</h2>
								<p className="font-medium mb-1">{selectedDoctor.name}</p>
								<p
									className="text-sm mb-4"
									style={{ color: theme.textSecondary }}
								>
									{selectedDoctor.specialty} • {selectedDoctor.hospital}
								</p>

								{/* Select Date */}
								<p className="mb-2 font-semibold">Select Date</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{selectedDoctor.availableDates.map((date) => (
										<button
											key={date}
											className={`px-4 py-2 border rounded-full`}
											style={{
												background:
													selectedAppointmentDate === date
														? theme.primary
														: theme.surface,
												color:
													selectedAppointmentDate === date
														? theme.text
														: theme.text,
												borderColor: theme.border,
											}}
											onClick={() => setSelectedAppointmentDate(date)}
										>
											{new Date(date).toDateString().slice(4, 10)}
										</button>
									))}
								</div>

								{/* Select Time */}
								<p className="mb-2 font-semibold">Select Time</p>
								<div className="grid grid-cols-3 gap-2 mb-4">
									{['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'].map(
										(time) => (
											<button
												key={time}
												className={`px-3 py-2 border rounded`}
												style={{
													background:
														selectedAppointmentTime === time
															? theme.primary
															: theme.surface,
													color:
														selectedAppointmentTime === time
															? theme.text
															: theme.text,
													borderColor: theme.border,
												}}
												onClick={() => setSelectedAppointmentTime(time)}
											>
												{time}
											</button>
										)
									)}
								</div>

								{/* Consultation Type */}
								<p className="mb-2 font-semibold">Consultation Type</p>
								<div className="flex gap-4 mb-6">
									<button
										className={`flex items-center gap-2 px-4 py-2 border rounded`}
										style={{
											background: !isVirtual ? theme.primary : theme.surface,
											color: !isVirtual ? theme.text : theme.text,
											borderColor: theme.border,
										}}
										onClick={() => setIsVirtual(false)}
									>
										<IoLocationOutline /> In-person
									</button>
									<button
										className={`flex items-center gap-2 px-4 py-2 border rounded`}
										style={{
											background: isVirtual ? theme.primary : theme.surface,
											color: isVirtual ? theme.text : theme.text,
											borderColor: theme.border,
										}}
										onClick={() => setIsVirtual(true)}
									>
										<IoVideocamOutline /> Virtual
									</button>
								</div>

								{/* Action Buttons */}
								<div className="flex justify-end gap-4">
									<button
										onClick={() => {
											setIsBookingModalVisible(false);
											setRescheduleId(null);
										}}
										className="px-4 py-2 border rounded"
										style={{
											background: theme.surface,
											color: theme.text,
											borderColor: theme.border,
										}}
									>
										Cancel
									</button>
									<button
										onClick={handleBook}
										className="px-4 py-2 rounded"
										style={{
											background: theme.primary,
											color: theme.text,
											border: 'none',
										}}
									>
										{rescheduleId ? 'Save Changes' : 'Book Appointment'}
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default ConsultDoctorScreen;
