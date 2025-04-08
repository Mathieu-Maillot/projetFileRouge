import React from 'react'
import { getFormattedDate } from '../../components/utils/DataHelpers'

const Rides = ({ user, data }) => {
	const findRides = data?.rides?.filter(ride => ride.driverId?.$oid === user?._id?.$oid) || []

	return (
		<div id="rides" className="w_100">
			<div className="flex column gap1">
				<h1>Mes trajets</h1>
				<div className="flex column gap1 pad1">
					{findRides.length ? (
						findRides.map((ride, index) => (
							<ul className="element_box" key={index}>
								<li className="wrapper_ride flex column gap05">
									<div className="flex gap1">
										<p>{index + 1} :</p>
										<p>
											{ride?.departureLocation} - {ride?.arrivalLocation}
										</p>
									</div>
									<div className="element">
										<p>{getFormattedDate(ride?.departureTime?.$date)}</p>
									</div>
									<div className="element">
										<p>{ride?.price} €</p>
									</div>
								</li>
							</ul>
						))
					) : (
						<p>Aucun trajet trouvé</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Rides