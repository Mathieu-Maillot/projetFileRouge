import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../cfg/store/AuthStore'

const TrajectManagement = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuthStore();

	const handlePublishTraject = async (data) => {
		if (user?.role !== 'driver' && isAuthenticated) {
			navigate('/auth/driver', { replace: true });
			return;
		}
		if (!isAuthenticated) {
			navigate('/auth/login', { replace: true });
			return;
		}

		try {
			const newTraject = {
				_id: { "$oid": crypto.randomUUID() },
				departureLocation: data.departureLocation,
				arrivalLocation: data.arrivalLocation,
				departureTime: { "$date": data.departureTime || new Date().toISOString() },
				driverId: { "$oid": user._id.$oid || user._id },
				availableSeats: data.availableSeats || 1,
				createdAt: { "$date": new Date().toISOString() },
				updatedAt: { "$date": new Date().toISOString() }
			};
			console.log("New traject published:", newTraject);
			let existingData = JSON.parse(localStorage.getItem('appData') || '{"rides":[]}');
			existingData.rides = [...existingData.rides, newTraject];
			localStorage.setItem('appData', JSON.stringify(existingData));
			navigate('/user/profile/rides', { replace: true });
		} catch (error) {
			console.error("Error publishing traject:", error);
		}
	}

	return {
		handlePublishTraject,
	}
}

export default TrajectManagement