export const calculateAge = (birthdate) => {
	if (!birthdate || typeof birthdate !== 'string') return null;

	try {
		const dob = new Date(birthdate);

		if (isNaN(dob.getTime())) return null;

		const today = new Date();

		let age = today.getFullYear() - dob.getFullYear();

		const monthDiff = today.getMonth() - dob.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
			age--;
		}

		return age;
	} catch (error) {
		console.error("Error calculating age:", error);
		return null;
	}
};
export const getAverageRating = (reviews) => {
	if (!reviews || reviews.length === 0) return 'Pas encore de note';
	const total = reviews.reduce((acc, r) => acc + r.rating, 0);
	return (total / reviews.length).toFixed(1);
};
export const linkBookingsForUser = (user, data) => {
	if (!user || !data?.bookings) return [];
	return data.bookings
		.filter(b => b.userId?.$oid === user._id?.$oid)
		.map(booking => {
			const ride = data.rides?.find(r => r._id?.$oid === booking.rideId?.$oid);
			const driver = data.users?.find(u => u._id?.$oid === ride?.driverId?.$oid);
			return { booking, ride, driver, passenger: user };
		});
};

export const getFormattedDate = (dateString) => {
	if (!dateString) return "";
	const dateObj = new Date(dateString);
	const day = dateObj.getDate().toString().padStart(2, "0");
	const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
	const monthName = monthNames[dateObj.getMonth()];
	const hour = dateObj.getHours();
	return `${day} ${monthName}, à ${hour}h`;
};

export const getFormattedBirthDate = (dateString) => {
	if (!dateString) return "";
	const dateObj = new Date(dateString);
	const day = dateObj.getDate().toString().padStart(2, "0");
	const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
	const monthName = monthNames[dateObj.getMonth()];
	return `${day} ${monthName}`;
}