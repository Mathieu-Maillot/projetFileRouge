import React from 'react';
import { getFormattedDate, linkBookingsForUser } from '../../components/utils/DataHelpers';
const Bookings = ({ user, data }) => {
	const findBookings = linkBookingsForUser(user, data);

	return (
		<div id="bookings" className="w_100">
			<div className="flex column gap1">
				<h1>Mes réservations</h1>
				<div className="flex column gap1 pad1">
					{findBookings?.length ? (
						findBookings.map((booking, index) => (
							<ul className="element_box" key={index}>
								<li className="wrapper_ride flex column gap05">
									<div className="element">
										<p>
											{booking?.ride?.departureLocation} - {booking?.ride?.arrivalLocation}
										</p>
									</div>
									<div className="element">
										<p>{getFormattedDate(booking?.ride?.departureTime?.$date)}</p>
									</div>
									<div className="element">
										<p>{booking?.ride?.price} €</p>
									</div>
								</li>
							</ul>
						))
					) : (
						<p>Aucune réservation trouvée</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default Bookings