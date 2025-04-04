import React from 'react'
import data from '../../../temp/data.json'
import Icon from '../../components/utils/Icon';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileInformations from './ProfileInformations';
const Profile = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathInformations = location.pathname === '/user/profile/informations';
	const user = data.find(user => user._id.$oid === '605c72ef1532071cba029d60');
	console.log(user)
	return (
		<>
			<div id="profile">
				<div className="container">
					<div className="sidebar">
						<div className="wrapper margin_top08">
							<div className="flex column gap1">
								<h1>Menu</h1>
								<ul className='flex column gap1 pad1'>
									<li onClick={() => navigate("/user/profile/informations")}><p>Informations</p></li>
									<li onClick={() => navigate("/user/profile/marks")}><p>Notes</p></li>
									<li onClick={() => navigate("/user/profile/messages")}><p>Messages</p></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="container_content">
						<div className="wrapper_top flex gap 1rem">
							{pathInformations && <ProfileInformations user={user}/>}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile