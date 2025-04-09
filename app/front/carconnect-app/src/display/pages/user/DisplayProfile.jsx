import React from 'react'
import { calculateAge, linkBookingsForUser } from '../../components/utils/DataHelpers';
import { getAverageRating } from '../../components/utils/DataHelpers';
import { getFormattedBirthDate } from './../../components/utils/DataHelpers';
const DisplayProfile = ({ user, data }) => {
	const findRides = data?.rides?.filter(ride => ride.driverId.$oid === user?._id.$oid);
	const findBookings = linkBookingsForUser(user, data);
	const averageRating = getAverageRating(user?.reviews);
	return (
		<>
			<div id="display_profile" className='margin_top08'>
				<div className="flex column gap1">
						<h1>Mon profil</h1>
					<div className='flex column gap1 pad1'>
						<div className="element_box">
							<h1 className='color_primary'>Identité</h1>
							<div className="wrapper_wrap">
								<div className="element_row gap1">
									<p>{user?.firstName}</p>
									<p>{user?.lastName}</p>
								</div>
								<div className="element">
									<p className='text_color02'>Compte crée le {user?.createdAt.$date}</p>
								</div>
							</div>
							<div className="element">
								<p>{user?.email}</p>
							</div>
							<div className="bordertop">
								<div className="element">
									<p>Née le  {getFormattedBirthDate(user?.birthdate)}</p>
									<p>{calculateAge(user?.birthdate)} ans</p>
								</div>
							</div>
						</div>
						<div className="element_box">
							<h1 className='color_primary'>Notes</h1>
							<div className="flex column gap1">
								<div className="element">
									<p>Nombre de notes : <strong> {user?.reviews?.length}</strong></p>
								</div>
								<div className="element">
									<p>Moyenne : {averageRating}</p>
								</div>
							</div>
						</div>
						<div className="element_box">
							<h1 className='color_primary'>Trajets</h1>
							<div className="flex column gap1">
								<div className="element">
									<p>Nombre de trajets : <strong> {findRides?.length}</strong></p>
								</div>

							</div>
						</div>
						<div className="element_box">
							<h1 className='color_primary'>Réservations</h1>
							<div className="flex column gap1">
								<div className="element">
									<p>Nombre de Réservations : <strong>{(findBookings?.length) || 0}</strong></p>

								</div>

							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	)
}

export default DisplayProfile