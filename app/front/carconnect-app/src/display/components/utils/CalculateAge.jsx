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
