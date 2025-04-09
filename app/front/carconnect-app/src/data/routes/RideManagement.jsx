import React from 'react'

const RideManagement = () => {
 
	const deletePassengerFromRide = (rideId, passengerId) => {
		// Logic to delete passenger from ride
		console.log(`Deleting passenger ${passengerId} from ride ${rideId}`);
	
	};
	return {
		deletePassengerFromRide,
	}
}

export default RideManagement