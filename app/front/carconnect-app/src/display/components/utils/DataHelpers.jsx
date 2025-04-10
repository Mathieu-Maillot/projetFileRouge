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

export const findRidesWhereUserIsDriver = (user, data) => {
    if (!user || !data?.rides) return [];
    
    return data.rides.filter(ride => ride.driverId?.$oid === user._id?.$oid);
};

export const getAverageRating = (reviews) => {
	if (!reviews || reviews.length === 0) return 0;
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
export const linkPassengersForRide = (ride, data) => {
    if (!ride || !data?.bookings) return [];
    
    return data.bookings
        .filter(booking => booking.rideId?.$oid === ride._id?.$oid)
        .map(booking => {
            const passenger = data.users?.find(u => u._id?.$oid === booking.userId?.$oid);
            return { booking, passenger };
        });
};


export const getFormattedDate = (dateString) => {
	if (!dateString) return "";
	const dateObj = new Date(dateString);
	const day = dateObj.getDate().toString().padStart(2, "0");
	const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
	const monthName = monthNames[dateObj.getMonth()];
	const hour = dateObj.getHours();
	return `${hour}h, le ${day} ${monthName}`;
};
export const getFormattedTime = (dateString) => {
	if (!dateString) return "";
	const dateObj = new Date(dateString);
	const day = dateObj.getDate().toString().padStart(2, "0");
	const hour = dateObj.getHours();
	return `${hour}h`;
};

export const getFormattedBirthDate = (dateString) => {
	if (!dateString) return "";
	const dateObj = new Date(dateString);
	const day = dateObj.getDate().toString().padStart(2, "0");
	const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
	const monthName = monthNames[dateObj.getMonth()];
	return `${day} ${monthName}`;
}


export const calculateTimeBetween = (departureTimeStr, arrivalTimeStr) => {
  if (!departureTimeStr || !arrivalTimeStr) return "Durée inconnue";
  
  const departureTime = new Date(departureTimeStr);
  const arrivalTime = new Date(arrivalTimeStr);
  
  const diffMs = arrivalTime - departureTime;
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes}min`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}min`;
  }
}