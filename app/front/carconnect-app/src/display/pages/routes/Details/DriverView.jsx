import React from 'react'
import { linkPassengersForRide, getFormattedDate } from '../../../components/utils/DataHelpers'
import Button from '../../../components/helpers/Button'
import RideManagement from '../../../../data/routes/RideManagement'
const DriverView = ({ ride, data }) => {
	const passengers = linkPassengersForRide(ride, data)
	const { deletePassengerFromRide } = RideManagement();
	return (
		<>

			<div className="element">
				<h3>Administrer le trajet</h3>
			</div>
			<div className="element">
				<h4>Liste des passagers</h4>
				{passengers.length > 0 ? (
					<ul className="passengers-list">
						{passengers.map((p, idx) => (
							<li key={idx} className="passenger-item">
								<div className="passenger-info">
									<p><strong>{p.passenger?.firstName} {p.passenger?.lastName}</strong></p>
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
				<Button variant='close' onClick={() => deleteRide(ride._id.$oid)}
				>Supprimer le trajet</Button>
			</div>

		</>
	)
}

export default DriverView