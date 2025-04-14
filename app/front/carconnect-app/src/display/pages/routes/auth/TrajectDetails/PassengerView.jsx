import React from 'react'
import { getAverageRating, getFormattedDate } from '../../../../components/utils/DataHelpers';
import Button from '../../../../components/helpers/Button';
import Icon from '../../../../components/utils/Icon';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../cfg/store/AuthStore';
import RenderDriver from './RenderDriver';

const PassengerView = ({ data, user, ride }) => {
	const userBookingForRide = data?.bookings?.find(
		booking => booking.rideId === ride?.id && booking.userId === user?.id
	);
	
	const driver = data?.users?.find(u => u.id === ride?.driverId);
	const isLogged = useAuthStore(state => state.isAuthenticated);

	const checkIsAuthentificated = () => {
		if (isLogged) {
			return (
				<>
					<div className="element">
						<p>Statut de réservation: <strong className='status_confirmed'>{userBookingForRide?.status || "Non réservé"}</strong></p>
					</div>
					{
						userBookingForRide && (
							<div className="element">
								<p>Réservé : <span className='text_color02'>{getFormattedDate(userBookingForRide.bookingTime.$date)}</span></p>
							</div>
						)
					}
				</>
			);
		}

	}
	return (
		<>
			<div className="element">
				<h3 className='bold'>Détails</h3>
			</div>
			<div className="flex column gap2">
				<RenderDriver driver={driver} ride={ride} />
				{checkIsAuthentificated()}
			</div>
		</>
	)
}

export default PassengerView