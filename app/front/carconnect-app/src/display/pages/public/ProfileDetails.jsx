import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import data from '../../../temp/data.json'
import { getAverageRating, linkBookingsForUser, findRidesWhereUserIsDriver } from '../../components/utils/DataHelpers';
import { getFormattedDate } from './../../components/utils/DataHelpers';

const ProfileDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = data?.users?.find(user => user._id?.$oid === id);
	const getUserRating = getAverageRating(user?.reviews)
	const findBookingForUser = linkBookingsForUser(user, data);
	const userDrivingRides = findRidesWhereUserIsDriver(user, data);
	console.log("User's rides as driver:", userDrivingRides);

	const renderBookings = () => {
		return (
			<>
				<div className="flex column gap2">
					{findBookingForUser.map((booking, idx) => (
						<div key={idx} className="element_box cursor_pointer" onClick={() => navigate(`/rides/${booking?.ride?._id?.$oid}`)}>
							<div className="element_between w_100">
								<p>Réservation : {booking?.ride?.departureLocation} - {booking?.ride?.arrivalLocation}</p>
								<p className='text_link text_color_blue'>Regarder ce trajet</p>
							</div>
							<p>Statut : {booking?.booking?.status}</p>
							<p>Date de réservation : {getFormattedDate(booking?.booking?.createdAt?.$date)}</p>
						</div>
					))}
				</div>
			</>
		)
	}

	const renderDrivingRides = () => {
		return (
			<>
				<div className="flex column gap2">
					{userDrivingRides.length > 0 ? (
						userDrivingRides.map((ride, idx) => (
							<div key={idx} className="element_box cursor_pointer" onClick={() => navigate(`/rides/${ride?._id?.$oid}`)}>
								<div className="element_between w_100">
									<p>Trajet : {ride?.departureLocation} - {ride?.arrivalLocation}</p>
									<p className='text_link text_color_blue'>Regarder ce trajet</p>
								</div>
								<p>Date de départ : {getFormattedDate(ride?.departureTime?.$date)}</p>
								<p>Places disponibles : {ride?.availableSeats}</p>
							</div>
						))
					) : (
						<p>Aucun trajet en tant que conducteur</p>
					)}
				</div>
			</>
		)
	}

	return (
		<>
			<section id="user_profile">
				<div className="flex column gap2">
					<div className="element">
						<h3 className="bold">L'utilisateur</h3>
					</div>
					<div className="element_box">
						<div className="element">
							<h3>{user?.firstName} {user?.lastName}</h3>
						</div>
						<div className="element">
							<p className='text_color02'>{user?.vehicule == null ? "L'utilisateur n'est pas conducteur" : "L'utilisateur est conducteur"}</p>
						</div>
						<div className="element">
							<p> Réside à {user?.city}</p>
						</div>
					</div>
					<div className="element_box">
						<p>L'utilisateur a une moyenne de : {getUserRating} / 5 - Nombre de note(s) : {user?.reviews?.length || 0}</p>
					</div>

					{user?.vehicule && (
						<>
							<div className="element">
								<h3 className='bold'>Trajets proposés en tant que conducteur</h3>
							</div>
							{renderDrivingRides()}
						</>
					)}

					<div className="element">
						<h3 className='bold'>Réservations de trajets</h3>
					</div>
					{renderBookings()}
				</div>
			</section>
		</>
	)
}

export default ProfileDetails