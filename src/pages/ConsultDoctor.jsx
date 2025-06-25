import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoVideocamOutline, IoLocationOutline } from 'react-icons/io5';
import Layout from '../components/Layout';

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
];

const ConsultDoctorScreen = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
	const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('');
	const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
	const [isVirtual, setIsVirtual] = useState(false);

	const filteredDoctors = doctorsMock.filter((doctor) =>
		doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleBook = () => {
		if (!selectedAppointmentDate || !selectedAppointmentTime) {
			alert('Select date and time');
			return;
		}
		alert(
			`Appointment with ${selectedDoctor.name} booked for ${selectedAppointmentDate} at ${selectedAppointmentTime}`
		);
		setIsBookingModalVisible(false);
	};

	return (
		<Layout>
			<div className="p-4 max-w-5xl mx-auto bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
				{/* Search */}
				<div className="flex items-center border rounded-lg px-3 py-2 mb-6">
					<AiOutlineSearch className="text-xl mr-2" />
					<input
						type="text"
						placeholder="Search doctors..."
						className="w-full bg-transparent outline-none"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				{/* Doctor Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{filteredDoctors.map((doctor) => (
						<div
							key={doctor.id}
							className="border rounded-lg p-4 shadow hover:shadow-md transition"
						>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-lg font-semibold">{doctor.name}</h3>
									<p className="text-sm text-gray-500">
										{doctor.specialty}
									</p>
									<p className="text-sm text-gray-500">
										{doctor.hospital}
									</p>
									<p className="text-sm text-yellow-500 font-semibold">
										★ {doctor.rating} ({doctor.reviewCount} reviews)
									</p>
								</div>
								<button
									onClick={() => {
										setSelectedDoctor(doctor);
										setIsBookingModalVisible(true);
									}}
									className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
								>
									Book
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Booking Modal */}
				{isBookingModalVisible && selectedDoctor && (
					<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
						<div className="bg-white dark:bg-gray-800 rounded-lg w-[90%] md:w-[500px] p-6">
							<h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
							<p className="font-medium mb-1">{selectedDoctor.name}</p>
							<p className="text-sm text-gray-500 mb-4">
								{selectedDoctor.specialty} • {selectedDoctor.hospital}
							</p>

							{/* Select Date */}
							<p className="mb-2 font-semibold">Select Date</p>
							<div className="flex flex-wrap gap-2 mb-4">
								{selectedDoctor.availableDates.map((date) => (
									<button
										key={date}
										className={`px-4 py-2 border rounded-full ${
											selectedAppointmentDate === date
												? 'bg-blue-600 text-white'
												: 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white'
										}`}
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
											className={`px-3 py-2 border rounded ${
												selectedAppointmentTime === time
													? 'bg-blue-600 text-white'
													: 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white'
											}`}
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
									className={`flex items-center gap-2 px-4 py-2 border rounded ${
										!isVirtual ? 'bg-blue-600 text-white' : ''
									}`}
									onClick={() => setIsVirtual(false)}
								>
									<IoLocationOutline /> In-person
								</button>
								<button
									className={`flex items-center gap-2 px-4 py-2 border rounded ${
										isVirtual ? 'bg-blue-600 text-white' : ''
									}`}
									onClick={() => setIsVirtual(true)}
								>
									<IoVideocamOutline /> Virtual
								</button>
							</div>

							{/* Action Buttons */}
							<div className="flex justify-end gap-4">
								<button
									onClick={() => setIsBookingModalVisible(false)}
									className="px-4 py-2 border rounded"
								>
									Cancel
								</button>
								<button
									onClick={handleBook}
									className="bg-blue-600 text-white px-4 py-2 rounded"
								>
									Book Appointment
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default ConsultDoctorScreen;
