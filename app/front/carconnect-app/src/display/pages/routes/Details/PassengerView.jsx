import React from 'react'
import { getAverageRating, getFormattedDate } from '../../../components/utils/DataHelpers';
import Button from '../../../components/helpers/Button';
import Icon from '../../../components/utils/Icon';

const PassengerView = ({ data, user, ride }) => {
	const userBookingForRide = data?.bookings?.find(
		booking => booking.rideId?.$oid === ride?._id?.$oid && booking.userId?.$oid === user?._id?.$oid
	);

	const driver = data?.users?.find(u => u._id?.$oid === ride?.driverId?.$oid);
	const averageRating = getAverageRating(driver?.reviews);

	const renderRating = () => {
		return (
			<>
				<div className="flex gap05 a_center">
					<Icon type='FullStar' size='1.5rem' />
					{averageRating.length > 0 ? (
						<p>{averageRating} / 5 - {averageRating.length} avis</p>
					) : (
						<p>L'utilisateur n'a pas encore de notes</p>
					)}
				</div>
			</>
		)
	}
	return (
		<>
			<div className="element">
				<h3 className='bold'>Votre trajet</h3>
			</div>
			<div className="container">
				<div className="flex column gap1">
					<div className="wrapper_driver">
						<div className="flex gap05 a_center">
							<p>{driver?.firstName} {driver?.lastName} </p>
							<span><Icon type='valid' size='1.5rem' /></span>
						</div>
						{renderRating()}
						<p className='display_none'>Visiter le profil</p>
					</div>
					<div className="element">
						<p>Statut de réservation: <strong className='status_confirmed'>{userBookingForRide?.status || "Non réservé"}</strong></p>
					</div>
					{userBookingForRide && (
						<div className="element">
							<p>Réservé : <strong className='text_color02'>{getFormattedDate(userBookingForRide.bookingTime.$date)}</strong></p>
						</div>

					)}
					<div className="element">
						<Button variant='danger'>Annuler le trajet</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default PassengerView