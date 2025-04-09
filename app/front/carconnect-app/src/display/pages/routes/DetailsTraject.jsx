import React from 'react'
import { useParams } from 'react-router-dom'
import data from '../../../temp/data.json'
import { getFormattedDate, getFormattedTime, linkPassengersForRide } from '../../components/utils/DataHelpers';
import DriverView from './Details/DriverView';
import PassengerView from './Details/PassengerView';
import useStore from '../../../cfg/store/AuthStore';
const DetailsTraject = () => {
	const { id } = useParams();
	const Ride = data?.rides?.find(ride => ride._id?.$oid === id);
	const { user } = useStore();
	const isDriver = Ride?.driverId?.$oid === user?._id?.$oid;
	return (
		<>
			<section id="details_traject">
				<div className="container">
					<div className="flex column gap4">
						<div className="element">
							<h1 className='bold lh03'>{getFormattedDate(Ride?.departureTime.$date)}</h1>
						</div>
						<div className="container_whole">
							<div className="container_content">

								<div className="element_box">
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
										<div className="wrapper">
											{isDriver ? <DriverView data={data} ride={Ride} /> : <PassengerView data={data} user={user} ride={Ride} />}

										</div>
									</div>
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