import React from 'react'
import { useParams } from 'react-router-dom'
import data from '../../../../../temp/data.json'
import { calculateTimeBetween, getFormattedDate, getFormattedTime } from '../../../../components/utils/DataHelpers';
import DriverView from './DriverView';
import PassengerView from './PassengerView'
import { linkBookingsForUser } from '../../../../components/utils/DataHelpers';
import useStore, { useAuthStore } from '../../../../../cfg/store/AuthStore';
import Button from '../../../../components/helpers/Button';
const DetailsTraject = () => {
	const { id } = useParams();
	const Ride = data?.rides?.find(ride => ride._id?.$oid === id);
	const { user } = useStore();
	const isDriver = Ride?.driverId?.$oid === user?._id?.$oid;
	const tripDuration = Ride ? calculateTimeBetween(
		Ride.departureTime.$date,
		Ride.arrivalTime.$date
	) : "Durée inconnue";
	const driver = data?.users?.find(u => u._id?.$oid === Ride?.driverId?.$oid);
	const isLogged = useAuthStore(state => state.isAuthenticated);
	const userBookings = linkBookingsForUser(user, data);

	const currentRideBooking = userBookings?.find(
		booking => booking.ride._id.$oid === id && booking.passenger._id.$oid === user?._id?.$oid
	);

	const isPassengerForThisRide = !!currentRideBooking;
	console.log(isPassengerForThisRide)
	console.log(isDriver)
	const bookingStatus = currentRideBooking?.booking?.status;

	const checkUser = () => {
		if (isDriver) {
		  return (
			<>
			  <h3>Votre trajet n'attend que vous</h3>
			</>
		  )
		}
		else {
		  return (
			<>
			  <div className="element">
				<h3 className='bold'>Cette réservation</h3>
			  </div>
			  <div className="element">
				<p>{Ride?.departureLocation} {'->'} {Ride?.arrivalLocation}</p>
			  </div>
			  <div className="element">
				<p>Temps de trajet : {tripDuration}</p>
			  </div>
			  <div className="element">
				<p>Avec : {driver?.firstName} {driver?.lastName}</p>
			  </div>
			  <div className="element">
				<p>Prix : {Ride?.price} €</p>
			  </div>
			  <div className="element">
				{isPassengerForThisRide && bookingStatus === "confirmed" ? (
				  <Button variant='primary' onClick={() => alert("Cette fonctionnalité n'est pas encore disponible")}>
					Annuler la réservation
				  </Button>
				) : (
				  <Button variant='primary' onClick={() => alert("Cette fonctionnalité n'est pas encore disponible")}>
					Demande de réservation
				  </Button>
				)}
			  </div>
			</>
		  );
		}
	  }
	return (
		<>
			<section id="details_traject">
				<div className="container">
					<div className="flex column gap2">
						<div className="element">
							<h2 className='bold lh03'>{getFormattedDate(Ride?.departureTime.$date)}</h2>
						</div>
						<div className="container_whole">
							<div className="container_content">

								<div className="element_box">
									<div className="element">
										<h3 className='bold'>Trajet</h3>
									</div>
									<div className="container_between w_100">
										<div className="wrapper_departure">
											<p>{Ride?.departureLocation}</p>
											<p className='text_color02'>{getFormattedTime(Ride?.departureTime.$date)}</p>
										</div>
										<div className="wrapper_line">
											<div className="line">
												<div className="circle start"></div>
												<div className="dash-line"></div>
												<div className="circle end"></div>
											</div>
										</div>
										<div className="wrapper_arrival">
											<p>{Ride?.arrivalLocation}</p>
											<p className='text_color02'>{getFormattedTime(Ride?.arrivalTime.$date)}</p>

										</div>
									</div>
								</div>
								<div className="element_box">
									<div className="container">
										<div className="flex column gap2">
											{isDriver ? (
												<DriverView data={data} ride={Ride} />
											)
												:
												(
													<PassengerView data={data} user={user} ride={Ride} />

											)
											}



										</div>
									</div>
								</div>
							</div>
							<div className="container_details w_100">
								<div className="element_box">
									{checkUser()}
								</div>
							</div>

						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default DetailsTraject