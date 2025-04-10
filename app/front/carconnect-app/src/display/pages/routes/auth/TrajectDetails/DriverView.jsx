import React from 'react'
import { linkPassengersForRide, getFormattedDate } from '../../../../components/utils/DataHelpers'
import Button from '../../../../components/helpers/Button'
import RideManagement from '../../../../../data/routes/RideManagement'
import TrajectManagement from '../../../../../data/auth/TrajectManagement'
import UserCard from '../../../../components/ui/user/UserCard'
const DriverView = ({ ride, data }) => {
	const passengers = linkPassengersForRide(ride, data);
	const { deletePassengerFromRide } = RideManagement();
	const { handleDeleteTraject } = TrajectManagement();
	return (
		<>

			<div className="element_between w_100">
				<h3 className='bold'>Administrer le trajet</h3>
				<p className='text_link text_color_blue' onClick={() => handleDeleteTraject(ride?._id?.$oid)}>Annuler le trajet</p>
			</div>
			<div className="element">
				<h4>Détails</h4>
				{passengers.length > 0 ? (
					<ul className="passengers-list">
						{passengers.map((p, idx) => (
							<li key={idx} className="passenger-item">
								<div className="passenger-info">
									{console.log(p)}
									<UserCard user={p.passenger} />
									<p>{passengers.length} / {ride.availableSeats} passagers</p>
									<p>Status: <span className={`status_${p.booking?.status}`}>{p.booking?.status}</span></p>
									<p>Réservé le: {getFormattedDate(p.booking?.createdAt?.$date)}</p>
									<Button variant='close' onClick={() => deletePassengerFromRide(ride._id.$oid, p.passenger?._id?.$oid)}
									>Supprimer le passager</Button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="no-passengers">Aucun passager n'a encore réservé ce trajet</p>
				)}

			</div>

		</>
	)
}

export default DriverView