import React from 'react'
import data from '../../../temp/data.json'
import Icon from '../../components/utils/Icon';
import { useLocation, useNavigate } from 'react-router-dom';
import Settings from './Settings';
import Reviews from './Reviews';
import DisplayProfile from './DisplayProfile';
import useStore from '../../../cfg/store/AuthStore';
import Rides from './Rides';
import Bookings from './Bookings';
import Messages from './Messages';
const Profile = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathInformations = location.pathname === '/account/settings';
	const pathProfile = location.pathname === '/account/profile';
	const pathReviews = location.pathname === '/account/reviews';
	const pathRides = location.pathname === '/account/rides';
	const pathBookings = location.pathname === '/account/bookings';
	const pathMessages = location.pathname === '/account/messages';
	const { user } = useStore();
	const reviews = user?.reviews;
	return (
		<>
			<div id="profile">
				<div className="container">
					<div className="sidebar">
						<div className="wrapper margin_top08">
							<div className="flex column gap1">
								<h1>Menu</h1>
								<ul className='flex column gap1'>
									<li onClick={() => navigate("/account/profile")}><p>Profil</p></li>
									<li onClick={() => navigate("/account/settings")}><p>Paramètres</p></li>
									<li onClick={() => navigate("/account/rides")}><p>Trajets</p></li>
									<li onClick={() => navigate("/account/bookings")}><p>Réservations</p></li>
									<li onClick={() => navigate("/account/reviews")}><p>Notes</p></li>
									<li onClick={() => navigate("/account/messages")}><p>Messages</p></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="container_content">
						<div className="wrapper_top flex gap 1rem">
							{pathInformations && <Settings user={user} />}
							{pathProfile && <DisplayProfile user={user} data={data} />}
							{pathReviews && <Reviews user={user} reviews={reviews} data={data} />}
							{pathRides && <Rides user={user} reviews={reviews} data={data} />}
							{pathBookings && <Bookings user={user} reviews={reviews} data={data} />}
							{pathMessages && <Messages user={user} reviews={reviews} data={data} />}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile