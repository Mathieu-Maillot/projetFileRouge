import React, { useState } from 'react'
import { getFormattedDate, linkPassengersForRide } from '../../components/utils/DataHelpers'
import Search from '../../components/helpers/Search'
import { useNavigate } from 'react-router-dom'

const Rides = ({ user, data }) => {
	const [searchTerm, setSearchTerm] = useState("")
	const [expandedRide, setExpandedRide] = useState(null)
	const navigate = useNavigate();
	const handleSearch = (e) => {
		setSearchTerm(e.target.value)
	}

	const userRides = data?.rides?.filter(ride => ride.driverId?.$oid === user?._id?.$oid) || []

	const filteredRides = userRides.filter(ride => {
		const searchLower = searchTerm.toLowerCase()

		return (
			ride.departureLocation.toLowerCase().includes(searchLower) ||
			ride.arrivalLocation.toLowerCase().includes(searchLower) ||
			ride.price.toString().includes(searchLower) ||
			getFormattedDate(ride.departureTime?.$date).toLowerCase().includes(searchLower)
		)
	})

	const toggleRideDetails = (rideId) => {
		setExpandedRide(expandedRide === rideId ? null : rideId)
	}

	const getPassengersForRide = (ride) => {
		return linkPassengersForRide(ride, data)
	}

	return (
		<div id="rides" className="w_100 margin_top08">
			<div className="flex column gap1">
				<h1>Mes trajets</h1>
				<Search
					handleSearch={handleSearch}
					searchTerm={searchTerm}
					placeholder="Rechercher par ville, date ou prix..."
				/>
				<div className="flex column gap1 pad1">
					{filteredRides.length > 0 ? (
						filteredRides.map((ride, index) => {
							const passengers = getPassengersForRide(ride)
							const isExpanded = expandedRide === ride._id?.$oid

							return (
								<div className="element_box" key={index}>
									<div
										className="wrapper_ride flex column gap05 pointer"
										onClick={() => toggleRideDetails(ride._id?.$oid)}
									>
										<div className="flex gap1">
											<p>
												{ride?.departureLocation} - {ride?.arrivalLocation}
											</p>
										</div>
										<div className="element">
											<p>{getFormattedDate(ride?.departureTime?.$date)}</p>
										</div>
										<div className="element">
											<p>{ride?.price} € - {passengers.length} passager(s)</p>
										</div>
										<div className="element">
											<p className="show-details">
												{isExpanded ? "Masquer les détails ▲" : "Afficher les détails ▼"}
											</p>
										</div>
									</div>

									{isExpanded && (
										<div className="passengers-list">
											<h4>Passagers:</h4>
											{passengers.length > 0 ? (
												<ul>
													{passengers.map((p, idx) => (
														<li key={idx} className="passenger-item">
															<div className="passenger-info">
																<p><strong>{p.passenger?.firstName} {p.passenger?.lastName}</strong></p>
																<p>Status: <span className={`status_${p.booking?.status}`}>{p.booking?.status}</span></p>
																<p>Réservé le: {getFormattedDate(p.booking?.createdAt?.$date)}</p>
															</div>
														</li>
													))}
												</ul>
											) : (
												<p className="no-passengers">Aucun passager n'a encore réservé ce trajet</p>
											)}
											<p className='text_link text_color_blue cursor_pointer' onClick={() => navigate(`/rides/${ride._id?.$oid}`)}>Administrer le trajet</p>

										</div>
									)}
								</div>
							)
						})
					) : (
						<p>
							{userRides.length > 0
								? "Aucun trajet ne correspond à votre recherche"
								: "Aucun trajet trouvé"}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Rides